'use client';
import { useState } from 'react';

export default function PublicMenu({ params }) {
  const brandName = decodeURIComponent(params.brand || 'مطعمنا');
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const products = [
    { id: 1, name: 'برجر كلاسيك', price: 120, desc: 'لحم بقر صَافي مع شريحة جبن وصوص خاص' },
    { id: 2, name: 'وجبة كريسبي', price: 150, desc: '4 قطع دجاج مقرمش مع بطاطا وصوص' },
    { id: 3, name: 'عصير برتقال طازج', price: 45, desc: 'طبيعي 100% بدون سكر مضاف' }
  ];

  const addToCart = (product) => {
    setCart(prev => {
      const exist = prev.find(item => item.id === product.id);
      if (exist) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const sendWhatsAppOrder = () => {
    if (!customerName || cart.length === 0) {
      alert('الرجاء إدخال اسمك واختيار منتج واحد على الأقل');
      return;
    }

    let message = `*طلب جديد من منيو: ${brandName}*\n\n`;
    message += `👤 *العميل:* ${customerName}\n`;
    if (address) message += `📍 *العنوان:* ${address}\n`;
    message += `\n*الطلبات:*\n`;

    cart.forEach(item => {
      message += `- ${item.name} (عدد ${item.qty}) = ${item.price * item.qty}\n`;
    });

    message += `\n💵 *الإجمالي:* ${totalPrice}\n`;
    if (notes) message += `📝 *ملاحظات:* ${notes}\n`;

    const storeWhatsAppNumber = '905000000000'; // رقم واتساب المتجر
    const url = `https://wa.me/${storeWhatsAppNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-28" dir="rtl">
      {/* هيدر المنيو والبراند */}
      <header className="bg-blue-600 text-white p-6 text-center shadow-md">
        <h1 className="text-2xl font-bold">{brandName}</h1>
        <p className="text-blue-100 text-xs mt-1">أهلاً بكم! يسعدنا خدمتكم</p>
      </header>

      {/* المنتجات */}
      <main className="max-w-md mx-auto p-4 space-y-4">
        <h2 className="font-bold text-slate-800 text-lg">المنيو</h2>
        {products.map(p => (
          <div key={p.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-900">{p.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{p.desc}</p>
              <div className="font-bold text-blue-600 mt-2">{p.price} ليرة</div>
            </div>
            <button 
              onClick={() => addToCart(p)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded-lg"
            >
              + إضافة
            </button>
          </div>
        ))}
      </main>

      {/* سلة الواتساب المثبتة في الأسفل */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-2xl max-w-md mx-auto rounded-t-2xl space-y-3 z-50">
          <div className="flex justify-between items-center font-bold">
            <span>إجمالي الطلب:</span>
            <span className="text-blue-600 text-lg">{totalPrice} ليرة</span>
          </div>

          <input 
            type="text" 
            placeholder="الاسم الكامل *" 
            value={customerName} 
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full border p-2 rounded-lg text-sm"
          />
          <input 
            type="text" 
            placeholder="العنوان (تفاصيل التوصيل)" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border p-2 rounded-lg text-sm"
          />

          <button 
            onClick={sendWhatsAppOrder}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg transition"
          >
            إرسال الطلب عبر الواتساب 💬
          </button>
        </div>
      )}
    </div>
  );
}
