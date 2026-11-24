import fs from 'fs';
import path from 'path';

const TEMPLATES = [
  { id: 'basic', file: 'basic-resume-template.png' },
  { id: 'creative', file: 'creative-resume-template.png' },
  { id: 'modern', file: 'modern-resume-template.png' },
  { id: 'executive', file: 'executive-resume-template.png' },
  { id: 'simple', file: 'simple-resume-template.png' },
  { id: 'functional', file: 'functional-resume-template.png' },
  { id: 'professional', file: 'professional-resume-template.png' },
  { id: 'college', file: 'college-resume-template.png' },
  { id: 'skill-based', file: 'skill-based-resume-template.png' },
  { id: 'minimalist', file: 'minimalist-resume-template.png' },
  { id: 'hybrid', file: 'hybrid-resume-template.png' },
  { id: 'traditional', file: 'traditional-resume-template.png' },
  { id: 'general', file: 'general-resume-template.png' },
  { id: 'it', file: 'it-resume-template.png' },
  { id: 'tech', file: 'tech-resume-template.png' },
  { id: 'combined', file: 'combined-resume-template.png' }
];

const outDir = path.resolve('public/templates');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function downloadAll() {
  console.log('Downloading all 16 template preview images...');
  for (const t of TEMPLATES) {
    const url = `https://cdn-image.novoresume.com/image/cms/media/templates/${t.file}?width=430&quality=82&format=webp`;
    const outPath = path.join(outDir, `${t.id}.webp`);
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      if (!res.ok) {
        console.error(`Failed ${t.id}: status ${res.status}`);
        continue;
      }
      const buffer = await res.arrayBuffer();
      fs.writeFileSync(outPath, Buffer.from(buffer));
      console.log(`✓ Saved ${t.id}.webp (${buffer.byteLength} bytes)`);
    } catch (e) {
      console.error(`Error downloading ${t.id}:`, e);
    }
  }
  console.log('All downloads completed!');
}

downloadAll();
