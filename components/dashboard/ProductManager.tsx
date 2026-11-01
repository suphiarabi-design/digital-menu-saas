"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field, Input, Textarea } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useStore } from "@/context/StoreContext";
import type { Product } from "@/lib/types";
import { formatPrice, uid } from "@/lib/utils";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

const EMPTY: Omit<Product, "id"> = {
  name: "",
  description: "",
  price: 0,
  category: "",
  image:
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
  featured: false,
  variants: [],
};

export function ProductManager() {
  const { merchant, addProduct, updateProduct, deleteProduct } = useStore();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [variantText, setVariantText] = useState("");

  const title = editingId ? "تعديل منتج" : "إضافة منتج";

  const categories = useMemo(
    () => Array.from(new Set(merchant.products.map((item) => item.category))),
    [merchant.products],
  );

  function startCreate() {
    setEditingId(null);
    setForm(EMPTY);
    setVariantText("");
    setOpen(true);
  }

  function startEdit(product: Product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      featured: product.featured,
      variants: product.variants ?? [],
    });
    setVariantText((product.variants ?? []).map((item) => item.label).join("، "));
    setOpen(true);
  }

  function save() {
    const variants = variantText
      .split(/[،,]/)
      .map((label) => label.trim())
      .filter(Boolean)
      .map((label) => ({ id: uid("v"), label }));

    const payload = { ...form, price: Number(form.price) || 0, variants };
    if (editingId) updateProduct(editingId, payload);
    else addProduct(payload);
    setOpen(false);
  }

  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">المنتجات</h2>
          <p className="text-sm text-slate-500">
            {merchant.products.length} عنصر · التصنيفات: {categories.join("، ") || "—"}
          </p>
        </div>
        <Button onClick={startCreate}>
          <Plus className="h-4 w-4" />
          إضافة
        </Button>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-100">
        {merchant.products.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-4 border-b border-slate-100 p-3 last:border-b-0"
          >
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold">{product.name}</p>
              <p className="text-sm text-slate-500">
                {product.category} · {formatPrice(product.price)}
              </p>
            </div>
            <Button variant="ghost" className="px-3" onClick={() => startEdit(product)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              className="px-3 text-rose-600"
              onClick={() => deleteProduct(product.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <Modal open={open} title={title} onClose={() => setOpen(false)}>
        <div className="grid gap-4">
          <Field label="اسم المنتج">
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="الوصف">
            <Textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="السعر">
              <Input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              />
            </Field>
            <Field label="التصنيف">
              <Input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </Field>
          </div>
          <Field label="رابط الصورة">
            <Input
              dir="ltr"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
          </Field>
          {merchant.niche === "retail" ? (
            <Field label="المتغيرات / المقاسات (افصل بفاصلة)">
              <Input
                value={variantText}
                onChange={(e) => setVariantText(e.target.value)}
                placeholder="S، M، L"
              />
            </Field>
          ) : null}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={Boolean(form.featured)}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            منتج مميّز
          </label>
          <Button onClick={save} disabled={!form.name}>
            حفظ المنتج
          </Button>
        </div>
      </Modal>
    </Card>
  );
}
