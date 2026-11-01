"use client";

import { Button } from "@/components/ui/Button";
import type { CartItem, Merchant } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { buildOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";

export function CartDrawer({
  merchant,
  items,
  open,
  tableNumber,
  onTableNumber,
  onClose,
  onOpen,
  onQty,
}: {
  merchant: Merchant;
  items: CartItem[];
  open: boolean;
  tableNumber: string;
  onTableNumber: (value: string) => void;
  onClose: () => void;
  onOpen: () => void;
  onQty: (key: string, delta: number) => void;
}) {
  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  function checkout() {
    const message = buildOrderMessage({
      storeName: merchant.name,
      items,
      tableNumber,
      niche: merchant.niche,
    });
    window.open(buildWhatsAppUrl(merchant.whatsapp, message), "_blank");
  }

  return (
    <>
      <button
        onClick={onOpen}
        className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full px-5 py-3 text-white shadow-float md:bottom-8"
        style={{ background: merchant.primaryColor }}
      >
        <ShoppingBag className="h-5 w-5" />
        <span className="font-bold">السلة · {count}</span>
        <span className="text-sm opacity-90">{formatPrice(total)}</span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={onClose} aria-label="إغلاق السلة" />
            <motion.aside
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="absolute inset-x-0 bottom-0 flex max-h-[86vh] w-full flex-col rounded-t-[2rem] bg-white shadow-float sm:inset-y-0 sm:start-0 sm:max-w-md sm:rounded-none"
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <h3 className="text-lg font-extrabold">سلتك</h3>
                <button onClick={onClose} className="rounded-full p-2 hover:bg-slate-100">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 space-y-3 overflow-auto p-5">
                {merchant.niche === "food" ? (
                  <label className="block rounded-2xl bg-orange-50 p-4 text-sm">
                    <span className="font-medium text-orange-950">رقم الطاولة</span>
                    <input
                      value={tableNumber}
                      onChange={(event) => onTableNumber(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-orange-100 bg-white px-3 py-2 outline-none"
                      placeholder="مثال: 12"
                    />
                  </label>
                ) : null}
                {items.length === 0 ? (
                  <p className="text-sm text-slate-500">السلة فارغة — أضف منتجاً للبدء.</p>
                ) : (
                  items.map((item) => (
                    <div key={item.key} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3">
                      <div>
                        <p className="font-bold">{item.name}</p>
                        {item.variantLabel ? (
                          <p className="text-xs text-slate-500">{item.variantLabel}</p>
                        ) : null}
                        <p className="text-sm" style={{ color: merchant.primaryColor }}>
                          {formatPrice(item.price * item.qty)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="rounded-full bg-white p-1 shadow" onClick={() => onQty(item.key, -1)}>
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-5 text-center text-sm">{item.qty}</span>
                        <button className="rounded-full bg-white p-1 shadow" onClick={() => onQty(item.key, 1)}>
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="border-t border-slate-100 p-5">
                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="text-slate-500">الإجمالي</span>
                  <span className="text-xl font-extrabold">{formatPrice(total)}</span>
                </div>
                <Button
                  className="w-full py-3"
                  disabled={!items.length || !merchant.whatsapp}
                  onClick={checkout}
                  style={{ background: merchant.primaryColor }}
                >
                  إتمام الطلب عبر واتساب
                </Button>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
