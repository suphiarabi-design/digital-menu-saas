"use client";

import type { Merchant, Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function ProductCard({
  product,
  merchant,
  onAdd,
}: {
  product: Product;
  merchant: Merchant;
  onAdd: (product: Product, variantLabel?: string) => void;
}) {
  const [variant, setVariant] = useState(product.variants?.[0]?.label);
  const delta = product.variants?.find((item) => item.label === variant)?.priceDelta ?? 0;
  const price = product.price + delta;
  const niche = merchant.niche;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`overflow-hidden bg-white shadow-glass ${
        niche === "cosmetics"
          ? "rounded-[2rem]"
          : niche === "food"
            ? "flex rounded-3xl"
            : "rounded-3xl"
      }`}
    >
      <div
        className={`relative shrink-0 overflow-hidden ${
          niche === "food" ? "h-32 w-32 sm:h-40 sm:w-40" : niche === "cosmetics" ? "aspect-[3/4]" : "aspect-square"
        }`}
      >
        <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
      </div>
      <div className={`flex flex-1 flex-col ${niche === "food" ? "p-4" : "p-4"}`}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-bold text-slate-900">{product.name}</h3>
            <p className={`mt-1 text-sm leading-6 text-slate-500 ${niche === "cosmetics" ? "" : "line-clamp-2"}`}>
              {product.description}
            </p>
          </div>
          {product.featured ? (
            <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] text-white">مميّز</span>
          ) : null}
        </div>
        {product.variants?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {product.variants.map((item) => (
              <button
                key={item.id}
                onClick={() => setVariant(item.label)}
                className={`rounded-full px-3 py-1 text-xs ${
                  variant === item.label ? "text-white" : "bg-slate-100 text-slate-600"
                }`}
                style={variant === item.label ? { background: merchant.primaryColor } : undefined}
              >
                {item.label}
              </button>
            ))}
          </div>
        ) : null}
        <div className="mt-auto flex items-center justify-between pt-3">
          <p className="font-extrabold" style={{ color: merchant.primaryColor }}>
            {formatPrice(price)}
          </p>
          <button
            onClick={() => onAdd(product, variant)}
            className="grid h-10 w-10 place-items-center rounded-full text-white shadow-sm"
            style={{ background: merchant.primaryColor }}
            aria-label="إضافة للسلة"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
