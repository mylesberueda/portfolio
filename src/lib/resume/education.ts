import type { Education } from '@/interfaces/education';

export const EDUCATION: Education[] = [
  {
    school: 'Southern New Hampshire University',
    degree: 'Bachelor of Science in Computer Science',
    gpa: '4.0',
    description: [
      'The computer science program with a concentration in software engineering provided a great base for where I am today.',
      'In addition to learning the fundamentals of computer science, I focused on several electives on data analytics and statistics.',
    ].join(' '),
    entries: [
      'DSA project: MovieDB sorting with Python',
      '3D project: 3D rendering with OpenGL',
      'Capstone project: Web-app visualizing public flight data (incoming, outgoing) on airline flights',
    ],
    dates: {
      start: new Date(2016, 7),
      end: new Date(2019, 7),
    },
  },
];
