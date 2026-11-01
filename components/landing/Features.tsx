"use client";

import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { Palette, QrCode, ShoppingBag, Smartphone, Store, Wand2 } from "lucide-react";

const FEATURES = [
  {
    icon: Wand2,
    title: "محرك الثيمات المتعدد",
    text: "بدّل بين ثيم المطعم، التجميل، أو التجزئة في ثانية — والواجهة العامة تتغيّر تلقائياً.",
  },
  {
    icon: Store,
    title: "لوحة تاجر موحّدة",
    text: "اسم العلامة، واتساب، اللون الأساسي، وإدارة المنتجات من شاشة واحدة أنيقة.",
  },
  {
    icon: QrCode,
    title: "مولّد QR فوري",
    text: "حمّل رمز QR مرتبط بصفحة علامتك العامة والصقه على الطاولة أو forecourt.",
  },
  {
    icon: ShoppingBag,
    title: "طلب واتساب منظّم",
    text: "السلة تُنشئ رسالة طلب واضحة وتفتح واتساب مباشرة عبر wa.me.",
  },
  {
    icon: Smartphone,
    title: "سلة عائمة للجوال",
    text: "درج سلّة لاصق بتفاعلات ناعمة يناسب الاستخدام بيد واحدة.",
  },
  {
    icon: Palette,
    title: "جمالية Apple / Stripe",
    text: "زجاج ضبابي، ظلال خفيفة، وحركة Framer Motion مدروسة دون إفراط.",
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto w-[min(1120px,calc(100%-1.5rem))] py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-indigo-600">لماذا فيترين</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          كل ما يحتاجه التاجر، دون تعقيد لوحة قديمة.
        </h2>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="h-full p-6">
              <feature.icon className="h-6 w-6 text-indigo-600" />
              <h3 className="mt-4 text-lg font-bold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{feature.text}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
