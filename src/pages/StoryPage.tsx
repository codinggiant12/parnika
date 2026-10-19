export default function StoryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      <div className="text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-gold font-bold">Artisan Origins</span>
        <h1 className="font-serif text-4xl sm:text-5xl text-forest">Preserve Moments. Wear Art.</h1>
        <div className="w-16 h-0.5 bg-gold mx-auto" />
      </div>

      <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border border-stone-200">
        <img
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1200"
          alt="PARNIKA Botanical Atelier"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="text-[#222222]/80 space-y-5 text-sm sm:text-base leading-relaxed">
        <p>
          <strong>PARNIKA</strong> was born from a timeless Indian sentiment: the desire to capture and preserve ephemeral
          beauty. A single monsoon fern gathered from the misty mountain ridges of the Western Ghats, pink bougainvillea
          drifting across a heritage courtyard, or wedding varmala roses preserved to celebrate lifelong love.
        </p>
        <h3 className="font-serif text-2xl text-forest">Ethical Foraging & Traditional Pressing</h3>
        <p>
          Unlike mass-market resin products produced with artificial plastic florets, every blossom encased in PARNIKA
          creations is completely real. We practice mindful pruning and partner with organic flower farmers. Blooms are
          placed inside traditional cedar presses for 14 to 21 days with fine micro-silica sand to lock in their original
          hues without scorching fragile plant cells.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
            <h4 className="font-serif text-lg text-forest mb-2">Non-Toxic Optical Resin</h4>
            <p className="text-xs text-stone-600">
              We use zero-VOC, UV-stabilized jewelry epoxy formulated to resist ambering, clouding, or brittleness across
              decades.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
            <h4 className="font-serif text-lg text-forest mb-2">Artisanal Heirloom Quality</h4>
            <p className="text-xs text-stone-600">
              Every piece undergoes wet-micromesh sanding up to 12,000 grit, culminating in a hand-buffed carnauba finish.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
