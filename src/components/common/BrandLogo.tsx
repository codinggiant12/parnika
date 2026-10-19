import type { FC } from 'react';

interface BrandLogoProps {
  className?: string;
  withTagline?: boolean;
}

const BrandLogo: FC<BrandLogoProps> = ({ className = 'h-10', withTagline = true }) => (
  <div className="flex items-center gap-3 cursor-pointer select-none">
    <svg
      viewBox="0 0 100 130"
      className={`${className} aspect-[100/130] fill-none transition-transform duration-300 hover:scale-105`}
      aria-label="Parnika Brand Emblem"
    >
      <path
        d="M 50,5 C 20,50 10,85 15,105 C 22,125 78,125 85,105 C 90,85 80,50 50,5 Z"
        className="stroke-[#192C23]"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 50,15 C 27,53 18,85 22,102 C 28,118 72,118 78,102 C 82,85 73,53 50,15 Z"
        className="stroke-[#C5A46D]"
        strokeWidth="1.2"
        strokeDasharray="1.5 2"
      />
      <path
        d="M 45,98 L 45,38 C 45,38 72,36 72,54 C 72,68 45,70 45,70"
        className="stroke-[#C5A46D]"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M 45,95 C 32,85 28,65 35,48 C 39,40 45,35 45,35 C 45,35 49,52 47,70 C 46,78 45,95 45,95 Z"
        className="stroke-[#192C23]"
        strokeWidth="2"
        fill="#A8B5A0"
        fillOpacity="0.25"
      />
      <path d="M 38,58 L 45,63 M 34,70 L 45,74 M 36,82 L 45,86" className="stroke-[#192C23]" strokeWidth="1.2" />
      <circle cx="58" cy="42" r="3" className="fill-[#C5A46D]" />
      <circle cx="54" cy="38" r="2.5" className="fill-[#C5A46D]" />
      <circle cx="62" cy="38" r="2.5" className="fill-[#C5A46D]" />
      <circle cx="58" cy="48" r="2" className="fill-[#C5A46D]" />
    </svg>
    <div>
      <span className="font-serif tracking-[0.25em] text-xl font-bold text-[#192C23] block leading-tight">PARNIKA</span>
      {withTagline && (
        <span className="text-[9px] tracking-[0.22em] uppercase text-[#C5A46D] font-semibold block">
          Nature, Preserved Forever.
        </span>
      )}
    </div>
  </div>
);

export default BrandLogo;
