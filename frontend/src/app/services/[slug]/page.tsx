import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Cog, Zap, Wrench, Package, Shield, Gauge, Hammer, Bot, Search } from 'lucide-react';

const servicesData: Record<string, {
  icon: any; title: string; category: string; heroDesc: string;
  overview: string; highlights: string[]; process: { step: string; title: string; desc: string }[];
  relatedServices: string[];
}> = {
  'engineering-design': {
    icon: Cog, title: 'Engineering & Design', category: 'Core Engineering',
    heroDesc: 'Comprehensive engineering design solutions from FEED through to detailed engineering.',
    overview: 'Our engineering and design team delivers world-class solutions for oil and gas facilities, pipelines, and processing systems. We combine deep technical expertise with local knowledge to produce designs that are safe, efficient, and cost-effective. Our engineers are certified to international standards including API, ASME, and ISO.',
    highlights: ['FEED & Pre-FEED Studies','Detail Engineering','Pipeline & Process Design','Structural & Civil Design','3D Modelling & CAD','Engineering Reviews & HAZOP'],
    process: [
      { step:'01', title:'Scope Definition', desc:'We work with your team to clearly define project scope, objectives, and deliverables.' },
      { step:'02', title:'Conceptual Design', desc:'Develop concept options and evaluate against technical, safety, and commercial criteria.' },
      { step:'03', title:'FEED / Detail Design', desc:'Produce full engineering deliverables — drawings, specifications, data sheets, and calculations.' },
      { step:'04', title:'Review & Handover', desc:'Peer reviews, HAZOP, and formal document handover to your project team.' },
    ],
    relatedServices: ['control-systems','installation','inspection'],
  },
  'control-systems': {
    icon: Zap, title: 'Control Systems Integration', category: 'Automation',
    heroDesc: 'End-to-end SCADA, DCS, and PLC integration for safe and efficient plant operations.',
    overview: 'Our control systems team specialises in the design, integration, and commissioning of industrial automation and control systems for upstream, midstream, and downstream oil and gas facilities. We deliver projects from initial architecture design through to full system acceptance testing.',
    highlights: ['SCADA System Design','DCS Engineering & Integration','PLC Programming (Siemens, Allen-Bradley)','HMI / Operator Interface Development','Safety Instrumented Systems (SIS)','Fire & Gas System Integration'],
    process: [
      { step:'01', title:'Requirements Analysis', desc:'Define functional and safety requirements, review existing systems, identify integration points.' },
      { step:'02', title:'System Architecture', desc:'Design the control architecture, network topology, hardware selection, and redundancy strategy.' },
      { step:'03', title:'Programming & Configuration', desc:'Develop PLC logic, SCADA graphics, historian configuration, and alarm management.' },
      { step:'04', title:'FAT / SAT / Commissioning', desc:'Factory acceptance testing, site acceptance testing, and live commissioning support.' },
    ],
    relatedServices: ['automation','testing','field-support'],
  },
  'maintenance': {
    icon: Wrench, title: 'Maintenance Services', category: 'Operations & Maintenance',
    heroDesc: 'Planned and corrective maintenance to maximise uptime and extend asset life.',
    overview: 'Rewaj Corporate Limited provides comprehensive maintenance services for oil and gas facilities, rotating equipment, and electrical systems. Our maintenance programmes are tailored to each client\'s operational requirements, balancing cost, reliability, and safety.',
    highlights: ['Preventive Maintenance Programmes','Corrective & Breakdown Maintenance','Shutdown & Turnaround Management','Rotating Equipment Maintenance','Electrical & Instrumentation Maintenance','Asset Integrity Management'],
    process: [
      { step:'01', title:'Assessment', desc:'Evaluate current equipment condition, maintenance history, and operational criticality.' },
      { step:'02', title:'Programme Development', desc:'Develop a tailored maintenance programme with schedules, procedures, and resource plans.' },
      { step:'03', title:'Execution', desc:'Mobilise certified technicians and engineers to carry out maintenance activities safely.' },
      { step:'04', title:'Reporting', desc:'Detailed maintenance records, KPI reporting, and recommendations for improvement.' },
    ],
    relatedServices: ['field-support','inspection','testing'],
  },
  'procurement': {
    icon: Package, title: 'Procurement & Supply', category: 'Procurement',
    heroDesc: 'Strategic sourcing of specialised materials and equipment for the oil and gas sector.',
    overview: 'Our procurement team manages the entire supply chain — from vendor identification and qualification through to delivery and inspection. We have established relationships with leading global and local manufacturers, ensuring quality, competitive pricing, and timely delivery.',
    highlights: ['Equipment & Material Sourcing','Vendor Qualification & Management','Purchase Order Management','Expediting & Inspection','Import / Export Logistics','Local Content Compliance'],
    process: [
      { step:'01', title:'Requisition Review', desc:'Review technical specifications, material requisitions, and approved vendor lists.' },
      { step:'02', title:'RFQ & Vendor Selection', desc:'Issue RFQs, evaluate bids on technical and commercial criteria, recommend award.' },
      { step:'03', title:'Order Management', desc:'Place purchase orders, manage supplier progress, and expedite critical items.' },
      { step:'04', title:'Inspection & Delivery', desc:'Third-party inspection at source, customs clearance, and site delivery coordination.' },
    ],
    relatedServices: ['installation','maintenance','field-support'],
  },
  'field-support': {
    icon: Shield, title: 'Field Support Services', category: 'Technical Services',
    heroDesc: 'Expert on-site technical support for safe, compliant, and efficient field operations.',
    overview: 'Our field support teams provide resident and call-out engineering and technical support for oil and gas facilities across Nigeria. Our personnel are experienced in both onshore and offshore environments and hold current safety certifications including BOSIET, HUET, and IWCF.',
    highlights: ['Resident Technical Advisors','Call-Out / Emergency Response','Site Supervision','HSE Compliance Support','Shutdown / Turnaround Support','24/7 Technical Helpdesk'],
    process: [
      { step:'01', title:'Mobilisation Planning', desc:'Personnel selection, medical fitness, certification verification, and logistics.' },
      { step:'02', title:'Site Induction', desc:'Site safety briefing, role familiarisation, and permit-to-work system onboarding.' },
      { step:'03', title:'Service Delivery', desc:'On-site execution of technical scope under client supervision and safety management.' },
      { step:'04', title:'Demobilisation & Reporting', desc:'Job cards, time sheets, service reports, and lessons learned documentation.' },
    ],
    relatedServices: ['maintenance','testing','inspection'],
  },
  'testing': {
    icon: Gauge, title: 'Testing & Calibration', category: 'Technical Services',
    heroDesc: 'Precision testing and calibration of instruments and safety systems.',
    overview: 'Accurate instrumentation is critical to safe and efficient operations. Our calibration and testing team provides traceable calibration services for all types of process instruments, safety devices, and control systems, using certified reference standards and documented procedures.',
    highlights: ['Instrument Calibration (Pressure, Temperature, Flow, Level)','Safety Relief Valve Testing','ESD / Fire & Gas System Testing','Loop Checking','Pre-commissioning & Commissioning Testing','Calibration Management Software'],
    process: [
      { step:'01', title:'Scope Review', desc:'Review instrument register, calibration intervals, and acceptance criteria.' },
      { step:'02', title:'Test Equipment Verification', desc:'Confirm reference instruments are within calibration and traceable to national standards.' },
      { step:'03', title:'Calibration / Testing', desc:'Execute calibration or functional testing per approved procedures with data recording.' },
      { step:'04', title:'Certification & Records', desc:'Issue calibration certificates, update instrument register, flag out-of-tolerance items.' },
    ],
    relatedServices: ['control-systems','automation','inspection'],
  },
  'installation': {
    icon: Hammer, title: 'Equipment Installation & Commissioning', category: 'Core Engineering',
    heroDesc: 'Full installation, hook-up, and commissioning from mobilisation to handover.',
    overview: 'Our installation and commissioning team manages the complete process of bringing new and brownfield equipment into service — from civil and structural works through mechanical, electrical, and instrumentation installation to final performance testing and handover.',
    highlights: ['Mechanical Equipment Installation','Piping Fabrication & Installation','Electrical Installation & Hook-up','Instrumentation Installation','Pre-commissioning & Commissioning','Performance Testing & Handover'],
    process: [
      { step:'01', title:'Pre-Mobilisation', desc:'Review installation packages, develop method statements, mobilise resources.' },
      { step:'02', title:'Installation', desc:'Execute civil, mechanical, electrical, and instrumentation installation activities.' },
      { step:'03', title:'Pre-commissioning', desc:'System pressure tests, loop checks, continuity tests, and flushing.' },
      { step:'04', title:'Commissioning & Handover', desc:'Live commissioning, performance testing, punch-list close-out, and handover.' },
    ],
    relatedServices: ['engineering-design','control-systems','testing'],
  },
  'automation': {
    icon: Bot, title: 'Instrumentation & Automation', category: 'Automation',
    heroDesc: 'Cutting-edge instrumentation and automation solutions for process efficiency.',
    overview: 'Our instrumentation and automation specialists design and deploy systems that improve process visibility, control, and safety. From simple standalone instruments to complex integrated automation architectures, we deliver solutions that are reliable, maintainable, and future-ready.',
    highlights: ['Process Instrumentation Design','Flow Computer Programming','Custody Transfer Metering','Fiscal Metering Systems','Remote Terminal Units (RTU)','Wellhead Automation'],
    process: [
      { step:'01', title:'Process Review', desc:'Understand process variables, measurement requirements, and control objectives.' },
      { step:'02', title:'Instrument Selection', desc:'Select instruments based on process conditions, accuracy, rangeability, and reliability.' },
      { step:'03', title:'Installation & Configuration', desc:'Install, configure, and calibrate instruments to design specifications.' },
      { step:'04', title:'Validation', desc:'Loop testing, functional testing, and documentation of as-built configuration.' },
    ],
    relatedServices: ['control-systems','testing','engineering-design'],
  },
  'inspection': {
    icon: Search, title: 'Inspection Services', category: 'Technical Services',
    heroDesc: 'Advanced NDT and integrity inspection services for structural and mechanical assets.',
    overview: 'Maintaining asset integrity is paramount in the oil and gas industry. Our inspection team provides a full range of non-destructive testing (NDT) and structural inspection services to identify defects, monitor corrosion, and ensure assets remain safe and compliant throughout their lifecycle.',
    highlights: ['Ultrasonic Testing (UT)','Magnetic Particle Inspection (MPI)','Liquid Penetrant Testing (LPT)','Radiographic Testing (RT)','Visual & Dimensional Inspection','Corrosion & Thickness Surveys'],
    process: [
      { step:'01', title:'Inspection Planning', desc:'Review inspection scope, applicable codes, acceptance criteria, and access requirements.' },
      { step:'02', title:'Mobilisation', desc:'Certified inspectors mobilised with calibrated test equipment and reference materials.' },
      { step:'03', title:'Inspection Execution', desc:'NDT and visual inspection carried out per approved procedures and standards.' },
      { step:'04', title:'Reporting & Follow-up', desc:'Detailed inspection reports with findings, recommendations, and fitness-for-service assessment.' },
    ],
    relatedServices: ['maintenance','testing','field-support'],
  },
};

