import { useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { Link } from 'wouter';
import { years } from '../domain/constants';
import { createId } from '../domain/storage';
import type { User } from '../domain/types';

type AuthPageProps = { mode: 'login' | 'register'; users: User[]; onSuccess: (user: User) => void };

export default function AuthPage({ mode, users, onSuccess }: AuthPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [college, setCollege] = useState('');
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');
  const isRegister = mode === 'register';

  function submit(event: FormEvent) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError('Enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password needs at least 6 characters.');
      return;
    }
    if (isRegister) {
      if (name.trim().length < 2 || !college.trim() || !course.trim() || !year) {
        setError('Fill in each field so people know who you are.');
        return;
      }
      if (users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
        setError('There’s already an account with that email. Try logging in instead.');
        return;
      }
      onSuccess({
        id: createId(),
        fullName: name.trim(),
        email: normalizedEmail,
        password,
        college: college.trim(),
        course: course.trim(),
        year,
        savedIdeaIds: [],
      });
      return;
    }
    const foundUser = users.find((user) => user.email.toLowerCase() === normalizedEmail && user.password === password);
    if (!foundUser) {
      setError('That email and password don’t match. Try again.');
      return;
    }
    onSuccess(foundUser);
  }

  return (
    <div className="auth-layout">
      <div className="auth-aside">
        <Link href="/" className="auth-back" data-testid="link-auth-home"><ArrowLeft size={15} /> Back to IdeaVault</Link>
        <div className="auth-aside-content">
          <div className="auth-symbol"><BookOpen size={30} /></div>
          <div className="eyebrow">YOUR IDEA, YOUR PEOPLE</div>
          <h2 className="display">Room to<br /><em>figure it out.</em></h2>
          <p>Projects don’t need to be perfect before you share them. They just need a place to begin.</p>
          <div className="auth-quote">“I have an idea…” is a pretty good first sentence.</div>
        </div>
        <span className="mono auth-aside-foot">IDEAVAULT · STUDENT PROJECT COMMONS</span>
      </div>
      <div className="auth-form-side">
        <form className="auth-form" onSubmit={submit} data-testid={`form-${mode}`}>
          <div className="eyebrow">{isRegister ? 'MAKE YOURSELF AT HOME' : 'WELCOME BACK'}</div>
          <h1 className="display auth-title">{isRegister ? 'Join the vault.' : 'Pick up where you left off.'}</h1>
          <p className="auth-sub">{isRegister ? 'A free, local demo account. Your project people are one good idea away.' : 'Your ideas and project people are right where you left them.'}</p>
          {isRegister && <label className="form-label">Full name<input className="field" value={name} onChange={(event) => setName(event.target.value)} placeholder="What should we call you?" data-testid="input-full-name" /></label>}
          <label className="form-label">College email<input className="field" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@college.edu" data-testid="input-email" /></label>
          <label className="form-label">Password<input className="field" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder={isRegister ? 'At least 6 characters' : 'Your password'} data-testid="input-password" /></label>
          {isRegister && <>
            <label className="form-label">College or university<input className="field" value={college} onChange={(event) => setCollege(event.target.value)} placeholder="Where you study" data-testid="input-college" /></label>
            <div className="form-grid">
              <label className="form-label">Course<input className="field" value={course} onChange={(event) => setCourse(event.target.value)} placeholder="e.g. Computer Science" data-testid="input-course" /></label>
              <label className="form-label">Year<select className="field" value={year} onChange={(event) => setYear(event.target.value)} data-testid="select-year"><option value="">Choose</option>{years.map((item) => <option key={item}>{item}</option>)}</select></label>
            </div>
            <div className="demo-auth-note"><Sparkles size={15} /><span>This is demo-only local sign-in. Your account stays in this browser.</span></div>
          </>}
          {error && <div className="form-error" role="alert" data-testid="status-auth-error">{error}</div>}
          <button className="btn btn-primary auth-submit" type="submit" data-testid={`button-${mode}`}>{isRegister ? 'Create my account' : 'Log in'}<ArrowRight size={16} /></button>
          <p className="auth-switch">{isRegister ? 'Already have an account?' : 'New around here?'} <Link href={isRegister ? '/login' : '/register'} data-testid="link-auth-switch">{isRegister ? 'Log in' : 'Create an account'}</Link></p>
        </form>
      </div>
    </div>
  );
}
