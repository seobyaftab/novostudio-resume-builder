import { ResumeDocument } from '../types/resume';

export interface AiSuggestion {
  original: string;
  enhanced: string;
  explanation: string;
}

export function generateSmartSummary(doc: ResumeDocument): string {
  const years = doc.data.work.length > 0 ? `${doc.data.work.length * 2}+` : '5+';
  const topSkills = doc.data.skills.slice(0, 4).map((s) => s.name).join(', ');
  const title = doc.data.title || 'Software Professional';

  return `Results-driven ${title} with ${years} years of hands-on experience delivering robust systems and high-impact solutions. Proficient in ${topSkills}, with a proven track record of optimizing performance, leading cross-functional initiatives, and scaling production workflows. Committed to engineering excellence, measurable business outcomes, and high-velocity team collaboration.`;
}

export function rewriteBulletToXyz(bullet: string): AiSuggestion {
  // Check if bullet starts with weak verb
  let enhanced = bullet.trim();
  let explanation = 'Transformed into the Google XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]"';

  if (!enhanced.match(/\b\d+%/)) {
    enhanced = enhanced.replace(/\.$/, '') + ', improving operational throughput by 35% across core modules.';
  }

  // Capitalize and start with strong verb if missing
  const weakStarters: Record<string, string> = {
    'worked on': 'Architected and deployed',
    'helped with': 'Spearheaded development of',
    'responsible for': 'Orchestrated end-to-end delivery of',
    'did': 'Engineered and launched',
    'made': 'Designed and executed',
  };

  for (const [weak, strong] of Object.entries(weakStarters)) {
    if (enhanced.toLowerCase().startsWith(weak)) {
      enhanced = strong + enhanced.slice(weak.length);
      explanation += ` Replaced passive phrase "${weak}" with high-impact action verb "${strong}".`;
      break;
    }
  }

  return {
    original: bullet,
    enhanced,
    explanation,
  };
}

export async function callExternalAi(
  prompt: string,
  apiKey?: string,
  model = 'gemini-1.5-flash'
): Promise<string> {
  if (!apiKey) {
    throw new Error('No API key provided. Using built-in local heuristic engine.');
  }

  // Direct client-side fetch to Gemini REST API
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!response.ok) {
    throw new Error(`AI API Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}
