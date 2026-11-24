import { FontFamily, FontSize, SpacingLevel } from '../types/resume';

export interface ColorTheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  textDark: string;
  textLight: string;
}

export const COLOR_THEMES: Record<string, ColorTheme> = {
  'tc-1': {
    id: 'tc-1',
    name: 'Teal Minimal',
    primary: '#0d9488',
    secondary: '#14b8a6',
    accent: '#ccfbf1',
    background: '#f0fdfa',
    textDark: '#134e4a',
    textLight: '#ffffff',
  },
  'tc-2': {
    id: 'tc-2',
    name: 'Classic Navy',
    primary: '#1e3a8a',
    secondary: '#3b82f6',
    accent: '#dbeafe',
    background: '#eff6ff',
    textDark: '#172554',
    textLight: '#ffffff',
  },
  'tc-3': {
    id: 'tc-3',
    name: 'Emerald Green',
    primary: '#047857',
    secondary: '#10b981',
    accent: '#d1fae5',
    background: '#ecfdf5',
    textDark: '#064e3b',
    textLight: '#ffffff',
  },
  'tc-4': {
    id: 'tc-4',
    name: 'Executive Charcoal',
    primary: '#1e293b',
    secondary: '#475569',
    accent: '#e2e8f0',
    background: '#f8fafc',
    textDark: '#0f172a',
    textLight: '#ffffff',
  },
  'tc-5': {
    id: 'tc-5',
    name: 'Royal Burgundy',
    primary: '#881337',
    secondary: '#be123c',
    accent: '#ffe4e6',
    background: '#fff1f2',
    textDark: '#4c0519',
    textLight: '#ffffff',
  },
  'tc-6': {
    id: 'tc-6',
    name: 'Deep Amethyst',
    primary: '#581c87',
    secondary: '#7e22ce',
    accent: '#f3e8ff',
    background: '#faf5ff',
    textDark: '#3b0764',
    textLight: '#ffffff',
  },
  'tc-7': {
    id: 'tc-7',
    name: 'Warm Bronze',
    primary: '#78350f',
    secondary: '#b45309',
    accent: '#fef3c7',
    background: '#fffbeb',
    textDark: '#451a03',
    textLight: '#ffffff',
  },
  'tc-8': {
    id: 'tc-8',
    name: 'Nordic Slate',
    primary: '#334155',
    secondary: '#64748b',
    accent: '#f1f5f9',
    background: '#f8fafc',
    textDark: '#0f172a',
    textLight: '#ffffff',
  },
  'tc-9': {
    id: 'tc-9',
    name: 'Modern Crimson',
    primary: '#b91c1c',
    secondary: '#ef4444',
    accent: '#fee2e2',
    background: '#fef2f2',
    textDark: '#7f1d1d',
    textLight: '#ffffff',
  },
  'tc-10': {
    id: 'tc-10',
    name: 'Steel Cyan',
    primary: '#0e7490',
    secondary: '#06b6d4',
    accent: '#cffafe',
    background: '#ecfeff',
    textDark: '#164e63',
    textLight: '#ffffff',
  },
  'tc-11': {
    id: 'tc-11',
    name: 'Forest Olive',
    primary: '#3f6212',
    secondary: '#65a30d',
    accent: '#ecfccb',
    background: '#f7fee7',
    textDark: '#1a2e05',
    textLight: '#ffffff',
  },
  'tc-12': {
    id: 'tc-12',
    name: 'Midnight Black',
    primary: '#09090b',
    secondary: '#27272a',
    accent: '#e4e4e7',
    background: '#fafafa',
    textDark: '#09090b',
    textLight: '#ffffff',
  },
};

export function getTheme(themeId: string, customPrimary?: string): ColorTheme {
  const base = COLOR_THEMES[themeId] || COLOR_THEMES['tc-1'];
  if (customPrimary) {
    return {
      ...base,
      primary: customPrimary,
      secondary: customPrimary,
      textDark: customPrimary,
    };
  }
  return base;
}

export function getFontClass(font: FontFamily): string {
  switch (font) {
    case 'Ubuntu': return 'font-ubuntu';
    case 'Roboto': return 'font-roboto';
    case 'Raleway': return 'font-raleway';
    case 'Montserrat': return 'font-montserrat';
    case 'Merriweather': return 'font-merriweather';
    case 'Nunito': return 'font-nunito';
    case 'Open Sans': return 'font-opensans';
    case 'Overpass': return 'font-overpass';
    case 'Quicksand': return 'font-quicksand';
    case 'Inter':
    default: return 'font-inter';
  }
}

export function getFontSizeConfig(size: FontSize) {
  switch (size) {
    case '2XS':
      return { body: 'text-[9px] leading-[13px]', heading: 'text-[13px] leading-[17px]', sub: 'text-[10px]' };
    case 'XS':
      return { body: 'text-[9.5px] leading-[14px]', heading: 'text-[14px] leading-[18px]', sub: 'text-[10.5px]' };
    case 'S':
      return { body: 'text-[10px] leading-[15px]', heading: 'text-[15px] leading-[19px]', sub: 'text-[11px]' };
    case 'M':
    default:
      return { body: 'text-[10.5px] leading-[16px]', heading: 'text-[16px] leading-[20px]', sub: 'text-[11.5px]' };
    case 'L':
      return { body: 'text-[11px] leading-[17px]', heading: 'text-[17px] leading-[21px]', sub: 'text-[12px]' };
    case 'XL':
      return { body: 'text-[12px] leading-[18px]', heading: 'text-[18px] leading-[22px]', sub: 'text-[13px]' };
    case '2XL':
      return { body: 'text-[13px] leading-[19px]', heading: 'text-[19px] leading-[23px]', sub: 'text-[14px]' };
  }
}

export function getMarginConfig(level: SpacingLevel) {
  switch (level) {
    case 'XS': return 'p-4';
    case 'S': return 'p-6';
    case 'M':
    default: return 'p-8';
    case 'L': return 'p-10';
    case 'XL': return 'p-12';
  }
}

export function getSpacingConfig(level: SpacingLevel) {
  switch (level) {
    case 'XS': return { sectionGap: 'space-y-2', itemGap: 'space-y-1' };
    case 'S': return { sectionGap: 'space-y-3', itemGap: 'space-y-1.5' };
    case 'M':
    default: return { sectionGap: 'space-y-4', itemGap: 'space-y-2' };
    case 'L': return { sectionGap: 'space-y-5', itemGap: 'space-y-2.5' };
    case 'XL': return { sectionGap: 'space-y-6', itemGap: 'space-y-3' };
  }
}

// Balancer calculations
export function getColumnGridTemplate(
  balancer: number,
  isAsymmetric = false,
  sidebarPlacement: 'left' | 'right' = 'right'
): string {
  if (isAsymmetric) {
    // Side balancer range -5 to +5 (32% base sidebar width shifted by 1.5% per step)
    const sidebarPercent = 32 + balancer * 1.5;
    const contentPercent = 100 - sidebarPercent;
    if (sidebarPlacement === 'left') {
      return `${sidebarPercent}% ${contentPercent}%`;
    }
    return `${contentPercent}% ${sidebarPercent}%`;
  }
  // Symmetric balancer range -10 to +10 (50% base width shifted by 1.5% per step)
  const leftPercent = 50 + balancer * 1.5;
  const rightPercent = 100 - leftPercent;
  return `${leftPercent}% ${rightPercent}%`;
}
