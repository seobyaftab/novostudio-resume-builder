import React from 'react';
import { EducationEntry } from '../../types/resume';
import { ColorTheme } from '../../engine/themeEngine';
import { SectionHeader } from './SectionHeader';
import { EditableText } from '../canvas/EditableText';
import { useResumeStore } from '../../store/useResumeStore';
import { Plus, Trash2 } from 'lucide-react';

interface EducationBlockProps {
  education: EducationEntry[];
  theme: ColorTheme;
  headerVariant?: 'underline' | 'pill' | 'banner' | 'clean' | 'left-bar';
}

export const EducationBlock: React.FC<EducationBlockProps> = ({ education, theme, headerVariant }) => {
  const { addEducation, updateEducation, removeEducation } = useResumeStore();

  const handleAddEducation = () => {
    addEducation({
      degree: 'Degree / Program',
      school: 'University / Institution',
      city: 'City, Country',
      startDate: '2019',
      endDate: '2023',
      current: false,
      bullets: [],
    });
  };

  return (
    <div className="education-section">
      <SectionHeader title="Education" theme={theme} variant={headerVariant} />
      <div className="space-y-3">
        {education.map((item) => (
          <div key={item.id} className="education-item group/edu relative border-l-2 border-transparent hover:border-teal-300 pl-2 -ml-2 transition-colors">
            {/* Quick delete education button */}
            <button
              onClick={() => removeEducation(item.id)}
              className="absolute top-0 right-0 opacity-0 group-hover/edu:opacity-100 text-slate-400 hover:text-rose-600 transition-opacity p-0.5 no-print"
              title="Delete this education"
            >
              <Trash2 size={12} />
            </button>

            <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5 mb-0.5">
              <EditableText
                value={item.degree}
                onChange={(val) => updateEducation(item.id, { degree: val })}
                placeholder="Degree / Program"
                className="font-bold text-slate-900 text-xs"
              />
              <div className="text-[10px] font-medium text-slate-500 whitespace-nowrap flex items-center gap-1 shrink-0 ml-auto">
                <EditableText
                  value={item.startDate}
                  onChange={(val) => updateEducation(item.id, { startDate: val })}
                  placeholder="Start"
                  className="min-w-[32px] text-right"
                />
                <span>–</span>
                <EditableText
                  value={item.current ? 'Present' : item.endDate}
                  onChange={(val) => updateEducation(item.id, { endDate: val, current: val.toLowerCase() === 'present' })}
                  placeholder="End"
                  className="min-w-[32px]"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-x-2 text-[10.5px] text-slate-600">
              <EditableText
                value={item.school}
                onChange={(val) => updateEducation(item.id, { school: val })}
                placeholder="School / University"
                className="font-semibold"
                style={{ color: theme.primary }}
              />
              <EditableText
                value={item.city || ''}
                onChange={(val) => updateEducation(item.id, { city: val })}
                placeholder="Location"
                className="text-slate-400 text-[10px] shrink-0 ml-auto"
              />
            </div>
          </div>
        ))}

        {/* Add Education Button right on canvas */}
        <button
          onClick={handleAddEducation}
          className="w-full py-1.5 border border-dashed border-slate-300 rounded-md text-slate-500 hover:text-teal-700 hover:border-teal-400 hover:bg-teal-50/40 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors no-print"
        >
          <Plus size={12} /> Add Education
        </button>
      </div>
    </div>
  );
};
