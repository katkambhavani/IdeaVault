import { ArrowLeft, ArrowRight, Bookmark, Check, Sparkles, Users } from 'lucide-react';
import { Link } from 'wouter';
import type { Idea, User } from '../domain/types';
import { getInitials } from '../domain/storage';
import NotFound from './NotFound';

type IdeaDetailProps = {
  idea?: Idea;
  user: User | null;
  allUsers: User[];
  onSave: (id: string) => void;
  onInterest: (idea: Idea) => void;
};

export default function IdeaDetail({ idea, user, allUsers, onSave, onInterest }: IdeaDetailProps) {
  if (!idea) return <NotFound />;
  const isOwner = user?.id === idea.creatorId;
  const interested = !!user && idea.interestedUserIds.includes(user.id);
  const interestedUsers = idea.interestedUserIds.map((id) => allUsers.find((item) => item.id === id)).filter((item): item is User => !!item);
  return (
    <div className="page-wrap detail-wrap">
      <Link href="/ideas" className="back-link" data-testid="link-back-ideas"><ArrowLeft size={15} /> Back to all ideas</Link>
      <div className="detail-layout">
        <article className="detail-main">
          <div className="detail-tags"><span className="tag">{idea.category}</span><span className="tag">{idea.status}</span>{idea.isDemo && <span className="demo-pill"><Sparkles size={12} /> DEMO IDEA</span>}</div>
          <h1 className="display detail-title">{idea.title}</h1>
          <p className="detail-deck">{idea.shortDescription}</p>
          <div className="creator-line"><span className="mini-avatar">{getInitials(idea.creatorName)}</span><span>Shared by <strong>{idea.creatorName}</strong></span><span className="mono date-label">{new Date(idea.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span></div>
          <div className="detail-rule" />
          <div className="eyebrow">THE IDEA</div>
          <p className="detail-copy">{idea.detailedDescription}</p>
          <div className="detail-section"><div className="eyebrow">TOOLS IN THE MIX</div><div className="tech-list detail-tech">{idea.technologies.length ? idea.technologies.map((item) => <span className="tech-chip" key={item}>{item}</span>) : <span className="muted-copy">No technologies listed yet.</span>}</div></div>
          <div className="detail-section"><div className="eyebrow">A FEW DETAILS</div><div className="detail-facts"><div><span className="mono">DIFFICULTY</span><strong>{idea.difficulty}</strong></div><div><span className="mono">TEAM SIZE</span><strong>{idea.currentTeamMembers} / {idea.requiredTeamMembers} people</strong></div><div><span className="mono">STATUS</span><strong>{idea.status}</strong></div></div></div>
          {isOwner && <section className="interested-box">
            <div className="eyebrow">YOUR INTERESTED TEAMMATES</div>
            <h2 className="display interested-title">{interestedUsers.length ? `${interestedUsers.length} student${interestedUsers.length === 1 ? '' : 's'} raised a hand.` : 'Waiting for a first hello.'}</h2>
            {interestedUsers.length
              ? <div className="interested-list">{interestedUsers.map((person) => <div className="interested-person" key={person.id} data-testid={`person-interested-${person.id}`}><span className="mini-avatar">{getInitials(person.fullName)}</span><div><strong>{person.fullName}</strong><span>{person.course} · {person.year} · {person.college}</span></div><a className="text-link" href={`mailto:${person.email}`} data-testid={`link-contact-${person.id}`}>Contact <ArrowRight size={14} /></a></div>)}</div>
              : <p className="muted-copy">When students show interest, their name, course, year, and college will appear here.</p>}
          </section>}
        </article>
        <aside className="detail-aside">
          <div className="aside-sticky">
            <div className="team-card">
              <div className="team-card-top"><Users size={19} /><span className="mono">THE TEAM</span></div>
              <div className="team-big">{idea.currentTeamMembers}<small> / {idea.requiredTeamMembers}</small></div>
              <p>{idea.requiredTeamMembers - idea.currentTeamMembers > 0 ? `${idea.requiredTeamMembers - idea.currentTeamMembers} spot${idea.requiredTeamMembers - idea.currentTeamMembers === 1 ? '' : 's'} to fill.` : 'Team is full.'}</p>
              <div className="team-track"><span style={{ width: `${Math.min(100, idea.currentTeamMembers / idea.requiredTeamMembers * 100)}%` }} /></div>
              {!isOwner && <>
                <button className={`btn ${interested ? 'btn-quiet' : 'btn-primary'} full-btn`} onClick={() => onInterest(idea)} disabled={idea.currentTeamMembers >= idea.requiredTeamMembers && !interested} data-testid="button-interest">{interested ? <><Check size={16} /> Interested · withdraw</> : <>I’m interested <ArrowRight size={16} /></>}</button>
                <button className="btn btn-quiet full-btn save-detail" onClick={() => onSave(idea.id)} data-testid="button-detail-save"><Bookmark size={16} fill={user?.savedIdeaIds.includes(idea.id) ? 'currentColor' : 'none'} />{user?.savedIdeaIds.includes(idea.id) ? 'Saved for later' : 'Save for later'}</button>
                {!user && <p className="signin-hint">Log in to save ideas or signal interest.</p>}
              </>}
            </div>
            <div className="creator-card">
              <div className="eyebrow">THE PERSON WITH THE PLAN</div>
              <div className="creator-card-person"><span className="profile-avatar small">{getInitials(idea.creatorName)}</span><div><strong>{idea.creatorName}</strong><span>{idea.isDemo ? 'Illustrative demo idea' : 'Idea creator'}</span></div></div>
              {idea.isDemo ? <p className="demo-caption"><Sparkles size={12} /> Demo idea · not a real person.</p> : <>{isOwner ? <span className="owner-note">This is your idea.</span> : <a className="btn btn-quiet full-btn" href={`mailto:${allUsers.find((person) => person.id === idea.creatorId)?.email || ''}`} data-testid="link-contact-creator">Contact creator <ArrowRight size={15} /></a>}</>}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
