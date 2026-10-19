import type { CustomInquiry, Order } from '../types';
import { INITIAL_PRODUCTS } from './products';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'PAR-837291',
    date: '18 Oct 2026',
    items: [{ product: INITIAL_PRODUCTS[0], quantity: 1, selectedMetal: '18K Gold Plated' }],
    subtotal: 1899,
    discount: 0,
    shipping: 0,
    total: 1899,
    shippingAddress: {
      fullName: 'Aarohi Sen',
      email: 'aarohi.sen@example.com',
      phone: '+91 98765 43210',
      address: 'B-304, Green Glen Meadows, Bellandur',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560103'
    },
    paymentMethod: 'UPI',
    status: 'Cast & Curing'
  }
];

export const INITIAL_INQUIRIES: CustomInquiry[] = [
  {
    id: 'INQ-4819',
    date: '17 Oct 2026',
    customerName: 'Priya Sharma',
    email: 'priya.s@example.com',
    phone: '+91 98222 11009',
    productType: 'Wedding Keepsake Block',
    botanicalStyle: 'Sent Bridal Garland Roses',
    colorPalette: 'Crystal Clear (Glassy)',
    metalFoil: '24K Champagne Gold Leaf',
    specialInstructions: 'Preserve deep red bridal roses with gold leaf and wedding date Nov 12, 2026',
    budgetRange: '₹3,500 – ₹5,000',
    status: 'Pending'
  }
];
