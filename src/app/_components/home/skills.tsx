import type { Skill } from '@/interfaces/skill';
import { AiOutlineKubernetes } from 'react-icons/ai';
import { FaAws, FaGolang } from 'react-icons/fa6';
import { IoGitMerge, IoLogoDocker, IoLogoJavascript, IoLogoPython, IoLogoReact } from 'react-icons/io5';
import { SiPostgresql, SiRust, SiTypescript } from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';

import { SKILLS as SKILLS_DATA } from '@/lib/resume/skills';

const SKILL_ICONS: Record<string, React.ReactNode> = {
  JavaScript: <IoLogoJavascript size={24} />,
  TypeScript: <SiTypescript size={24} />,
  React: <IoLogoReact size={24} />,
  Rust: <SiRust size={24} />,
  Go: <FaGolang size={24} />,
  Git: <IoGitMerge size={24} />,
  Docker: <IoLogoDocker size={24} />,
  SQL: <SiPostgresql size={24} />,
  AWS: <FaAws size={24} />,
  Kubernetes: <AiOutlineKubernetes size={24} />,
  Python: <IoLogoPython size={24} />,
  'C#': <TbBrandCSharp size={24} />,
};

export const SKILLS: Skill[] = SKILLS_DATA.map((skill) => ({
  ...skill,
  icon: SKILL_ICONS[skill.name] ?? null,
}));
