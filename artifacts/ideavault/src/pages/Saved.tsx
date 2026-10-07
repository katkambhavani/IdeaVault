import { PageHead } from '../components/PageHead';
import { IdeaGrid, SavedEmptyState } from '../components/IdeaGrid';
import type { Idea, User } from '../domain/types';

export default function Saved({ ideas, user, onSave }: { ideas: Idea[]; user: User; onSave: (id: string) => void }) {
  return (
    <div className="page-wrap">
      <PageHead eyebrow="KEEP CLOSE" title="On your radar." description="A little collection of ideas you want to come back to." />
      {ideas.length ? <IdeaGrid ideas={ideas} user={user} onSave={onSave} /> : <SavedEmptyState />}
    </div>
  );
}
