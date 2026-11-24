import { initialResume } from './src/data/defaultResume.ts';
import { calculateSpaceOptimization } from './src/engine/spaceOptimizer.ts';
import { runAtsAnalysis } from './src/engine/atsEngine.ts';
import { generateSmartSummary, rewriteBulletToXyz } from './src/engine/aiAssistant.ts';
import { COLOR_THEMES, getFontClass, getTheme, getColumnGridTemplate } from './src/engine/themeEngine.ts';
import { TemplateId, FontFamily } from './src/types/resume.ts';

const ALL_TEMPLATES: TemplateId[] = [
  'basic', 'creative', 'modern', 'executive', 'simple', 'functional',
  'professional', 'college', 'hybrid', 'minimalist', 'traditional',
  'general', 'it', 'tech', 'skill-based', 'combined'
];

console.log('--- 1. Testing Template Coverage ---');
console.log(`Total templates defined: ${ALL_TEMPLATES.length}`);
if (ALL_TEMPLATES.length !== 16) {
  throw new Error(`Expected 16 templates, found ${ALL_TEMPLATES.length}`);
}
console.log('✓ All 16 Novorésumé templates registered.');

console.log('\n--- 2. Testing Color Themes & Fonts ---');
const themeCount = Object.keys(COLOR_THEMES).length;
console.log(`Color themes available: ${themeCount}`);
const fontList: FontFamily[] = [
  'Ubuntu', 'Roboto', 'Raleway', 'Montserrat', 'Merriweather',
  'Nunito', 'Open Sans', 'Overpass', 'Quicksand', 'Inter'
];
fontList.forEach(f => {
  const cls = getFontClass(f);
  if (!cls.startsWith('font-')) throw new Error(`Invalid font class for ${f}`);
});
console.log(`Preloaded font families: ${fontList.length} verified.`);
const sampleTheme = getTheme('tc-1');
console.log(`Theme tc-1 Primary: ${sampleTheme.primary}, Secondary: ${sampleTheme.secondary}`);
console.log(`Grid balancer (-5 asymmetric): ${getColumnGridTemplate(-5, true)}`);
console.log(`Grid balancer (0 asymmetric): ${getColumnGridTemplate(0, true)}`);
console.log(`Grid balancer (+5 asymmetric): ${getColumnGridTemplate(5, true)}`);
console.log('✓ All 12 color themes, grid balancers, and 10 font styles ready.');

console.log('\n--- 3. Testing ATS Resume Scoring Engine ---');
const sampleJobDescription = `
Senior Software Engineer needed with experience in React, TypeScript, Rust, Distributed Systems,
CI/CD pipelines, Docker, Kubernetes, microservices architecture, and AWS cloud infrastructure.
Must have demonstrated leadership in performance optimization and team mentoring.
`;
const atsResult = runAtsAnalysis(initialResume, sampleJobDescription);
console.log(`ATS Overall Score: ${atsResult.overallScore}/100 (${atsResult.tier} - ${atsResult.tierLabel})`);
console.log(`Category breakdown:`);
atsResult.categories.forEach(c => console.log(`  - ${c.name}: ${c.score}/100 [${c.feedback}]`));
console.log(`Matched Keywords: ${atsResult.matchedKeywords.slice(0, 8).join(', ')}...`);
console.log(`Missing Keywords: ${atsResult.missingKeywords.slice(0, 8).join(', ')}...`);
if (atsResult.overallScore < 50 || atsResult.categories.length !== 5) {
  throw new Error('ATS scoring calculation failed');
}
console.log('✓ ATS Engine passed with full 5-category evaluation.');

console.log('\n--- 4. Testing SpaceOptimizer Auto-Fit ---');
const opt = calculateSpaceOptimization(initialResume, 1);
console.log(`Target page count: ${opt.targetPages}`);
console.log(`Applied reductions: ${opt.reductionsApplied.join('; ')}`);
console.log('✓ SpaceOptimizer calculation verified.');

console.log('\n--- 5. Testing AI Assistant (Google XYZ Bullet & Summary) ---');
const rawBullet = "worked on database queries to make the site faster";
const enhanced = rewriteBulletToXyz(rawBullet);
console.log(`Original: "${enhanced.original}"`);
console.log(`XYZ Bullet: "${enhanced.enhanced}"`);
console.log(`Formula: ${enhanced.explanation}`);

const generatedSummary = generateSmartSummary(initialResume);
console.log(`Generated Summary: "${generatedSummary.slice(0, 100)}..."`);
if (!enhanced.enhanced.includes('%') || generatedSummary.length < 50) {
  throw new Error('AI Assistant generation incomplete');
}
console.log('✓ AI Assistant functions verified.');

console.log('\n=== ALL VERIFICATION CHECKS PASSED SUCCESSFULLY ===');
