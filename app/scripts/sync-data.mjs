// Copies the source-of-truth JSON data from ../data into public/data
// so Vite can serve it as a static asset. Run automatically before dev/build.
import { copyFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourceDir = join(__dirname, '..', '..', 'data');
const destDir = join(__dirname, '..', 'public', 'data');

const files = [
  'schools_undergrad.json',
  'programs_medical_pathways.json',
];

mkdirSync(destDir, { recursive: true });

for (const file of files) {
  const src = join(sourceDir, file);
  const dest = join(destDir, file);
  if (!existsSync(src)) {
    console.warn(`[sync-data] WARNING: source file missing: ${src}`);
    continue;
  }
  copyFileSync(src, dest);
  console.log(`[sync-data] copied ${file}`);
}
