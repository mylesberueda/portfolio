import { execSync } from 'node:child_process';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { parseArgs } from 'node:util';

import { format } from 'date-fns';

const TYPST_DIR = '_typst';
const RESUMES_DIR = '_typst/.resumes';

async function main() {
  const { positionals } = parseArgs({
    allowPositionals: true,
  });

  const today = new Date();
  const dateStr = format(today, 'yyyy-MM-dd');
  const baseDir = join(process.cwd(), RESUMES_DIR, dateStr);

  // Find all .typ files that look like cover letters (contain _Company pattern)
  const entries = await readdir(baseDir, { withFileTypes: true });

  const fontPath = join(process.cwd(), TYPST_DIR, '_fonts');
  const rootPath = process.cwd();
  let compiled = 0;

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const templateDir = join(baseDir, entry.name);
    const files = await readdir(templateDir);
    const coverLetterTypFiles = files.filter((f) => f.endsWith('.typ') && f.includes('_') && !f.startsWith('letter'));
    const targetCompany = positionals[0];

    for (const typFile of coverLetterTypFiles) {
      if (targetCompany) {
        const sanitizedTarget = targetCompany.replace(/\s+/g, '-');
        if (!typFile.includes(sanitizedTarget)) continue;
      }

      const typPath = join(templateDir, typFile);
      const pdfPath = typPath.replace(/\.typ$/, '.pdf');

      try {
        execSync(`typst compile --root "${rootPath}" --font-path "${fontPath}" "${typPath}" "${pdfPath}"`, {
          stdio: 'inherit',
        });
        console.log(`Recompiled: ${pdfPath}`);
        compiled++;
      } catch (err) {
        console.error(`Error compiling ${typFile}:`, err);
      }
    }
  }

  if (compiled === 0) {
    console.log('No cover letters found to recompile.');
    if (positionals[0]) {
      console.log(`  (filtered by: "${positionals[0]}")`);
    }
  } else {
    console.log(`\nRecompiled ${compiled} cover letter(s).`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
