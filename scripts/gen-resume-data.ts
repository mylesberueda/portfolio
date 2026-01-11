import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parseArgs } from 'node:util';

import { format } from 'date-fns';

import { AUTHOR } from '../src/lib/author.ts';
import { LINKS } from '../src/lib/links.ts';
import { EDUCATION } from '../src/lib/resume/education.ts';
import { WORK_EXPERIENCE } from '../src/lib/resume/experience.ts';
import { SKILLS } from '../src/lib/resume/skills.ts';

const { values } = parseArgs({
  options: {
    experience: {
      type: 'string',
      short: 'e',
    },
  },
});

function formatDate(date: Date | 'current'): string {
  if (date === 'current') return 'Present';
  return format(date, 'MMM yyyy');
}

function extractUsername(url: string): string {
  const parts = url.replace(/\/$/, '').split('/');
  return parts[parts.length - 1];
}

function buildAuthorData() {
  const phone = process.env.RESUME_PHONE;
  const address = process.env.RESUME_ADDRESS;
  const dateOfBirth = process.env.RESUME_DATE_OF_BIRTH;

  return {
    ...AUTHOR,
    email: LINKS.email.replace('mailto:', ''),
    github: extractUsername(LINKS.github),
    linkedin: extractUsername(LINKS.linkedin),
    mastodon: extractUsername(LINKS.mastodon),
    ...(phone && { phone }),
    ...(address && { address }),
    ...(dateOfBirth && { dateOfBirth }),
  };
}

function buildExperienceData(limit?: number) {
  const experiences = limit ? WORK_EXPERIENCE.slice(0, limit) : WORK_EXPERIENCE;

  const formatLocation = (location: string | undefined) => {
    if (location?.toLocaleLowerCase().startsWith('remote')) {
      const actual = location?.match(/\((.*)\)/)?.at(1);
      if (!actual) return location;

      return `from ${actual}`;
    }

    return location;
  };

  return experiences.map((exp) => ({
    company: exp.company,
    position: exp.position,
    location: formatLocation(exp.location),
    startDate: formatDate(exp.dates.start),
    endDate: formatDate(exp.dates.end),
    description: exp.description,
    entries: exp.entries,
  }));
}

function buildEducationData() {
  return EDUCATION.map((edu) => ({
    school: edu.school,
    degree: edu.degree,
    gpa: edu.gpa,
    startDate: formatDate(edu.dates.start),
    endDate: formatDate(edu.dates.end),
    description: edu.description,
    entries: edu.entries,
  }));
}

function buildSkillsData() {
  return SKILLS.map((skill) => ({
    name: skill.name,
    type: skill.type,
    experience: skill.experience,
  }));
}

async function main() {
  const experienceLimit = values.experience ? Number.parseInt(values.experience, 10) : undefined;

  const data = {
    author: buildAuthorData(),
    experience: buildExperienceData(experienceLimit),
    education: buildEducationData(),
    skills: buildSkillsData(),
  };

  const today = new Date();
  const dateStr = format(today, 'yyyy-MM-dd');
  const outputDir = join(process.cwd(), '_typst', '.resumes', dateStr);

  await mkdir(outputDir, { recursive: true });

  const outputPath = join(outputDir, 'data.json');
  await writeFile(outputPath, JSON.stringify(data, null, 2));

  console.log(`Generated: ${outputPath}`);

  if (experienceLimit) {
    console.log(`  (limited to ${experienceLimit} experience entries)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
