import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type {
  CartItem,
  CustomInquiry,
  InquiryStatus,
  Order,
  OrderStatus,
  PaymentMethod,
  Product,
  ShippingAddress,
  SortOption,
  StudioFormState
} from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { INITIAL_INQUIRIES, INITIAL_ORDERS } from '../data/mockOrders';
import { COUPONS, FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from '../data/constants';
import { randomId, todayLabel } from '../utils/format';
import { useUI } from './UIContext';

interface StoreContextValue {
  // catalog
  products: Product[];
  addProduct: (name: string, price: number) => void;
  filteredProducts: Product[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  maxPrice: number;
  setMaxPrice: (n: number) => void;
  sortBy: SortOption;
  setSortBy: (s: SortOption) => void;
  resetFilters: () => void;

  // cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  appliedDiscount: number;
  shippingFee: number;
  isFreeShipping: boolean;
  cartTotal: number;
  addToCart: (product: Product, quantity?: number, selectedMetal?: string) => void;
  updateCartQuantity: (productId: string, selectedMetal: string, delta: number) => void;
  removeFromCart: (productId: string, selectedMetal: string) => void;
  couponCode: string;
  setCouponCode: (c: string) => void;
  applyCoupon: () => void;
  couponFeedback: { text: string; isError: boolean } | null;

  // wishlist
  wishlist: string[];
  toggleWishlist: (id: string) => void;

  // orders & inquiries
  orders: Order[];
  placeOrder: (address: ShippingAddress, paymentMethod: PaymentMethod) => void;
  advanceOrder: (id: string) => void;
  inquiries: CustomInquiry[];
  submitInquiry: (form: StudioFormState) => boolean;
  advanceInquiry: (id: string) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const { showToast, setIsCartOpen, setIsCheckoutOpen, setCompletedOrder } = useUI();

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(['pr-01', 'pr-03']);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [inquiries, setInquiries] = useState<CustomInquiry[]>(INITIAL_INQUIRIES);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponFeedback, setCouponFeedback] = useState<{ text: string; isError: boolean } | null>(null);

  // ---- derived cart values ----
  const cartCount = cart.reduce((t, i) => t + i.quantity, 0);
  const cartSubtotal = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const appliedDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    const c = COUPONS[appliedCoupon];
    if (!c) return 0;
    const raw = c.type === 'percent' ? Math.round((cartSubtotal * c.value) / 100) : c.value;
    return Math.min(raw, cartSubtotal);
  }, [appliedCoupon, cartSubtotal]);
  const isFreeShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0;
  const shippingFee = isFreeShipping ? 0 : SHIPPING_FEE;
  const cartTotal = Math.max(0, cartSubtotal - appliedDiscount + shippingFee);

  // ---- catalog ----
  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return products
      .filter((p) => {
        const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesPrice = p.price <= maxPrice;
        const matchesSearch =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.botanicalOrigin.toLowerCase().includes(q) ||
          p.materials.some((m) => m.toLowerCase().includes(q));
        return matchesCat && matchesPrice && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      });
  }, [products, selectedCategory, maxPrice, searchQuery, sortBy]);

  const resetFilters = useCallback(() => {
    setSelectedCategory('All');
    setMaxPrice(5000);
    setSortBy('featured');
    setSearchQuery('');
  }, []);

  const addProduct = (name: string, price: number) => {
    const sku: Product = {
      id: `pr-${Date.now()}`,
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      category: 'Resin Earrings',
      collection: 'Botanical Dreams',
      price,
      originalPrice: Math.round(price * 1.25),
      rating: 5.0,
      reviewCount: 1,
      inStock: true,
      stockCount: 10,
      images: ['https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=800'],
      description: 'Freshly cast artisanal botanical piece.',
      materials: ['Preserved Wildflowers', 'UV Eco-Resin'],
      dimensions: '30mm standard',
      botanicalOrigin: 'Studio Harvested',
      careInstructions: ['Handle with care'],
      metalOptions: ['18K Gold Plated']
    };
    setProducts((prev) => [sku, ...prev]);
    showToast(`Added SKU "${name}" to store catalog!`);
  };

  // ---- cart ----
  const addToCart = (product: Product, quantity = 1, selectedMetal = product.metalOptions[0] ?? '18K Gold Plated') => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id && i.selectedMetal === selectedMetal);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.selectedMetal === selectedMetal
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity, selectedMetal }];
    });
    setIsCartOpen(true);
    showToast(`Added "${product.name}" to cart`);
  };

  const updateCartQuantity = (productId: string, selectedMetal: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.product.id === productId && i.selectedMetal === selectedMetal ? { ...i, quantity: i.quantity + delta } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const removeFromCart = (productId: string, selectedMetal: string) => {
    setCart((prev) => prev.filter((i) => !(i.product.id === productId && i.selectedMetal === selectedMetal)));
    showToast('Item removed from cart');
  };

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    const coupon = COUPONS[code];
    if (coupon) {
      setAppliedCoupon(code);
      setCouponFeedback({ text: coupon.label, isError: false });
      showToast('Coupon applied!');
    } else {
      setAppliedCoupon(null);
      setCouponFeedback({ text: 'Invalid code. Try BOTANICAL10', isError: true });
    }
  };

  // ---- wishlist ----
  const toggleWishlist = (id: string) => {
    const exists = wishlist.includes(id);
    setWishlist((prev) => (exists ? prev.filter((x) => x !== id) : [...prev, id]));
    showToast(exists ? 'Removed from wishlist' : 'Saved to wishlist');
  };

  // ---- orders ----
  const placeOrder = (address: ShippingAddress, paymentMethod: PaymentMethod) => {
    const order: Order = {
      id: randomId('PAR'),
      date: todayLabel(),
      items: cart,
      subtotal: cartSubtotal,
      discount: appliedDiscount,
      shipping: shippingFee,
      total: cartTotal,
      shippingAddress: address,
      paymentMethod,
      status: 'Processing'
    };
    setOrders((prev) => [order, ...prev]);
    setCompletedOrder(order);
    setCart([]);
    setCouponCode('');
    setAppliedCoupon(null);
    setCouponFeedback(null);
    setIsCheckoutOpen(false);
  };

  const advanceOrder = (id: string) => {
    const next: Record<OrderStatus, OrderStatus> = {
      Processing: 'Cast & Curing',
      'Cast & Curing': 'Polishing',
      Polishing: 'Dispatched',
      Dispatched: 'Delivered',
      Delivered: 'Delivered'
    };
    const order = orders.find((o) => o.id === id);
    if (!order) return;
    const status = next[order.status];
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    showToast(`Order ${id} updated to ${status}`);
  };

  // ---- inquiries ----
  const submitInquiry = (form: StudioFormState): boolean => {
    if (!form.customerName || !form.phone) {
      showToast('Please provide your name and WhatsApp number.');
      return false;
    }
    const inq: CustomInquiry = {
      id: randomId('INQ', 4),
      date: todayLabel(),
      customerName: form.customerName,
      email: form.email,
      phone: form.phone,
      productType: form.productType,
      botanicalStyle: form.botanical,
      colorPalette: form.colorTint,
      metalFoil: form.metalFoil,
      initials: form.initials,
      specialInstructions: form.instructions,
      budgetRange: form.budget,
      status: 'Pending'
    };
    setInquiries((prev) => [inq, ...prev]);
    showToast('Custom creation inquiry sent to our master artisan!');
    return true;
  };

  const advanceInquiry = (id: string) => {
    const next: Record<InquiryStatus, InquiryStatus> = {
      Pending: 'Quoted',
      Quoted: 'In Crafting',
      'In Crafting': 'Dispatched',
      Dispatched: 'Dispatched'
    };
    const inq = inquiries.find((i) => i.id === id);
    if (!inq) return;
    const status = next[inq.status];
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    showToast(`Updated inquiry ${id} to ${status}`);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        filteredProducts,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        maxPrice,
        setMaxPrice,
        sortBy,
        setSortBy,
        resetFilters,
        cart,
        cartCount,
        cartSubtotal,
        appliedDiscount,
        shippingFee,
        isFreeShipping,
        cartTotal,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        couponCode,
        setCouponCode,
        applyCoupon,
        couponFeedback,
        wishlist,
        toggleWishlist,
        orders,
        placeOrder,
        advanceOrder,
        inquiries,
        submitInquiry,
        advanceInquiry
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
