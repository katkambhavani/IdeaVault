import { Bookmark, Compass, Lightbulb, Plus } from 'lucide-react';
import { Link } from 'wouter';
import type { Idea, User } from '../domain/types';
import { IdeaCard } from './IdeaCard';

export function IdeaGrid({ ideas, user, onSave }: { ideas: Idea[]; user: User | null; onSave: (id: string) => void }) {
  if (ideas.length) {
    return <div className="idea-grid">{ideas.map((idea) => <IdeaCard key={idea.id} idea={idea} user={user} onSave={onSave} />)}</div>;
  }
  return (
    <div className="empty-state">
      <div className="empty-icon"><Lightbulb /></div>
      <h3>No ideas here yet.</h3>
      <p>Be the first one to put something in motion.</p>
      <Link href="/ideas/new" className="btn btn-primary" data-testid="link-empty-create">Add an idea <Plus size={16} /></Link>
    </div>
  );
}

export function SavedEmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-icon"><Bookmark /></div>
      <h3>Nothing tucked away yet.</h3>
      <p>Save an idea that sparks something. It’ll be waiting here.</p>
      <Link href="/ideas" className="btn btn-primary" data-testid="link-saved-explore">Explore the vault <Compass size={16} /></Link>
    </div>
  );
}
