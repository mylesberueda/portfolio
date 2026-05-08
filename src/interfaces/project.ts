export interface Project {
  title: string;
  description: {
    short: string;
    long?: string;
  };
  stack?: string[];
  github?: string;
  url?: string;
  imgs?: string[];
  code?: string[];
}
