import { Mail } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export default function Newsletter() {
  const { showToast } = useUI();

  return (
    <section className="bg-forest text-ivory py-14">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <Mail className="w-8 h-8 text-gold mx-auto mb-3" />
        <h3 className="font-serif text-2xl sm:text-3xl text-ivory">A Little Art in Your Inbox</h3>
        <p className="text-xs sm:text-sm text-sage mt-2 max-w-md mx-auto">
          Subscribe for private invites to seasonal wildflower harvests and unlock a{' '}
          <strong className="text-gold">10% maiden voucher</strong>.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            showToast('Welcome to our collector circle! Coupon BOTANICAL10 unlocked.');
            e.currentTarget.reset();
          }}
          className="mt-6 flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            placeholder="Enter your email address..."
            className="flex-grow px-4 py-3 rounded-full bg-[#1f3229] border border-sage/30 text-xs text-ivory placeholder-sage/60 focus:outline-none focus:border-gold"
          />
          <button
            type="submit"
            className="px-7 py-3 bg-gold hover:bg-[#b39158] text-forest font-bold text-xs uppercase tracking-wider rounded-full transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
