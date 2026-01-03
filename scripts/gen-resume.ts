import { execSync } from 'node:child_process';
import { copyFile, mkdir, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

import { format } from 'date-fns';

import { AUTHOR } from '../src/lib/author.ts';

const TYPST_DIR = '_typst';
const RESUMES_DIR = '_typst/.resumes';
const OUTPUT_FILENAME = `BERUEDA-${AUTHOR.firstname.toUpperCase()}`;

async function getTemplates(): Promise<string[]> {
  const entries = await readdir(TYPST_DIR, { withFileTypes: true });
  const templates: string[] = [];

  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('.') && !entry.name.startsWith('_')) {
      const resumePath = join(TYPST_DIR, entry.name, 'resume.typ');
      try {
        await stat(resumePath);
        templates.push(entry.name);
      } catch {
        console.warn(`Warning: ${entry.name}/ has no resume.typ - skipping. Rename your resume file to resume.typ.`);
      }
    }
  }

  return templates;
}

async function copyTemplateFiles(templateDir: string, outputDir: string): Promise<void> {
  const entries = await readdir(templateDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isFile()) {
      const src = join(templateDir, entry.name);
      const dest = join(outputDir, entry.name);
      await copyFile(src, dest);
    }
  }
}

async function main() {
  const today = new Date();
  const dateStr = format(today, 'yyyy-MM-dd');
  const baseDir = join(process.cwd(), RESUMES_DIR, dateStr);
  const dataJsonPath = join(baseDir, 'data.json');

  try {
    await stat(dataJsonPath);
  } catch {
    console.error(`Error: ${dataJsonPath} not found.`);
    console.error('Run "pnpm gen:resume:data" first.');
    process.exit(1);
  }

  // Find templates
  const templates = await getTemplates();

  if (templates.length === 0) {
    console.error(`Error: No templates found in ${TYPST_DIR}/`);
    console.error('Templates must contain a resume.typ file.');
    process.exit(1);
  }

  console.log(`Found ${templates.length} template(s): ${templates.join(', ')}`);

  for (const template of templates) {
    const templateDir = join(process.cwd(), TYPST_DIR, template);
    const outputDir = join(baseDir, template);

    await mkdir(outputDir, { recursive: true });

    // Copy template files to output dir
    await copyTemplateFiles(templateDir, outputDir);

    // Copy data.json to output dir
    await copyFile(dataJsonPath, join(outputDir, 'data.json'));

    // Compile with typst
    const resumeTypPath = join(outputDir, 'resume.typ');
    const pdfPath = join(outputDir, `${OUTPUT_FILENAME}.pdf`);
    const typOutputPath = join(outputDir, `${OUTPUT_FILENAME}.typ`);

    try {
      const fontPath = join(process.cwd(), TYPST_DIR, '_fonts');
      execSync(`typst compile --font-path "${fontPath}" "${resumeTypPath}" "${pdfPath}"`, { stdio: 'inherit' });

      // Copy resume.typ reference
      await copyFile(resumeTypPath, typOutputPath);

      console.log(`Generated: ${pdfPath}`);
      console.log(`      typ: ${typOutputPath}`);
    } catch (err) {
      console.error(`Error compiling ${template}:`, err);
      process.exit(1);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
