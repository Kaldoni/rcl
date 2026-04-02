'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const categories = [
  { name:'Engineering', count:12 },{ name:'Safety & HSE', count:8 },
  { name:'Procurement', count:5 },{ name:'Industry News', count:14 },{ name:'Company Updates', count:3 },
];
const recentPosts = [
  { title:'Why Instrumentation Fittings Are Critical in Oil...', date:'OCT 12, 2023', slug:'why-instrumentation-fittings-critical' },
  { title:'Training the Next Generation of Nigerian Welders', date:'OCT 05, 2023', slug:'training-nigerian-welders' },
  { title:'RCL Receives Best Safety Record Award 2023', date:'SEP 28, 2023', slug:'rcl-best-safety-record-2023' },
];
import { articles } from '@/data/blog';

export default function BlogPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [page, setPage] = useState(1);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop:'72px', background:'var(--white)' }}>
        <section className="blog-header">
          <div className="container">
            <h1 className="blog-title">Industry Insights</h1>
            <p className="blog-sub">Expert analysis and updates on the Nigerian energy sector, engineering innovations, and global oil and gas trends.</p>
          </div>
        </section>
        <section className="blog-content">
          <div className="container blog-layout">
            <div>
              {articles.map(article => (
                <article key={article.slug} className="article-card">
                  <div className="article-card__image"><img src={article.image} alt={article.title} /></div>
                  <div className="article-card__body">
                    <div className="article-meta">
                      <span className="article-category">{article.category}</span>
                      <span className="article-date">{article.date}</span>
                    </div>
                    <h2 className="article-title">{article.title}</h2>
                    <p className="article-excerpt">{article.excerpt}</p>
                    <div className="article-footer">
                      <div className="article-author">
                        <div className="author-avatar">{article.author[0]}</div>
                        <span>{article.author}</span>
                      </div>
                      <Link href={`/blog/${article.slug}`} className="read-more">Read Full Article →</Link>
                    </div>
                  </div>
                </article>
              ))}
              <div className="pagination">
                <button className="page-btn" disabled={page===1} onClick={()=>setPage(p=>p-1)}>‹</button>
                {[1,2,3].map(p=><button key={p} className={`page-btn${page===p?' active':''}`} onClick={()=>setPage(p)}>{p}</button>)}
                <button className="page-btn" onClick={()=>setPage(p=>p+1)}>›</button>
              </div>
            </div>
            <aside className="blog-sidebar">
              <div className="sidebar-widget">
                <h3 className="sidebar-title">Search Articles</h3>
                <div className="search-box"><input type="search" placeholder="Search insights..." /></div>
              </div>
              <div className="sidebar-widget">
                <h3 className="sidebar-title"><span className="sidebar-title__bar"/>Recent Posts</h3>
                <div className="recent-posts">
                  {articles.slice(0, 3).map(post=>(
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="recent-post">
                      <div className="recent-post__img">
                        <img src={post.image} alt={post.title} />
                      </div>
                      <div>
                        <span className="recent-post__title">{post.title}</span>
                        <span className="recent-post__date">{post.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="sidebar-widget">
                <h3 className="sidebar-title"><span className="sidebar-title__bar"/>Categories</h3>
                <div className="categories">
                  {categories.map(cat=>(
                    <div key={cat.name} className="category-row">
                      <span className="category-name">{cat.name}</span>
                      <span className="category-count">{String(cat.count).padStart(2,'0')}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="sidebar-widget sidebar-widget--red">
                <h3 className="newsletter-title">Stay Updated</h3>
                <p className="newsletter-sub">Receive the latest industry insights and company news directly in your inbox.</p>
                {subscribed ? <p style={{color:'#fff',fontSize:'14px',textAlign:'center',padding:'8px 0'}}>✅ You&apos;re subscribed!</p> : (
                  <>
                    <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email Address" className="newsletter-input"/>
                    <button className="newsletter-btn" onClick={()=>email&&setSubscribed(true)}>SUBSCRIBE</button>
                  </>
                )}
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
