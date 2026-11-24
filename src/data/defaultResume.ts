import { ResumeDocument } from '../types/resume';

export const initialResume: ResumeDocument = {
  metadata: {
    id: 'resume-default-01',
    title: 'Senior Software Engineer Resume',
    type: 'resume',
    locale: 'en',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  config: {
    template: 'creative',
    experienceLevel: 'senior',
    countryCode: 'US',
    layout: {
      type: 'predefined1',
      balancer: 0,
      sideBalancer: 0,
      photoStyle: 'rounded',
      hidden: [],
      columns: {
        left: ['summary', 'work', 'projects'],
        right: ['education', 'skills', 'languages', 'certificates', 'awards', 'interests'],
      },
    },
    theme: {
      colors: 'tc-1', // Default Teal / Slate
      background: 'none',
      applyColorToBackground: false,
    },
    font: {
      family: 'Ubuntu',
      size: 'M',
      letterSpacing: false,
      wordSpacing: false,
    },
    format: {
      documentSize: 'A4',
      customSpacing: false,
      customSpacingLevel: 'M',
      customMargins: false,
      customMarginsLevel: 'M',
      showListLabels: true,
      dates: {
        format: 'm-y',
        separator: '/',
        presentLabel: 'Present',
      },
      footer: {
        showPageNumber: true,
        showCreationDate: false,
      },
    },
    blocks: {
      skills: {
        decoration: 'highlight',
        infographicType: 'dots-1',
        columns: 1,
      },
      languages: {
        decoration: 'infographic',
        infographicType: 'dots-1',
        columns: 1,
      },
    },
  },
  data: {
    name: {
      givenName: 'Alex',
      familyName: 'Morgan',
      namePrefix: '',
      nameSuffix: '',
    },
    title: 'Senior Full Stack & Systems Engineer',
    summary:
      'High-velocity software engineer with 7+ years of experience designing scalable distributed web architectures, high-performance engines, and developer tooling. Proven track record leading cross-functional teams, optimizing latency by 45%, and architecting mission-critical microservices serving 10M+ daily active users.',
    photo: {
      src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
    contact: {
      email: 'alex.morgan.dev@gmail.com',
      phone: '+1 (555) 389-4921',
      city: 'San Francisco',
      country: 'United States',
      website: 'https://alexmorgan.dev',
      linkedin: 'linkedin.com/in/alexmorgandev',
      github: 'github.com/alexmorgan',
      twitter: '@alexm_dev',
    },
    work: [
      {
        id: 'work-1',
        position: 'Lead Systems Architect',
        company: 'Vanguard Cloud Technologies',
        city: 'San Francisco, CA',
        startDate: '2022',
        endDate: 'Present',
        current: true,
        bullets: [
          'Spearheaded transition of monolithic core into asynchronous microservices, reducing average P99 latency from 320ms to 48ms.',
          'Engineered distributed WebRTC sync pipeline handling 120 bytes/sec binary controller packets with zero jitter lockstep clocks.',
          'Mentored an engineering squad of 8 engineers and introduced automated CI/CD canary deployments, reducing regression rates by 60%.',
        ],
      },
      {
        id: 'work-2',
        position: 'Senior Full-Stack Engineer',
        company: 'Apex Digital Systems',
        city: 'Seattle, WA',
        startDate: '2019',
        endDate: '2022',
        current: false,
        bullets: [
          'Built high-throughput real-time collaboration canvas in React and WebAssembly, supporting 50+ concurrent editors per workspace.',
          'Architected Redis cache layer and database indexing strategies, boosting PostgreSQL query performance by 4.2x.',
          'Authored high-accuracy automated ATS resume parsing pipeline with NLP keyword classification achieving 94% parsing precision.',
        ],
      },
      {
        id: 'work-3',
        position: 'Software Engineer',
        company: 'Kinetic Labs',
        city: 'Austin, TX',
        startDate: '2017',
        endDate: '2019',
        current: false,
        bullets: [
          'Developed responsive customer portals in TypeScript, Next.js, and GraphQL, boosting user retention metrics by 28%.',
          'Automated end-to-end integration test suites with Playwright, increasing code coverage from 55% to 92%.',
        ],
      },
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'Bachelor of Science in Computer Science',
        school: 'University of Washington',
        city: 'Seattle, WA',
        startDate: '2013',
        endDate: '2017',
        current: false,
        bullets: [
          'Dean’s Honor List (All semesters), Magna Cum Laude (GPA: 3.92/4.0).',
          'Specialization in Distributed Systems, Compiler Design, and Computer Graphics.',
        ],
      },
    ],
    skills: [
      { id: 'sk-1', name: 'TypeScript / Node.js', level: 95, category: 'Core' },
      { id: 'sk-2', name: 'React / Next.js', level: 95, category: 'Frontend' },
      { id: 'sk-3', name: 'C++ / Rust / WebAssembly', level: 85, category: 'Systems' },
      { id: 'sk-4', name: 'Distributed Systems', level: 90, category: 'Architecture' },
      { id: 'sk-5', name: 'PostgreSQL / Redis', level: 88, category: 'Data' },
      { id: 'sk-6', name: 'Docker / Kubernetes / AWS', level: 82, category: 'DevOps' },
    ],
    softSkills: [
      { id: 'ss-1', name: 'Technical Leadership', level: 90 },
      { id: 'ss-2', name: 'Cross-functional Communication', level: 92 },
      { id: 'ss-3', name: 'System Design Mentorship', level: 88 },
      { id: 'ss-4', name: 'Agile & Scrum Delivery', level: 85 },
    ],
    technicalSkills: [
      { id: 'ts-1', name: 'Git, CI/CD, GitHub Actions', level: 90 },
      { id: 'ts-2', name: 'Tailwind CSS, WebGL, Canvas API', level: 85 },
    ],
    languages: [
      { id: 'lang-1', name: 'English', level: 5, proficiencyLabel: 'Native / Bilingual' },
      { id: 'lang-2', name: 'German', level: 4, proficiencyLabel: 'Professional Working' },
      { id: 'lang-3', name: 'Spanish', level: 3, proficiencyLabel: 'Intermediate' },
    ],
    certificates: [
      { id: 'cert-1', title: 'AWS Certified Solutions Architect (Professional)', issuer: 'Amazon Web Services', date: '2023' },
      { id: 'cert-2', title: 'Certified Kubernetes Administrator (CKA)', issuer: 'Linux Foundation', date: '2022' },
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'OpenResume / WebAssembly Engine',
        link: 'https://github.com/alexmorgan/open-engine',
        bullets: [
          'High-performance browser document rendering engine compiled to WASM with sub-millisecond layout reflows.',
          'Over 4,200 GitHub stars and used by 45,000+ monthly active developers.',
        ],
      },
    ],
    awards: [
      { id: 'aw-1', title: '1st Place Global Cloud Hackathon', issuer: 'TechCrunch Disrupt', date: '2021' },
    ],
    interests: [
      { id: 'int-1', name: 'Low-latency Graphics' },
      { id: 'int-2', name: 'Mountain Biking' },
      { id: 'int-3', name: 'Open-Source Tooling' },
      { id: 'int-4', name: 'Mechanical Keyboards' },
    ],
    references: [],
  },
};