const servicesList = [
  { slug:'engineering-design', icon: Cog, title:'Engineering & Design' },
  { slug:'control-systems', icon: Zap, title:'Control Systems' },
  { slug:'maintenance', icon: Wrench, title:'Maintenance' },
  { slug:'procurement', icon: Package, title:'Procurement' },
  { slug:'field-support', icon: Shield, title:'Field Support' },
  { slug:'testing', icon: Gauge, title:'Testing & Calibration' },
  { slug:'installation', icon: Hammer, title:'Installation' },
  { slug:'automation', icon: Bot, title:'Automation' },
  { slug:'inspection', icon: Search, title:'Inspection' },
];

export async function generateStaticParams() {
  return Object.keys(servicesData).map(slug => ({ slug }));
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const svc = servicesData[params.slug] ?? servicesData['engineering-design'];

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '72px' }}>

        {/* Hero */}
        <section className="svc-detail-hero">
          <div className="svc-detail-hero__overlay" />
          <div className="container svc-detail-hero__content">
            <div className="breadcrumb">
              <Link href="/">Home</Link><span>/</span>
              <Link href="/services">Services</Link><span>/</span>
              <span className="breadcrumb-active">{svc.title}</span>
            </div>
            <div className="svc-detail-hero__icon"><svc.icon size={48} strokeWidth={1.5} /></div>
            <span className="svc-detail-hero__cat">{svc.category}</span>
            <h1 className="svc-detail-hero__title">{svc.title}</h1>
            <p className="svc-detail-hero__sub">{svc.heroDesc}</p>
            <Link href="/contact" className="btn-red">Request This Service →</Link>
          </div>
        </section>

        <div className="container svc-detail-layout">

          {/* Main Content */}
          <div className="svc-detail-main">

            {/* Overview */}
            <section className="svc-detail-section">
              <h2 className="svc-detail-section__title">Service Overview</h2>
              <p className="svc-detail-section__body">{svc.overview}</p>
            </section>

            {/* Highlights */}
            <section className="svc-detail-section">
              <h2 className="svc-detail-section__title">Key Capabilities</h2>
              <div className="svc-highlights-grid">
                {svc.highlights.map(h => (
                  <div key={h} className="svc-highlight-item">
                    <span className="svc-highlight-check">✓</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Process */}
            <section className="svc-detail-section">
              <h2 className="svc-detail-section__title">Our Process</h2>
              <div className="svc-process-grid">
                {svc.process.map(p => (
                  <div key={p.step} className="svc-process-card">
                    <span className="svc-process-step">{p.step}</span>
                    <h4 className="svc-process-title">{p.title}</h4>
                    <p className="svc-process-desc">{p.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="svc-detail-cta">
              <h3>Ready to get started?</h3>
              <p>Contact our team to discuss your specific requirements and get a detailed proposal.</p>
              <div className="svc-cta-btns">
                <Link href="/contact" className="btn-red">Get a Quote →</Link>
                <Link href="/projects" className="btn-outline-navy">View Our Projects</Link>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="svc-detail-sidebar">
            <div className="svc-sidebar-widget">
              <h3 className="svc-sidebar-title">All Services</h3>
              {servicesList.map(s => (
                <Link key={s.slug} href={`/services/${s.slug}`}
                  className={`svc-sidebar-link${s.slug === params.slug ? ' active' : ''}`}>
                  <s.icon size={20} strokeWidth={1.5} /><span>{s.title}</span>
                </Link>
              ))}
            </div>

            <div className="svc-sidebar-widget svc-sidebar-widget--dark">
              <h3 className="svc-sidebar-title--white">Need Expert Advice?</h3>
              <p className="svc-sidebar-sub">Speak directly with one of our senior engineers.</p>
              <div className="svc-contact-info">
                <div className="svc-contact-row"><span>📞</span><a href="tel:+2347037830548">+234 703 783 0548</a></div>
                <div className="svc-contact-row"><span>✉️</span><a href="mailto:info@rewajcorporate.com">info@rewajcorporate.com</a></div>
              </div>
              <Link href="/contact" className="svc-contact-btn">Send a Message</Link>
            </div>

            {svc.relatedServices.length > 0 && (
              <div className="svc-sidebar-widget">
                <h3 className="svc-sidebar-title">Related Services</h3>
                {svc.relatedServices.map(slug => {
                  const rel = servicesData[slug];
                  return rel ? (
                    <Link key={slug} href={`/services/${slug}`} className="svc-related-card">
                      <rel.icon size={24} strokeWidth={1.5} />
                      <span className="svc-related-title">{rel.title}</span>
                    </Link>
                  ) : null;
                })}
              </div>
            )}
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
