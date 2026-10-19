import { Mail, MapPin, Phone, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import BrandLogo from '../common/BrandLogo';
import { useUI } from '../../context/UIContext';
import { useGoToCategory } from '../../hooks/useGoToCategory';

const linkBtn = 'hover:text-white text-left';

export default function Footer() {
  const { showToast, setIsAccountOpen } = useUI();
  const goToCategory = useGoToCategory();

  return (
    <footer className="bg-forest text-ivory pt-16 pb-12 border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo className="h-11 brightness-150" withTagline />
            <p className="text-xs text-sage leading-relaxed max-w-sm">
              India's premier botanical art and resin atelier hand-crafting heirloom jewellery, floral keepsakes, and
              organic home accents from ethically foraged natural flora.
            </p>
            <div className="text-xs text-sage space-y-1">
              <p>
                <MapPin className="w-3.5 h-3.5 inline mr-1 text-gold" /> The Hills Atelier, Dehradun & Lucknow, India
              </p>
              <p>
                <Mail className="w-3.5 h-3.5 inline mr-1 text-gold" /> atelier@parnikaresins.in
              </p>
              <p>
                <Phone className="w-3.5 h-3.5 inline mr-1 text-gold" /> +91 (0) 98765 43210 (Mon-Sat)
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold font-bold mb-4">Botanical Jewellery</h4>
            <ul className="space-y-2 text-xs text-sage">
              <li>
                <button onClick={() => goToCategory('Resin Earrings')} className={linkBtn}>
                  Resin Earrings
                </button>
              </li>
              <li>
                <button onClick={() => goToCategory('Pendants & Necklaces')} className={linkBtn}>
                  Wildflower Pendants
                </button>
              </li>
              <li>
                <button onClick={() => goToCategory('Resin Rings')} className={linkBtn}>
                  Forest Fern Rings
                </button>
              </li>
              <li>
                <button onClick={() => goToCategory('Bracelets & Bangles')} className={linkBtn}>
                  Bangles & Cuffs
                </button>
              </li>
              <li>
                <Link to="/studio" className="hover:text-white text-gold">
                  Custom Keepsakes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold font-bold mb-4">Art & Décor</h4>
            <ul className="space-y-2 text-xs text-sage">
              <li>
                <button onClick={() => goToCategory('Home Décor & Trays')} className={linkBtn}>
                  Ocean Swirl Trays
                </button>
              </li>
              <li>
                <button onClick={() => goToCategory('Bookmarks & Stationeries')} className={linkBtn}>
                  Daisy Bookmarks
                </button>
              </li>
              <li>
                <button onClick={() => goToCategory('Pressed Flower Keepsakes')} className={linkBtn}>
                  Bridal Keepsake Blocks
                </button>
              </li>
              <li>
                <button onClick={() => goToCategory('Custom Monograms & Gifts')} className={linkBtn}>
                  Monogram Keychains
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold font-bold mb-4">Patron Care</h4>
            <ul className="space-y-2 text-xs text-sage">
              <li>
                <button
                  onClick={() =>
                    showToast('Care Guide: Clean with soft microfiber. Store away from sharp keys and direct perfumes.')
                  }
                  className={linkBtn}
                >
                  Resin Care Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Insured Shipping: 3-5 days across all Indian PIN codes.')}
                  className={linkBtn}
                >
                  Shipping Guidelines
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Replacements: 7-day transit damage replacement guaranteed.')}
                  className={linkBtn}
                >
                  Returns & Repairs
                </button>
              </li>
              <li>
                <button onClick={() => setIsAccountOpen(true)} className="hover:text-white text-gold">
                  Order Tracking
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-sage gap-4">
          <p>© 2026 PARNIKA Atelier. All Rights Reserved. Handmade with reverence for nature.</p>
          <div className="flex gap-6">
            <Link to="/admin" className="text-gold font-semibold hover:underline flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" /> Studio Admin Portal
            </Link>
            <span className="cursor-pointer hover:text-white" onClick={() => showToast('Privacy Policy: Client details are encrypted.')}>
              Privacy
            </span>
            <span
              className="cursor-pointer hover:text-white"
              onClick={() => showToast('Terms of Craft: Natural botanical variations naturally apply.')}
            >
              Craftsmanship Terms
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
