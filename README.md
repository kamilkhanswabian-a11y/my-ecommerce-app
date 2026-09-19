# My E-Commerce App

A fashion e-commerce web app built with React and Supabase, featuring product browsing, a persistent shopping cart, and user authentication.

## Features

- 🛍️ Product listing with categories, brands, sizes, and colors
- 🖼️ Hero banner carousel (Swiper.js)
- 🛒 Shopping cart with guest support (local state) and synced cart for logged-in users (Supabase `cart_items` table)
- 🔐 User authentication via Supabase Auth
- ⚡ Optimistic UI updates for cart quantity changes

## Tech Stack

- **Frontend:** React
- **Backend / Database:** Supabase (PostgreSQL, Auth)
- **Carousel:** Swiper.js
- **Styling:** Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn
- A Supabase project (with a `products` and `cart_items` table set up)

### Installation

```bash
git clone https://github.com/kamilkhanswabian-a11y/my-ecommerce-app.git
cd my-ecommerce-app
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Run Locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or whichever port your dev server prints).

## Database Schema

### `products`

| Column | Type | Notes |
|---|---|---|
| id | int8 | Primary key |
| name | text | |
| description | text | Nullable |
| price | numeric | |
| brand | text | Nullable |
| category | text | Nullable |
| rating | numeric | Nullable |
| featured | bool | Nullable |
| inStock | bool | Nullable |
| images | text[] | Nullable |
| sizes | text[] | Nullable |
| colors | text[] | Nullable |
| created_at | timestamptz | Nullable |
| updated_at | timestamptz | Nullable |

### `cart_items`

| Column | Type | Notes |
|---|---|---|
| id | int8 | Primary key |
| user_id | uuid | References `auth.users` |
| products_id | int8 | References `products.id` |
| quantity | int | |

## Roadmap

- [ ] Checkout flow
- [ ] Order history
- [ ] Product search & filtering
- [ ] Wishlist

## License

This project is for personal/learning purposes.
