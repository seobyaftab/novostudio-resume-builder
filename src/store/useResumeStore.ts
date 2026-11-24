import { create } from 'zustand';
import { initialResume } from '../data/defaultResume';
import {
  ResumeDocument,
  TemplateId,
  FontFamily,
  FontSize,
  SpacingLevel,
  PhotoStyle,
  WorkEntry,
  EducationEntry,
  SkillEntry,
  LanguageEntry,
  ProjectEntry,
  CertificateEntry,
} from '../types/resume';

const STORAGE_KEY = 'novostudio_resume_data_v1';

function loadStoredResume(): ResumeDocument {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (!parsed.config.layout.columns) {
        parsed.config.layout.columns = {
          left: ['summary', 'work', 'projects'],
          right: ['education', 'skills', 'languages', 'certificates', 'awards', 'interests'],
        };
      }
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load resume from storage', e);
  }
  return initialResume;
}

function persistResume(doc: ResumeDocument) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(doc));
  } catch (e) {
    console.error('Failed to persist resume', e);
  }
}

export function getTemplateDefaultLayout(template: TemplateId): {
  columns: { left: string[]; right: string[] };
  fontFamily: FontFamily;
  photoStyle: PhotoStyle;
  sideBalancer: number;
} {
  switch (template) {
    case 'college':
      return {
        columns: {
          left: ['education', 'projects', 'work'],
          right: ['skills', 'softSkills', 'languages', 'awards', 'interests', 'certificates'],
        },
        fontFamily: 'Nunito',
        photoStyle: 'rounded',
        sideBalancer: -1,
      };
    case 'general':
      return {
        columns: {
          left: ['work', 'education', 'projects'],
          right: ['skills', 'languages', 'certificates', 'interests'],
        },
        fontFamily: 'Montserrat',
        photoStyle: 'circle',
        sideBalancer: 1,
      };
    case 'executive':
      return {
        columns: {
          left: ['summary', 'work', 'education'],
          right: ['skills', 'certificates', 'projects', 'languages'],
        },
        fontFamily: 'Montserrat',
        photoStyle: 'rounded',
        sideBalancer: 0,
      };
    case 'traditional':
      return {
        columns: {
          left: ['summary', 'work', 'projects'],
          right: ['education', 'skills', 'languages', 'certificates'],
        },
        fontFamily: 'Merriweather',
        photoStyle: 'square',
        sideBalancer: 0,
      };
    case 'minimalist':
      return {
        columns: {
          left: ['work', 'projects'],
          right: ['education', 'skills', 'languages', 'certificates'],
        },
        fontFamily: 'Inter',
        photoStyle: 'circle',
        sideBalancer: 0,
      };
    case 'it':
    case 'tech':
      return {
        columns: {
          left: ['work', 'projects'],
          right: ['technicalSkills', 'skills', 'education', 'certificates', 'languages'],
        },
        fontFamily: 'Roboto',
        photoStyle: 'rounded',
        sideBalancer: 2,
      };
    case 'skill-based':
      return {
        columns: {
          left: ['technicalSkills', 'skills', 'work', 'projects'],
          right: ['education', 'softSkills', 'languages', 'certificates'],
        },
        fontFamily: 'Ubuntu',
        photoStyle: 'rounded',
        sideBalancer: 0,
      };
    case 'functional':
      return {
        columns: {
          left: ['skills', 'languages', 'certificates'],
          right: ['summary', 'work', 'education', 'projects'],
        },
        fontFamily: 'Raleway',
        photoStyle: 'circle',
        sideBalancer: -2,
      };
    case 'hybrid':
      return {
        columns: {
          left: ['work', 'projects'],
          right: ['education', 'skills', 'languages', 'certificates'],
        },
        fontFamily: 'Ubuntu',
        photoStyle: 'rounded',
        sideBalancer: 0,
      };
    case 'creative':
      return {
        columns: {
          left: ['summary', 'work', 'projects'],
          right: ['skills', 'education', 'languages', 'interests'],
        },
        fontFamily: 'Quicksand',
        photoStyle: 'circle',
        sideBalancer: 1,
      };
    case 'modern':
      return {
        columns: {
          left: ['summary', 'work', 'education'],
          right: ['skills', 'projects', 'languages', 'certificates'],
        },
        fontFamily: 'Open Sans',
        photoStyle: 'rounded',
        sideBalancer: 0,
      };
    case 'simple':
    case 'basic':
    case 'professional':
    case 'combined':
    default:
      return {
        columns: {
          left: ['summary', 'work', 'projects'],
          right: ['education', 'skills', 'languages', 'certificates', 'awards', 'interests'],
        },
        fontFamily: 'Ubuntu',
        photoStyle: 'rounded',
        sideBalancer: 0,
      };
  }
}

