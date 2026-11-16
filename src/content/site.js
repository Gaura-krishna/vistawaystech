// Single source of truth for site structure and verified company content.
// Source: audit of the live vistawaystech.com (see docs/CONTENT_NEEDED.md for what remains unverified).
// Typos and truncated sentences on the live site have been corrected without adding new claims.

export const site = {
  name: 'VISTAWAYS TECH',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://vistawaystech.com',
  logo: { src: '/brand/logo.png', width: 300, height: 90 },
  og: '/images/og.png',
  contact: {
    email: 'info@vistawaystech.com',
    phone: '+91 7995654433',
    address: '#801 & 802, Manjeera Majestic Commercials, Opp. JNTU, HITEC City Road, Hyderabad – 500085',
  },
  social: { linkedin: null, facebook: null, x: null, instagram: null }, // not exposed on the live site: pending
  description: 'VISTAWAYS TECH creates innovative IT and engineering solutions that help businesses transform, grow and succeed in the digital era.',
};

// Service pages: content transcribed from the live service pages (screenshots supplied by the client).
// Technology/compliance claims are the client's own copy: confirm accuracy before launch (see docs/CONTENT_NEEDED.md).
export const services = [
  {
    slug: 'software-development', name: 'Software Development', accent: 'teal', image: 'software',
    short: 'Building scalable and secure applications tailored to your business needs.',
    headline: ['Transforming Ideas into', 'Intelligent Software Solutions'],
    intro: ['We specialize in delivering custom software development services that help businesses innovate, optimize and scale. Our team of experienced developers, architects and designers work collaboratively to build secure, scalable and high-performance applications tailored to your business goals.'],
    offeringsTitle: ['Our Software Development', 'Expertise'],
    offerings: [
      ['Custom Application Development', 'We design and build software solutions that align perfectly with your business requirements, ensuring efficiency, scalability and user satisfaction.'],
      ['Web Application Development', 'From dynamic websites to complex enterprise portals, we create secure, responsive and high-performing web applications that deliver exceptional user experiences.'],
      ['Mobile Application Development', 'Our mobile app solutions (iOS, Android and cross-platform) are designed to connect you with your customers anytime, anywhere.'],
      ['Enterprise Software Solutions', 'We develop enterprise-grade applications that streamline operations, enhance productivity and support data-driven decision-making.'],
      ['Software Testing & Quality Assurance', 'Quality is at the core of what we build. Our QA and testing services ensure your applications are bug-free, secure and optimized for performance.'],
      ['Maintenance & Support', 'We provide ongoing support, upgrades and enhancements to keep your applications running smoothly and aligned with your business growth.'],
    ],
    techTitle: ['Technologies', 'We Work With'], techIntro: 'Our team leverages modern tools and technologies, including:',
    tech: [['Programming Languages', 'Java, Python, PHP, .NET, C++, Node.js'], ['Frameworks', 'Angular, React, Vue.js, Django, Spring Boot, Laravel'], ['Databases', 'MySQL, PostgreSQL, MongoDB, Oracle, SQL Server'], ['Platforms', 'iOS, Android, Flutter, React Native'], ['Cloud', 'AWS, Azure, Google Cloud']],
    whyTitle: ['Why Choose VISTAWAYS TECH', 'for Software Development?'],
    why: [['Tailor-Made Solutions', 'Designed to fit your business needs.'], ['Agile Development Approach', 'For faster, flexible delivery.'], ['Secure & Scalable Applications', 'Built with future growth in mind.'], ['Experienced Development Team', 'With diverse expertise.'], ['End-to-End Services', 'From ideation to post-launch support.']],
    cta: { title: "Let's Build Together", text: 'Your vision deserves the right technology partner. We turn ideas into powerful software solutions that drive innovation, efficiency and growth.' },
  },
  {
    slug: 'staffing-services', name: 'Staffing Services', accent: 'teal', image: 'staffing',
    short: 'Providing the right talent at the right time to enhance your workforce.',
    headline: ['Right Talent, Right Time,', 'Right Fit'],
    intro: ['We understand that people are the backbone of every successful business. Our Staffing Services are designed to help organizations find the right talent quickly and efficiently. Whether you need short-term project staff, permanent employees or specialized professionals, we deliver talent that aligns with your business goals.'],
    offeringsTitle: ['Our Staffing', 'Solutions'],
    offerings: [
      ['Permanent Staffing', 'We provide end-to-end recruitment services to help you hire skilled and dedicated professionals who are the perfect fit for your long-term needs.'],
      ['Contract Staffing', 'For projects that demand flexibility and scalability, we offer contract-based staffing solutions to give you access to qualified talent without long-term commitments.'],
      ['Project-Based Staffing', 'Need a specialized team for a specific project? We provide project-based staffing solutions, ensuring you get the right expertise for successful project delivery.'],
      ['Temporary & Seasonal Staffing', 'We help businesses meet short-term workforce demands during peak seasons or urgent projects by providing reliable temporary staff.'],
      ['Executive Search & Leadership Hiring', 'Our team specializes in identifying and hiring top-level executives and leaders who can drive strategic growth for your business.'],
    ],
    techTitle: ['Industries', 'We Serve'], techIntro: 'Our staffing services cater to multiple industries, including:',
    tech: ['Information Technology (IT)', 'Banking & Financial Services', 'Engineering & Manufacturing', 'Healthcare & Pharmaceuticals', 'Retail & E-Commerce', 'BPO & Customer Support'],
    whyTitle: ['Why Choose VISTAWAYS TECH', 'Staffing?'],
    why: [['Vast Talent Pool', 'Of skilled professionals across industries.'], ['Quick Turnaround Time', 'To fill positions faster.'], ['Customized Hiring Solutions', 'Tailored to your requirements.'], ['Quality & Reliability', 'Only the most qualified candidates.'], ['End-to-End Support', 'From sourcing to onboarding.']],
    cta: { title: "Let's Build Your Workforce Together", text: 'Whether you are a startup, SME or enterprise, our staffing solutions ensure you have the right people in the right roles to achieve success.' },
  },
  {
    slug: 'cloud-services', name: 'Cloud Services', accent: 'teal', image: 'cloud',
    short: 'Driving digital transformation with secure and reliable cloud solutions.',
    headline: ['Secure, Scalable, and', 'Future-Ready Cloud Solutions'],
    intro: ['We help businesses embrace the power of the cloud to achieve agility, efficiency and innovation. Our Cloud Services are designed to simplify your IT infrastructure, reduce costs and ensure seamless business operations with secure, scalable and high-performance cloud solutions.'],
    offeringsTitle: ['Our Cloud', 'Offerings'],
    offerings: [
      ['Cloud Consulting & Strategy', 'We analyze your business needs and create a customized cloud adoption strategy to ensure a smooth transition to the cloud.'],
      ['Cloud Security Solutions', 'Our security-first approach protects your cloud infrastructure with advanced monitoring, data encryption and compliance solutions.'],
      ['Cloud Infrastructure Management', 'We provide end-to-end cloud management services, ensuring optimal performance, availability and scalability of your cloud environment.'],
      ['Hybrid & Multi-Cloud Solutions', 'Get the best of both worlds with hybrid and multi-cloud strategies, combining private and public cloud environments for flexibility and resilience.'],
      ['Cloud Migration', 'Seamlessly move your applications, data and infrastructure to the cloud with minimal downtime and maximum efficiency.'],
      ['Disaster Recovery & Backup', 'Safeguard your business with reliable cloud backup and disaster recovery solutions that ensure business continuity.'],
    ],
    techTitle: ['Technologies & Platforms', 'We Work With'], techIntro: 'Our team leverages modern tools and technologies, including:',
    tech: [['Cloud Platforms', 'AWS, Microsoft Azure, Google Cloud'], ['Security & Compliance', 'Identity Management, Data Encryption, GDPR & HIPAA compliance'], ['Tools & Services', 'Kubernetes, Docker, Terraform, DevOps pipelines']],
    whyTitle: ['Why Choose VISTAWAYS TECH', 'for Cloud Services?'],
    why: [['Scalability', 'Grow your business without worrying about infrastructure limits.'], ['Cost Optimization', 'Pay only for what you use, reducing IT overhead.'], ['Flexibility', 'Adapt quickly to changing market and customer needs.'], ['Business Continuity', 'Reliable backup and disaster recovery systems.'], ['Enhanced Security', 'Protect sensitive data with enterprise-grade security solutions.']],
    cta: { title: 'Empower Your Business with the Cloud', text: 'Move faster, reduce costs and innovate smarter with our Cloud Services. Whether you are just starting your cloud journey or optimizing an existing setup, VISTAWAYS TECH is your trusted partner in digital transformation.' },
  },
  {
    slug: 'embedded-systems', name: 'Embedded Systems', accent: 'teal', image: 'embedded',
    short: 'Designing and developing next-generation embedded solutions.',
    headline: ['Smart, Reliable, and', 'Future-Ready Embedded Solutions'],
    intro: ['We design and develop embedded systems that power next-generation devices and applications. Our expertise combines hardware, firmware and software integration to create innovative solutions that are efficient, scalable and reliable. From consumer electronics to industrial automation, our embedded solutions help businesses bring smart products to life.'],
    offeringsTitle: ['Our Embedded Systems', 'Offerings'],
    offerings: [
      ['Embedded Software Development', 'We build custom firmware and application software for microcontrollers, processors and smart devices, ensuring smooth functionality and high performance.'],
      ['Hardware Design & Prototyping', 'Our team designs custom hardware architectures and prototypes tailored to client needs, from PCB design to complete system integration.'],
      ['Real-Time Operating Systems (RTOS)', 'Our expertise in RTOS ensures deterministic performance for time-critical embedded applications in industries like automotive, aerospace and healthcare.'],
      ['IoT & Smart Devices', 'We develop Internet of Things (IoT) solutions that connect devices seamlessly, enabling real-time monitoring, analytics and automation.'],
      ['System Integration & Testing', 'We provide end-to-end integration and testing services, ensuring that hardware and software components work flawlessly together.'],
      ['Product Lifecycle Support', 'From concept to deployment and beyond, we offer long-term support, updates and optimization for embedded products.'],
    ],
    techTitle: ['Technologies', 'We Work With'], techIntro: 'Our team leverages modern tools and technologies, including:',
    tech: [['Microcontrollers & Processors', 'ARM, PIC, AVR, RISC-V'], ['Programming Languages', 'C, C++, Python, Embedded Java'], ['Communication Protocols', 'I2C, SPI, UART, CAN, Bluetooth, Wi-Fi'], ['Platforms', 'Linux, RTOS, Android Things'], ['Tools', 'MATLAB, Simulink, Keil, Eclipse, Arduino, Raspberry Pi']],
    whyTitle: ['Why Choose VISTAWAYS TECH', 'for Embedded Systems?'],
    why: [['End-to-End Expertise', 'From hardware design to firmware development.'], ['Innovation-Driven', 'Creating smart, future-ready embedded solutions.'], ['Cross-Industry Knowledge', 'Experience in multiple domains and applications.'], ['Quality & Reliability', 'Systems built for durability, efficiency and performance.'], ['Scalable Solutions', 'Designed to grow with evolving technology needs.']],
    cta: { title: 'Building the Future of Smart Technology', text: 'We combine innovation and engineering excellence to deliver embedded systems that drive intelligence, efficiency and connectivity.' },
  },
  {
    slug: 'banking-financial-solutions', name: 'Banking & Financial Solutions', accent: 'teal', image: 'banking',
    short: 'Secure and innovative fintech solutions for banking and financial institutions.',
    headline: ['Innovating Finance with', 'Technology-Driven Solutions'],
    intro: ['We empower banks, financial institutions and fintech companies with secure, scalable and innovative technology solutions. Our Banking & Financial Services are designed to improve customer experience, strengthen security, ensure compliance and enable digital transformation in the financial sector.'],
    offeringsTitle: ['Our Banking & Financial', 'Offerings'],
    offerings: [
      ['Core Banking Solutions', 'We design and implement modern core banking systems that streamline operations, enhance efficiency and provide customers with seamless banking experiences.'],
      ['Digital and Mobile Banking', 'Deliver secure and user-friendly mobile banking and digital payment platforms that allow customers to manage finances anytime, anywhere.'],
      ['Fintech Application Development', 'From digital wallets to payment gateways, we create fintech applications that enable businesses to offer innovative, fast, secure financial services.'],
      ['Risk Management & Compliance', 'Our solutions help financial institutions stay compliant with global regulations such as GDPR, PCI-DSS and AML standards while mitigating risks.'],
      ['Fraud Detection & Cybersecurity', 'We integrate AI-powered fraud detection systems and robust cybersecurity frameworks to protect financial transactions and customer data.'],
      ['Data Analytics & Business Intelligence', 'Harness the power of big data and predictive analytics to make informed financial decisions, optimize operations and enhance customer satisfaction.'],
    ],
    techTitle: ['Technologies', 'We Work With'], techIntro: 'Our team leverages modern tools and technologies, including:',
    tech: [['Blockchain & Distributed Ledger', 'Secure, transparent and efficient transactions.'], ['AI & Machine Learning', 'Fraud detection, credit scoring and customer insights.'], ['Cloud Computing', 'Scalable financial platforms with enhanced security.'], ['RPA (Robotic Process Automation)', 'Streamlining repetitive financial processes.'], ['API Integration', 'Connecting financial services with third-party ecosystems.']],
    whyTitle: ['Why Choose VISTAWAYS TECH', 'for Financial Solutions?'],
    why: [['Domain Expertise', 'Deep understanding of banking and financial operations.'], ['Security First', 'Enterprise-grade cybersecurity measures.'], ['Innovation Driven', 'Using AI, blockchain and advanced analytics.'], ['Compliance Ready', 'Solutions built to meet global regulatory standards.'], ['Customer-Centric Approach', 'Focus on enhancing end-user experience.']],
    cta: { title: 'Shaping the Future of Digital Finance', text: 'We combine technology, security and innovation to deliver financial solutions that empower businesses and enrich customer experiences.' },
  },
  {
    slug: 'mechanical-engineering-services', name: 'Mechanical Engineering Services', accent: 'teal', image: 'mechanical',
    short: 'Innovation and precision in design and prototyping.',
    headline: ['Innovative Engineering Solutions', 'for a Smarter Tomorrow'],
    intro: ['We provide comprehensive Mechanical Engineering Services that combine innovation, precision and advanced technology. Our goal is to help businesses design, develop and deliver high-performance products and solutions that meet industry standards and customer expectations. From concept to production, we support your engineering journey with reliable and cost-effective services.'],
    offeringsTitle: ['Our Mechanical Engineering', 'Capabilities'],
    offerings: [
      ['Product Design & Development', 'We specialize in end-to-end product design, from concept creation to prototyping and final development, ensuring innovative, functional and market-ready solutions.'],
      ['CAD / CAM / CAE Services', 'Our experts use advanced tools for computer-aided design (CAD), computer-aided manufacturing (CAM) and computer-aided engineering (CAE) to deliver accurate and efficient engineering models.'],
      ['Prototyping & 3D Modeling', 'We offer rapid prototyping, simulation and 3D modeling services, helping businesses visualize, test and refine products before full-scale production.'],
      ['Manufacturing Support', 'We provide engineering support for manufacturing processes, helping businesses optimize production, reduce costs and improve quality.'],
      ['Structural & Thermal Analysis', 'Our team conducts FEA (Finite Element Analysis) and CFD (Computational Fluid Dynamics) to ensure product performance, durability and safety under real-world conditions.'],
      ['Reverse Engineering', 'Our reverse engineering services enable redesign, improvement and innovation of existing products, ensuring better performance and compliance.'],
    ],
    techTitle: ['Technologies', 'We Work With'], techIntro: 'Our team leverages modern tools and technologies, including:',
    tech: [['CAD Tools', 'AutoCAD, SolidWorks, CATIA, Creo'], ['CAE Tools', 'ANSYS, Abaqus, HyperMesh, MATLAB'], ['Prototyping Tools', '3D Printing, Rapid Prototyping, CNC Machining'], ['Simulation Tools', 'CFD, FEA, Thermal & Structural Analysis']],
    whyTitle: ['Why Choose VISTAWAYS TECH', 'for Mechanical Engineering?'],
    why: [['End-to-End Engineering Support', 'From idea to implementation.'], ['Expert Engineers & Designers', 'Skilled professionals with industry knowledge.'], ['Innovation & Precision', 'Delivering high-quality and reliable solutions.'], ['Cost-Effective & Scalable', 'Services tailored to your budget and project size.'], ['Commitment to Excellence', 'Focus on efficiency, durability and performance.']],
    cta: { title: 'Engineering the Future Together', text: 'We combine creativity, technology and expertise to provide world-class mechanical engineering services that help businesses stay competitive and innovative.' },
  },
  {
    // PENDING: no live-page content was supplied for BPO beyond the intro; richer sections appear automatically once offerings/tech/why are added.
    slug: 'bpo-services', name: 'BPO Services', accent: 'teal', image: 'bpo',
    short: 'Cost-effective BPO solutions that streamline processes and improve productivity.',
    headline: ['Streamline Operations,', 'Focus on Your Core Business'],
    intro: [
      'We provide Business Process Outsourcing (BPO) Services that enable organizations to focus on their core business while we handle critical operational processes with efficiency and precision.',
      'By leveraging technology, skilled talent and process excellence, we help businesses streamline workflows, reduce costs and deliver superior customer experiences.',
    ],
    cta: { title: "Let's Talk About Your Operations", text: 'Tell us about your requirements and we will get back to you.' },
  },
];

