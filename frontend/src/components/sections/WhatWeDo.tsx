import Link from 'next/link';
import { Settings, Cpu, Wrench, Package, Shield, Gauge, Hammer, Bot, Search } from 'lucide-react';

const services = [
  { Icon: Settings, title:'Engineering & Design', desc:'We provide specialized engineering design solutions for the oil and gas sector, covering conceptual studies, process optimization, and detailed technical specifications.', href:'/services/engineering-design' },
  { Icon: Cpu, title:'Control Systems Integration', desc:'We specialize in integrating electrical, mechanical, and instrumentation systems into seamless control solutions that optimize processes, improve efficiency, and ensure reliable operations.', href:'/services/control-systems' },
  { Icon: Wrench, title:'Maintenance Services', desc:'Routine maintenance, plant shutdowns,and turnaround services to ensure maximum operational uptime.', href:'/services/maintenance' },
  { Icon: Package, title:'Procurement & Supply', desc:'Strategic sourcing of specialized oilfield equipment, valves, and components from global OEMs.', href:'/services/procurement' },
  { Icon: Shield, title:'Field Support Services', desc:'Our team delivers on-site technical support and troubleshooting to keep your operations running smoothly, reduce downtime, and maintain peak performance.', href:'/services/field-support' },
  { Icon: Gauge, title:'Testing & Calibration', desc:'We provide precise testing and calibration of instruments and equipment, ensuring accuracy, safety, and consistent operational performance across all systems.', href:'/services/testing' },
  { Icon: Hammer, title:'Equipment Installation & Commissioning', desc:'From setup to full operational readiness, we handle professional installation and commissioning of machinery and systems, ensuring compliance, reliability, and long-term efficiency.', href:'/services/installation' },
  { Icon: Bot, title:'HSE & Quality Management', desc:'Comprehensive health, safety, and environmental consultancy to meet international industry standards.', href:'/services/automation' },
  { Icon: Search, title:'Inspection Services', desc:'Structural and equipment inspection using advanced NDT techniques to ensure integrity and compliance.', href:'/services/inspection' },
];
export default function WhatWeDo() {
  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">OUR EXPERTISE</span>
          <h2 className="section-title">What We Do</h2>
          <div className="section-divider" />
        </div>
        <div className="services-grid">
          {services.map((svc, i) => (
            <div key={i} className="service-card">
              <svc.Icon className="service-card__icon" />
              <h3 className="service-card__title">{svc.title}</h3>
              <p className="service-card__desc">{svc.desc}</p>
              <Link href={svc.href} className="service-card__link">Learn More →</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
