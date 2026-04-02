export interface Article {
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  authorRole?: string;
  image: string;
}

export const articles: Article[] = [
  {
    slug: 'role-of-technology-oil-gas-safety',
    category: 'INDUSTRY TRENDS',
    date: 'October 24, 2023',
    title: 'The Role of Technology in Improving Safety and Efficiency in the Oil and Gas Industry',
    excerpt: 'The oil and gas industry has always been crucial for powering industries, transportation, and economic growth. Modern digital monitoring systems, smart sensors, and automated control technologies have fundamentally transformed how operations are conducted.',
    author: 'Asaba Oghenegoma Godspower',
    authorRole: 'Senior Engineer, Rewaj Corporate Limited',
    image: '/images/blog-featured.jpg',
    content: `
      <p>The oil and gas industry has always been crucial for powering industries, transportation, and economic growth. In the early years of the industry, especially between the 1900s and 1970s, operations relied heavily on manual labor and basic mechanical equipment.</p>
      <p>Today, the industry has changed significantly. Modern oil and gas facilities use digital monitoring systems, smart sensors, and automated control technologies that continuously measure pressure, temperature, vibration, and flow rates in real time. Engineers can monitor these systems from centralized control rooms and receive immediate alerts if abnormal conditions occur.</p>
      <h2>The Digital Transformation</h2>
      <p>Drilling technology has also advanced through directional and horizontal drilling, allowing operators to precisely reach reservoirs that were once difficult to access. Companies now use advanced drilling and data technologies to increase production while reducing environmental impact.</p>
      <h2>Predictive Maintenance</h2>
      <p>Maintenance practices have also improved. Instead of waiting for equipment to fail, modern facilities use predictive maintenance systems that analyze equipment data to detect potential problems before they occur. This reduces downtime, improves safety, and saves operational costs.</p>
    `
  },
  {
    slug: 'local-content-development-nigeria',
    category: 'COMPANY UPDATES',
    date: 'October 10, 2023',
    title: 'How Rewaj is Championing Local Content Development in Nigeria',
    excerpt: 'Since our founding in 2001, Rewaj Corporate Limited has been at the forefront of building local capacity in the Nigerian oil and gas sector. Our commitment to training Nigerian engineers and technicians has resulted in a workforce that rivals international standards.',
    author: 'Lanre Olasupo',
    authorRole: 'Human Resources Manager, Rewaj Corporate Limited',
    image: '/images/team-offshore.jpg',
    content: `
      <p>Since our founding in 2001, Rewaj Corporate Limited has been at the forefront of building local capacity in the Nigerian oil and gas sector. Our commitment to training Nigerian engineers and technicians has resulted in a workforce that rivals international standards.</p>
      <p>We believe that the sustainability of the Nigerian energy sector depends on our ability to develop and retain high-quality local talent. That's why we invest heavily in certification programs, hands-on field training, and partnerships with local technical colleges.</p>
      <h2>Building for the Future</h2>
      <p>Our workforce is 100% Nigerian, and we are proud to handle complex engineering and maintenance contracts that were previously managed exclusively by international firms. This not only keeps capital within the country but also builds a legacy of technical excellence for the next generation.</p>
    `
  },
];
