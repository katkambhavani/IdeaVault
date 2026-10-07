import { useState } from 'react';
import { ArrowRight, Lightbulb, Plus } from 'lucide-react';
import { Link } from 'wouter';
import { IdeaForm } from '../components/IdeaForm';
import { PageHead } from '../components/PageHead';
import type { Idea, IdeaDraft } from '../domain/types';

type MyIdeasProps = {
  ideas: Idea[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, draft: IdeaDraft) => void;
};

export default function MyIdeas({ ideas, onDelete, onUpdate }: MyIdeasProps) {
  const [editing, setEditing] = useState<string | null>(null);
  return (
    <div className="page-wrap">
      <PageHead eyebrow="YOUR WORKBENCH" title="My ideas." description="The things you’re putting into the world." action={<Link href="/ideas/new" className="btn btn-primary" data-testid="link-myideas-create"><Plus size={16} /> New idea</Link>} />
      {ideas.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon"><Lightbulb /></div>
          <h3>A blank page has potential.</h3>
          <p>Start with the thing you keep coming back to.</p>
          <Link href="/ideas/new" className="btn btn-primary" data-testid="link-myideas-empty">Share your first idea <ArrowRight size={16} /></Link>
        </div>
      ) : (
        <div className="manage-list">
          {ideas.map((idea) => (
            <article key={idea.id} className="manage-item card" data-testid={`row-my-idea-${idea.id}`}>
              {editing === idea.id ? (
                <div className="edit-area"><IdeaForm initial={idea} onSave={(draft) => { onUpdate(idea.id, draft); setEditing(null); }} onCancel={() => setEditing(null)} submitLabel="Save changes" /></div>
              ) : <>
                <div className="manage-main">
                  <span className="tag">{idea.category}</span>
                  <h2 className="display manage-title">{idea.title}</h2>
                  <p>{idea.shortDescription}</p>
                  <div className="manage-meta"><span className="tag">{idea.status}</span><span className="mono">{idea.interestedUserIds.length} INTERESTED</span></div>
                </div>
                <div className="manage-actions">
                  <button className="btn btn-quiet" onClick={() => setEditing(idea.id)} data-testid={`button-edit-${idea.id}`}>Edit</button>
                  <button className="btn btn-delete" onClick={() => onDelete(idea.id)} data-testid={`button-delete-${idea.id}`}>Delete</button>
                  <Link className="text-link" href={`/ideas/${idea.id}`} data-testid={`link-manage-view-${idea.id}`}>View <ArrowRight size={14} /></Link>
                </div>
              </>}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
