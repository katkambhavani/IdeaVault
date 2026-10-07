import { useEffect, useState, type ReactNode } from 'react';
import { ArrowRight, Check, Lightbulb, LogOut, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import type { User } from '../domain/types';
import { getInitials } from '../domain/storage';

type AppShellProps = {
  user: User | null;
  onLogout: () => void;
  notice: string;
  onDismissNotice: () => void;
  children: ReactNode;
};

export function AppShell({ user, onLogout, notice, onDismissNotice, children }: AppShellProps) {
  const [path] = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  const loggedInLinks = [
    ['Dashboard', '/dashboard'],
    ['Explore', '/ideas'],
    ['Create', '/ideas/new'],
    ['My Ideas', '/my-ideas'],
    ['Saved', '/saved'],
    ['Profile', '/profile'],
  ];
  const loggedOutLinks = [['Home', '/'], ['Explore', '/ideas'], ['Login', '/login'], ['Register', '/register']];
  const navLinks = user ? loggedInLinks : loggedOutLinks;

  return (
    <div className="grain min-h-[100dvh]">
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="brand" data-testid="link-brand"><span className="brand-mark"><Lightbulb size={19} /></span><span>idea<span className="brand-vault">vault</span><sup className="brand-spark" /></span></Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navLinks.map(([label, url]) => <Link key={url} href={url} className={`nav-link ${path === url ? 'active' : ''}`} data-testid={`link-nav-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</Link>)}
          </nav>
          <div className="header-actions desktop-nav">
            {user
              ? <><span className="avatar" title={user.fullName}>{getInitials(user.fullName)}</span><button className="logout" onClick={onLogout} data-testid="button-logout"><LogOut size={15} /> Log out</button></>
              : <Link href="/register" className="btn btn-primary nav-join" data-testid="link-join">Join the vault <ArrowRight size={15} /></Link>}
          </div>
          <button className="mobile-toggle mobile-only" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">{open ? <X /> : <Menu />}</button>
        </div>
        {open && <nav className="mobile-menu">
          {navLinks.map(([label, url]) => <Link key={url} href={url} className={`nav-link ${path === url ? 'active' : ''}`} data-testid={`mobile-link-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</Link>)}
          {user && <button className="logout" onClick={onLogout} data-testid="button-mobile-logout"><LogOut size={15} /> Log out</button>}
        </nav>}
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div><Link href="/" className="brand footer-brand"><span className="brand-mark"><Lightbulb size={16} /></span><span>ideavault</span></Link><span className="footer-note">Good ideas grow better together.</span></div>
        <span className="mono footer-year">A student idea commons · 2025</span>
      </footer>
      {notice && <div className="toast-message" role="status" data-testid="status-notice"><Check size={17} />{notice}<button onClick={onDismissNotice} aria-label="Dismiss message"><X size={15} /></button></div>}
    </div>
  );
}