export const serviceHref = (s) => `/${s.slug}`;

export const copy = {
  hero: {
    title: 'Empowering Businesses with Technology',
    text: 'We create innovative IT and engineering solutions that help businesses transform, grow and succeed in the digital era.',
    features: [
      ['Expert & Innovative Solutions', 'Tailor-made software, cloud and engineering solutions designed to meet your unique business needs and keep you ahead of the competition.'],
      ['Skilled Workforce & Global Reach', 'Staffing and BPO services that connect you with the right talent and streamline your operations across industries.'],
      ['Reliable & Scalable Technology', 'From embedded systems to banking and financial solutions, secure, future-ready technologies that help businesses scale with confidence.'],
    ],
  },
  intro: {
    eyebrow: 'Welcome to VISTAWAYS TECH',
    title: 'Innovating Technology, Empowering Businesses',
    paragraphs: [
      'We combine innovation, expertise and technology to deliver solutions that drive growth and efficiency for businesses worldwide. Our mission is to empower organizations with customized IT solutions that solve real-world challenges and unlock new opportunities.',
      'We are a trusted technology partner, offering end-to-end services across Software Development, Staffing, Cloud Solutions, Embedded Systems, Banking & Financial Solutions, Mechanical Engineering Services and BPO Services. With a team of highly skilled professionals and a client-first approach, we focus on delivering measurable results.',
    ],
  },
  servicesIntro: 'A diverse portfolio of services designed to meet the ever-changing demands of businesses.',
  whyPartner: {
    title: 'Why Partner with VISTAWAYS TECH?',
    items: [
      ['End-to-End Solutions', 'From ideation to deployment, we cover all your business needs.'],
      ['Global Expertise', 'Experience in diverse industries and international markets.'],
      ['Innovation First', 'Always leveraging the latest technologies for your advantage.'],
      ['Scalability & Security', 'Solutions designed to grow with your business securely.'],
      ['Client-Centric Approach', 'We succeed when our clients succeed.'],
    ],
  },
  journey: {
    title: 'Join Our Journey',
    text: 'We believe in creating long-term partnerships with our clients and empowering businesses to thrive in the digital era. Whether you are a startup, SME or enterprise, our solutions are designed to scale with your vision.',
  },
  about: {
    who: [
      'We are more than just a technology company: we are a team of innovators, problem-solvers and business enablers. With a strong foundation in IT, engineering and business solutions, we empower organizations to achieve their goals with smart, scalable and secure technologies.',
      'We believe in combining deep industry expertise with cutting-edge innovation to deliver solutions that create measurable impact for businesses of all sizes, from startups to global enterprises.',
    ],
    mission: 'To deliver world-class technology and business solutions that enable organizations to achieve efficiency, innovation and growth in a rapidly evolving digital world.',
    vision: 'To be recognized as a global leader in technology solutions, driving digital transformation and creating long-term value for our clients, employees and society.',
    why: [
      ['Client-Centric Approach', 'Your success is our top priority.'],
      ['Innovation-Driven Solutions', 'We leverage the latest technologies to keep you ahead.'],
      ['Global Expertise', 'Experience across multiple industries and markets.'],
      ['Reliable Partnerships', 'Building trust through transparency and consistent results.'],
    ],
    commitment: 'We do not just deliver projects: we build relationships. Our commitment lies in helping businesses evolve, innovate and thrive in today\'s dynamic landscape. Together, we shape the future of technology.',
  },
  servicesPage: {
    title: 'Comprehensive Solutions, Endless Possibilities',
    text: 'We provide a complete suite of technology and business solutions designed to help organizations thrive in today\'s competitive landscape. Our services are built on innovation, expertise and reliability, ensuring that every solution we deliver is tailored to your unique needs.',
    why: ['End-to-End Business & Technology Solutions', 'Expertise Across Diverse Industries', 'Scalable, Reliable & Future-Ready Offerings', 'Customer-Centric & Result-Oriented Approach'],
    closing: 'We are committed to delivering solutions that empower businesses to adapt, innovate and succeed.',
  },
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Services', href: '/services', children: services.map((s) => ({ label: s.name, href: serviceHref(s), accent: s.accent })) },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact Us', href: '/contact-us' },
];

