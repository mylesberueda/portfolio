import type { WorkExperience } from '@/interfaces/work-experience';

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Agile Defense',
    position: 'Software Engineer',
    location: 'McLean, VA',
    dates: {
      start: new Date(2025, 3),
      end: 'current',
    },
    description: [
      'Moved to a new product team called Workforce - an webapp that orchestrates multi-agent workflows with a focus on UX and human-in-the-loop agentic interactions.',
    ].join(' '),
    entries: [
      'Joined as a full-stack developer focusing on product development',
      'Implemented multi-agent user flow, allowing users to produce high-quality output from one or more variables and questions',
      'Participated in a big push toward stability and safely, debugging and fixing several bugs throughout the app',
      'Implemented component, unit, and integration test suites as part of the safety push, focusing on behavior',
    ],
  },
  {
    company: 'Intellibridge, an Agile Defense Company',
    position: 'Frontend Software Engineer',
    location: 'McLean, VA',
    dates: {
      start: new Date(2024, 11),
      end: new Date(2025, 2),
    },
    description: [
      "This was a short-term team, tasked with building a multifaceted forms solution for the US Gov't",
      "The team's goal was to produce a high-quality, highly covered, full-stack app with a complex form that's easily reusable and configurable, even by non-technical team members.",
    ].join(' '),
    entries: [
      'Developed with a strong preference for TDD, implementing features via red-green-refactor loop',
      'Designed and implemented an extensible form control solution allowing for complex output from simple configurations',
      'During final presentation, live coded the solution for several stakeholders on a change order, demonstrating the ease of our solution',
    ],
  },
  {
    company: 'Revacomm',
    position: 'Software Engineer III',
    location: 'Honolulu, HI',
    dates: {
      start: new Date(2022, 7),
      end: new Date(2024, 11),
    },
    description: [
      'I joined Intellibridge on the R&D team, where I was responsible for implementing features on a new product called Aolytix - an infrastructure visualization tool.',
      'My responsibilities included mentoring other devs - especially in the context of frontend development, and interfacing with users to gather feedback.',
    ].join(' '),
    entries: [
      'Led initiative for performance-based enhancements, tasked with finding and optimizing data stream bottlenecks on the frontend',
      'Increased performance of our canvas graph library, increasing throughput by ~70%',
      'Decreased first-paint time by ~80% by optimizing graph transforms, reducing first-paint from over 150ms to under 30ms',
      'Led transition from commercial graphing library to Cytoscape, and open-source alternative',
      'Drove desktop deployment of Aolytix, aimed at reducing friction for users with the goal of increasing the userbase',
      'Led auth implementation, interfacing with third-party clerk solutions, keeping in sync with the first release timeline',
    ],
  },
  {
    company: 'Govalo',
    location: 'Redlands, CA',
    position: 'Junior Software Engineer',
    dates: {
      start: new Date(2021, 8),
      end: new Date(2022, 7),
    },
    description: [
      'Govalo is a startup that specializes in creating a platform for gift giving on Shopify.',
      'I joined as a junior software engineer, responsible for interfacing with clients and developing new features.',
    ].join(' '),
    entries: [
      'Implemented the Shopify plugin, using Svelte and TypeScript',
      'Interfaced with owners of Shopify stores, often adding custom implementations to their stores',
      'Debugged and fixed issues with the plugin, often requiring quick turnarounds to keep stores online',
      'Guided developers on implementation tips and tricks, regarding both the plugin and the Shopify API',
    ],
  },
  {
    company: 'Residential Choices',
    position: 'Software Engineer',
    location: 'Honolulu, HI',
    dates: {
      start: new Date(2019, 8),
      end: new Date(2021, 8),
    },
    description: [
      'Once I graduated from SNHU, I started working on building a simple webapp in my free time to target some inefficiency I observed in the office.',
      'The app quickly gained traction and was adopted by the company.',
      'It ran on an Express API connected to a Postgres DB with a React frontend, and was deployed to an on-prem server.',
    ].join(' '),
    entries: [
      'Converted Excel-based workflow to a webapp, which allowed for better UI/UX and custom data validation',
      'Prototyped out full-stack app in about a month, targeting ~20 users',
      'Increased metric visibility by adding a custom dashboard displaying key deadline-related metrics',
      'Expanded the application by further learning and implementing d3 for custom reports',
      "Implemented alerting and notification features, resulting in an increase in the company's collection rate",
    ],
  },
  {
    company: 'Residential Choices',
    position: 'IT Support',
    location: 'Honolulu, HI',
    dates: {
      start: new Date(2011, 8),
      end: new Date(2019, 8),
    },
    description: [
      'Residential Choices is a case management agency.',
      'While I wore many hats, my primary job description was IT support for the staff.',
      'I was a driver for the movement from paper to electronic records in the office.',
    ].join(' '),
    entries: [
      'Setup initial file system and computer security systems for the office staff and outpost employees',
      'Performed general tasks such as maintenance, upgrades, and software installation',
      'Served as the primary point-of-contact for vendors within the context of IT, including ISPs and software vendors',
      'Completed security audits and implemented security measures to protect sensitive client data',
      'Generated quarterly IT budgets, including the cost of upgrades, replacements, and new tech',
    ],
  },
];
