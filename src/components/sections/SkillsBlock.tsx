import React from 'react';
import { SkillEntry, SkillDecoration, InfographicType } from '../../types/resume';
import { ColorTheme } from '../../engine/themeEngine';
import { SectionHeader } from './SectionHeader';
import { EditableText } from '../canvas/EditableText';
import { useResumeStore } from '../../store/useResumeStore';
import { Plus, X } from 'lucide-react';

interface SkillsBlockProps {
  title?: string;
  skills: SkillEntry[];
  theme: ColorTheme;
  decoration?: SkillDecoration;
  infographicType?: InfographicType;
  headerVariant?: 'underline' | 'pill' | 'banner' | 'clean' | 'left-bar';
}

export const SkillsBlock: React.FC<SkillsBlockProps> = ({
  title = 'Skills & Competencies',
  skills,
  theme,
  decoration = 'highlight',
  infographicType = 'dots-1',
  headerVariant,
}) => {
  const { addSkill, updateSkill, removeSkill } = useResumeStore();

  const handleAddSkill = () => {
    addSkill({ name: 'New Skill', level: 85 });
  };

  return (
    <div className="skills-section">
      <SectionHeader title={title} theme={theme} variant={headerVariant} />

      {decoration === 'infographic' ? (
        <div className="space-y-1.5">
          {skills.map((skill) => (
            <div key={skill.id} className="flex items-center justify-between text-[10.5px] group/item relative">
              <div className="flex items-center gap-1.5 flex-1">
                <EditableText
                  value={skill.name}
                  onChange={(val) => updateSkill(skill.id, { name: val })}
                  className="font-medium text-slate-700"
                />
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="opacity-0 group-hover/item:opacity-100 text-slate-400 hover:text-rose-600 transition-opacity no-print"
                  title="Delete Skill"
                >
                  <X size={10} />
                </button>
              </div>

              {infographicType === 'bar-1' ? (
                <div className="w-20 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full cursor-pointer"
                    style={{ width: `${skill.level}%`, backgroundColor: theme.primary }}
                    title={`Proficiency: ${skill.level}%`}
                  />
                </div>
              ) : (
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((step) => {
                    const filled = step <= Math.round(skill.level / 20);
                    return (
                      <button
                        key={step}
                        onClick={() => updateSkill(skill.id, { level: step * 20 })}
                        className="w-2 h-2 rounded-full cursor-pointer transition-transform hover:scale-125"
                        style={{
                          backgroundColor: filled ? theme.primary : '#e2e8f0',
                        }}
                        title={`Set to ${step} / 5`}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {/* Add skill button right on canvas */}
          <button
            onClick={handleAddSkill}
            className="flex items-center gap-1 text-[10px] font-semibold text-teal-700 hover:text-teal-900 mt-1 py-0.5 no-print"
          >
            <Plus size={11} /> Add Skill
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-1.5 items-center">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className={`group/skill relative inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                decoration === 'bubble'
                  ? 'border bg-white text-slate-700'
                  : 'text-slate-800'
              }`}
              style={{
                backgroundColor: decoration === 'bubble' ? '#ffffff' : theme.accent,
                borderColor: decoration === 'bubble' ? theme.primary + '50' : 'transparent',
              }}
            >
              <EditableText
                value={skill.name}
                onChange={(val) => updateSkill(skill.id, { name: val })}
                className="outline-hidden"
              />
              <button
                onClick={() => removeSkill(skill.id)}
                className="opacity-0 group-hover/skill:opacity-100 text-slate-400 hover:text-rose-600 transition-opacity no-print"
                title="Delete Skill"
              >
                <X size={10} />
              </button>
            </div>
          ))}

          {/* Add skill button chip right on canvas */}
          <button
            onClick={handleAddSkill}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-dashed border-slate-300 text-[10px] font-semibold text-slate-500 hover:text-teal-700 hover:border-teal-400 hover:bg-teal-50 transition-colors no-print"
          >
            <Plus size={10} /> Add Skill
          </button>
        </div>
      )}
    </div>
  );
};
