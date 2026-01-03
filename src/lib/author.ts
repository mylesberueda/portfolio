export const AUTHOR = {
  firstname: 'Myles',
  lastname: 'Berueda',
  position: ['Software Engineer'],
  website: 'https://themapletree.io',
  about: [
    'Full-stack engineer with experience building web applications, infrastructure tooling, and developer experiences.',
    'Passionate about performance optimization, clean code, and shipping products that make a difference.',
  ].join(' '),
} as const;

export const AUTHOR_FULL_NAME = `${AUTHOR.firstname} ${AUTHOR.lastname}`;