export const staticRoutes = ['/', '/about-us', '/services', '/careers', '/contact-us', '/privacy-policy'];

// Additional verified content (live homepage / careers page screenshots).
export const extra = {
  whyChoose: ['Innovative and Customized Solutions', 'Industry Expertise Across Multiple Domains', 'Global Service Delivery Model', 'Reliable, Scalable, and Secure Technologies', 'Customer-Centric Approach'],
  // Testimonials exist on the live homepage but are unverified: add approved ones here and the section appears automatically.
  testimonials: [],
  careers: {
    intro: [
      'We believe that our people are our greatest strength. We are passionate about building a culture that fosters innovation, collaboration and growth. Whether you are an experienced professional or just starting your career, we provide opportunities that help you learn, grow and make an impact.',
      'To apply for a position at VISTAWAYS TECH, please send your resume and a cover letter to info@vistawaystech.com, or apply for a current opening below.',
    ],
    why: [
      ['Innovative Work Environment', 'Be part of cutting-edge projects that redefine technology and business solutions.'],
      ['Continuous Learning', 'Access training programs, mentorship and certifications to enhance your skills.'],
      ['Career Growth Opportunities', 'Clear pathways for professional development and leadership roles.'],
      ['Inclusive Culture', 'A workplace where every idea matters, and diversity is celebrated.'],
      ['Work-Life Balance', 'Flexible work options that allow you to grow professionally while maintaining balance.'],
    ],
    closing: { title: 'Join Us and Be a Part of Something Bigger', text: 'Your career is more than a job: it is a journey to make a real difference. Together, we will build solutions that shape industries, empower businesses and create a smarter future.' },
  },
  // Current openings as shown on the live careers page. Confirm they are still open before launch.
  openings: [
    { title: 'Sr. Azure Data Engineer', location: 'Bharteeya City, Bangalore', mode: 'Hybrid' },
    { title: 'Python Developer', location: 'Remote', mode: 'Work From Home' },
    { title: 'Power App Developer', location: 'Pune', mode: 'Work From Office' },
    { title: 'SAP ABAP with OData', location: 'Bangalore', mode: 'Work From Office' },
  ],
};
