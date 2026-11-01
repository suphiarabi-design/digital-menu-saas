"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-4 z-40 mx-auto w-[min(1120px,calc(100%-1.5rem))]"
    >
      <nav className="glass-nav flex items-center justify-between rounded-full px-4 py-2.5 shadow-glass">
        <Link href="/" className="flex items-center gap-2 px-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-900 text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="text-lg font-extrabold tracking-tight">فيترين</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          <a href="#features" className="hover:text-slate-900">
            المزايا
          </a>
          <a href="#preview" className="hover:text-slate-900">
            المعاينة
          </a>
          <a href="#pricing" className="hover:text-slate-900">
            الأسعار
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/cafe-noor" className="hidden sm:block">
            <Button variant="secondary">عرض حي</Button>
          </Link>
          <Link href="/dashboard">
            <Button>لوحة التاجر</Button>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
