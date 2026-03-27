import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '72px', background: 'var(--white)' }}>
        <div className="container article-layout">

          {/* Article Body */}
          <article className="article">
            <div className="article__breadcrumb">
              <Link href="/">Home</Link><span>/</span>
              <Link href="/blog">Blog</Link><span>/</span>
              <span className="bc-active">Article</span>
            </div>

            <div className="article__meta">
              <span className="article__cat">INDUSTRY TRENDS</span>
              <span className="article__date">October 24, 2023</span>
              <span className="article__read">8 min read</span>
            </div>

            <h1 className="article__title">
              The Role of Technology in Improving Safety and Efficiency in the Oil and Gas Industry
            </h1>

            <div className="article__author-bar">
              <div className="author-avatar">A</div>
              <div>
                <span className="author-name">Asaba Oghenegoma Godspower</span>
                <span className="author-role">Senior Engineer, Rewaj Corporate Limited</span>
              </div>
            </div>

            <div className="article__hero-img">
              <img src="/images/blog-featured.jpg" alt="Oil refinery at sunset" />
            </div>

            <div className="article__content">
              <p>The oil and gas industry has always been crucial for powering industries, transportation, and economic growth. In the early years of the industry, especially between the 1900s and 1970s, operations relied heavily on manual labor and basic mechanical equipment. Major companies such as Standard Oil, Royal Dutch Shell, and BP operated with limited monitoring technology compared to today.</p>
              <p>During this period, engineers had to physically inspect pipelines, pumps, and processing equipment to detect leaks or mechanical faults. Technicians manually read pressure gauges and temperature meters during routine inspections. These inspections were not continuous, so problems were sometimes discovered late, which could lead to accidents or equipment failure.</p>
              <h2>The Digital Transformation</h2>
              <p>Today, the industry has changed significantly. Modern oil and gas facilities use digital monitoring systems, smart sensors, and automated control technologies that continuously measure pressure, temperature, vibration, and flow rates in real time. Engineers can monitor these systems from centralized control rooms and receive immediate alerts if abnormal conditions occur.</p>
              <p>Drilling technology has also advanced through directional and horizontal drilling, allowing operators to precisely reach reservoirs that were once difficult to access. Companies now use advanced drilling and data technologies to increase production while reducing environmental impact.</p>
              <h2>Predictive Maintenance</h2>
              <p>Maintenance practices have also improved. Instead of waiting for equipment to fail, modern facilities use predictive maintenance systems that analyze equipment data to detect potential problems before they occur. This reduces downtime, improves safety, and saves operational costs.</p>
              <p>In summary, the oil and gas industry has significantly transformed from traditional manual methods to advanced technology-driven operations. Modern technologies have made operations safer, more efficient, and more environmentally responsible.</p>
            </div>

            <div className="article__tags">
              {['Technology', 'Safety', 'Oil & Gas', 'Innovation', 'HSE'].map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>

            <div className="article__share">
              <span>Share:</span>
              <a href="#" className="share-btn">LinkedIn</a>
              <a href="#" className="share-btn">Twitter</a>
              <a href="#" className="share-btn">Copy Link</a>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="article-sidebar">
            <div className="sidebar-widget">
              <h3 className="sidebar-title"><span className="sidebar-title__bar" />Recent Posts</h3>
              {[
                { title:'Why Instrumentation Fittings Are Critical in Oil...', date:'OCT 12, 2023', slug:'why-instrumentation-fittings-critical' },
                { title:'Training the Next Generation of Nigerian Welders', date:'OCT 05, 2023', slug:'training-nigerian-welders' },
                { title:'RCL Receives Best Safety Record Award 2023', date:'SEP 28, 2023', slug:'rcl-best-safety-record-2023' },
              ].map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="recent-item">
                  <div className="recent-img" />
                  <div>
                    <span className="recent-title">{p.title}</span>
                    <span className="recent-date">{p.date}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="sidebar-widget">
              <h3 className="sidebar-title"><span className="sidebar-title__bar" />Categories</h3>
              {[['Engineering',12],['Safety & HSE',8],['Procurement',5],['Industry News',14],['Company Updates',3]].map(([name, count]) => (
                <div key={name} className="cat-row">
                  <span>{name}</span>
                  <span className="cat-count">{String(count).padStart(2,'0')}</span>
                </div>
              ))}
            </div>

            <div className="sidebar-widget sidebar-cta">
              <h3>Ready to work with us?</h3>
              <p>Get in touch with our team to discuss your next project.</p>
              <Link href="/contact" className="sidebar-cta-btn">Contact Us →</Link>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
