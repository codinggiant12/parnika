import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: ReactNode;
  as?: 'h1' | 'h2';
}

export default function SectionHeading({ eyebrow, title, subtitle, as: Tag = 'h2' }: SectionHeadingProps) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-10">
      <span className="text-xs uppercase tracking-widest text-gold font-bold">{eyebrow}</span>
      <Tag className="font-serif text-3xl sm:text-4xl text-forest mt-1.5">{title}</Tag>
      <div className="w-12 h-0.5 bg-gold mx-auto mt-3" />
      {subtitle && <p className="text-xs sm:text-sm text-[#222222]/70 mt-3">{subtitle}</p>}
    </div>
  );
}