interface ResumeStore {
  document: ResumeDocument;
  past: ResumeDocument[];
  future: ResumeDocument[];
  scaleFactor: number;
  activeSidePanel: 'none' | 'templates' | 'themes' | 'typography' | 'atsChecker' | 'aiAssistant' | 'spaceOptimizer' | 'addSection';
  addSectionTarget?: { column: 'left' | 'right'; insertAfter?: string };
  
  // Setters
  setScaleFactor: (scale: number) => void;
  setActiveSidePanel: (panel: ResumeStore['activeSidePanel']) => void;
  openAddSectionModal: (target?: { column: 'left' | 'right'; insertAfter?: string }) => void;

  // Document updates with history tracking
  updateDocument: (updater: (draft: ResumeDocument) => void) => void;
  setTemplate: (template: TemplateId) => void;
  setBalancer: (balancer: number) => void;
  setSideBalancer: (sideBalancer: number) => void;
  setColorTheme: (themeId: string, customPrimary?: string) => void;
  setFontFamily: (font: FontFamily) => void;
  setFontSize: (size: FontSize) => void;
  setMarginsLevel: (level: SpacingLevel) => void;
  setSpacingLevel: (level: SpacingLevel) => void;
  setPhotoStyle: (style: PhotoStyle) => void;

  // Dynamic Section Management
  moveSection: (key: string, direction: 'up' | 'down') => void;
  deleteSection: (key: string) => void;
  addSection: (key: string, column: 'left' | 'right', insertAfter?: string) => void;
  moveSectionToColumn: (key: string, targetColumn: 'left' | 'right') => void;

  // Section mutations
  updateName: (name: Partial<ResumeDocument['data']['name']>) => void;
  updateContact: (contact: Partial<ResumeDocument['data']['contact']>) => void;
  updateSummary: (summary: string) => void;
  updateTitle: (title: string) => void;
  setPhoto: (src: string) => void;

  // Work Experience
  addWork: (entry: Omit<WorkEntry, 'id'>) => void;
  updateWork: (id: string, entry: Partial<WorkEntry>) => void;
  removeWork: (id: string) => void;

  // Education
  addEducation: (entry: Omit<EducationEntry, 'id'>) => void;
  updateEducation: (id: string, entry: Partial<EducationEntry>) => void;
  removeEducation: (id: string) => void;

  // Skills
  addSkill: (entry: Omit<SkillEntry, 'id'>) => void;
  updateSkill: (id: string, entry: Partial<SkillEntry>) => void;
  removeSkill: (id: string) => void;

  // Languages
  addLanguage: (entry: Omit<LanguageEntry, 'id'>) => void;
  updateLanguage: (id: string, entry: Partial<LanguageEntry>) => void;
  removeLanguage: (id: string) => void;

  // Projects
  addProject: (entry: Omit<ProjectEntry, 'id'>) => void;
  updateProject: (id: string, entry: Partial<ProjectEntry>) => void;
  removeProject: (id: string) => void;

  // Certificates
  addCertificate: (entry: Omit<CertificateEntry, 'id'>) => void;
  updateCertificate: (id: string, entry: Partial<CertificateEntry>) => void;
  removeCertificate: (id: string) => void;

  // History
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  // Export / Import
  exportToJson: () => string;
  loadFromJson: (jsonStr: string) => boolean;
}

