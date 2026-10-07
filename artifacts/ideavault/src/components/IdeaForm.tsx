import { useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { categories, difficulties, statuses } from '../domain/constants';
import type { Idea, IdeaDraft } from '../domain/types';

type IdeaFormProps = {
  initial?: Idea;
  onSave: (draft: IdeaDraft) => void;
  onCancel?: () => void;
  submitLabel: string;
};

export function IdeaForm({ initial, onSave, onCancel, submitLabel }: IdeaFormProps) {
  const [title, setTitle] = useState(initial?.title || '');
  const [short, setShort] = useState(initial?.shortDescription || '');
  const [details, setDetails] = useState(initial?.detailedDescription || '');
  const [category, setCategory] = useState(initial?.category || categories[0]);
  const [tech, setTech] = useState(initial?.technologies.join(', ') || '');
  const [difficulty, setDifficulty] = useState(initial?.difficulty || 'Beginner');
  const [requiredMembers, setRequiredMembers] = useState(String(initial?.requiredTeamMembers ?? 2));
  const [currentMembers, setCurrentMembers] = useState(String(initial?.currentTeamMembers ?? 1));
  const [status, setStatus] = useState(initial?.status || statuses[0]);
  const [error, setError] = useState('');

  function submit(event: FormEvent) {
    event.preventDefault();
    const required = Number(requiredMembers);
    const current = Number(currentMembers);
    if (title.trim().length < 4) {
      setError('Give your idea a title of at least 4 characters.');
      return;
    }
    if (short.trim().length < 15) {
      setError('Add a little more context to the short description (15 characters minimum).');
      return;
    }
    if (details.trim().length < 25) {
      setError('Tell us more in the full description (25 characters minimum).');
      return;
    }
    if (!Number.isInteger(required) || required < 1 || required > 20) {
      setError('Required team members must be between 1 and 20.');
      return;
    }
    if (!Number.isInteger(current) || current < 0 || current > required) {
      setError('Current team members must be between 0 and the required team size.');
      return;
    }
    setError('');
    onSave({
      title: title.trim(),
      shortDescription: short.trim(),
      detailedDescription: details.trim(),
      category,
      technologies: tech.split(',').map((item) => item.trim()).filter(Boolean),
      difficulty,
      requiredTeamMembers: required,
      currentTeamMembers: current,
      status,
    });
  }

  return (
    <form onSubmit={submit} className="form-stack" data-testid="form-idea">
      <label className="form-label">Idea title<input className="field" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="A name people will remember" data-testid="input-idea-title" /></label>
      <label className="form-label">One-line introduction<textarea className="field" rows={2} value={short} onChange={(event) => setShort(event.target.value)} placeholder="What does it do, and who is it for?" data-testid="input-idea-summary" /></label>
      <label className="form-label">The bigger picture<textarea className="field" rows={5} value={details} onChange={(event) => setDetails(event.target.value)} placeholder="Describe the problem, your approach, and what you hope to make." data-testid="input-idea-details" /></label>
      <div className="form-grid">
        <label className="form-label">Category<select className="field" value={category} onChange={(event) => setCategory(event.target.value)} data-testid="select-category">{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="form-label">Difficulty<select className="field" value={difficulty} onChange={(event) => setDifficulty(event.target.value)} data-testid="select-difficulty">{difficulties.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>
      <label className="form-label">Technologies <span className="optional">· comma separated</span><input className="field" value={tech} onChange={(event) => setTech(event.target.value)} placeholder="e.g. React, Python, Figma" data-testid="input-technologies" /></label>
      <div className="form-grid">
        <label className="form-label">Required Team Members<input className="field" type="number" min="1" max="20" value={requiredMembers} onChange={(event) => setRequiredMembers(event.target.value)} data-testid="input-required-team-members" /></label>
        <label className="form-label">Current Team Members<input className="field" type="number" min="0" max={requiredMembers} value={currentMembers} onChange={(event) => setCurrentMembers(event.target.value)} data-testid="input-current-team-members" /></label>
      </div>
      <label className="form-label">Status<select className="field" value={status} onChange={(event) => setStatus(event.target.value)} data-testid="select-status">{statuses.map((item) => <option key={item}>{item}</option>)}</select></label>
      {error && <div className="form-error" role="alert" data-testid="status-idea-error">{error}</div>}
      <div className="form-actions">
        {onCancel && <button type="button" className="btn btn-quiet" onClick={onCancel} data-testid="button-cancel-idea">Cancel</button>}
        <button className="btn btn-primary" type="submit" data-testid="button-submit-idea">{submitLabel}<ArrowRight size={16} /></button>
      </div>
    </form>
  );
}
