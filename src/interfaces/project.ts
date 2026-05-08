export interface Project {
  title: string;
  description: {
    short: string;
    long?: string;
  };
  github?: string;
  url?: string;
  imgs?: string[];
  code?: string[];
}
