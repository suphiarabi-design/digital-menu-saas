import type { CartItem } from "./types";
import { formatPrice } from "./utils";

export function normalizeWhatsApp(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("00")) return digits.slice(2);
  if (digits.startsWith("966")) return digits;
  if (digits.startsWith("0")) return `966${digits.slice(1)}`;
  return digits;
}

export function buildWhatsAppUrl(phone: string, message: string) {
  const normalized = normalizeWhatsApp(phone);
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

export function buildOrderMessage(input: {
  storeName: string;
  items: CartItem[];
  tableNumber?: string;
  niche: "food" | "cosmetics" | "retail";
}) {
  const lines = [
    `طلب جديد من ${input.storeName}`,
    "━━━━━━━━━━━━",
  ];

  if (input.niche === "food" && input.tableNumber?.trim()) {
    lines.push(`رقم الطاولة: ${input.tableNumber.trim()}`);
    lines.push("");
  }

  input.items.forEach((item, index) => {
    const variant = item.variantLabel ? ` (${item.variantLabel})` : "";
    lines.push(
      `${index + 1}) ${item.qty}× ${item.name}${variant} — ${formatPrice(item.price * item.qty)}`,
    );
  });

  const total = input.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  lines.push("━━━━━━━━━━━━");
  lines.push(`الإجمالي: ${formatPrice(total)}`);
  lines.push("");
  lines.push("تم الطلب عبر فيترين");

  return lines.join("\n");
}
