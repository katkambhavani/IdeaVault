import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

export default function NotFound() {
  return <div className="page-wrap not-found"><span className="mono">404 / THAT ONE GOT AWAY</span><h1 className="display">Not in the vault.</h1><p>This page doesn’t seem to exist anymore.</p><Link href="/ideas" className="btn btn-primary" data-testid="link-notfound-explore">Back to exploring <ArrowRight size={16} /></Link></div>;
}
