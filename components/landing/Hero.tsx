"use client";

import { Button } from "@/components/ui/Button";
import { NICHE_THEMES, NICHES } from "@/lib/themes";
import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="mx-auto w-[min(1120px,calc(100%-1.5rem))] pb-8 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-1.5 text-sm text-slate-600 shadow-glass backdrop-blur-xl">
          محرك ثيمات متعدد المجالات
        </span>
        <h1 className="mt-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-6xl">
          متجر رقمي واحد.
          <span className="block bg-gradient-to-l from-indigo-600 via-fuchsia-600 to-orange-500 bg-clip-text text-transparent">
            ثلاثة عوالم بصرية.
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          فيترين منصة SaaS لبناء قوائم الطعام، واجهات التجميل، ومتاجر التجزئة —
          بتصميم فاخر، دعم عربي كامل من اليمين لليسار، وطلب واتساب فوري.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/dashboard">
            <Button className="px-6 py-3">
              ابدأ الإعداد
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <a href="#preview">
            <Button variant="secondary" className="px-6 py-3">
              شاهد المعاينة الحية
            </Button>
          </a>
        </div>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
          {["رمز QR لحظي", "سلة عائمة للجوال", "ثيمات طعام / تجميل / تجزئة"].map(
            (item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-indigo-600" />
                {item}
              </li>
            ),
          )}
        </ul>
      </motion.div>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {NICHES.map((niche, index) => {
          const theme = NICHE_THEMES[niche];
          return (
            <motion.article
              key={niche}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 * index }}
              className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-glass backdrop-blur-2xl"
            >
              <div
                className="mb-4 h-12 w-12 rounded-2xl"
                style={{ background: theme.defaultColor }}
              />
              <h2 className="text-xl font-bold">{theme.label}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {theme.description}
              </p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
