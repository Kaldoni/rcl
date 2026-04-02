'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const categories = ['All Projects', 'Power Systems', 'Automation', 'Fire Suppression', 'Technical Services', 'Operations & Maintenance'];

const projects = [
  { id: 1, slug: 'power-system-maintenance', category: 'Power Systems', tag: 'MAINTENANCE', title: 'Power System Maintenance', desc: 'Comprehensive overhaul and routine maintenance of HV/LV power distribution units for an offshore production platform, ensuring zero-downtime operations.', year: '2023', image: '/images/project-power.jpg' },
  { id: 2, slug: 'fire-suppression-upgrades', category: 'Fire Suppression', tag: 'FIRE SAFETY', title: 'Fire Suppression Upgrades', desc: 'Installation and commissioning of advanced FM-200 and CO2 suppression systems across multiple remote terminal units (RTUs) for a major IOC.', year: '2023', image: '/images/project-fire.jpg' },
  { id: 3, slug: 'automation-systems', category: 'Automation', tag: 'AUTOMATION', title: 'Automation Systems', desc: 'Deployment of PLC-based integrated control systems for pipeline pressure monitoring and emergency shutdown (ESD) synchronization.', year: '2022', image: '/images/project-automation.jpg' },
  { id: 4, slug: 'smart-instrumentation-grid', category: 'Technical Services', tag: 'INSTRUMENTATION', title: 'Smart Instrumentation Grid', desc: 'Design and installation of high-precision flowmeters and telemetry systems for real-time crude oil transfer monitoring.', year: '2022', image: '/images/project-instrumentation.jpg' },
  { id: 5, slug: 'gas-processing-plant-retrofit', category: 'Technical Services', tag: 'ENGINEERING', title: 'Gas Processing Plant Retrofit', desc: 'Full-scale electrical and mechanical retrofit of an aging natural gas processing facility to meet modern environmental standards.', year: '2021', image: '/images/project-gas.jpg' },
  { id: 6, slug: 'risk-assessment-audits', category: 'Technical Services', tag: 'CONSULTING', title: 'Risk Assessment Audits', desc: 'Delivering comprehensive HAZOP and SIL studies for multi-billion dollar brownfield expansion projects across the Niger Delta.', year: '2021', image: '/images/project-risk.jpg' },
];
const clients = [
  { name: 'Total Energies', logo: '/images/clients/total-energies.png' },
  { name: 'Shell', logo: '/images/clients/shell.png' },
  { name: 'Renaissance Africa Energy', logo: '/images/clients/renaissance.png' },
  { name: 'Seplat Energy', logo: '/images/clients/seplat.png' },
  { name: 'NLNG', logo: '/images/clients/NLNG.png' }
];

const tagColors: Record<string, string> = {
  'MAINTENANCE': '#FB0202',
  'FIRE SAFETY': '#F97316',
  'AUTOMATION': '#7C3AED',
  'INSTRUMENTATION': '#0EA5E9',
  'ENGINEERING': '#10B981',
  'CONSULTING': '#6366F1',
};

export default function ProjectsPage() {
  const [active, setActive] = useState('All Projects');

  const filtered = active === 'All Projects' ? projects : projects.filter(p => p.category === active);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '72px', background: 'var(--white)' }}>

        {/* Page Header */}
        <section className="page-header">
          <div className="container">
            <div className="breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span className="breadcrumb-active">Projects & Experience</span>
            </div>
            <h1 className="page-title">
              Engineering Excellence in<br />
              <span className="text-red">Action</span>
            </h1>
            <p className="page-sub">
              Delivering high-stakes engineering solutions for Nigeria's oil and gas sector. Explore our portfolio of critical infrastructure maintenance, automation, and safety systems.
            </p>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="filter-section">
          <div className="container">
            <div className="filter-tabs">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-tab${active === cat ? ' active' : ''}`}
                  onClick={() => setActive(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="projects-section">
          <div className="container">
            <div className="projects-grid">
              {filtered.map(project => (
                <Link key={project.id} href={`/projects/${project.slug}`} className="project-card">
                  <div className="project-card__img">
                    <img src={project.image} alt={project.title} />
                    <span className="project-tag" style={{ background: tagColors[project.tag] || 'var(--red)' }}>
                      {project.tag}
                    </span>
                  </div>
                  <div className="project-card__body">
                    <h3 className="project-card__title">{project.title}</h3>
                    <p className="project-card__desc">{project.desc}</p>
                    <div className="project-card__footer">
                      <span className="project-card__year">🕐 Completed: {project.year}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="load-more">
              <button className="load-more-btn">Load More Projects ↓</button>
            </div>
          </div>
        </section>

        {/* Trusted Clients */}
        <section className="clients-section">
          <div className="container">
            <h2 className="clients-title">Our Trusted Clients</h2>
            <div className="clients-divider" />
            <div className="clients-logos">
              {clients.map(c => (
                <div key={c.name} className="client-logo">
                  <img src={c.logo} alt={c.name} style={{ maxWidth: '100%', maxHeight: '80px', objectFit: 'contain' }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="projects-cta">
          <div className="projects-cta__bg" />
          <div className="container projects-cta__inner">
            <h2 className="projects-cta__title">Ready to start your next project with us?</h2>
            <br />
            <p>Our team of certified engineers is ready to provide the technical <br />expertise and operational excellence your facility deserves.</p>
            <br />
            <br />
            <Link href="/contact" className="btn-red">Get a quote</Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
