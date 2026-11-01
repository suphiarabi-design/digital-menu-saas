"use client";

import type { Merchant, Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

export function RetailLayout({
  merchant,
  products,
  onAdd,
}: {
  merchant: Merchant;
  products: Product[];
  onAdd: (product: Product, variantLabel?: string) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} merchant={merchant} onAdd={onAdd} />
      ))}
    </div>
  );
}
