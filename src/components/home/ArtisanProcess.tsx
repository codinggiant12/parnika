import SectionHeading from '../common/SectionHeading';
import { PROCESS_STEPS } from '../../data/constants';

export default function ArtisanProcess() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="The Slow Craft"
        title="How Each Piece Is Handcrafted"
        subtitle="Each creation takes 4 to 6 days of meticulous micro-layering, vacuum bubble extraction, and manual wet polishing."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PROCESS_STEPS.map((item) => (
          <div
            key={item.step}
            className="p-6 bg-white rounded-2xl border border-stone-200/80 shadow-sm relative hover:-translate-y-1 transition-transform"
          >
            <span className="text-3xl font-serif text-gold/30 font-bold block mb-1">{item.step}</span>
            <span className="text-2xl mb-3 block">{item.icon}</span>
            <h3 className="font-serif text-lg text-forest mb-2">{item.title}</h3>
            <p className="text-xs text-[#222222]/70 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
