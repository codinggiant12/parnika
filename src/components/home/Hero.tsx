import { ArrowRight, Award, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGoToCategory } from '../../hooks/useGoToCategory';

export default function Hero() {
  const navigate = useNavigate();
  const goToCategory = useGoToCategory();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ivory via-ivory to-sage/15 py-12 sm:py-20 lg:py-24 border-b border-forest/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-forest/10 text-forest px-3.5 py-1.5 rounded-full text-xs uppercase tracking-widest font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-gold" /> Handcrafted in Small Batches
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-forest leading-[1.15] font-normal">
              Little Pieces of Nature, <br />
              <span className="italic font-light text-gold">Forever Yours.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#222222]/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Discover handcrafted botanical jewellery, preserved wildflowers, meaningful keepsakes, and one-of-a-kind art
              blocks made to hold your most beautiful moments in archival crystal clarity.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <button
                onClick={() => goToCategory('All')}
                className="w-full sm:w-auto px-8 py-3.5 bg-forest text-ivory rounded-full hover:bg-forest/90 transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-semibold"
              >
                Explore the Collection
                <ArrowRight className="w-4 h-4 text-gold" />
              </button>
              <button
                onClick={() => navigate('/studio')}
                className="w-full sm:w-auto px-8 py-3.5 border border-forest/30 text-forest rounded-full hover:bg-forest/5 transition-colors text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold" /> Design Custom Creation
              </button>
            </div>

            <div className="pt-8 grid grid-cols-3 gap-3 border-t border-forest/10 text-left">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span className="text-xs text-[#222222]/80 font-medium">100% Real Preserved Flowers</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                <span className="text-xs text-[#222222]/80 font-medium">UV Non-Yellowing Eco Resin</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-gold shrink-0" />
                <span className="text-xs text-[#222222]/80 font-medium">18K Hypoallergenic Vermeil</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 relative group">
                <img
                  src="https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=1000"
                  alt="Handmade botanical resin earrings"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Signature Collection</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal">Alpine Forget-Me-Not Teardrops</h3>
                  <p className="text-xs text-white/80 mt-1">Preserved with genuine 24K gold foil flakes</p>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-5 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-stone-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sage/25 flex items-center justify-center text-forest text-lg">🌿</div>
                <div>
                  <p className="text-xs font-bold text-forest">Micro-Silica Dehydration</p>
                  <p className="text-[10px] text-[#222222]/60">72-Hour slow cure diamond finish</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
