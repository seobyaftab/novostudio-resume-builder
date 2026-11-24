import React from 'react';
import { ResumeDocument } from '../../types/resume';
import { ColorTheme } from '../../engine/themeEngine';
import { EditableText } from '../canvas/EditableText';
import { useResumeStore } from '../../store/useResumeStore';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

const LinkedinIcon = ({ size = 11 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.66 1.66 0 0 0-1.66 1.66c0 .92.75 1.67 1.66 1.67a1.67 1.67 0 0 0 0-3.33z" />
  </svg>
);

const GithubIcon = ({ size = 11 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
  </svg>
);

interface HeaderBlockProps {
  document: ResumeDocument;
  theme: ColorTheme;
  variant?: 'inline' | 'centered' | 'hero-banner' | 'side-rail' | 'minimal-split';
}

export const HeaderBlock: React.FC<HeaderBlockProps> = ({ document: doc, theme, variant = 'inline' }) => {
  const { updateName, updateTitle, updateContact } = useResumeStore();
  const { name, title, contact, photo } = doc.data;
  const { photoStyle } = doc.config.layout;

  const photoBorderClass =
    photoStyle === 'circle'
      ? 'rounded-full'
      : photoStyle === 'square'
      ? 'rounded-none'
      : 'rounded-xl';

  const photoEl = photo?.src ? (
    <div className={`overflow-hidden border-2 w-20 h-20 shrink-0 shadow-sm ${photoBorderClass}`} style={{ borderColor: theme.primary }}>
      <img src={photo.src} alt="Profile" className="w-full h-full object-cover" />
    </div>
  ) : null;

  if (variant === 'hero-banner') {
    return (
      <div className="p-6 text-white mb-6 -mx-8 -mt-8" style={{ backgroundColor: theme.primary }}>
        <div className="flex items-center gap-5">
          {photoEl}
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <EditableText
                value={name.givenName}
                onChange={(val) => updateName({ givenName: val })}
                placeholder="First Name"
              />
              <EditableText
                value={name.familyName}
                onChange={(val) => updateName({ familyName: val })}
                placeholder="Last Name"
              />
            </h1>
            <p className="text-xs uppercase tracking-wider text-slate-100 font-medium mt-0.5 opacity-90">
              <EditableText
                value={title}
                onChange={(val) => updateTitle(val)}
                placeholder="Job Title"
              />
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[10px] text-slate-100 opacity-80">
              <span className="flex items-center gap-1">
                <Mail size={11} />
                <EditableText
                  value={contact.email}
                  onChange={(val) => updateContact({ email: val })}
                  placeholder="email@example.com"
                />
              </span>
              <span className="flex items-center gap-1">
                <Phone size={11} />
                <EditableText
                  value={contact.phone}
                  onChange={(val) => updateContact({ phone: val })}
                  placeholder="Phone"
                />
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={11} />
                <EditableText
                  value={contact.city || ''}
                  onChange={(val) => updateContact({ city: val })}
                  placeholder="City"
                />
              </span>
              {contact.linkedin && (
                <span className="flex items-center gap-1">
                  <LinkedinIcon size={11} />
                  <EditableText
                    value={contact.linkedin}
                    onChange={(val) => updateContact({ linkedin: val })}
                    placeholder="LinkedIn"
                  />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'centered') {
    return (
      <div className="text-center mb-6 pb-4 border-b border-slate-200">
        {photoEl && <div className="flex justify-center mb-2">{photoEl}</div>}
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex justify-center items-center gap-2">
          <EditableText
            value={name.givenName}
            onChange={(val) => updateName({ givenName: val })}
            placeholder="First Name"
          />
          <EditableText
            value={name.familyName}
            onChange={(val) => updateName({ familyName: val })}
            placeholder="Last Name"
            style={{ color: theme.primary }}
          />
        </h1>
        <p className="text-xs uppercase tracking-wider text-slate-600 font-semibold mt-0.5">
          <EditableText
            value={title}
            onChange={(val) => updateTitle(val)}
            placeholder="Job Title"
          />
        </p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2.5 text-[10.5px] text-slate-600">
          <span className="flex items-center gap-1">
            <Mail size={11} />
            <EditableText
              value={contact.email}
              onChange={(val) => updateContact({ email: val })}
              placeholder="Email"
            />
          </span>
          <span className="flex items-center gap-1">
            <Phone size={11} />
            <EditableText
              value={contact.phone}
              onChange={(val) => updateContact({ phone: val })}
              placeholder="Phone"
            />
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={11} />
            <EditableText
              value={contact.city || ''}
              onChange={(val) => updateContact({ city: val })}
              placeholder="City"
            />
          </span>
        </div>
      </div>
    );
  }

  // Default clean inline
  return (
    <div className="flex justify-between items-center mb-5 pb-4 border-b border-slate-200">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <EditableText
            value={name.givenName}
            onChange={(val) => updateName({ givenName: val })}
            placeholder="First Name"
          />
          <EditableText
            value={name.familyName}
            onChange={(val) => updateName({ familyName: val })}
            placeholder="Last Name"
            style={{ color: theme.primary }}
          />
        </h1>
        <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mt-0.5">
          <EditableText
            value={title}
            onChange={(val) => updateTitle(val)}
            placeholder="Job Title"
          />
        </p>
        <div className="flex flex-wrap gap-x-3.5 gap-y-1 mt-2 text-[10px] text-slate-600">
          <span className="flex items-center gap-1">
            <Mail size={11} />
            <EditableText
              value={contact.email}
              onChange={(val) => updateContact({ email: val })}
              placeholder="Email"
            />
          </span>
          <span className="flex items-center gap-1">
            <Phone size={11} />
            <EditableText
              value={contact.phone}
              onChange={(val) => updateContact({ phone: val })}
              placeholder="Phone"
            />
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={11} />
            <EditableText
              value={contact.city || ''}
              onChange={(val) => updateContact({ city: val })}
              placeholder="City"
            />
          </span>
          {contact.linkedin && (
            <span className="flex items-center gap-1">
              <LinkedinIcon size={11} />
              <EditableText
                value={contact.linkedin}
                onChange={(val) => updateContact({ linkedin: val })}
                placeholder="LinkedIn"
              />
            </span>
          )}
        </div>
      </div>
      {photoEl}
    </div>
  );
};
