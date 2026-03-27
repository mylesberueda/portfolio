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
      'Built UI flows for user-defined, DAG-style multi-agent workflows, letting users chain specialized agents with templated handoffs, tools, and model settings',
      'Owned scheduled workflow execution end to end, using BullMQ on the backend and a timezone-aware scheduling UI that stores recurring runs in UTC',
      'Reworked layout, routing, and data-fetching patterns to eliminate full-page refreshes, improve caching, and make the app feel noticeably faster to users',
      'Started and drove mobile and tablet usability improvements after identifying demo risk, making the app workable on smaller screens for client-facing use',
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
      'Built full-stack features in a TDD workflow, using red-green-refactor to keep coverage high on a short-lived government forms project',
      'Designed and implemented extensible form controls that generated complex behavior from simple configurations, making the system easier to reuse and adapt',
      'Live-coded a stakeholder-requested change during the final presentation, demonstrating how quickly new form behavior could be added without reworking the app',
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
      'Led frontend performance work across Aolytix, identifying data-stream bottlenecks and increasing canvas graph throughput by about 70% on large infrastructure views',
      'Cut first-paint time by about 80% by optimizing graph transforms, reducing initial render from over 150ms to under 30ms as graph sizes approached 1k+ nodes',
      'Led the migration from a commercial graphing library to Cytoscape, giving the team a more extensible open-source foundation for graph-heavy features',
      'Built a Tauri desktop deployment that paired a React client with a Go backend through Rust, giving teams an alternative to inconsistent browser environments',
      'Led authentication implementation and coordinated with third-party providers to keep auth delivery aligned with the first release timeline',
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
      'Reworked a fragile 5k-line JavaScript Shopify storefront plugin into a modular Svelte-based implementation with better Shopify integration, faster load behavior, and less breakage on theme updates',
      'Worked directly with Shopify store owners to deliver custom implementations tailored to their storefronts',
      'Debugged and fixed production issues in merchant storefronts, often under quick turnaround expectations when plugin behavior broke during Shopify or theme updates',
      'Helped other developers navigate Shopify API and plugin implementation details as the team expanded feature work',
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
      'Converted an Excel-based workflow into a full-stack internal web app with better validation and day-to-day usability for office staff',
      'Prototyped and deployed the initial React, Express, and Postgres application in about a month for roughly 20 users',
      'Added dashboards and reporting features that improved visibility into deadline-related metrics',
      "Built alerting and notification features that helped improve the company's collection rate",
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
      'Managed core office IT systems, including file access and workstation security, for staff across the main office and outpost locations',
      'Served as the primary IT contact for vendors, including ISPs and software providers, helping keep systems and services running smoothly',
      'Completed security audits and implemented measures to protect sensitive client data',
      'Supported the office’s shift from paper-based processes to electronic systems, which later informed the internal tools I built as a software engineer',
    ],
  },
];
