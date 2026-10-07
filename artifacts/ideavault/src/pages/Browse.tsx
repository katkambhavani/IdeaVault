import { useMemo, useState } from 'react';
import { ArrowRight, Plus, Search, Sparkles, X } from 'lucide-react';
import { Link } from 'wouter';
import { IdeaGrid } from '../components/IdeaGrid';
import { PageHead } from '../components/PageHead';
import { categories, difficulties, statuses } from '../domain/constants';
import type { Idea, User } from '../domain/types';

export default function Browse({ ideas, user, onSave }: { ideas: Idea[]; user: User | null; onSave: (id: string) => void }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All categories');
  const [difficulty, setDifficulty] = useState('All levels');
  const [status, setStatus] = useState('All statuses');
  const filtered = useMemo(() => ideas.filter((idea) =>
    `${idea.title} ${idea.shortDescription} ${idea.technologies.join(' ')}`.toLowerCase().includes(query.toLowerCase())
    && (category === 'All categories' || idea.category === category)
    && (difficulty === 'All levels' || idea.difficulty === difficulty)
    && (status === 'All statuses' || idea.status === status)), [ideas, query, category, difficulty, status]);

  function resetFilters() {
    setQuery('');
    setCategory('All categories');
    setDifficulty('All levels');
    setStatus('All statuses');
  }

  return (
    <div className="page-wrap">
      <PageHead eyebrow="THE COMMON ROOM" title="Explore ideas." description="Find something that makes you curious. Or someone who makes you think bigger." action={user ? <Link className="btn btn-primary" href="/ideas/new" data-testid="link-browse-create"><Plus size={16} /> Share an idea</Link> : null} />
      <div className="browse-bar">
        <label className="search-field"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search ideas, tools, topics…" data-testid="input-search-ideas" /></label>
        <select className="filter-select" value={category} onChange={(event) => setCategory(event.target.value)} data-testid="filter-category"><option>All categories</option>{categories.map((item) => <option key={item}>{item}</option>)}</select>
        <select className="filter-select" value={difficulty} onChange={(event) => setDifficulty(event.target.value)} data-testid="filter-difficulty"><option>All levels</option>{difficulties.map((item) => <option key={item}>{item}</option>)}</select>
        <select className="filter-select" value={status} onChange={(event) => setStatus(event.target.value)} data-testid="filter-status"><option>All statuses</option>{statuses.map((item) => <option key={item}>{item}</option>)}</select>
      </div>
      <div className="results-row"><span className="mono">{filtered.length} {filtered.length === 1 ? 'IDEA' : 'IDEAS'} IN THE ROOM</span><span className="demo-legend"><Sparkles size={13} /> Demo ideas are examples, not real people.</span></div>
      <IdeaGrid ideas={filtered} user={user} onSave={onSave} />
      {filtered.length === 0 && <button className="text-link reset-link" onClick={resetFilters} data-testid="button-reset-filters">Clear filters <X size={14} /></button>}
    </div>
  );
}
