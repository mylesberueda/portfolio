import type { Project } from '@/interfaces/project';

export const PROJECTS: Project[] = [
  {
    title: 'stardeck.space',
    description: {
      short: 'Star Citizen ship + CCU upgrade planner',
      long: [
        "Stardeck plans the cheapest chain of upgrades (CCUs) between any two Star Citizen ships, mixing warbond and standard variants to minimize total spend.",
        "The core is a multi-source Dijkstra over a weighted graph of ships, where each edge's cost is the cheapest applicable upgrade option — already-owned (free), currently-offered store CCU, or MSRP-delta as a fallback.",
        "Ship metadata, 3D models, and store images are pulled from the game's own files every patch and rendered into the interactive upgrade graph.",
        'Built as a Rust + Next.js monorepo (axum/tonic services, Postgres, S3, Supabase auth, K8s/Terraform).',
      ].join(' '),
    },
    stack: ['Rust', 'Next.js', 'Postgres', 'K8s'],
    url: 'https://stardeck.space',
    imgs: [
      '/assets/projects/stardeck/chain-start.png',
      '/assets/projects/stardeck/chain-graph.png',
      '/assets/projects/stardeck/ships-catalog.png',
      '/assets/projects/stardeck/ship-picker.png',
    ],
  },
  {
    title: 'burneural-network',
    description: {
      short: 'A from-scratch neural network in Rust',
      long: [
        'Built to learn the Burn deep-learning framework end-to-end — model definition, training loop, and inference, without leaning on a high-level wrapper.',
        'Small enough to read in a sitting, but covers enough of the framework to be a useful reference next time I reach for it.',
      ].join(' '),
    },
    stack: ['Rust', 'Burn'],
    github: 'https://github.com/mylesberueda/burneural-network',
  },
  {
    title: 'rust-cli-starter',
    description: {
      short: 'My go-to template for CLI tools and small services in Rust',
      long: [
        'I reach for this any time I need to automate something or stand up a small service — it bundles the boring decisions (clap setup, logging, config loading, error handling) so I can get to the actual problem.',
        "It's seeded a handful of one-off CLIs and the occasional web server.",
      ].join(' '),
    },
    stack: ['Rust', 'clap'],
    github: 'https://github.com/MylesWritesCode/rust-cli-starter',
    imgs: ['/assets/projects/rust-cli-starter/main.png'],
  },
  {
    title: 'rust-wasm',
    description: {
      short: 'Benchmarking WASM vs. JS for in-browser data transforms',
      long: [
        'A learning project to figure out where Rust/WASM actually beats plain JS for data transforms in the browser.',
        "What I found: marshalling data across the JS/WASM boundary isn't free — every call pays a serialize/deserialize cost, and over many small calls that overhead eats whatever speed Rust gave you. Unless the workload is compute-heavy or GPU-bound, JS usually wins (and can often be optimized further within JS itself).",
        "Real takeaway: a language being faster on paper doesn't mean it's the right tool for the job.",
      ].join(' '),
    },
    stack: ['Rust', 'WASM', 'TypeScript'],
    github: 'https://github.com/MylesWritesCode/rust-wasm',
    imgs: [
      '/assets/projects/rust-wasm/pre-run.png',
      '/assets/projects/rust-wasm/fetch.png',
      '/assets/projects/rust-wasm/finish.png',
    ],
  },
];
