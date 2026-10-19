export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  collection: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  images: string[];
  description: string;
  materials: string[];
  dimensions: string;
  botanicalOrigin: string;
  careInstructions: string[];
  metalOptions: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedMetal: string;
}

export type InquiryStatus = 'Pending' | 'Quoted' | 'In Crafting' | 'Dispatched';

export interface CustomInquiry {
  id: string;
  date: string;
  customerName: string;
  email: string;
  phone: string;
  productType: string;
  botanicalStyle: string;
  colorPalette: string;
  metalFoil: string;
  initials?: string;
  specialInstructions: string;
  budgetRange: string;
  status: InquiryStatus;
}

export type OrderStatus = 'Processing' | 'Cast & Curing' | 'Polishing' | 'Dispatched' | 'Delivered';
export type PaymentMethod = 'UPI' | 'Card' | 'COD';

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export interface StudioFormState {
  productType: string;
  botanical: string;
  colorTint: string;
  metalFoil: string;
  initials: string;
  budget: string;
  instructions: string;
  customerName: string;
  phone: string;
  email: string;
}
