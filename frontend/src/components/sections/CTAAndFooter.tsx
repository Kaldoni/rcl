import Link from 'next/link';
export function CTABanner() {
  return (
    <section className="cta-banner">
      <div className="cta-banner__bg" />
      <div className="container cta-banner__inner">
        <h2 className="cta-banner__title">Ready to Engineer the Future?</h2>
        <p className="cta-banner__sub">Partner with a team that places precision, safety, and local expertise at the core of every energy project.</p>
        <Link href="/contact" className="btn-red">Get a Quote</Link>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <div className="footer__logo">
            <img src="/logo.png" alt="Rewaj Corporate Limited logo" className="logo-icon" />
            <div className="logo-text"><span className="logo-white">Rewaj </span><span className="logo-red">Corporate Limited</span></div>
          </div>
          <p className="footer__desc">Leading provider of engineering, procurement and industrial services, specializing in electrical, instrumentation and mechanical solutions for the Nigerian Oil and Gas Industry.</p>
          <div className="footer__socials">
            <a href="#" className="social-btn" aria-label="Facebook">f</a>
            <a href="#" className="social-btn" aria-label="Website">w</a>
            <a href="mailto:info@rewajcorporate.com" className="social-btn" aria-label="Email">@</a>
          </div>
        </div>
        <div className="footer__col">
          <h4 className="footer__col-title">Quick Links</h4>
          <ul>
            {[['Our Services','/services'],['Blog','/blog'],['Project Gallery','/projects'],['Careers','/careers']].map(([l,h])=>(
              <li key={h}><Link href={h} className="footer__link">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div className="footer__col">
          <h4 className="footer__col-title">Contact Us</h4>
          <div className="contact-item"><span className="contact-icon">📍</span><span>No. 7 Ezimgbu Cresent, Presidential estate, Phase IV, New GRA, Port-Harcourt, Nigeria</span></div>
          <div className="contact-item"><span className="contact-icon">📞</span><a href="tel:+2347037830548" className="footer__link">+234 703 783 0548</a></div>
          <div className="contact-item"><span className="contact-icon">✉️</span><a href="mailto:info@rewajcorporate.com" className="footer__link">info@rewajcorporate.com</a></div>
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
