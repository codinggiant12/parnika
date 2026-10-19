import { useState } from 'react';
import { Clock, Heart, Menu, Search, ShoppingBag, Sparkles, User, X } from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import BrandLogo from '../common/BrandLogo';
import { useStore } from '../../context/StoreContext';
import { useUI } from '../../context/UIContext';
import { useGoToCategory } from '../../hooks/useGoToCategory';

const navClass = ({ isActive }: { isActive: boolean }) =>
  `transition hover:text-forest pb-1 ${isActive ? 'text-forest border-b-2 border-gold' : ''}`;

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const isAdmin = useLocation().pathname === '/admin';
  const goToCategory = useGoToCategory();
  const { searchQuery, setSearchQuery, wishlist, cartCount, setSelectedCategory } = useStore();
  const { setIsCartOpen, setIsAccountOpen } = useUI();

  const onSearch = (value: string) => {
    setSearchQuery(value);
    navigate('/shop');
  };

  const mobileLink = 'block w-full text-left py-2 border-b border-stone-200 text-xs uppercase font-bold';

  return (
    <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-forest/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-forest hover:bg-forest/5 rounded-lg"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div
          onClick={() => {
            navigate('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <BrandLogo className="h-10 sm:h-11" />
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-[#222222]/80">
          <NavLink to="/" end className={navClass}>
            Home
          </NavLink>
          <button
            onClick={() => {
              setSelectedCategory('All');
              navigate('/shop');
            }}
            className="transition hover:text-forest pb-1"
          >
            Shop All
          </button>
          <button onClick={() => goToCategory('Resin Earrings')} className="transition hover:text-forest pb-1">
            Jewellery
          </button>
          <NavLink
            to="/studio"
            className={({ isActive }) =>
              `transition text-forest flex items-center gap-1 font-bold pb-1 ${isActive ? 'border-b-2 border-gold' : ''}`
            }
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" /> Custom Studio
          </NavLink>
          <NavLink to="/story" className={navClass}>
            Our Story
          </NavLink>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3.5">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search botanicals, flora..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="bg-forest/5 border border-forest/15 rounded-full pl-9 pr-6 py-1.5 text-xs text-[#222222] focus:outline-none focus:border-gold w-36 lg:w-56 transition-all"
            />
            <Search className="w-3.5 h-3.5 text-[#222222]/50 absolute left-3 top-2.5" />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-2 text-xs text-stone-400">
                ×
              </button>
            )}
          </div>

          <button
            onClick={() => setIsAccountOpen(true)}
            className="p-2 text-forest hover:bg-forest/5 rounded-full transition-colors hidden sm:block"
            title="Customer Account"
          >
            <User className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsAccountOpen(true)}
            className="relative p-2 text-forest hover:bg-forest/5 rounded-full transition-colors"
            title="Saved Keepsakes"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 bg-gold text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 sm:px-3 sm:py-2 bg-forest text-ivory rounded-full hover:bg-forest/90 transition-transform active:scale-95 shadow-md flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-gold" />
            <span className="text-xs font-semibold pr-1">{cartCount}</span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-ivory border-b border-forest/10 px-6 py-5 space-y-3">
          <input
            type="text"
            placeholder="Search botanical art..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-forest/5 border border-forest/15 rounded-lg px-4 py-2 text-xs mb-3"
          />
          <button
            onClick={() => {
              navigate('/');
              setMobileOpen(false);
            }}
            className={mobileLink}
          >
            Atelier Home
          </button>
          <button
            onClick={() => {
              goToCategory('All');
              setMobileOpen(false);
            }}
            className={mobileLink}
          >
            Shop All Creations
          </button>
          <button
            onClick={() => {
              navigate('/studio');
              setMobileOpen(false);
            }}
            className={`${mobileLink} text-gold flex items-center gap-1.5`}
          >
            <Sparkles className="w-4 h-4" /> Personalization Studio
          </button>
          <button
            onClick={() => {
              navigate('/story');
              setMobileOpen(false);
            }}
            className={mobileLink}
          >
            Our Story & Botanical Craft
          </button>
          <div className="pt-2 flex justify-between items-center text-xs">
            <button
              onClick={() => {
                setIsAccountOpen(true);
                setMobileOpen(false);
              }}
              className="text-forest font-semibold flex items-center gap-1"
            >
              <Clock className="w-3.5 h-3.5 text-gold" /> Track Orders
            </button>
            <button
              onClick={() => {
                navigate(isAdmin ? '/' : '/admin');
                setMobileOpen(false);
              }}
              className="text-gold font-bold"
            >
              {isAdmin ? 'Customer View' : 'Artisan Admin Suite'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
