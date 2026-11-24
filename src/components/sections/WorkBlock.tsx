import React from 'react';
import { WorkEntry } from '../../types/resume';
import { ColorTheme } from '../../engine/themeEngine';
import { SectionHeader } from './SectionHeader';
import { EditableText } from '../canvas/EditableText';
import { useResumeStore } from '../../store/useResumeStore';
import { Plus, Trash2, X } from 'lucide-react';

interface WorkBlockProps {
  work: WorkEntry[];
  theme: ColorTheme;
  headerVariant?: 'underline' | 'pill' | 'banner' | 'clean' | 'left-bar';
}

export const WorkBlock: React.FC<WorkBlockProps> = ({ work, theme, headerVariant }) => {
  const { addWork, updateWork, removeWork } = useResumeStore();

  const handleAddBullet = (item: WorkEntry) => {
    const updatedBullets = [...(item.bullets || []), 'New key achievement or responsibility.'];
    updateWork(item.id, { bullets: updatedBullets });
  };

  const handleUpdateBullet = (item: WorkEntry, idx: number, val: string) => {
    const updatedBullets = [...(item.bullets || [])];
    updatedBullets[idx] = val;
    updateWork(item.id, { bullets: updatedBullets });
  };

  const handleDeleteBullet = (item: WorkEntry, idx: number) => {
    const updatedBullets = item.bullets.filter((_, i) => i !== idx);
    updateWork(item.id, { bullets: updatedBullets });
  };

  const handleAddWorkPosition = () => {
    addWork({
      position: 'Job Position / Title',
      company: 'Company Name',
      city: 'City, Country',
      startDate: '2023',
      endDate: 'Present',
      current: true,
      bullets: ['Key project delivered or operational impact achieved.'],
    });
  };

  return (
    <div className="work-section">
      <SectionHeader title="Work Experience" theme={theme} variant={headerVariant} />
      <div className="space-y-4">
        {work.map((item) => (
          <div key={item.id} className="work-item group/job relative border-l-2 border-transparent hover:border-teal-300 pl-2 -ml-2 transition-colors">
            {/* Quick delete job button */}
            <button
              onClick={() => removeWork(item.id)}
              className="absolute top-0 right-0 opacity-0 group-hover/job:opacity-100 text-slate-400 hover:text-rose-600 transition-opacity p-0.5 no-print"
              title="Delete this position"
            >
              <Trash2 size={12} />
            </button>

            {/* Position & Dates (flexible responsive wrap) */}
            <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5 mb-0.5">
              <EditableText
                value={item.position}
                onChange={(val) => updateWork(item.id, { position: val })}
                placeholder="Job Position"
                className="font-bold text-slate-900 text-xs"
              />
              <div className="text-[10px] font-medium text-slate-500 whitespace-nowrap flex items-center gap-1 shrink-0 ml-auto">
                <EditableText
                  value={item.startDate}
                  onChange={(val) => updateWork(item.id, { startDate: val })}
                  placeholder="Start"
                  className="min-w-[32px] text-right"
                />
                <span>–</span>
                <EditableText
                  value={item.current ? 'Present' : item.endDate}
                  onChange={(val) => updateWork(item.id, { endDate: val, current: val.toLowerCase() === 'present' })}
                  placeholder="End"
                  className="min-w-[32px]"
                />
              </div>
            </div>

            {/* Company & City */}
            <div className="flex flex-wrap items-baseline justify-between gap-x-2 text-[10.5px] text-slate-600 mb-1">
              <EditableText
                value={item.company}
                onChange={(val) => updateWork(item.id, { company: val })}
                placeholder="Company Name"
                className="font-semibold"
                style={{ color: theme.primary }}
              />
              <EditableText
                value={item.city || ''}
                onChange={(val) => updateWork(item.id, { city: val })}
                placeholder="Location"
                className="text-slate-400 text-[10px] shrink-0 ml-auto"
              />
            </div>

            {/* Bullets */}
            {item.bullets && item.bullets.length > 0 && (
              <ul className="list-disc ml-3.5 space-y-1 text-slate-700 text-[10.5px]">
                {item.bullets.map((bullet, idx) => (
                  <li key={idx} className="leading-snug group/bullet relative">
                    <div className="flex items-start justify-between gap-1">
                      <EditableText
                        value={bullet}
                        onChange={(val) => handleUpdateBullet(item, idx, val)}
                        placeholder="Describe key impact..."
                        className="flex-1"
                        multiline
                      />
                      <button
                        onClick={() => handleDeleteBullet(item, idx)}
                        className="opacity-0 group-hover/bullet:opacity-100 text-slate-400 hover:text-rose-600 transition-opacity p-0.5 shrink-0 no-print"
                        title="Delete bullet"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Add Bullet Button */}
            <button
              onClick={() => handleAddBullet(item)}
              className="flex items-center gap-1 text-[9.5px] font-semibold text-slate-400 hover:text-teal-700 mt-1 pl-3.5 no-print transition-colors"
            >
              <Plus size={10} /> Add bullet
            </button>
          </div>
        ))}

        {/* Add Work Position Button right on canvas */}
        <button
          onClick={handleAddWorkPosition}
          className="w-full py-1.5 border border-dashed border-slate-300 rounded-md text-slate-500 hover:text-teal-700 hover:border-teal-400 hover:bg-teal-50/40 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors no-print"
        >
          <Plus size={12} /> Add Work Position
        </button>
      </div>
    </div>
  );
};
