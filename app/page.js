export default function Home() {
  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
      direction: 'rtl',
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#f8fafc'
    }}>
      <h1 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '1rem' }}>
        منصة المنيو الرقمي والطلبات
      </h1>
      <p style={{ fontSize: '1.25rem', color: '#475569', maxWidth: '600px' }}>
        أنشئ منيو إلكتروني احترافي لمطعمك أو متجرك، واستقبل الطلبات مباشرة عبر الواتساب بكل سهولة.
      </p>
      <div style={{ marginTop: '2rem' }}>
        <a 
          href="#register" 
          style={{
            backgroundColor: '#2563eb', 
            color: 'white', 
            padding: '12px 24px', 
            borderRadius: '8px', 
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          ابدأ مجاناً الآن
        </a>
      </div>
    </div>
  );
}
