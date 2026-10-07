import { ArrowRight, Bookmark, Sparkles, Users } from 'lucide-react';
import { Link } from 'wouter';
import type { Idea, User } from '../domain/types';

export function IdeaCard({ idea, user, onSave }: { idea: Idea; user: User | null; onSave: (id: string) => void }) {
  const saved = !!user?.savedIdeaIds.includes(idea.id);
  return (
    <article className="card idea-card idea-item" data-testid={`card-idea-${idea.id}`}>
      <div className="idea-topline">
        <span className="tag">{idea.category}</span>
        <button className={`save-btn ${saved ? 'saved' : ''}`} onClick={() => onSave(idea.id)} title={user ? (saved ? 'Remove from saved' : 'Save idea') : 'Log in to save'} data-testid={`button-save-${idea.id}`}>
          <Bookmark size={17} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <Link href={`/ideas/${idea.id}`} className="idea-title-link" data-testid={`link-idea-${idea.id}`}><h3 className="display idea-title">{idea.title}</h3></Link>
      <p className="idea-summary">{idea.shortDescription}</p>
      <div className="tech-list">{idea.technologies.slice(0, 3).map((tag) => <span className="tech-chip" key={tag}>{tag}</span>)}</div>
      <div className="idea-card-bottom">
        <span className="difficulty"><span className={`difficulty-dot ${idea.difficulty.toLowerCase()}`} />{idea.difficulty}</span>
        <span className="team-count"><Users size={14} />{idea.currentTeamMembers}/{idea.requiredTeamMembers}</span>
        <Link href={`/ideas/${idea.id}`} className="card-arrow" aria-label={`View ${idea.title}`} data-testid={`link-view-${idea.id}`}><ArrowRight size={17} /></Link>
      </div>
      {idea.isDemo && <div className="demo-caption"><Sparkles size={12} /> DEMO IDEA · EXAMPLE ONLY</div>}
    </article>
  );
}
