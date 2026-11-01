"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useStore } from "@/context/StoreContext";
import { NICHE_THEMES } from "@/lib/themes";
import { formatPrice } from "@/lib/utils";
import { motion } from "framer-motion";
import { LayoutDashboard, Package, QrCode, RotateCcw, Settings2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ProductManager } from "./ProductManager";
import { QrPanel } from "./QrPanel";
import { SettingsPanel } from "./SettingsPanel";

const TABS = [
  { id: "overview", label: "نظرة عامة", icon: LayoutDashboard },
  { id: "settings", label: "الإعدادات", icon: Settings2 },
  { id: "products", label: "المنتجات", icon: Package },
  { id: "qr", label: "رمز QR", icon: QrCode },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function DashboardShell() {
  const { merchant, resetDemo } = useStore();
  const [tab, setTab] = useState<TabId>("overview");
  const theme = NICHE_THEMES[merchant.niche];
  const catalogValue = merchant.products.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="mx-auto grid min-h-screen w-[min(1200px,calc(100%-1rem))] gap-4 py-4 lg:grid-cols-[240px_1fr]">
      <aside className="h-fit rounded-[28px] border border-white/70 bg-white/75 p-4 shadow-glass backdrop-blur-2xl lg:sticky lg:top-4">
        <Link href="/" className="mb-6 flex items-center gap-2 px-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-900 text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <p className="font-extrabold">فيترين</p>
            <p className="text-xs text-slate-500">لوحة التاجر</p>
          </div>
        </Link>
        <nav className="space-y-1">
          {TABS.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition ${
                tab === item.id
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-white"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <Button variant="ghost" className="mt-6 w-full text-slate-500" onClick={resetDemo}>
          <RotateCcw className="h-4 w-4" />
          إعادة العرض التجريبي
        </Button>
      </aside>

      <div className="space-y-4 pb-10">
        <header className="rounded-[28px] border border-white/70 bg-white/75 p-6 shadow-glass backdrop-blur-2xl">
          <p className="text-sm text-slate-500">مرحباً بك في لوحة {merchant.name}</p>
          <h1 className="mt-1 text-3xl font-extrabold">{merchant.name}</h1>
          <p className="mt-2 text-sm text-slate-500">
            الثيم الحالي: {theme.label} · الرابط /{merchant.slug}
          </p>
        </header>

        {tab === "overview" ? (
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "المنتجات", value: String(merchant.products.length) },
              { label: "قيمة الكتالوج", value: formatPrice(catalogValue) },
              { label: "المجال", value: theme.shortLabel },
            ].map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                <Card className="p-5">
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="mt-2 text-2xl font-extrabold">{stat.value}</p>
                </Card>
              </motion.div>
            ))}
            <Card className="p-6 sm:col-span-3">
              <p className="text-sm leading-7 text-slate-600">
                من هنا تضبط الهوية، تبدّل الثيم، وتدير المنتجات. الصفحة العامة
                تتكيّف تلقائياً: قائمة طعام برقم طاولة، شبكة تجميل تحريرية، أو كتالوج تجزئة بالمقاسات.
              </p>
            </Card>
          </div>
        ) : null}

        {tab === "settings" ? <SettingsPanel /> : null}
        {tab === "products" ? <ProductManager /> : null}
        {tab === "qr" ? <QrPanel /> : null}
      </div>
    </div>
  );
}
