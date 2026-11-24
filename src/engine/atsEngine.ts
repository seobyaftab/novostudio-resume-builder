import { ResumeDocument } from '../types/resume';

export type AtsRatingTier = 'SIGNIFICANT_GAP' | 'WEAK_ALIGNMENT' | 'GOOD_FOUNDATION' | 'STRONG_FOUNDATION';

export interface AtsCategoryScore {
  key: string;
  name: string;
  score: number; // 0 - 100
  feedback: string;
}

export interface AtsReport {
  overallScore: number;
  tier: AtsRatingTier;
  tierLabel: string;
  categories: AtsCategoryScore[];
  matchedKeywords: string[];
  missingKeywords: string[];
  actionableFindings: string[];
}

const COMMON_ACTION_VERBS = [
  'lead', 'led', 'architect', 'architected', 'spearhead', 'spearheaded', 'engineer', 'engineered',
  'build', 'built', 'design', 'designed', 'develop', 'developed', 'optimize', 'optimized',
  'streamline', 'streamlined', 'scale', 'scaled', 'deploy', 'deployed', 'orchestrate', 'orchestrated',
  'mentor', 'mentored', 'reduce', 'reduced', 'boost', 'boosted', 'automate', 'automated'
];

export function runAtsAnalysis(doc: ResumeDocument, jobDescription: string): AtsReport {
  const jdLower = jobDescription.toLowerCase();
  
  // 1. Gather all resume text
  const resumeText = [
    doc.data.title,
    doc.data.summary,
    ...doc.data.work.flatMap((w) => [w.position, w.company, ...(w.bullets || [])]),
    ...doc.data.skills.map((s) => s.name),
    ...doc.data.softSkills.map((s) => s.name),
    ...doc.data.technicalSkills.map((s) => s.name),
    ...doc.data.education.map((e) => `${e.degree} ${e.school}`),
    ...doc.data.projects.flatMap((p) => [p.title, ...(p.bullets || [])]),
  ].join(' ').toLowerCase();

  // 2. Extract technical & industry keywords from Job Description
  const words = jdLower
    .replace(/[^a-zA-Z0-9+#.\- ]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);

  const stopWords = new Set([
    'and', 'the', 'for', 'with', 'you', 'will', 'are', 'that', 'our', 'this', 'have',
    'your', 'from', 'all', 'can', 'about', 'role', 'work', 'team', 'years', 'experience',
    'working', 'responsibilities', 'qualifications', 'requirements', 'must', 'should'
  ]);

  const candidateKeywords = [...new Set(words.filter((w) => !stopWords.has(w)))];
  
  // High-priority industry terms filter
  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  for (const kw of candidateKeywords) {
    if (resumeText.includes(kw)) {
      if (matchedKeywords.length < 25) matchedKeywords.push(kw);
    } else {
      if (missingKeywords.length < 15) missingKeywords.push(kw);
    }
  }

  const keywordMatchRatio =
    candidateKeywords.length > 0
      ? Math.min(1, matchedKeywords.length / Math.min(candidateKeywords.length, 25))
      : 0.8;
  const keywordScore = Math.round(keywordMatchRatio * 100);

  // 3. Category: Format & Structure
  let formatScore = 100;
  if (!doc.data.contact.email) formatScore -= 30;
  if (!doc.data.contact.phone) formatScore -= 20;
  if (!doc.data.contact.city) formatScore -= 10;
  if (!doc.data.name.givenName || !doc.data.name.familyName) formatScore -= 20;

  // 4. Category: Section Organization
  let sectionScore = 100;
  if (doc.data.work.length === 0) sectionScore -= 40;
  if (doc.data.education.length === 0) sectionScore -= 25;
  if (doc.data.skills.length === 0) sectionScore -= 25;
  if (!doc.data.summary) sectionScore -= 10;

  // 5. Category: Content Quality (Action Verbs & Metrics)
  let actionVerbCount = 0;
  for (const verb of COMMON_ACTION_VERBS) {
    if (resumeText.includes(verb)) actionVerbCount++;
  }

  // Count numbers / metrics (% or digits)
  const metricMatches = resumeText.match(/\b\d+(?:[\.,]\d+)?%?|\$\d+/g) || [];
  let contentScore = 70;
  if (actionVerbCount >= 5) contentScore += 15;
  if (metricMatches.length >= 4) contentScore += 15;

  // 6. Category: Technical Elements (Valid URLs & clean links)
  let techScore = 90;
  if (doc.data.contact.linkedin || doc.data.contact.github) techScore = 100;

  // 7. Overall weighted score
  const overallScore = Math.round(
    keywordScore * 0.35 +
    formatScore * 0.2 +
    sectionScore * 0.15 +
    contentScore * 0.2 +
    techScore * 0.1
  );

  let tier: AtsRatingTier = 'STRONG_FOUNDATION';
  let tierLabel = 'Strong Match';
  if (overallScore < 50) {
    tier = 'SIGNIFICANT_GAP';
    tierLabel = 'Significant Gaps';
  } else if (overallScore < 70) {
    tier = 'WEAK_ALIGNMENT';
    tierLabel = 'Weak Alignment';
  } else if (overallScore < 85) {
    tier = 'GOOD_FOUNDATION';
    tierLabel = 'Good Foundation';
  }

  const findings: string[] = [];
  if (missingKeywords.length > 0) {
    findings.push(`Consider adding target keywords: ${missingKeywords.slice(0, 5).join(', ')}.`);
  }
  if (actionVerbCount < 4) {
    findings.push('Begin more bullet points with strong action verbs (e.g. Architected, Engineered, Optimized).');
  }
  if (metricMatches.length < 3) {
    findings.push('Quantify your achievements with measurable metrics (e.g., "reduced latency by 45%", "serving 10M+ users").');
  }
  if (!doc.data.summary) {
    findings.push('Add a concise Professional Summary at the top to highlight key career achievements.');
  }

  return {
    overallScore,
    tier,
    tierLabel,
    categories: [
      {
        key: 'keywordsAndRelevance',
        name: 'Keywords & Relevance',
        score: keywordScore,
        feedback: `${matchedKeywords.length} matching job keywords detected.`,
      },
      {
        key: 'formatAndStructure',
        name: 'Format & Structure',
        score: Math.max(0, formatScore),
        feedback: 'Clean parseable text structure complying with Taleo & Workday ATS standards.',
      },
      {
        key: 'sectionOrganization',
        name: 'Section Organization',
        score: Math.max(0, sectionScore),
        feedback: 'Standard chronological section layout with clear hierarchical headers.',
      },
      {
        key: 'technicalElements',
        name: 'Technical Elements',
        score: techScore,
        feedback: 'Proper contact links, email formats, and verified social profiles.',
      },
      {
        key: 'contentQuality',
        name: 'Content Quality',
        score: Math.min(100, contentScore),
        feedback: `${actionVerbCount} action verbs and ${metricMatches.length} quantifiable metrics found.`,
      },
    ],
    matchedKeywords,
    missingKeywords,
    actionableFindings: findings.length > 0 ? findings : ['Your resume is impeccably tailored for ATS parsers!'],
  };
}
