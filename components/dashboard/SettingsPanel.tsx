"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field, Input } from "@/components/ui/Input";
import { useStore } from "@/context/StoreContext";
import { NICHE_THEMES, NICHES } from "@/lib/themes";
import type { Niche } from "@/lib/types";
import { slugify } from "@/lib/utils";

export function SettingsPanel() {
  const { merchant, stores, setActiveMerchant, updateMerchant, setNiche } = useStore();

  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <Card className="p-6">
        <h2 className="text-lg font-bold">إعدادات المتجر</h2>
        <p className="mt-1 text-sm text-slate-500">
          تنعكس هذه القيم فوراً على الصفحة العامة ورمز QR.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label="المتجر التجريبي">
            <select
              className="w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm outline-none"
              value={merchant.id}
              onChange={(event) => setActiveMerchant(event.target.value)}
            >
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="اسم العلامة">
            <Input
              value={merchant.name}
              onChange={(event) => updateMerchant({ name: event.target.value })}
            />
          </Field>
          <Field label="الرابط العام">
            <Input
              value={merchant.slug}
              onChange={(event) =>
                updateMerchant({ slug: slugify(event.target.value) || merchant.slug })
              }
            />
          </Field>
          <Field label="رقم واتساب">
            <Input
              dir="ltr"
              value={merchant.whatsapp}
              onChange={(event) => updateMerchant({ whatsapp: event.target.value })}
              placeholder="05xxxxxxxx"
            />
          </Field>
          <Field label="اللون الأساسي">
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={merchant.primaryColor}
                onChange={(event) => updateMerchant({ primaryColor: event.target.value })}
                className="h-12 w-14 cursor-pointer rounded-2xl border border-slate-200 bg-white p-1"
              />
              <Input
                dir="ltr"
                value={merchant.primaryColor}
                onChange={(event) => updateMerchant({ primaryColor: event.target.value })}
              />
            </div>
          </Field>
          <Field label="الوصف المختصر">
            <Input
              value={merchant.tagline}
              onChange={(event) => updateMerchant({ tagline: event.target.value })}
            />
          </Field>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-bold">محرك الثيمات</h2>
        <p className="mt-1 text-sm text-slate-500">
          غيّر المجال البصري للمتجر العام دون إعادة بناء الصفحة.
        </p>
        <div className="mt-5 space-y-3">
          {NICHES.map((niche: Niche) => {
            const theme = NICHE_THEMES[niche];
            const active = merchant.niche === niche;
            return (
              <button
                key={niche}
                onClick={() => setNiche(niche)}
                className={`w-full rounded-2xl border p-4 text-right transition ${
                  active
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white/70 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">{theme.label}</span>
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: theme.defaultColor }}
                  />
                </div>
                <p className={`mt-1 text-sm ${active ? "text-white/70" : "text-slate-500"}`}>
                  {theme.description}
                </p>
              </button>
            );
          })}
        </div>
        <Button
          className="mt-5 w-full"
          variant="secondary"
          onClick={() =>
            updateMerchant({
              primaryColor: NICHE_THEMES[merchant.niche].defaultColor,
            })
          }
        >
          استعادة لون الثيم الافتراضي
        </Button>
      </Card>
    </div>
  );
}
