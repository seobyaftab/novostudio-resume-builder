import { ResumeDocument, FontSize, SpacingLevel } from '../types/resume';

export interface OptimizationResult {
  targetPages: number;
  configPatch: Partial<ResumeDocument['config']>;
  reductionsApplied: string[];
}

export function calculateSpaceOptimization(
  doc: ResumeDocument,
  targetPages: number = 1
): OptimizationResult {
  const reductions: string[] = [];
  const configPatch: Partial<ResumeDocument['config']> = {};

  // 1. Analyze length of text content
  const workCount = doc.data.work.length;
  const eduCount = doc.data.education.length;
  const totalBullets = doc.data.work.reduce((acc, w) => acc + (w.bullets?.length || 0), 0);
  const totalEstimatedLoad = workCount * 4 + eduCount * 3 + totalBullets * 2;

  // 2. Adjust font size if heavily overloaded
  let newFontSize: FontSize = doc.config.font.size;
  if (totalEstimatedLoad > 28 && targetPages === 1) {
    newFontSize = 'XS';
    reductions.push('Reduced font size to Compact (XS)');
  } else if (totalEstimatedLoad > 18 && targetPages === 1) {
    newFontSize = 'S';
    reductions.push('Adjusted font size to Small (S)');
  }

  // 3. Compact margins
  let newMargins: SpacingLevel = doc.config.format.customMarginsLevel;
  if (targetPages === 1 && totalEstimatedLoad > 16) {
    newMargins = 'S';
    reductions.push('Narrowed page margins to Slim (S)');
  }

  // 4. Compact vertical spacing between sections and items
  let newSpacing: SpacingLevel = doc.config.format.customSpacingLevel;
  if (targetPages === 1 && totalEstimatedLoad > 14) {
    newSpacing = 'S';
    reductions.push('Tightened vertical line and section spacing (S)');
  }

  configPatch.font = {
    ...doc.config.font,
    size: newFontSize,
  };

  configPatch.format = {
    ...doc.config.format,
    customMargins: true,
    customMarginsLevel: newMargins,
    customSpacing: true,
    customSpacingLevel: newSpacing,
  };

  // 5. Balance columns if asymmetric imbalance exists
  const workBullets = doc.data.work.length;
  const skillsCount = doc.data.skills.length + doc.data.languages.length;
  if (skillsCount > workBullets * 2) {
    configPatch.layout = {
      ...doc.config.layout,
      sideBalancer: 2, // widen sidebar slightly
    };
    reductions.push('Balanced column grid ratios');
  }

  return {
    targetPages,
    configPatch,
    reductionsApplied: reductions.length > 0 ? reductions : ['Document already fits optimally'],
  };
}
