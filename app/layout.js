export const metadata = {
  title: 'منصة المنيو الرقمي والطلبات',
  description: 'إنشاء منيو إلكتروني واستقبال الطلبات عبر الواتساب',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* استدعاء Tailwind CSS المباشر لتفعيل التنسيقات العصرية */}
        <script src="https://cdn.tailwindcss.com"></script>
        {/* استدعاء خط تجريدي حديث للغة العربية */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap" />
        <style>{`
          body {
            font-family: 'Tajawal', sans-serif;
          }
        `}</style>
      </head>
      <body className="bg-slate-50 text-slate-800 antialiased">
        {children}
      </body>
    </html>
  )
}
