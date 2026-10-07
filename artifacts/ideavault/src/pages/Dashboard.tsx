import { ArrowRight, Bookmark, Compass, Lightbulb, Plus } from 'lucide-react';
import { Link } from 'wouter';
import type { Idea, User } from '../domain/types';
import { IdeaGrid } from '../components/IdeaGrid';

export default function Dashboard({ user, ideas, onSave }: { user: User; ideas: Idea[]; onSave: (id: string) => void }) {
  const myIdeas = ideas.filter((idea) => idea.creatorId === user.id);
  const savedIdeas = ideas.filter((idea) => user.savedIdeaIds.includes(idea.id));
  return (
    <div className="page-wrap dashboard">
      <section className="welcome-panel">
        <div>
          <div className="eyebrow">YOUR CORNER OF THE COMMON ROOM</div>
          <h1 className="display welcome-title">Good to have you,<br /><em>{user.fullName.split(' ')[0]}.</em></h1>
          <p>Your next collaborator could be one idea away.</p>
          <Link className="btn btn-coral" href="/ideas/new" data-testid="link-dashboard-create">Start something <Plus size={16} /></Link>
        </div>
        <div className="welcome-doodle"><div className="doodle-ring" /><Lightbulb size={75} strokeWidth={1} /><span className="doodle-note mono">KEEP<br />GOING</span></div>
      </section>
      <div className="stats-row">
        <Link href="/ideas" className="stat-card" data-testid="link-stat-total-ideas"><span className="mono stat-label">TOTAL IDEAS</span><strong>{ideas.length.toString().padStart(2, '0')}</strong><span>all ideas in the vault <ArrowRight size={14} /></span></Link>
        <Link href="/saved" className="stat-card stat-card-coral" data-testid="link-stat-saved"><span className="mono stat-label">SAVED IDEAS</span><strong>{savedIdeas.length.toString().padStart(2, '0')}</strong><span>ideas you’ve saved <ArrowRight size={14} /></span></Link>
        <Link href="/my-ideas" className="stat-card stat-card-plain" data-testid="link-stat-my-projects"><span className="mono stat-label">MY PROJECTS</span><strong>{myIdeas.length.toString().padStart(2, '0')}</strong><span>ideas you created <ArrowRight size={14} /></span></Link>
      </div>
      <section className="dashboard-quick-actions" aria-label="Quick actions">
        <span className="mono quick-label">QUICK ACTIONS</span>
        <div className="quick-action-links">
          <Link className="btn btn-primary" href="/ideas/new" data-testid="link-quick-create-idea"><Plus size={15} />Create Idea</Link>
          <Link className="btn btn-quiet" href="/ideas" data-testid="link-quick-explore-ideas"><Compass size={15} />Explore Ideas</Link>
          <Link className="btn btn-quiet" href="/saved" data-testid="link-quick-saved-ideas"><Bookmark size={15} />Saved Ideas</Link>
        </div>
      </section>
      <div className="section-heading dashboard-heading">
        <div><div className="eyebrow">FRESH FROM THE VAULT</div><h2 className="display section-title">Maybe your next thing.</h2></div>
        <Link className="text-link" href="/ideas" data-testid="link-dashboard-explore">See all <ArrowRight size={16} /></Link>
      </div>
      <IdeaGrid ideas={ideas.filter((idea) => !myIdeas.some((myIdea) => myIdea.id === idea.id)).slice(0, 3)} user={user} onSave={onSave} />
    </div>
  );
}
