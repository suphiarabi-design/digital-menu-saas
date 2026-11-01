"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

const TIERS = [
  {
    name: "انطلاق",
    price: "مجاناً",
    note: "للتجربة والمتاجر الصغيرة",
    featured: false,
    perks: ["متجر واحد", "حتى 20 منتجاً", "ثيم واحد", "طلب واتساب"],
  },
  {
    name: "احترافي",
    price: "49 ر.س",
    note: "الأكثر اختياراً للعلامات النامية",
    featured: true,
    perks: [
      "تبديل الثيمات بلا حدود",
      "QR قابل للتنزيل",
      "منتجات غير محدودة",
      "تخصيص اللون الأساسي",
    ],
  },
  {
    name: "أعمال",
    price: "149 ر.س",
    note: "للفروع والدعم الأسرع",
    featured: false,
    perks: ["فروع متعددة", "دعم أولوية", "تصدير تقارير الطلب", "هوية بصرية مخصّصة"],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto w-[min(1120px,calc(100%-1.5rem))] py-16">
      <div className="text-center">
        <p className="text-sm font-medium text-indigo-600">الأسعار</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          خطط واضحة، بدون مفاجآت.
        </h2>
      </div>
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {TIERS.map((tier, index) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            <Card
              className={`h-full p-7 ${tier.featured ? "ring-2 ring-slate-900" : ""}`}
            >
              <p className="text-sm text-slate-500">{tier.name}</p>
              <p className="mt-3 text-4xl font-extrabold">{tier.price}</p>
              <p className="mt-1 text-sm text-slate-500">{tier.note}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-indigo-600" />
                    {perk}
                  </li>
                ))}
              </ul>
              <Link href="/dashboard" className="mt-8 block">
                <Button className="w-full" variant={tier.featured ? "primary" : "secondary"}>
                  ابدأ الآن
                </Button>
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
