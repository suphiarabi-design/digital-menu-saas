import Link from "next/link";

export function Footer() {
  return (
    <footer className="mx-auto mt-8 w-[min(1120px,calc(100%-1.5rem))] pb-10">
      <div className="rounded-3xl border border-white/70 bg-white/60 px-6 py-8 text-sm text-slate-500 shadow-glass backdrop-blur-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-bold text-slate-800">فيترين</p>
          <div className="flex gap-5">
            <Link href="/dashboard">لوحة التاجر</Link>
            <Link href="/cafe-noor">مقهى نور</Link>
            <Link href="/glow-lab">لومير</Link>
            <Link href="/bazaar-24">بازار</Link>
          </div>
        </div>
        <p className="mt-4">منصة متاجر وقوائم رقمية متعددة المجالات. صُمّمت للسوق العربي.</p>
      </div>
    </footer>
  );
}
