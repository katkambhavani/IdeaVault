import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Idea, IdeaDraft, User } from '../domain/types';
import { createId, IDEAS_KEY, normalizeStoredIdeas, readStored, seedIdeas, SESSION_KEY, USERS_KEY } from '../domain/storage';

type IdeaVaultContextValue = {
  ideas: Idea[];
  users: User[];
  user: User | null;
  notice: string;
  setNotice: (notice: string) => void;
  register: (user: User) => void;
  login: (user: User) => void;
  logout: () => void;
  saveIdea: (id: string) => void;
  createIdea: (draft: IdeaDraft) => void;
  updateIdea: (id: string, draft: IdeaDraft) => void;
  deleteIdea: (id: string) => void;
  toggleInterest: (idea: Idea) => void;
  updateProfile: (user: User) => void;
};

const IdeaVaultContext = createContext<IdeaVaultContextValue | null>(null);

export function IdeaVaultProvider({ children }: { children: ReactNode }) {
  const [ideas, setIdeas] = useState<Idea[]>(() => normalizeStoredIdeas(readStored(IDEAS_KEY, seedIdeas)));
  const [users, setUsers] = useState<User[]>(() => readStored(USERS_KEY, []));
  const [sessionId, setSessionId] = useState<string | null>(() => readStored(SESSION_KEY, null));
  const [notice, setNotice] = useState('');
  const user = users.find((item) => item.id === sessionId) || null;

  useEffect(() => localStorage.setItem(IDEAS_KEY, JSON.stringify(ideas)), [ideas]);
  useEffect(() => localStorage.setItem(USERS_KEY, JSON.stringify(users)), [users]);
  useEffect(() => localStorage.setItem(SESSION_KEY, JSON.stringify(sessionId)), [sessionId]);
  useEffect(() => {
    if (!notice) return undefined;
    const timeout = window.setTimeout(() => setNotice(''), 3400);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const value = useMemo<IdeaVaultContextValue>(() => ({
    ideas,
    users,
    user,
    notice,
    setNotice,
    register: (nextUser) => {
      setUsers((current) => [...current, nextUser]);
      setSessionId(nextUser.id);
    },
    login: (nextUser) => setSessionId(nextUser.id),
    logout: () => setSessionId(null),
    saveIdea: (id) => {
      if (!user) return;
      setUsers((current) => current.map((item) => item.id === user.id
        ? { ...item, savedIdeaIds: item.savedIdeaIds.includes(id) ? item.savedIdeaIds.filter((savedId) => savedId !== id) : [...item.savedIdeaIds, id] }
        : item));
    },
    createIdea: (draft) => {
      if (!user) return;
      const idea: Idea = {
        ...draft,
        id: createId(),
        creatorId: user.id,
        creatorName: user.fullName,
        interestedUserIds: [],
        createdAt: new Date().toISOString(),
        isDemo: false,
      };
      setIdeas((current) => [idea, ...current]);
      setNotice('Your idea is in the vault. Nice work.');
    },
    updateIdea: (id, draft) => {
      setIdeas((current) => current.map((idea) => idea.id === id ? { ...idea, ...draft } : idea));
      setNotice('Idea updated.');
    },
    deleteIdea: (id) => {
      if (!window.confirm('Delete this idea? This cannot be undone.')) return;
      setIdeas((current) => current.filter((idea) => idea.id !== id));
      setNotice('Idea deleted.');
    },
    toggleInterest: (idea) => {
      if (idea.isDemo) {
        setNotice('Demo ideas are examples only, not real teams.');
        return;
      }
      if (!user) return;
      if (idea.creatorId === user.id) {
        setNotice('This is your idea.');
        return;
      }
      const isInterested = idea.interestedUserIds.includes(user.id);
      setIdeas((current) => current.map((item) => item.id === idea.id
        ? {
          ...item,
          interestedUserIds: isInterested ? item.interestedUserIds.filter((id) => id !== user.id) : [...item.interestedUserIds, user.id],
          currentTeamMembers: Math.max(1, item.currentTeamMembers + (isInterested ? -1 : 1)),
        }
        : item));
      setNotice(isInterested ? 'You withdrew your interest.' : 'The creator can now see that you are interested.');
    },
    updateProfile: (nextUser) => {
      setUsers((current) => current.map((item) => item.id === nextUser.id ? nextUser : item));
      setNotice('Your profile is up to date.');
    },
  }), [ideas, users, user, notice]);

  return <IdeaVaultContext.Provider value={value}>{children}</IdeaVaultContext.Provider>;
}

export function useIdeaVault(): IdeaVaultContextValue {
  const value = useContext(IdeaVaultContext);
  if (!value) throw new Error('useIdeaVault must be used inside IdeaVaultProvider.');
  return value;
}
