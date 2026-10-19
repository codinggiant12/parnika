# PARNIKA — Botanical Resin Art Storefront

A luxury Indian botanical resin art e-commerce frontend built with **React 18 + TypeScript + Vite + Tailwind CSS + React Router**.

## Getting started

```bash
npm install
npm run dev        # start dev server
npm run build      # type-check and production build
npm run preview    # preview the production build
```

## Folder structure

```
src/
├── main.tsx                 # entry: Router + providers
├── App.tsx                  # route table
├── index.css                # Tailwind layers
├── types/                   # shared TypeScript interfaces
├── data/
│   ├── products.ts          # catalog (12 products)
│   ├── mockOrders.ts        # seed orders & inquiries
│   └── constants.ts         # categories, coupons, studio options, content
├── utils/format.ts          # ₹ formatting, date + id helpers
├── context/
│   ├── UIContext.tsx        # toast + modal/drawer open state
│   └── StoreContext.tsx     # products, filters, cart, wishlist, orders, inquiries
├── hooks/useGoToCategory.ts
├── components/
│   ├── common/              # BrandLogo, Toast, SectionHeading
│   ├── layout/              # Layout, AnnouncementBar, Header, Footer
│   ├── home/                # Hero, CategoryShortcuts, BestSellers, ArtisanProcess, SocialGallery, Newsletter
│   ├── product/             # ProductCard, ProductGrid, QuickViewModal
│   ├── cart/                # CartDrawer
│   ├── checkout/            # CheckoutModal, OrderSuccessModal
│   ├── account/             # AccountModal (orders + wishlist)
│   ├── studio/              # StudioForm, StudioPreview
│   └── admin/               # MetricsBar, InquiriesTable, OrdersTable
└── pages/                   # HomePage, ShopPage, StudioPage, StoryPage, AdminPage
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/shop` | Catalog with filters, sort and search |
| `/studio` | Custom personalization studio |
| `/story` | Our story |
| `/admin` | Artisan admin portal |

## Notes

- Brand colours are Tailwind tokens: `forest`, `gold`, `sage`, `ivory`.
- Coupons: `BOTANICAL10` (10%), `RESINMAGIC` (₹200 off). Free shipping above ₹1,499.
- All data is in-memory mock state; replace `StoreContext` actions with API calls when you add a backend.
- Checkout and Razorpay/UPI are simulated.
