import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { articles } from '@/data/blog';
import { notFound } from 'next/navigation';

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find(a => a.slug === params.slug);

  if (!article) return notFound();

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
              <span className="article__cat">{article.category}</span>
              <span className="article__date">{article.date}</span>
              <span className="article__read">8 min read</span>
            </div>

            <h1 className="article__title">
              {article.title}
            </h1>

            <div className="article__author-bar">
              <div className="author-avatar">{article.author[0]}</div>
              <div>
                <span className="author-name">{article.author}</span>
                <span className="author-role">{article.authorRole || 'Senior Engineer, Rewaj Corporate Limited'}</span>
              </div>
            </div>

            <div className="article__hero-img">
              <img src={article.image} alt={article.title} />
            </div>

            <div className="article__content" dangerouslySetInnerHTML={{ __html: article.content || '' }} />

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
              {articles.slice(0, 3).map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="recent-item">
                  <div className="recent-img" style={{ background: `url(${p.image}) center/cover` }} />
                  <div>
                    <span className="recent-title">{p.title}</span>
                    <span className="recent-date">{p.date}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="sidebar-widget">
              <h3 className="sidebar-title"><span className="sidebar-title__bar" />Categories</h3>
              {[['Engineering', 12], ['Safety & HSE', 8], ['Procurement', 5], ['Industry News', 14], ['Company Updates', 3]].map(([name, count]) => (
                <div key={name as string} className="cat-row">
                  <span>{name as string}</span>
                  <span className="cat-count">{String(count).padStart(2, '0')}</span>
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
