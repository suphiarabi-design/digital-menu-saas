import type { Merchant } from "./types";

export const DEMO_STORES: Merchant[] = [
  {
    id: "m_cafe_noor",
    slug: "cafe-noor",
    name: "مقهى نور",
    tagline: "قهوة مختصة، مخبوزات يومية، وأجواء دافئة.",
    whatsapp: "0501234567",
    primaryColor: "#C2410C",
    niche: "food",
    products: [
      {
        id: "p_cappuccino",
        name: "كابتشينو",
        description: "حبوب إثيوبية محمّصة يومياً مع حليب مبخّر ناعم.",
        price: 18,
        category: "مشروبات",
        image:
          "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=1200&q=80",
        featured: true,
      },
      {
        id: "p_latte",
        name: "لاتيه فانيلا",
        description: "إسبريسو مزدوج مع حليب وحلاوة فانيلا خفيفة.",
        price: 21,
        category: "مشروبات",
        image:
          "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "p_karak",
        name: "شاي كرك",
        description: "مزيج حليب وبهارات يُطهى على مهل.",
        price: 12,
        category: "مشروبات",
        image:
          "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "p_croissant",
        name: "كرواسون زبدة",
        description: "طبقات مقرمشة تُخبز كل صباح.",
        price: 14,
        category: "مخبوزات",
        image:
          "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=80",
        featured: true,
      },
      {
        id: "p_cheesecake",
        name: "تشيز كيك توت",
        description: "قاعدة بسكويت وطبقة كريمة مع توت موسمي.",
        price: 28,
        category: "حلويات",
        image:
          "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    id: "m_glow_lab",
    slug: "glow-lab",
    name: "لومير بيوتي",
    tagline: "عناية تحريرية، ملمس فاخر، ونتائج تُرى.",
    whatsapp: "0559876543",
    primaryColor: "#BE185D",
    niche: "cosmetics",
    products: [
      {
        id: "p_serum",
        name: "سيروم فيتامين C",
        description: "إشراق صباحي بتركيبة ثابتة 15٪ وأحماض هجينة لطيفة.",
        price: 189,
        category: "عناية",
        image:
          "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80",
        featured: true,
      },
      {
        id: "p_moisturizer",
        name: "مرطب هيالورونيك",
        description: "ترطيب متعدد الأوزان يترك البشرة نديّة دون لمعان.",
        price: 165,
        category: "عناية",
        image:
          "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "p_lipstick",
        name: "أحمر شفاه ساتان",
        description: "لون غني بلمسة ساتان وثبات مريح طوال اليوم.",
        price: 96,
        category: "مكياج",
        image:
          "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1200&q=80",
        featured: true,
      },
      {
        id: "p_mask",
        name: "ماسك طين وردي",
        description: "ينقّي المسام بلطف ويعيد نعومة الملمس خلال عشر دقائق.",
        price: 78,
        category: "عناية",
        image:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    id: "m_bazaar",
    slug: "bazaar-24",
    name: "بازار المدينة",
    tagline: "اختيار يومي أنيق: أزياء، إكسسوارات، وتقنية.",
    whatsapp: "0531112233",
    primaryColor: "#4F46E5",
    niche: "retail",
    products: [
      {
        id: "p_shirt",
        name: "قميص قطني فاخر",
        description: "قطن مصري خفيف بقصة مريحة تناسب العمل والطلعات.",
        price: 149,
        category: "أزياء",
        image:
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=80",
        featured: true,
        variants: [
          { id: "s", label: "S" },
          { id: "m", label: "M" },
          { id: "l", label: "L" },
          { id: "xl", label: "XL" },
        ],
      },
      {
        id: "p_bag",
        name: "حقيبة جلد يومية",
        description: "جلد محبب ناعم وجيب داخلي للحاسوب اللوحي.",
        price: 320,
        category: "إكسسوارات",
        image:
          "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80",
        variants: [
          { id: "tan", label: "عسلي" },
          { id: "black", label: "أسود", priceDelta: 20 },
        ],
      },
      {
        id: "p_buds",
        name: "سماعة لاسلكية",
        description: "عزل ضوضاء خفيف وعلبة شحن ليوم كامل.",
        price: 249,
        category: "تقنية",
        image:
          "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80",
        featured: true,
        variants: [
          { id: "white", label: "أبيض" },
          { id: "graphite", label: "غرافيت" },
        ],
      },
    ],
  },
];

export const DEFAULT_MERCHANT_ID = DEMO_STORES[0].id;
