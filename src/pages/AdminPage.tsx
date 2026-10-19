import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MetricsBar from '../components/admin/MetricsBar';
import InquiriesTable from '../components/admin/InquiriesTable';
import OrdersTable from '../components/admin/OrdersTable';
import { useStore } from '../context/StoreContext';

export default function AdminPage() {
  const navigate = useNavigate();
  const { addProduct } = useStore();

  const quickAdd = () => {
    const name = window.prompt('New Botanical Product Name:');
    if (!name) return;
    const price = Number(window.prompt('Price in INR (e.g. 1999):') || 1899) || 1899;
    addProduct(name, price);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 mb-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold font-bold">Studio Management Suite</span>
          <h1 className="font-serif text-3xl text-forest mt-1">Artisan Administration Portal</h1>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-stone-300 rounded-xl text-xs font-semibold hover:bg-white text-forest"
          >
            Exit to Storefront
          </button>
          <button
            onClick={quickAdd}
            className="px-4 py-2 bg-forest text-ivory rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:bg-forest/90"
          >
            <Plus className="w-3.5 h-3.5 text-gold" /> Quick Add SKU
          </button>
        </div>
      </div>

      <MetricsBar />
      <InquiriesTable />
      <OrdersTable />
    </div>
  );
}
