"use client";

import { DEMO_STORES } from "@/lib/seed";
import { NICHE_THEMES, NICHES } from "@/lib/themes";
import type { Niche } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export function MockupPreview() {
  const [niche, setNiche] = useState<Niche>("food");
  const store = useMemo(
    () => DEMO_STORES.find((item) => item.niche === niche) ?? DEMO_STORES[0],
    [niche],
  );
  const theme = NICHE_THEMES[niche];

  return (
    <section id="preview" className="mx-auto w-[min(1120px,calc(100%-1.5rem))] py-8">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-medium text-indigo-600">معاينة حية</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            نفس المنصة. تخطيط مختلف لكل مجال.
          </h2>
          <p className="mt-4 text-slate-600 leading-8">{theme.heroHint}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {NICHES.map((item) => (
              <button
                key={item}
                onClick={() => setNiche(item)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  niche === item
                    ? "bg-slate-900 text-white shadow-glass"
                    : "bg-white/70 text-slate-600 shadow-glass"
                }`}
              >
                {NICHE_THEMES[item].shortLabel}
              </button>
            ))}
          </div>
          <Link
            href={`/${store.slug}`}
            className="mt-6 inline-flex text-sm font-medium text-indigo-600"
          >
            افتح المتجر التجريبي ← {store.name}
          </Link>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-indigo-200/40 via-white to-rose-200/40 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2.4rem] border border-white/80 bg-slate-950 p-3 shadow-float">
            <div
              className="overflow-hidden rounded-[1.9rem]"
              style={{ background: theme.surface }}
            >
              <div className="px-5 pb-3 pt-5">
                <p className="text-xs text-slate-500">فيترين · {theme.label}</p>
                <h3 className="mt-1 text-xl font-extrabold" style={{ color: theme.heading }}>
                  {store.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-slate-500">{store.tagline}</p>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={niche}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  className="grid grid-cols-2 gap-3 px-4 pb-6"
                >
                  {store.products.slice(0, 4).map((product) => (
                    <div
                      key={product.id}
                      className={`overflow-hidden bg-white shadow-sm ${
                        niche === "cosmetics" ? "rounded-[1.6rem]" : "rounded-2xl"
                      }`}
                    >
                      <div className={`relative ${niche === "food" ? "h-20" : "h-28"}`}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="160px"
                        />
                      </div>
                      <div className="p-2.5">
                        <p className="truncate text-xs font-bold">{product.name}</p>
                        <p className="text-[11px]" style={{ color: store.primaryColor }}>
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
