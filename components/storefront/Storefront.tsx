"use client";

import { useStore } from "@/context/StoreContext";
import { NICHE_THEMES } from "@/lib/themes";
import type { CartItem, Product } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CartDrawer } from "./CartDrawer";
import { CosmeticsLayout } from "./CosmeticsLayout";
import { FoodLayout } from "./FoodLayout";
import { RetailLayout } from "./RetailLayout";

export function Storefront({ slug }: { slug: string }) {
  const { ready, getBySlug } = useStore();
  const merchant = getBySlug(slug);
  const [category, setCategory] = useState("الكل");
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState("");

  const categories = useMemo(
    () => ["الكل", ...Array.from(new Set(merchant?.products.map((item) => item.category) ?? []))],
    [merchant],
  );

  const products = useMemo(
    () =>
      merchant?.products.filter((item) => category === "الكل" || item.category === category) ?? [],
    [merchant, category],
  );

  if (!ready) {
    return <div className="grid min-h-screen place-items-center text-slate-500">جارٍ التحميل…</div>;
  }

  if (!merchant) {
    return (
      <div className="grid min-h-screen place-items-center p-6 text-center">
        <div>
          <h1 className="text-2xl font-extrabold">المتجر غير موجود</h1>
          <p className="mt-2 text-slate-500">تحقق من الرابط أو عد إلى فيترين.</p>
          <Link href="/" className="mt-4 inline-block text-indigo-600">
            الصفحة الرئيسية
          </Link>
        </div>
      </div>
    );
  }

  const theme = NICHE_THEMES[merchant.niche];

  function addToCart(product: Product, variantLabel?: string) {
    const variant = product.variants?.find((item) => item.label === variantLabel);
    const price = product.price + (variant?.priceDelta ?? 0);
    const key = `${product.id}:${variantLabel ?? ""}`;
    setItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) => (item.key === key ? { ...item, qty: item.qty + 1 } : item));
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          name: product.name,
          price,
          qty: 1,
          variantLabel,
          image: product.image,
        },
      ];
    });
    setOpen(true);
  }

  function changeQty(key: string, delta: number) {
    setItems((prev) =>
      prev
        .map((item) => (item.key === key ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0),
    );
  }

  const Layout =
    merchant.niche === "food"
      ? FoodLayout
      : merchant.niche === "cosmetics"
        ? CosmeticsLayout
        : RetailLayout;

  return (
    <div className="min-h-screen pb-28" style={{ background: theme.surface }}>
      <header
        className="relative overflow-hidden px-5 pb-10 pt-6"
        style={{ background: `linear-gradient(180deg, ${merchant.primaryColor}22, transparent)` }}
      >
        <div className="mx-auto w-[min(960px,100%)]">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-sm text-slate-500">
              فيترين
            </Link>
            <Link href="/dashboard" className="text-sm text-slate-500">
              لوحة التاجر
            </Link>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-4xl font-extrabold"
            style={{ color: theme.heading }}
          >
            {merchant.name}
          </motion.h1>
          <p className="mt-2 max-w-xl text-slate-600">{merchant.tagline}</p>
          <p className="mt-3 text-sm" style={{ color: merchant.primaryColor }}>
            {theme.heroTitle}
          </p>
        </div>
      </header>

      <main className="mx-auto w-[min(960px,calc(100%-1.5rem))]">
        <div className="mb-6 flex gap-2 overflow-auto pb-1">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm ${
                category === item ? "text-white" : "bg-white/80 text-slate-600 shadow-glass"
              }`}
              style={category === item ? { background: merchant.primaryColor } : undefined}
            >
              {item}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={`${merchant.niche}-${category}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Layout merchant={merchant} products={products} onAdd={addToCart} />
          </motion.div>
        </AnimatePresence>
      </main>

      <CartDrawer
        merchant={merchant}
        items={items}
        open={open}
        tableNumber={tableNumber}
        onTableNumber={setTableNumber}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        onQty={changeQty}
      />
    </div>
  );
}
