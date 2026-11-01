export type Niche = "food" | "cosmetics" | "retail";

export type ProductVariant = {
  id: string;
  label: string;
  priceDelta?: number;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  featured?: boolean;
  variants?: ProductVariant[];
};

export type Merchant = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  whatsapp: string;
  primaryColor: string;
  niche: Niche;
  products: Product[];
};

export type CartItem = {
  key: string;
  productId: string;
  name: string;
  price: number;
  qty: number;
  variantLabel?: string;
  image: string;
};
