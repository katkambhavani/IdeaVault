import { type ReactNode } from 'react';
import { Redirect, Route, Router as WouterRouter, Switch, useLocation } from 'wouter';
import { AppShell } from './components/AppShell';
import { ErrorBoundary } from './components/error-boundary';
import { IdeaVaultProvider, useIdeaVault } from './context/IdeaVaultProvider';
import type { Idea } from './domain/types';
import AuthPage from './pages/AuthPage';
import Browse from './pages/Browse';
import CreateIdea from './pages/CreateIdea';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import IdeaDetail from './pages/IdeaDetail';
import MyIdeas from './pages/MyIdeas';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Saved from './pages/Saved';

function RouteTable() {
  const [location, setLocation] = useLocation();
  const {
    ideas,
    users,
    user,
    notice,
    setNotice,
    register,
    login,
    logout,
    saveIdea: persistSave,
    createIdea,
    updateIdea,
    deleteIdea,
    toggleInterest: persistInterest,
    updateProfile,
  } = useIdeaVault();

  const saveIdea = (id: string) => {
    if (!user) {
      setNotice('Create a free account to save ideas.');
      setLocation('/login');
      return;
    }
    persistSave(id);
  };
  const toggleInterest = (idea: Idea) => {
    if (idea.isDemo) {
      persistInterest(idea);
      return;
    }
    if (!user) {
      setLocation('/login');
      return;
    }
    persistInterest(idea);
  };
  const requireMember = (page: ReactNode) => user ? page : <Redirect to={`/login?next=${encodeURIComponent(location)}`} />;
  const handleLogout = () => {
    logout();
    setNotice('You have been logged out.');
    setLocation('/');
  };

  return (
    <AppShell user={user} onLogout={handleLogout} notice={notice} onDismissNotice={() => setNotice('')}>
      <RoutedErrorBoundary>
      <Switch>
        <Route path="/"><Home user={user} ideas={ideas} onSave={saveIdea} /></Route>
        <Route path="/register"><AuthPage mode="register" users={users} onSuccess={(nextUser) => { register(nextUser); setNotice(`Welcome to the vault, ${nextUser.fullName.split(' ')[0]}.`); setLocation('/dashboard'); }} /></Route>
        <Route path="/login"><AuthPage mode="login" users={users} onSuccess={(nextUser) => { login(nextUser); setNotice(`Good to have you back, ${nextUser.fullName.split(' ')[0]}.`); setLocation('/dashboard'); }} /></Route>
        <Route path="/dashboard">{requireMember(<Dashboard user={user!} ideas={ideas} onSave={saveIdea} />)}</Route>
        <Route path="/ideas"><Browse ideas={ideas} user={user} onSave={saveIdea} /></Route>
        <Route path="/ideas/new">{requireMember(<CreateIdea onCreate={(draft) => { createIdea(draft); setLocation('/my-ideas'); }} />)}</Route>
        <Route path="/ideas/:id">{(params) => <IdeaDetail idea={ideas.find((idea) => idea.id === params.id)} user={user} allUsers={users} onSave={saveIdea} onInterest={toggleInterest} />}</Route>
        <Route path="/my-ideas">{requireMember(<MyIdeas ideas={ideas.filter((idea) => idea.creatorId === user?.id)} onDelete={deleteIdea} onUpdate={(id, draft) => { updateIdea(id, draft); setLocation('/my-ideas'); }} />)}</Route>
        <Route path="/saved">{requireMember(<Saved ideas={ideas.filter((idea) => user?.savedIdeaIds.includes(idea.id))} user={user!} onSave={saveIdea} />)}</Route>
        <Route path="/profile">{requireMember(<Profile user={user!} onSave={updateProfile} />)}</Route>
        <Route><NotFound /></Route>
      </Switch>
      </RoutedErrorBoundary>
    </AppShell>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <IdeaVaultProvider>
        <RouteTable />
      </IdeaVaultProvider>
    </WouterRouter>
  );
}

export default App;
