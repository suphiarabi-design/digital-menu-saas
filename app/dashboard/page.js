'use client';
import { useState } from 'react';

export default function Dashboard() {
  const [storeName, setStoreName] = useState('مطعم البرجر الذهبي');
  const [whatsapp, setWhatsapp] = useState('905000000000');
  const [primaryColor, setPrimaryColor] = useState('#2563eb');
  const [categories, setCategories] = useState([
    { id: 1, name: 'وجبات رئيسية' },
    { id: 2, name: 'مشروبات' }
  ]);
  const [products, setProducts] = useState([
    { id: 1, name: 'برجر كلاسيك', price: '120', categoryId: 1, desc: 'لحم بقر صَافي مع شريحة جبن وصوص خاص' },
    { id: 2, name: 'عصير برتقال طازج', price: '45', categoryId: 2, desc: 'طبيعي 100% بدون سكر مضاف' }
  ]);

  return (
    <div className="min-h-screen bg-slate-100 font-sans p-4 md:p-8" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">لوحة تحكم المتجر</h1>
            <p className="text-slate-500 text-sm">إدارة المنيو، البيانات، ورابط الواتساب</p>
          </div>
          <a 
            href={`/${encodeURIComponent(storeName)}`} 
            target="_blank"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            معاينة المنيو الحي ↗
          </a>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          {/* إعدادات المتجر */}
          <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
            <h2 className="text-lg font-bold border-b pb-2">بيانات المتجر</h2>
            <div>
              <label className="block text-sm font-medium mb-1">اسم المتجر/البراند</label>
              <input 
                type="text" 
                value={storeName} 
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full border p-2 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">رقم الواتساب لاستقبال الطلبات</label>
              <input 
                type="text" 
                value={whatsapp} 
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full border p-2 rounded-lg text-sm"
                placeholder="مثال: 905380000000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">لون الهوية البصرية الرئيسي</label>
              <input 
                type="color" 
                value={primaryColor} 
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-full h-10 border rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* إدارة التصنيفات والمنتجات */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm space-y-6">
            <h2 className="text-lg font-bold border-b pb-2">قائمة المنتجات والتصنيفات</h2>
            
            <div className="space-y-4">
              {products.map(p => (
                <div key={p.id} className="border p-4 rounded-xl flex justify-between items-center bg-slate-50">
                  <div>
                    <div className="font-bold">{p.name}</div>
                    <div className="text-xs text-slate-500">{p.desc}</div>
                    <div className="text-sm font-semibold text-blue-600 mt-1">{p.price} ليرة / ريال</div>
                  </div>
                  <button className="text-rose-600 hover:text-rose-800 text-sm font-medium">حذف</button>
                </div>
              ))}
            </div>

            <button className="w-full border-2 border-dashed border-slate-300 hover:border-blue-500 py-3 rounded-xl text-slate-600 font-semibold text-sm transition">
              + إضافة منتج جديد
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
