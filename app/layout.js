export const metadata = {
  title: 'منصة المنيو الرقمي',
  description: 'إنشاء منيو إلكتروني واستقبال الطلبات عبر الواتساب',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
