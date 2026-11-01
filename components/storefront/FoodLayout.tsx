"use client";

import type { Merchant, Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

export function FoodLayout({
  merchant,
  products,
  onAdd,
}: {
  merchant: Merchant;
  products: Product[];
  onAdd: (product: Product, variantLabel?: string) => void;
}) {
  return (
    <div className="space-y-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} merchant={merchant} onAdd={onAdd} />
      ))}
    </div>
  );
}
