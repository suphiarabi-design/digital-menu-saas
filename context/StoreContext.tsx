"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DEFAULT_MERCHANT_ID, DEMO_STORES } from "@/lib/seed";
import type { Merchant, Niche, Product } from "@/lib/types";
import { uid } from "@/lib/utils";

const STORAGE_KEY = "vitrine.stores.v1";

type StoreContextValue = {
  ready: boolean;
  stores: Merchant[];
  merchant: Merchant;
  setActiveMerchant: (id: string) => void;
  updateMerchant: (patch: Partial<Merchant>) => void;
  setNiche: (niche: Niche) => void;
  addProduct: (product: Omit<Product, "id"> & { id?: string }) => void;
  updateProduct: (productId: string, patch: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  getBySlug: (slug: string) => Merchant | undefined;
  resetDemo: () => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

function persist(stores: Merchant[], activeId: string) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ stores, activeId }));
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [stores, setStores] = useState<Merchant[]>(DEMO_STORES);
  const [activeId, setActiveId] = useState(DEFAULT_MERCHANT_ID);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { stores: Merchant[]; activeId: string };
        if (Array.isArray(parsed.stores) && parsed.stores.length) {
          setStores(parsed.stores);
          setActiveId(parsed.activeId || parsed.stores[0].id);
        }
      }
    } catch {
      /* keep seed */
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    persist(stores, activeId);
  }, [stores, activeId, ready]);

  const merchant = useMemo(
    () => stores.find((item) => item.id === activeId) ?? stores[0],
    [stores, activeId],
  );

  const patchActive = useCallback(
    (updater: (current: Merchant) => Merchant) => {
      setStores((prev) =>
        prev.map((item) => (item.id === activeId ? updater(item) : item)),
      );
    },
    [activeId],
  );

  const value = useMemo<StoreContextValue>(
    () => ({
      ready,
      stores,
      merchant,
      setActiveMerchant: setActiveId,
      updateMerchant: (patch) => patchActive((current) => ({ ...current, ...patch })),
      setNiche: (niche) => patchActive((current) => ({ ...current, niche })),
      addProduct: (product) =>
        patchActive((current) => ({
          ...current,
          products: [{ ...product, id: product.id ?? uid("p") }, ...current.products],
        })),
      updateProduct: (productId, patch) =>
        patchActive((current) => ({
          ...current,
          products: current.products.map((item) =>
            item.id === productId ? { ...item, ...patch } : item,
          ),
        })),
      deleteProduct: (productId) =>
        patchActive((current) => ({
          ...current,
          products: current.products.filter((item) => item.id !== productId),
        })),
      getBySlug: (slug) => stores.find((item) => item.slug === slug),
      resetDemo: () => {
        setStores(DEMO_STORES);
        setActiveId(DEFAULT_MERCHANT_ID);
      },
    }),
    [ready, stores, merchant, patchActive],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
