import type { Project } from '@/interfaces/project';

export const PROJECTS: Project[] = [
  {
    title: 'burneural-network',
    description: {
      short: 'A simple implementation of a neural network in Rust using Burn',
    },
    github: 'https://github.com/mylesberueda/burneural-network',
  },
  {
    title: 'rust-cli-starter',
    description: {
      short: 'My go-to starter CLI project',
      long: 'This is probably my most used template. I use it any time I need to automate anything, including CLI and web servers.',
    },
    github: 'https://github.com/MylesWritesCode/rust-cli-starter',
    imgs: ['/assets/projects/rust-cli-starter/main.png'],
  },
  {
    title: 'rust-wasm',
    description: {
      short: 'Exploratory test WASM for large-scale data transforms',
      long: [
        'This project started as a test to figure out if performing data transforms in WASM is faster than just using JS.',
        "If you're curious, WASM is pretty fast, but JS is still faster for smaller data structures.",
        "The moral of the story is, you'll have to try it for your use-case.",
      ].join(' '),
    },
    github: 'https://github.com/MylesWritesCode/rust-wasm',
    imgs: [
      '/assets/projects/rust-wasm/pre-run.png',
      '/assets/projects/rust-wasm/fetch.png',
      '/assets/projects/rust-wasm/finish.png',
    ],
  },
  {
    title: 'portfolio (old)',
    description: {
      short: 'My old portfolio',
      long: [
        "I built this portfolio in 2020, but I've since moved to this new design.",
        'When I built this out, I really liked ChakraUI and was learning a lot about framer-motion and other browser animations.',
        "I know that it's still fully functional, so feel free to clone and run it :)",
      ].join(' '),
    },
    github: 'https://github.com/MylesWritesCode/portfolio',
    imgs: ['/assets/projects/portfolio-old/main.png', '/assets/projects/portfolio-old/achievements.png'],
  },
];
