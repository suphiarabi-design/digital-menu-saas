import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "فيترين | منصة المتاجر والقوائم الرقمية متعددة المجالات",
  description:
    "ابنِ متجراً أو قائمة رقمية بثيم ديناميكي: طعام ومقاهي، تجميل وعناية، أو تجزئة عامة — مع طلب واتساب ورمز QR.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
