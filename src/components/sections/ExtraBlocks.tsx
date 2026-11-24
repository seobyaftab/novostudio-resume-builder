import React from 'react';
import { ProjectEntry, CertificateEntry, AwardEntry, InterestEntry } from '../../types/resume';
import { ColorTheme } from '../../engine/themeEngine';
import { SectionHeader } from './SectionHeader';
import { EditableText } from '../canvas/EditableText';
import { useResumeStore } from '../../store/useResumeStore';
import { Plus, Trash2, X, ExternalLink } from 'lucide-react';

export const ProjectsBlock: React.FC<{
  projects: ProjectEntry[];
  theme: ColorTheme;
  headerVariant?: 'underline' | 'pill' | 'banner' | 'clean' | 'left-bar';
}> = ({ projects, theme, headerVariant }) => {
  const { addProject, updateProject, removeProject } = useResumeStore();

  const handleAddProject = () => {
    addProject({
      title: 'Project Name',
      link: 'github.com/user/project',
      bullets: ['Key architectural contribution and outcome.'],
    });
  };

  const handleAddBullet = (p: ProjectEntry) => {
    updateProject(p.id, { bullets: [...(p.bullets || []), 'New project outcome or metric.'] });
  };

  const handleUpdateBullet = (p: ProjectEntry, idx: number, val: string) => {
    const b = [...(p.bullets || [])];
    b[idx] = val;
    updateProject(p.id, { bullets: b });
  };

  const handleDeleteBullet = (p: ProjectEntry, idx: number) => {
    updateProject(p.id, { bullets: p.bullets.filter((_, i) => i !== idx) });
  };

  return (
    <div className="projects-section">
      <SectionHeader title="Projects" theme={theme} variant={headerVariant} />
      <div className="space-y-3">
        {projects.map((proj) => (
          <div key={proj.id} className="project-item group/proj relative border-l-2 border-transparent hover:border-teal-300 pl-2 -ml-2 transition-colors">
            <button
              onClick={() => removeProject(proj.id)}
              className="absolute top-0 right-0 opacity-0 group-hover/proj:opacity-100 text-slate-400 hover:text-rose-600 transition-opacity p-0.5 no-print"
              title="Delete Project"
            >
              <Trash2 size={12} />
            </button>

            <div className="flex items-center gap-1.5 mb-0.5">
              <EditableText
                value={proj.title}
                onChange={(val) => updateProject(proj.id, { title: val })}
                placeholder="Project Title"
                className="font-bold text-slate-900 text-xs"
              />
              {proj.link && (
                <a
                  href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-teal-600 inline-flex items-center no-print"
                >
                  <ExternalLink size={10} />
                </a>
              )}
            </div>

            {proj.bullets && (
              <ul className="list-disc ml-3.5 space-y-0.5 text-slate-700 text-[10px]">
                {proj.bullets.map((b, i) => (
                  <li key={i} className="leading-snug group/b relative">
                    <div className="flex items-start justify-between gap-1">
                      <EditableText
                        value={b}
                        onChange={(val) => handleUpdateBullet(proj, i, val)}
                        className="flex-1"
                        multiline
                      />
                      <button
                        onClick={() => handleDeleteBullet(proj, i)}
                        className="opacity-0 group-hover/b:opacity-100 text-slate-400 hover:text-rose-600 p-0.5 shrink-0 no-print"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={() => handleAddBullet(proj)}
              className="flex items-center gap-1 text-[9.5px] font-semibold text-slate-400 hover:text-teal-700 mt-1 pl-3.5 no-print transition-colors"
            >
              <Plus size={10} /> Add bullet
            </button>
          </div>
        ))}

        <button
          onClick={handleAddProject}
          className="w-full py-1.5 border border-dashed border-slate-300 rounded-md text-slate-500 hover:text-teal-700 hover:border-teal-400 hover:bg-teal-50/40 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors no-print"
        >
          <Plus size={12} /> Add Project
        </button>
      </div>
    </div>
  );
};

export const CertificatesBlock: React.FC<{
  certificates: CertificateEntry[];
  theme: ColorTheme;
  headerVariant?: 'underline' | 'pill' | 'banner' | 'clean' | 'left-bar';
}> = ({ certificates, theme, headerVariant }) => {
  const { addCertificate, updateCertificate, removeCertificate } = useResumeStore();

  const handleAddCert = () => {
    addCertificate({
      title: 'Certificate / Accreditation',
      issuer: 'Issuing Organization',
      date: '2024',
    });
  };

  return (
    <div className="certificates-section">
      <SectionHeader title="Certificates" theme={theme} variant={headerVariant} />
      <div className="space-y-2">
        {certificates.map((cert) => (
          <div key={cert.id} className="text-[10.5px] group/cert relative border-l-2 border-transparent hover:border-teal-300 pl-1.5 -ml-1.5">
            <button
              onClick={() => removeCertificate(cert.id)}
              className="absolute top-0 right-0 opacity-0 group-hover/cert:opacity-100 text-slate-400 hover:text-rose-600 p-0.5 no-print"
              title="Delete Certificate"
            >
              <Trash2 size={11} />
            </button>
            <EditableText
              value={cert.title}
              onChange={(val) => updateCertificate(cert.id, { title: val })}
              placeholder="Certificate Title"
              className="font-bold text-slate-800 leading-tight block"
            />
            <div className="flex justify-between text-[9.5px] text-slate-500 mt-0.5">
              <EditableText
                value={cert.issuer}
                onChange={(val) => updateCertificate(cert.id, { issuer: val })}
                placeholder="Issuer"
              />
              <EditableText
                value={cert.date}
                onChange={(val) => updateCertificate(cert.id, { date: val })}
                placeholder="Date"
              />
            </div>
          </div>
        ))}

        <button
          onClick={handleAddCert}
          className="flex items-center gap-1 text-[10px] font-semibold text-teal-700 hover:text-teal-900 mt-1 py-0.5 no-print"
        >
          <Plus size={11} /> Add Certificate
        </button>
      </div>
    </div>
  );
};

export const AwardsBlock: React.FC<{
  awards: AwardEntry[];
  theme: ColorTheme;
  headerVariant?: 'underline' | 'pill' | 'banner' | 'clean' | 'left-bar';
}> = ({ awards, theme, headerVariant }) => {
  const { updateDocument } = useResumeStore();

  const handleAddAward = () => {
    updateDocument((doc) => {
      doc.data.awards.push({
        id: `award_${Date.now()}`,
        title: 'Award / Honor Title',
        issuer: 'Granting Body',
        date: '2024',
      });
    });
  };

  const handleUpdateAward = (id: string, patch: Partial<AwardEntry>) => {
    updateDocument((doc) => {
      const idx = doc.data.awards.findIndex((a) => a.id === id);
      if (idx !== -1) {
        doc.data.awards[idx] = { ...doc.data.awards[idx], ...patch };
      }
    });
  };

  const handleRemoveAward = (id: string) => {
    updateDocument((doc) => {
      doc.data.awards = doc.data.awards.filter((a) => a.id !== id);
    });
  };

  return (
    <div className="awards-section">
      <SectionHeader title="Awards & Honors" theme={theme} variant={headerVariant} />
      <div className="space-y-2">
        {awards.map((award) => (
          <div key={award.id} className="text-[10.5px] group/aw relative border-l-2 border-transparent hover:border-teal-300 pl-1.5 -ml-1.5">
            <button
              onClick={() => handleRemoveAward(award.id)}
              className="absolute top-0 right-0 opacity-0 group-hover/aw:opacity-100 text-slate-400 hover:text-rose-600 p-0.5 no-print"
              title="Delete Award"
            >
              <Trash2 size={11} />
            </button>
            <EditableText
              value={award.title}
              onChange={(val) => handleUpdateAward(award.id, { title: val })}
              placeholder="Award Title"
              className="font-bold text-slate-800 leading-tight block"
            />
            <div className="flex justify-between text-[9.5px] text-slate-500 mt-0.5">
              <EditableText
                value={award.issuer}
                onChange={(val) => handleUpdateAward(award.id, { issuer: val })}
                placeholder="Issuer"
              />
              <EditableText
                value={award.date}
                onChange={(val) => handleUpdateAward(award.id, { date: val })}
                placeholder="Date"
              />
            </div>
          </div>
        ))}

        <button
          onClick={handleAddAward}
          className="flex items-center gap-1 text-[10px] font-semibold text-teal-700 hover:text-teal-900 mt-1 py-0.5 no-print"
        >
          <Plus size={11} /> Add Award
        </button>
      </div>
    </div>
  );
};

export const InterestsBlock: React.FC<{
  interests: InterestEntry[];
  theme: ColorTheme;
  headerVariant?: 'underline' | 'pill' | 'banner' | 'clean' | 'left-bar';
}> = ({ interests, theme, headerVariant }) => {
  const { updateDocument } = useResumeStore();

  const handleAddInterest = () => {
    updateDocument((doc) => {
      doc.data.interests.push({
        id: `int_${Date.now()}`,
        name: 'New Activity / Interest',
      });
    });
  };

  const handleUpdateInterest = (id: string, name: string) => {
    updateDocument((doc) => {
      const idx = doc.data.interests.findIndex((i) => i.id === id);
      if (idx !== -1) {
        doc.data.interests[idx].name = name;
      }
    });
  };

  const handleRemoveInterest = (id: string) => {
    updateDocument((doc) => {
      doc.data.interests = doc.data.interests.filter((i) => i.id !== id);
    });
  };

  return (
    <div className="interests-section">
      <SectionHeader title="Interests & Activities" theme={theme} variant={headerVariant} />
      <div className="flex flex-wrap gap-1.5 items-center">
        {interests.map((item) => (
          <div
            key={item.id}
            className="group/int relative inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium text-slate-700 bg-slate-100 border border-slate-200"
          >
            <EditableText
              value={item.name}
              onChange={(val) => handleUpdateInterest(item.id, val)}
              placeholder="Interest"
            />
            <button
              onClick={() => handleRemoveInterest(item.id)}
              className="opacity-0 group-hover/int:opacity-100 text-slate-400 hover:text-rose-600 p-0.5 no-print"
              title="Delete Interest"
            >
              <X size={10} />
            </button>
          </div>
        ))}

        <button
          onClick={handleAddInterest}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-dashed border-slate-300 text-[10px] font-semibold text-slate-500 hover:text-teal-700 hover:border-teal-400 hover:bg-teal-50 transition-colors no-print"
        >
          <Plus size={10} /> Add
        </button>
      </div>
    </div>
  );
};
