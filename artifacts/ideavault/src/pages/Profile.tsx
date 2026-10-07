import { useState, type FormEvent } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { PageHead } from '../components/PageHead';
import { years } from '../domain/constants';
import { getInitials } from '../domain/storage';
import type { User } from '../domain/types';

export default function Profile({ user, onSave }: { user: User; onSave: (user: User) => void }) {
  const [name, setName] = useState(user.fullName);
  const [college, setCollege] = useState(user.college);
  const [course, setCourse] = useState(user.course);
  const [year, setYear] = useState(user.year);
  const [message, setMessage] = useState('');

  function submit(event: FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2 || !college.trim() || !course.trim() || !year) {
      setMessage('Please fill out each field before saving.');
      return;
    }
    onSave({ ...user, fullName: name.trim(), college: college.trim(), course: course.trim(), year });
    setMessage('Profile saved.');
  }

  return (
    <div className="page-wrap narrow">
      <PageHead eyebrow="THE PERSON BEHIND THE IDEAS" title="Your profile." description="A little context helps collaborators know who they might build with." />
      <div className="profile-identity"><span className="profile-avatar">{getInitials(user.fullName)}</span><div><strong>{user.fullName}</strong><span>{user.email}</span></div></div>
      <form className="form-card form-stack" onSubmit={submit} data-testid="form-profile">
        <label className="form-label">Full name<input className="field" value={name} onChange={(event) => setName(event.target.value)} data-testid="input-profile-name" /></label>
        <label className="form-label">Email<input className="field" value={user.email} disabled data-testid="input-profile-email" /></label>
        <label className="form-label">College or university<input className="field" value={college} onChange={(event) => setCollege(event.target.value)} data-testid="input-profile-college" /></label>
        <div className="form-grid">
          <label className="form-label">Course<input className="field" value={course} onChange={(event) => setCourse(event.target.value)} data-testid="input-profile-course" /></label>
          <label className="form-label">Year<select className="field" value={year} onChange={(event) => setYear(event.target.value)} data-testid="select-profile-year">{years.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>
        {message && <div className="form-success" role="status" data-testid="status-profile">{message}</div>}
        <button className="btn btn-primary profile-save" type="submit" data-testid="button-save-profile">Save profile <Check size={16} /></button>
      </form>
      <p className="local-note"><Sparkles size={14} /> Demo account details are stored locally in this browser.</p>
    </div>
  );
}