export const useResumeStore = create<ResumeStore>((set, get) => ({
  document: loadStoredResume(),
  past: [],
  future: [],
  scaleFactor: 1.0,
  activeSidePanel: 'none',
  addSectionTarget: undefined,

  setScaleFactor: (scale) => set({ scaleFactor: Math.max(0.4, Math.min(2.0, scale)) }),
  setActiveSidePanel: (panel) => set({ activeSidePanel: panel }),
  openAddSectionModal: (target) => set({ activeSidePanel: 'addSection', addSectionTarget: target }),

  updateDocument: (updater) => {
    const current = get().document;
    const clone: ResumeDocument = JSON.parse(JSON.stringify(current));
    updater(clone);
    clone.metadata.updatedAt = new Date().toISOString();
    persistResume(clone);
    set({
      past: [...get().past.slice(-20), current],
      future: [],
      document: clone,
    });
  },

  setTemplate: (template) => {
    const defaults = getTemplateDefaultLayout(template);
    get().updateDocument((doc) => {
      doc.config.template = template;
      doc.config.font.family = defaults.fontFamily;
      doc.config.layout.photoStyle = defaults.photoStyle;
      doc.config.layout.sideBalancer = defaults.sideBalancer;
      doc.config.layout.columns = defaults.columns;
    });
  },

  setBalancer: (balancer) => {
    get().updateDocument((doc) => {
      doc.config.layout.balancer = Math.max(-10, Math.min(10, balancer));
    });
  },

  setSideBalancer: (sideBalancer) => {
    get().updateDocument((doc) => {
      doc.config.layout.sideBalancer = Math.max(-5, Math.min(5, sideBalancer));
    });
  },

  setColorTheme: (themeId, customPrimary) => {
    get().updateDocument((doc) => {
      doc.config.theme.colors = themeId;
      if (customPrimary) {
        doc.config.theme.customPrimaryHex = customPrimary;
      }
    });
  },

  setFontFamily: (family) => {
    get().updateDocument((doc) => {
      doc.config.font.family = family;
    });
  },

  setFontSize: (size) => {
    get().updateDocument((doc) => {
      doc.config.font.size = size;
    });
  },

  setMarginsLevel: (level) => {
    get().updateDocument((doc) => {
      doc.config.format.customMargins = true;
      doc.config.format.customMarginsLevel = level;
    });
  },

  setSpacingLevel: (level) => {
    get().updateDocument((doc) => {
      doc.config.format.customSpacing = true;
      doc.config.format.customSpacingLevel = level;
    });
  },

  setPhotoStyle: (style) => {
    get().updateDocument((doc) => {
      doc.config.layout.photoStyle = style;
    });
  },

  // Dynamic Section Management
  moveSection: (key, direction) => {
    get().updateDocument((doc) => {
      const cols = doc.config.layout.columns || { left: [], right: [] };
      const inLeft = cols.left.indexOf(key);
      const inRight = cols.right.indexOf(key);

      if (inLeft !== -1) {
        const arr = [...cols.left];
        const target = direction === 'up' ? inLeft - 1 : inLeft + 1;
        if (target >= 0 && target < arr.length) {
          const temp = arr[inLeft];
          arr[inLeft] = arr[target];
          arr[target] = temp;
          doc.config.layout.columns = { ...cols, left: arr };
        }
      } else if (inRight !== -1) {
        const arr = [...cols.right];
        const target = direction === 'up' ? inRight - 1 : inRight + 1;
        if (target >= 0 && target < arr.length) {
          const temp = arr[inRight];
          arr[inRight] = arr[target];
          arr[target] = temp;
          doc.config.layout.columns = { ...cols, right: arr };
        }
      }
    });
  },

  deleteSection: (key) => {
    get().updateDocument((doc) => {
      const cols = doc.config.layout.columns || { left: [], right: [] };
      doc.config.layout.columns = {
        left: cols.left.filter((k) => k !== key),
        right: cols.right.filter((k) => k !== key),
      };
      if (!doc.config.layout.hidden) doc.config.layout.hidden = [];
      if (!doc.config.layout.hidden.includes(key)) {
        doc.config.layout.hidden.push(key);
      }
    });
  },

  addSection: (key, column, insertAfter) => {
    get().updateDocument((doc) => {
      const cols = doc.config.layout.columns || { left: [], right: [] };
      const left = cols.left.filter((k) => k !== key);
      const right = cols.right.filter((k) => k !== key);

      // Unhide
      doc.config.layout.hidden = (doc.config.layout.hidden || []).filter((k) => k !== key);

      const targetCol = column === 'left' ? [...left] : [...right];
      if (insertAfter) {
        const idx = targetCol.indexOf(insertAfter);
        if (idx !== -1) {
          targetCol.splice(idx + 1, 0, key);
        } else {
          targetCol.push(key);
        }
      } else {
        targetCol.push(key);
      }

      doc.config.layout.columns = {
        left: column === 'left' ? targetCol : left,
        right: column === 'right' ? targetCol : right,
      };
    });
  },

  moveSectionToColumn: (key, targetColumn) => {
    get().updateDocument((doc) => {
      const cols = doc.config.layout.columns || { left: [], right: [] };
      const left = cols.left.filter((k) => k !== key);
      const right = cols.right.filter((k) => k !== key);
      if (targetColumn === 'left') {
        left.push(key);
      } else {
        right.push(key);
      }
      doc.config.layout.columns = { left, right };
    });
  },

  updateName: (name) => {
    get().updateDocument((doc) => {
      doc.data.name = { ...doc.data.name, ...name };
    });
  },

  updateContact: (contact) => {
    get().updateDocument((doc) => {
      doc.data.contact = { ...doc.data.contact, ...contact };
    });
  },

  updateSummary: (summary) => {
    get().updateDocument((doc) => {
      doc.data.summary = summary;
    });
  },

  updateTitle: (title) => {
    get().updateDocument((doc) => {
      doc.data.title = title;
    });
  },

  setPhoto: (src) => {
    get().updateDocument((doc) => {
      doc.data.photo = { src };
    });
  },

  addWork: (entry) => {
    get().updateDocument((doc) => {
      doc.data.work.unshift({
        ...entry,
        id: `work_${Date.now()}`,
      });
    });
  },

  updateWork: (id, entry) => {
    get().updateDocument((doc) => {
      const idx = doc.data.work.findIndex((w) => w.id === id);
      if (idx !== -1) {
        doc.data.work[idx] = { ...doc.data.work[idx], ...entry };
      }
    });
  },

  removeWork: (id) => {
    get().updateDocument((doc) => {
      doc.data.work = doc.data.work.filter((w) => w.id !== id);
    });
  },

  addEducation: (entry) => {
    get().updateDocument((doc) => {
      doc.data.education.unshift({
        ...entry,
        id: `edu_${Date.now()}`,
      });
    });
  },

  updateEducation: (id, entry) => {
    get().updateDocument((doc) => {
      const idx = doc.data.education.findIndex((e) => e.id === id);
      if (idx !== -1) {
        doc.data.education[idx] = { ...doc.data.education[idx], ...entry };
      }
    });
  },

  removeEducation: (id) => {
    get().updateDocument((doc) => {
      doc.data.education = doc.data.education.filter((e) => e.id !== id);
    });
  },

  addSkill: (entry) => {
    get().updateDocument((doc) => {
      doc.data.skills.push({
        ...entry,
        id: `skill_${Date.now()}`,
      });
    });
  },

  updateSkill: (id, entry) => {
    get().updateDocument((doc) => {
      const idx = doc.data.skills.findIndex((s) => s.id === id);
      if (idx !== -1) {
        doc.data.skills[idx] = { ...doc.data.skills[idx], ...entry };
      }
    });
  },

  removeSkill: (id) => {
    get().updateDocument((doc) => {
      doc.data.skills = doc.data.skills.filter((s) => s.id !== id);
    });
  },

  addLanguage: (entry) => {
    get().updateDocument((doc) => {
      doc.data.languages.push({
        ...entry,
        id: `lang_${Date.now()}`,
      });
    });
  },

  updateLanguage: (id, entry) => {
    get().updateDocument((doc) => {
      const idx = doc.data.languages.findIndex((l) => l.id === id);
      if (idx !== -1) {
        doc.data.languages[idx] = { ...doc.data.languages[idx], ...entry };
      }
    });
  },

  removeLanguage: (id) => {
    get().updateDocument((doc) => {
      doc.data.languages = doc.data.languages.filter((l) => l.id !== id);
    });
  },

  addProject: (entry) => {
    get().updateDocument((doc) => {
      doc.data.projects.push({
        ...entry,
        id: `proj_${Date.now()}`,
      });
    });
  },

  updateProject: (id, entry) => {
    get().updateDocument((doc) => {
      const idx = doc.data.projects.findIndex((p) => p.id === id);
      if (idx !== -1) {
        doc.data.projects[idx] = { ...doc.data.projects[idx], ...entry };
      }
    });
  },

  removeProject: (id) => {
    get().updateDocument((doc) => {
      doc.data.projects = doc.data.projects.filter((p) => p.id !== id);
    });
  },

  addCertificate: (entry) => {
    get().updateDocument((doc) => {
      doc.data.certificates.push({
        ...entry,
        id: `cert_${Date.now()}`,
      });
    });
  },

  updateCertificate: (id, entry) => {
    get().updateDocument((doc) => {
      const idx = doc.data.certificates.findIndex((c) => c.id === id);
      if (idx !== -1) {
        doc.data.certificates[idx] = { ...doc.data.certificates[idx], ...entry };
      }
    });
  },

  removeCertificate: (id) => {
    get().updateDocument((doc) => {
      doc.data.certificates = doc.data.certificates.filter((c) => c.id !== id);
    });
  },

  undo: () => {
    const { past, document: current, future } = get();
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    persistResume(previous);
    set({
      past: past.slice(0, past.length - 1),
      future: [current, ...future],
      document: previous,
    });
  },

  redo: () => {
    const { past, document: current, future } = get();
    if (future.length === 0) return;
    const next = future[0];
    persistResume(next);
    set({
      past: [...past, current],
      future: future.slice(1),
      document: next,
    });
  },

  canUndo: () => get().past.length > 0,
  canRedo: () => get().future.length > 0,

  exportToJson: () => {
    return JSON.stringify(get().document, null, 2);
  },

  loadFromJson: (jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr) as ResumeDocument;
      if (parsed.data && parsed.config) {
        persistResume(parsed);
        set({
          document: parsed,
          past: [...get().past, get().document],
          future: [],
        });
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON file format', e);
    }
    return false;
  },
}));
