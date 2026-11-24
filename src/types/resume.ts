export type TemplateId =
  | 'basic'
  | 'creative'
  | 'modern'
  | 'executive'
  | 'simple'
  | 'functional'
  | 'professional'
  | 'college'
  | 'combined'
  | 'minimalist'
  | 'tech'
  | 'skill-based'
  | 'hybrid'
  | 'general'
  | 'traditional'
  | 'it';

export type DocumentType = 'resume' | 'cover-letter';
export type ExperienceLevel = 'student' | 'graduate' | 'intermediate' | 'senior' | 'freelancer';
export type DocumentSize = 'A4' | 'Letter';
export type FontSize = '2XS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL';
export type SpacingLevel = 'XS' | 'S' | 'M' | 'L' | 'XL';
export type PhotoStyle = 'rounded' | 'square' | 'circle';

export type FontFamily =
  | 'Ubuntu'
  | 'Roboto'
  | 'Raleway'
  | 'Montserrat'
  | 'Merriweather'
  | 'Nunito'
  | 'Open Sans'
  | 'Overpass'
  | 'Quicksand'
  | 'Inter';

export type SkillDecoration = 'bubble' | 'highlight' | 'infographic' | 'none';
export type InfographicType = 'dots-1' | 'dots-2' | 'pills-1' | 'bar-1';

export interface WorkEntry {
  id: string;
  position: string;
  company: string;
  city: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface EducationEntry {
  id: string;
  degree: string;
  school: string;
  city: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface SkillEntry {
  id: string;
  name: string;
  level: number; // 0 - 100
  icon?: string;
  category?: string;
}

export interface LanguageEntry {
  id: string;
  name: string;
  level: number; // 1 - 5 dots, or A1-C2
  proficiencyLabel?: string;
}

export interface ProjectEntry {
  id: string;
  title: string;
  link?: string;
  bullets: string[];
}

export interface CertificateEntry {
  id: string;
  title: string;
  issuer: string;
  date: string;
}

export interface AwardEntry {
  id: string;
  title: string;
  issuer: string;
  date: string;
}

export interface InterestEntry {
  id: string;
  name: string;
  icon?: string;
}

export type SectionKey =
  | 'summary'
  | 'work'
  | 'education'
  | 'skills'
  | 'softSkills'
  | 'technicalSkills'
  | 'languages'
  | 'projects'
  | 'certificates'
  | 'awards'
  | 'interests';

export interface ReferenceEntry {
  id: string;
  name: string;
  company: string;
  contact: string;
}

export interface ResumeDocument {
  metadata: {
    id: string;
    title: string;
    type: DocumentType;
    locale: string;
    createdAt: string;
    updatedAt: string;
  };
  config: {
    template: TemplateId;
    experienceLevel: ExperienceLevel;
    countryCode: string;
    layout: {
      type: 'predefined1' | 'predefined2' | 'predefined3' | 'col1' | 'col2';
      balancer: number;     // -10 to +10 (center column ratio)
      sideBalancer: number; // -5 to +5 (side column ratio)
      photoStyle: PhotoStyle;
      hidden: string[];
      columns: {
        left: string[];
        right: string[];
      };
    };
    theme: {
      colors: string; // tc-1 through tc-74
      customPrimaryHex?: string;
      customSecondaryHex?: string;
      background: 'none' | 'subtle-grid' | 'dots' | 'geometric';
      applyColorToBackground: boolean;
    };
    font: {
      family: FontFamily;
      size: FontSize;
      letterSpacing: boolean;
      wordSpacing: boolean;
    };
    format: {
      documentSize: DocumentSize;
      customSpacing: boolean;
      customSpacingLevel: SpacingLevel;
      customMargins: boolean;
      customMarginsLevel: SpacingLevel;
      showListLabels: boolean;
      dates: {
        format: 'd-m-y' | 'm-y' | 'y';
        separator: '/' | '-' | '.';
        presentLabel: string;
      };
      footer: {
        showPageNumber: boolean;
        showCreationDate: boolean;
      };
    };
    blocks: {
      skills: {
        decoration: SkillDecoration;
        infographicType: InfographicType;
        columns: 1 | 2;
      };
      languages: {
        decoration: SkillDecoration;
        infographicType: InfographicType;
        columns: 1 | 2;
      };
    };
  };
  data: {
    name: {
      givenName: string;
      familyName: string;
      namePrefix?: string;
      nameSuffix?: string;
    };
    title: string;
    summary: string;
    photo?: {
      src: string;
    };
    contact: {
      email: string;
      phone: string;
      city?: string;
      country?: string;
      address?: string;
      website?: string;
      linkedin?: string;
      github?: string;
      twitter?: string;
      leetcode?: string;
      codepen?: string;
      behance?: string;
      medium?: string;
      stackoverflow?: string;
      instagram?: string;
      tiktok?: string;
      youtube?: string;
      pinterest?: string;
    };
    work: WorkEntry[];
    education: EducationEntry[];
    skills: SkillEntry[];
    softSkills: SkillEntry[];
    technicalSkills: SkillEntry[];
    languages: LanguageEntry[];
    certificates: CertificateEntry[];
    projects: ProjectEntry[];
    awards: AwardEntry[];
    interests: InterestEntry[];
    references: ReferenceEntry[];
  };
}
