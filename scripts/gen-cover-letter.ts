import { execSync } from 'node:child_process';
import { copyFile, mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parseArgs } from 'node:util';

import { format } from 'date-fns';

const TYPST_DIR = '_typst';
const RESUMES_DIR = '_typst/.resumes';
const OUTPUT_FILENAME = 'BERUEDA-MYLES';

function sanitizeCompanyName(name: string): string {
  // Replace spaces with dashes, keep existing dashes
  return name.replace(/\s+/g, '-');
}

async function getLetterFiles(templateDir: string): Promise<string[]> {
  const entries = await readdir(templateDir);
  return entries.filter((f) => f.startsWith('letter') && f.endsWith('.typ')).sort();
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
  const { positionals } = parseArgs({
    allowPositionals: true,
  });

  if (positionals.length === 0) {
    console.error('Usage: pnpm gen:cover-letter "Company Name" ["Job Role"]');
    console.error('Example: pnpm gen:cover-letter "Acme Corp" "Senior Software Engineer"');
    process.exit(1);
  }

  const companyName = positionals[0];
  const jobRole = positionals[1];
  const sanitizedCompany = sanitizeCompanyName(companyName);

  const today = new Date();
  const dateStr = format(today, 'yyyy-MM-dd');
  const baseDir = join(process.cwd(), RESUMES_DIR, dateStr);
  const dataJsonPath = join(baseDir, 'data.json');

  // Check data.json exists
  try {
    await stat(dataJsonPath);
  } catch {
    console.error(`Error: ${dataJsonPath} not found.`);
    console.error('Run "pnpm gen:resume:data" first.');
    process.exit(1);
  }

  // Find templates with letter files
  const entries = await readdir(TYPST_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith('.') || entry.name.startsWith('_')) {
      continue;
    }

    const templateDir = join(process.cwd(), TYPST_DIR, entry.name);
    const letterFiles = await getLetterFiles(templateDir);

    if (letterFiles.length === 0) {
      continue;
    }

    const outputDir = join(baseDir, entry.name);
    await mkdir(outputDir, { recursive: true });

    // Copy templates, they're customized per instance
    await copyTemplateFiles(templateDir, outputDir);
    await copyFile(dataJsonPath, join(outputDir, 'data.json'));

    const companyJsonPath = join(outputDir, `company-${sanitizedCompany}.json`);
    const companyJson: Record<string, string> = {
      $schema: '../../company.schema.json',
      name: companyName,
    };
    if (jobRole) {
      companyJson.role = jobRole;
    }
    await writeFile(companyJsonPath, JSON.stringify(companyJson, null, 2));

    console.log(`Generating cover letters for ${entry.name} → ${companyName}`);

    const fontPath = join(process.cwd(), TYPST_DIR, '_fonts');

    for (const letterFile of letterFiles) {
      const letterTypPath = join(outputDir, letterFile);
      const baseName = letterFile.replace(/\.typ$/, '');
      const suffix = baseName === 'letter' ? '' : baseName.replace(/^letter/, '');
      const pdfPath = join(outputDir, `${OUTPUT_FILENAME}_${sanitizedCompany}${suffix}.pdf`);
      const typOutputPath = join(outputDir, `${OUTPUT_FILENAME}_${sanitizedCompany}${suffix}.typ`);

      let letterContent = await readFile(letterTypPath, 'utf-8');
      letterContent = letterContent.replace(/json\("company\.json"\)/g, `json("company-${sanitizedCompany}.json")`);
      await writeFile(typOutputPath, letterContent);

      try {
        const rootPath = process.cwd();
        execSync(`typst compile --pdf-standard ua-1 --root "${rootPath}" --font-path "${fontPath}" "${typOutputPath}" "${pdfPath}"`, {
          stdio: 'inherit',
        });

        console.log(`  Generated: ${pdfPath}`);
        console.log(`       typ: ${typOutputPath}`);
      } catch (err) {
        console.error(`Error compiling ${letterFile}:`, err);
        process.exit(1);
      }
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
