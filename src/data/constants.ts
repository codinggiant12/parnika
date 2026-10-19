export const CATEGORIES = [
  'All',
  'Resin Earrings',
  'Pendants & Necklaces',
  'Resin Rings',
  'Bracelets & Bangles',
  'Home Décor & Trays',
  'Bookmarks & Stationeries',
  'Custom Monograms & Gifts',
  'Pressed Flower Keepsakes'
];

export const FREE_SHIPPING_THRESHOLD = 1499;
export const SHIPPING_FEE = 99;

export const COUPONS: Record<string, { label: string; type: 'percent' | 'flat'; value: number }> = {
  BOTANICAL10: { label: '10% Botanical Privilege Applied', type: 'percent', value: 10 },
  RESINMAGIC: { label: '₹200 Welcome Artistry Discount Applied', type: 'flat', value: 200 }
};

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Forage & Press',
    desc: 'Wildflowers ethically gathered from mountain slopes, dried in cedar presses with micro-silica sand to preserve genuine petal pigments.',
    icon: '🌿'
  },
  {
    step: '02',
    title: 'Degas & Cast',
    desc: 'Non-toxic bio-resin placed inside vacuum pressure chambers to extract 99.8% of micro-bubbles for flawless glass-like optical clarity.',
    icon: '🧪'
  },
  {
    step: '03',
    title: 'Diamond Polish',
    desc: 'Cast pieces demolded and wet-sanded across 9 ascending grit gradations up to 12,000 grit, culminating in a carnauba micro-wax mirror buff.',
    icon: '✨'
  },
  {
    step: '04',
    title: 'Velvet Packaging',
    desc: 'Mounted onto 18K vermeil or 925 silver findings, packaged in recyclable seeded unbleached paper boxes with personalized certificates.',
    icon: '🎁'
  }
];

export const SOCIAL_IMAGES = [
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=400'
];

export const STUDIO_SILHOUETTES = [
  { id: 'Pendant Necklace', label: 'Pendant Necklace', price: 'from ₹1,899' },
  { id: 'Wedding Keepsake Block', label: 'Prism Keepsake Block', price: 'from ₹3,999' },
  { id: 'Floral Trinket Tray', label: 'Resin Trinket Tray', price: 'from ₹2,499' },
  { id: 'Monogram Keychain', label: 'Monogram Keychain', price: 'from ₹799' },
  { id: 'Botanical Bookmark', label: 'Floral Bookmark', price: 'from ₹649' }
];

export const STUDIO_BOTANICALS = [
  { name: 'Wild Himalayan Fern', color: '#263D32', desc: 'Symbol of endurance and calm' },
  { name: 'Alpine Forget-Me-Nots', color: '#6A8CAF', desc: 'Vibrant azure mountain petals' },
  { name: 'Deep Crimson Rose Petal', color: '#800E13', desc: 'Velvet dried rose blooms' },
  { name: 'Golden Chamomile Blossom', color: '#D4A373', desc: 'Sun-kissed micro flowers' },
  { name: 'Sent Wedding / Memorial Petals', color: '#C5A46D', desc: 'Courier your own blossoms to our studio' }
];

export const STUDIO_TINTS = [
  'Crystal Clear (Glassy)',
  'Emerald Whisper Translucent',
  'Oceanic Azure Mist',
  'Blush Opaline Swirl'
];

export const STUDIO_FOILS = [
  '24K Champagne Gold Leaf',
  'Pure Silver Shimmer Flakes',
  'Rose Gold Metallic Leaf',
  'No Metallic Flakes (Pure Flora)'
];

export const STUDIO_BUDGETS = [
  '₹1,200 – ₹1,800',
  '₹1,800 – ₹3,000',
  '₹3,000 – ₹5,000 (Bridal Keepsakes)',
  '₹5,000+ (Grand Décor Pieces)'
];
