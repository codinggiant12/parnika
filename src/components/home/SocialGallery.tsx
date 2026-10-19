import { Instagram } from 'lucide-react';
import { SOCIAL_IMAGES } from '../../data/constants';
import { useUI } from '../../context/UIContext';

export default function SocialGallery() {
  const { showToast } = useUI();

  return (
    <section className="py-14 bg-white/50 border-t border-forest/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-gold font-bold">@ParnikaResinAtelier</span>
            <h3 className="font-serif text-2xl text-forest">Moments From The Workbench</h3>
          </div>
          <a
            href="#instagram"
            onClick={(e) => {
              e.preventDefault();
              showToast('Instagram connection simulated');
            }}
            className="text-xs font-semibold text-forest hover:text-gold flex items-center gap-1.5 mt-2 sm:mt-0"
          >
            Follow on Instagram <Instagram className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SOCIAL_IMAGES.map((img, i) => (
            <div key={i} className="group relative aspect-square rounded-xl overflow-hidden bg-stone-100 shadow-sm">
              <img
                src={img}
                alt="Resin creation"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-forest/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                #ParnikaHandmade
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
