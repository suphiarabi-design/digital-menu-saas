"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useStore } from "@/context/StoreContext";
import { Download } from "lucide-react";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";

export function QrPanel() {
  const { merchant } = useStore();
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(`${window.location.origin}/${merchant.slug}`);
  }, [merchant.slug]);

  function download() {
    const canvas = document.querySelector<HTMLCanvasElement>("#vitrine-qr canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${merchant.slug}-qr.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-bold">مولّد رمز QR</h2>
      <p className="mt-1 text-sm text-slate-500">
        امسح للوصول مباشرة إلى صفحة {merchant.name}.
      </p>
      <div
        id="vitrine-qr"
        className="mx-auto mt-6 w-fit rounded-3xl bg-white p-4 shadow-glass"
      >
        {url ? (
          <QRCodeCanvas value={url} size={220} level="M" marginSize={2} />
        ) : (
          <div className="h-[220px] w-[220px] animate-pulse rounded-2xl bg-slate-100" />
        )}
      </div>
      <p className="mt-4 break-all text-center text-xs text-slate-500" dir="ltr">
        {url}
      </p>
      <div className="mt-5 flex gap-2">
        <Button className="flex-1" onClick={download} disabled={!url}>
          <Download className="h-4 w-4" />
          تنزيل PNG
        </Button>
        <Link href={`/${merchant.slug}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            فتح الصفحة
          </Button>
        </Link>
      </div>
    </Card>
  );
}
