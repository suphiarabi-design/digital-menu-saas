import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans" dir="rtl">
      {/* الهيدر */}
      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-xl font-bold text-blue-600">منيو كيو آر</div>
          <Link 
            href="/dashboard" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            لوحة التحكم
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
          منيو إلكتروني احترافي لمطعمك أو متجرك في دقائق
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          أنشئ المنيو الخاص بك، خصص الهوية البصرية، واستقبل طلبات زبائنك مباشرة على الواتساب مجمّعة بأسماء المنتجات والأسعار والعنوان.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/dashboard" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-lg font-bold shadow-lg shadow-blue-500/25 transition"
          >
            أنشئ منيو مجاني الآن
          </Link>
          <Link 
            href="/demo-menu" 
            className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 px-8 py-3 rounded-xl text-lg font-semibold transition"
          >
            معاينة منيو تجريبي
          </Link>
        </div>
      </section>

      {/* المميزات */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-3xl mb-4">📲</div>
          <h3 className="text-xl font-bold mb-2">طلبات الواتساب المباشرة</h3>
          <p className="text-slate-600 text-sm">تصلك الطلبات منظمّة تحتوي على اسم الزبون، عنوانه، الكميات، وإجمالي الفاتورة.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-3xl mb-4">🎨</div>
          <h3 className="text-xl font-bold mb-2">هوية بصرية خاصة</h3>
          <p className="text-slate-600 text-sm">ارفع لوجو متجرك واختر الألوان الخاصة بك ليعكس المنيو طابع علاماتك التجارية.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-3xl mb-4">🔗</div>
          <h3 className="text-xl font-bold mb-2">رابط كيو آر مخصص</h3>
          <p className="text-slate-600 text-sm">رابط نظيف باسم براندك مع كود QR جاهز للطباعة على الطاولات والأكياس.</p>
        </div>
      </section>
    </div>
  );
}
