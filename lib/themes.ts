import type { Niche } from "./types";

export type ThemeTokens = {
  label: string;
  shortLabel: string;
  description: string;
  defaultColor: string;
  surface: string;
  muted: string;
  card: string;
  heading: string;
  layout: "menu" | "editorial" | "catalog";
  heroTitle: string;
  heroHint: string;
};

export const NICHE_THEMES: Record<Niche, ThemeTokens> = {
  food: {
    label: "طعام ومقاهي",
    shortLabel: "مطعم",
    description: "ألوان دافئة، رقم طاولة، وسلة طلب فوري للقوائم الرقمية.",
    defaultColor: "#C2410C",
    surface: "#FFF7ED",
    muted: "#9A3412",
    card: "#FFFFFF",
    heading: "#7C2D12",
    layout: "menu",
    heroTitle: "قائمة دافئة بطلب خلال ثوانٍ",
    heroHint: "مثالي للمقاهي والمطاعم والطلبات على الطاولة.",
  },
  cosmetics: {
    label: "تجميل وعناية",
    shortLabel: "تجميل",
    description: "شبكة تحريرية نظيفة تبرز الصور عالية الدقة وتفاصيل المنتج.",
    defaultColor: "#BE185D",
    surface: "#FDF2F8",
    muted: "#9D174D",
    card: "#FFFFFF",
    heading: "#831843",
    layout: "editorial",
    heroTitle: "واجهة تحريرية تُظهر جمال المنتج",
    heroHint: "شبّاك عرض فاخر للسيروم، العطور، ومستحضرات العناية.",
  },
  retail: {
    label: "تجزئة ومتاجر عامة",
    shortLabel: "تجزئة",
    description: "شبكة تجارة إلكترونية قياسية مع مقاسات ومتغيرات المنتج.",
    defaultColor: "#4F46E5",
    surface: "#F8FAFC",
    muted: "#334155",
    card: "#FFFFFF",
    heading: "#0F172A",
    layout: "catalog",
    heroTitle: "متجر أنيق بمقاسات ومتغيرات واضحة",
    heroHint: "للأزياء، الإلكترونيات، والبيع بالتجزئة متعدد الأصناف.",
  },
};

export const NICHES: Niche[] = ["food", "cosmetics", "retail"];
