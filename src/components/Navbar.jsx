import React, { useState } from 'react';

function Navbar() {
  // حالة التحكم في فتح وغلق قائمة الموبايل
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
<style>{`
        :root {
          /* ألوان نيون فخمة ومريحة جداً للعين (Deep Space & Cyan Ice) */
          --neon-primary: #00f2fe;     /* الأزرق السماوي المضيء */
          --neon-glow: rgba(0, 242, 254, 0.45); /* توهج ناعم تمت تهدئته لراحة العين */
          --text-muted: #94a3b8;       /* رمادي ناعم مريح جداً للقراءة */
          --glass-bg: rgba(10, 14, 23, 0.75);  /* خلفية كحلية داكنة فائقة الفخامة والراحة */
          --glass-border: rgba(255, 255, 255, 0.05);
        }

        .navbar-header {
          position: fixed;
          width: 100%;
          top: 0;
          left: 0;
          z-index: 1000;
          backdrop-filter: blur(24px); /* زيادة التغبيش ليعطي عمق زجاجي حقيقي */
          -webkit-backdrop-filter: blur(24px);
          background: var(--glass-bg);
          border-bottom: 1px solid var(--glass-border);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          direction: ltr; /* اللوجو شمال والروابط يمين لشكل مودرن واحترافي */
        }

        .nav-logo {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 28px;
          font-weight: 800;
          cursor: pointer;
          
          /* تأثير الـ Gradient الفخم جوة الكلمة نفسها */
          background: linear-gradient(135deg, #ffffff 40%, var(--neon-primary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          
          /* توهج ناعم مريح محيط بالكلمة */
          filter: drop-shadow(0 0 8px rgba(0, 242, 254, 0.4));
          transition: all 0.4s ease;
        }

        .nav-logo:hover {
          /* حركة انسيابية للألوان عند التمرير بالماوس */
          background: linear-gradient(135deg, var(--neon-primary) 20%, #ffffff 100%);
          -webkit-background-clip: text;
          filter: drop-shadow(0 0 16px var(--neon-primary));
        }

        .nav-links {
          display: flex;
          gap: 32px;
          align-items: center;
        }

        .nav-item {
          color: var(--text-muted);
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          position: relative;
          padding: 6px 4px;
          transition: color 0.3s ease, text-shadow 0.3s ease;
        }

        /* خط النيون السفلي انسيابي ومريح للعين */
        .nav-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 2px;
          background: var(--neon-primary);
          border-radius: 4px;
          box-shadow: 0 0 10px var(--neon-primary);
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-item:hover {
          color: #ffffff;
          text-shadow: 0 0 8px var(--neon-glow);
        }

        .nav-item:hover::after {
          width: 100%;
        }

        /* زرار الـ Toggle للموبايل */
        .nav-toggle {
          display: none;
          flex-direction: column;
          gap: 6px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 4px;
          z-index: 1001;
        }

        .nav-toggle span {
          display: block;
          width: 28px;
          height: 3px;
          background: #ffffff;
          border-radius: 2px;
          transition: all 0.3s ease;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
        }

        .nav-toggle.open span {
          background: var(--neon-primary);
          box-shadow: 0 0 10px var(--neon-primary);
        }

        .nav-toggle.open span:nth-child(1) {
          transform: translateY(9px) rotate(45deg);
        }
        .nav-toggle.open span:nth-child(2) {
          opacity: 0;
        }
        .nav-toggle.open span:nth-child(3) {
          transform: translateY(-9px) rotate(-45deg);
        }

        /* شاشات الموبايل والتابلت */
        @media (max-width: 768px) {
          .nav-toggle {
            display: flex; 
          }

          .nav-links {
            position: fixed;
            top: 0;
            left: ${isOpen ? '0' : '-100%'}; 
            width: 75%;
            height: 100vh;
            background: rgba(8, 11, 19, 0.96); /* تعتيم الخلفية قليلاً في الموبايل لتوفير راحة أكبر للعين */
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            border-right: 1px solid var(--glass-border);
            flex-direction: column;
            justify-content: center;
            gap: 40px;
            transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 10px 0 40px rgba(0, 0, 0, 0.6);
          }

          .nav-item {
            font-size: 20px; 
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

      <header className="navbar-header">
        <div className="nav-container">

          {/* اللوجو على الشمال */}
          <div className="nav-logo">
            Sakina
          </div>

          {/* القائمة والروابط على اليمين */}
          <nav className="nav-links">
            <a href="#home" className="nav-item" onClick={() => setIsOpen(false)}>الرئيسية</a>
            <a href="#azkar" className="nav-item" onClick={() => setIsOpen(false)}>الأذكار والورد</a>
            <a href="#prayer" className="nav-item" onClick={() => setIsOpen(false)}>مواقيت الصلاة</a>
            <a href="#tasbeeh" className="nav-item" onClick={() => setIsOpen(false)}>السبحة الإلكترونية</a>
          </nav>

          {/* زر الـ Toggle */}
          <button
            className={`nav-toggle ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

        </div>
      </header>
    </>
  );
}

export default Navbar;