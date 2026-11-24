import React from 'react';
import { LanguageEntry, SkillDecoration, InfographicType } from '../../types/resume';
import { ColorTheme } from '../../engine/themeEngine';
import { SectionHeader } from './SectionHeader';
import { EditableText } from '../canvas/EditableText';
import { useResumeStore } from '../../store/useResumeStore';
import { Plus, X } from 'lucide-react';

interface LanguagesBlockProps {
  languages: LanguageEntry[];
  theme: ColorTheme;
  decoration?: SkillDecoration;
  infographicType?: InfographicType;
  headerVariant?: 'underline' | 'pill' | 'banner' | 'clean' | 'left-bar';
}

export const LanguagesBlock: React.FC<LanguagesBlockProps> = ({
  languages,
  theme,
  headerVariant,
}) => {
  const { addLanguage, updateLanguage, removeLanguage } = useResumeStore();

  const handleAddLanguage = () => {
    addLanguage({ name: 'Language', level: 4, proficiencyLabel: 'Working proficiency' });
  };

  return (
    <div className="languages-section">
      <SectionHeader title="Languages" theme={theme} variant={headerVariant} />
      <div className="space-y-1.5">
        {languages.map((item) => (
          <div key={item.id} className="flex justify-between items-center text-[10.5px] group/lang relative">
            <div className="flex items-center gap-1.5 flex-1">
              <EditableText
                value={item.name}
                onChange={(val) => updateLanguage(item.id, { name: val })}
                placeholder="Language"
                className="font-medium text-slate-700"
              />
              <button
                onClick={() => removeLanguage(item.id)}
                className="opacity-0 group-hover/lang:opacity-100 text-slate-400 hover:text-rose-600 transition-opacity no-print"
                title="Delete Language"
              >
                <X size={10} />
              </button>
            </div>

            {/* Clickable interactive 5 dots indicator */}
            <div className="flex gap-1 items-center">
              {[1, 2, 3, 4, 5].map((dot) => {
                const filled = dot <= item.level;
                return (
                  <button
                    key={dot}
                    onClick={() => updateLanguage(item.id, { level: dot })}
                    className="w-2 h-2 rounded-full cursor-pointer transition-transform hover:scale-125"
                    style={{
                      backgroundColor: filled ? theme.primary : '#e2e8f0',
                    }}
                    title={`Set to ${dot} / 5`}
                  />
                );
              })}
            </div>
          </div>
        ))}

        {/* Add Language Button right on canvas */}
        <button
          onClick={handleAddLanguage}
          className="flex items-center gap-1 text-[10px] font-semibold text-teal-700 hover:text-teal-900 mt-1 py-0.5 no-print"
        >
          <Plus size={11} /> Add Language
        </button>
      </div>
    </div>
  );
};
