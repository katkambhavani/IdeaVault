import { IdeaForm } from '../components/IdeaForm';
import { PageHead } from '../components/PageHead';
import type { IdeaDraft } from '../domain/types';

export default function CreateIdea({ onCreate }: { onCreate: (draft: IdeaDraft) => void }) {
  return (
    <div className="page-wrap narrow">
      <PageHead eyebrow="PUT IT OUT THERE" title="Start with an idea." description="It doesn’t have to be finished. It just has to be yours." />
      <div className="form-card"><IdeaForm onSave={onCreate} submitLabel="Share my idea" /></div>
    </div>
  );
}
