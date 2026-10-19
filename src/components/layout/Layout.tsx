import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AnnouncementBar from './AnnouncementBar';
import Header from './Header';
import Footer from './Footer';
import Toast from '../common/Toast';
import CartDrawer from '../cart/CartDrawer';
import QuickViewModal from '../product/QuickViewModal';
import CheckoutModal from '../checkout/CheckoutModal';
import OrderSuccessModal from '../checkout/OrderSuccessModal';
import AccountModal from '../account/AccountModal';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
}

export default function Layout() {
  return (
    <div className="min-h-screen bg-ivory text-[#222222] font-sans antialiased selection:bg-gold/30 flex flex-col justify-between">
      <ScrollToTop />
      <Toast />
      <AnnouncementBar />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />

      <CartDrawer />
      <QuickViewModal />
      <CheckoutModal />
      <OrderSuccessModal />
      <AccountModal />
    </div>
  );
}
