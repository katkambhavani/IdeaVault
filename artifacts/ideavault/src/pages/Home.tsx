import { ArrowDownRight, ArrowRight, Compass, Lightbulb, Users } from 'lucide-react';
import { Link } from 'wouter';
import type { Idea, User } from '../domain/types';
import { IdeaGrid } from '../components/IdeaGrid';

export default function Home({ user, ideas, onSave }: { user: User | null; ideas: Idea[]; onSave: (id: string) => void }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy fade-up">
          <div className="eyebrow hero-eyebrow"><span className="eyebrow-dot" /> A little spark goes a long way</div>
          <h1 className="display hero-title">Turn Your Ideas{' '}<br />Into Projects.</h1>
          <p className="hero-sub">Save ideas. Find teammates. Build something meaningful.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href={user ? '/ideas/new' : '/register'} data-testid="link-hero-start">{user ? 'Share an idea' : 'Find your people'}<ArrowRight size={16} /></Link>
            <Link className="btn btn-quiet" href="/ideas" data-testid="link-hero-explore">Explore ideas<ArrowDownRight size={16} /></Link>
          </div>
          <div className="hero-proof"><span className="proof-mark"><Users size={16} /></span><span>Made for students who make things happen.</span></div>
        </div>
        <div className="hero-art" aria-label="Illustration of ideas growing">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
          <div className="art-sticker sticker-top">THINK<br />BIGGER <ArrowDownRight size={14} /></div>
          <div className="idea-sun"><Lightbulb size={58} strokeWidth={1.25} /></div>
          <div className="orbit-dot dot-a" /><div className="orbit-dot dot-b" /><div className="orbit-dot dot-c" />
          <div className="art-label label-a">your idea</div><div className="art-label label-b">their skills</div><div className="art-label label-c">the start of it</div>
          <div className="art-sticker sticker-bottom"><span className="mono">001 — 2025</span><br />Make it<br />together.</div>
        </div>
        <div className="hero-index mono">IDEAVAULT / OPEN CALL / 001</div>
      </section>
      <section className="manifesto">
        <div className="manifesto-kicker mono">THE THING ABOUT GOOD IDEAS</div>
        <p className="display manifesto-line">They get <span>better</span><br />when they get <span>shared.</span></p>
        <div className="manifesto-aside">A project board for curious students. Post what you’re dreaming up, find collaborators with different superpowers, and give your next semester a little more <i>what if?</i></div>
      </section>
      <section className="concept-strip" aria-label="What you can do with IdeaVault">
        <article className="concept"><span className="mono">01 / CAPTURE</span><h2 className="display">Capture Ideas</h2><p>Give a half-formed thought a title, a home, and a next step.</p></article>
        <article className="concept concept-focus"><span className="mono">02 / CONNECT</span><h2 className="display">Find Teammates</h2><p>See who is interested and meet students ready to bring new skills.</p></article>
        <article className="concept"><span className="mono">03 / MAKE</span><h2 className="display">Build Projects</h2><p>Turn a shared spark into something meaningful, together.</p></article>
      </section>
      <section className="home-explore">
        <div className="section-heading"><div><div className="eyebrow">A few open tabs</div><h2 className="display section-title">Ideas worth a second look.</h2></div><Link className="text-link" href="/ideas" data-testid="link-all-ideas">All ideas <ArrowRight size={16} /></Link></div>
        <IdeaGrid ideas={ideas.slice(0, 3)} user={user} onSave={onSave} />
      </section>
      <section className="how-section">
        <div className="how-lead"><div className="eyebrow">HOW IT WORKS</div><h2 className="display section-title">Start small.<br /><em>Start somewhere.</em></h2><p>That half-formed thought in your notes app? It belongs here too.</p><Link className="btn btn-coral" href={user ? '/ideas/new' : '/register'} data-testid="link-bottom-create">Put it out there <ArrowRight size={16} /></Link></div>
        <div className="steps">
          <div className="step"><span className="step-number mono">01</span><div><h3>Create an idea</h3><p>Give it a name, tell the story, and list the skills you’re looking for.</p></div><Lightbulb /></div>
          <div className="step"><span className="step-number mono">02</span><div><h3>Find interested students</h3><p>Browse what other students are making. Save a project or raise your hand.</p></div><Compass /></div>
          <div className="step"><span className="step-number mono">03</span><div><h3>Build together</h3><p>Start a conversation, find a teammate, and see where the work takes you.</p></div><ArrowRight /></div>
        </div>
      </section>
      <section className="last-call"><span className="last-call-star" aria-hidden="true" /><p className="display">The best part of the idea<br />is what happens <em>next.</em></p><Link className="btn btn-primary" href="/ideas" data-testid="link-final-explore">See what’s taking shape <ArrowRight size={16} /></Link></section>
    </>
  );
}
