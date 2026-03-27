import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <div className="footer__logo">
            <img src="/logo.png" alt="Rewaj Corporate Limited" className="logo-icon" />
            <div className="logo-text">
              <span className="logo-white">REWAJ </span>
              <span className="logo-red">CORPORATE LIMITED</span>
            </div>
          </div>
          <p className="footer__desc">
            Leading provider of engineering, procurement and industrial services, specializing in
            electrical, instrumentation and mechanical solutions for the Nigerian Oil and Gas Industry.
          </p>
          <div className="footer__socials">
            <a href="https://facebook.com" aria-label="Facebook" className="social-btn">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" aria-label="Website" className="social-btn">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </a>
            <a href="mailto:info@rewajcorporate.com" aria-label="Email" className="social-btn">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </a>
          </div>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Quick Links</h4>
          <ul>
            {[
              { label: 'Our Services', href: '/services' },
              { label: 'Blog', href: '/blog' },
              { label: 'Project Gallery', href: '/projects' },
              { label: 'Careers', href: '/careers' },
            ].map(l => <li key={l.href}><Link href={l.href} className="footer__link">{l.label}</Link></li>)}
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Contact Us</h4>
          <div className="contact-item">
            <MapPin size={16} className="contact-icon" />
            <span>No. 7 Ezimgbu Cresent, Presidential estate, Phase IV, New GRA, Port-Harcourt, Nigeria</span>
          </div>
          <div className="contact-item">
            <Phone size={16} className="contact-icon" />
            <a href="tel:+2347037830548" className="footer__link">+234 703 783 0548</a>
          </div>
          <div className="contact-item">
            <Mail size={16} className="contact-icon" />
            <a href="mailto:info@rewajcorporate.com" className="footer__link">info@rewajcorporate.com</a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} Rewaj Corporate Limited. All rights reserved. Professionalism in Engineering.</p>
        </div>
      </div>
    </footer>
  );
}
