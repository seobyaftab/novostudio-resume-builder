import React from 'react';
import { ColorTheme } from '../../engine/themeEngine';

interface SectionHeaderProps {
  title: string;
  theme: ColorTheme;
  variant?: 'underline' | 'pill' | 'banner' | 'clean' | 'left-bar';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, theme, variant = 'underline' }) => {
  if (variant === 'pill') {
    return (
      <div className="mb-2.5">
        <span
          className="inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-white"
          style={{ backgroundColor: theme.primary }}
        >
          {title}
        </span>
      </div>
    );
  }

  if (variant === 'left-bar') {
    return (
      <div className="mb-2.5 flex items-center gap-2">
        <div className="w-1 h-4 rounded-full" style={{ backgroundColor: theme.primary }} />
        <h3 className="font-bold uppercase tracking-wider text-xs" style={{ color: theme.primary }}>
          {title}
        </h3>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div className="mb-2.5 py-1 px-2 rounded-sm" style={{ backgroundColor: theme.accent }}>
        <h3 className="font-bold uppercase tracking-wider text-xs" style={{ color: theme.textDark }}>
          {title}
        </h3>
      </div>
    );
  }

  if (variant === 'clean') {
    return (
      <div className="mb-2.5">
        <h3 className="font-bold uppercase tracking-wider text-xs text-slate-800">
          {title}
        </h3>
      </div>
    );
  }

  // Default: elegant underline
  return (
    <div className="mb-2.5 pb-1 border-b" style={{ borderColor: theme.primary + '40' }}>
      <h3 className="font-bold uppercase tracking-wider text-xs" style={{ color: theme.primary }}>
        {title}
      </h3>
    </div>
  );
};
