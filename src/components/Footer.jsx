import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>{`
        /* 🎨 الحاوية الرئيسية ممتدة بعرض الصفحة كلها تماماً */
        .main-footer {
          width: 100%;
          background-color: #030712;
          padding: 5px 0;
          position: relative;
          direction: rtl;
          box-sizing: border-box;
        }

        /* 🔮 كارد جلاسمورفيزم مع تأثير الـ Pulse النيون على الخط العلوي */
        .footer-full-box {
          width: 100%;
          background: rgba(255, 255, 255, 0.01);
          border-top: 1px solid rgba(0, 229, 255, 0.15);
          border-bottom: 1px solid rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 40px 20px;
          box-sizing: border-box;
          /* تشغيل إنيميشن النبض على الخط العلوي باستمرار بألوان النيون المتناسقة */
          animation: borderPulse 3s infinite ease-in-out;
        }

        /* ⚡ إنيميشن النبض المستمر للخط العلوي بألوان الويب الأصلية (Cyan/Cyan) */
        @keyframes borderPulse {
          0% {
            border-top-color: rgba(0, 229, 255, 0.15);
            box-shadow: 0 -5px 15px rgba(0, 229, 255, 0.02);
          }
          50% {
            border-top-color: #00e5ff; /* نفس لون الويب النيون الأصلي المعتمد عندك */
            box-shadow: 0 -10px 25px rgba(0, 229, 255, 0.2), 
                        inset 0 5px 15px rgba(0, 229, 255, 0.04);
          }
          100% {
            border-top-color: rgba(0, 229, 255, 0.15);
            box-shadow: 0 -5px 15px rgba(0, 229, 255, 0.02);
          }
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 25px;
        }

        /* 🕌 عنوان براند سكينة المضيء */
        .sakina-title {
          font-size: 2.2rem;
          margin: 0;
          filter: drop-shadow(0 0 10px rgba(0, 229, 255, 0.2));
          text-align: center;
        }

        /* 🤍 تنسيق الدعاء الساكن */
        .sakina-text {
          color: #cbd5e1;
          font-size: 1.15rem;
          font-weight: 500;
          margin: 0;
          line-height: 1.6;
        }

        .footer-divider {
          width: 60px;
          height: 2px;
          background: #00e5ff;
          border-radius: 2px;
          box-shadow: 0 0 8px rgba(0, 229, 255, 0.5);
        }

        /* 📱 منصة أزرار السوشيال ميديا النيون الاحترافية */
        .social-container {
          display: flex;
          gap: 16px;
        }

        .footer-social-link {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
        }

        .footer-social-link i {
          font-size: 18px;
          transition: transform 0.3s ease;
        }

        .footer-social-link:hover {
          transform: translateY(-6px);
          background: rgba(6, 15, 30, 0.5);
        }

        .footer-social-link:hover i {
          transform: scale(1.1);
        }

        /* تأثيرات الألوان والظلال والبوردر المتوهج المخصصة لكل حساب */
        .whatsapp:hover { 
          color: #25D366 !important; 
          border-color: #25D366 !important;
          box-shadow: 0 0 15px rgba(37, 211, 102, 0.35);
        }

        .instagram:hover { 
          color: #e4405f !important; 
          border-color: #e4405f !important;
          box-shadow: 0 0 15px rgba(228, 64, 95, 0.35);
        }

        .github:hover { 
          color: #ffffff !important; 
          border-color: #ffffff !important;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.35);
        }

        .linkedin:hover { 
          color: #0077b5 !important; 
          border-color: #0077b5 !important;
          box-shadow: 0 0 15px rgba(0, 119, 181, 0.35);
        }

        /* 📅 سطر حقوق الملكية الإحترافي المزدوج */
        .copyright-text {
          color: #475569;
          font-size: 0.88rem;
          margin-top: 15px;
          letter-spacing: 0.5px;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          padding-top: 20px;
          width: 100%;
          max-width: 450px;
          text-align: center;
        }

        .designer-name {
          color: #3e9ca1;
          font-weight: 700;
          letter-spacing: 1px;
          transition: color 0.3s ease;
        }

        .designer-name:hover {
          color: #00e5ff;
          text-shadow: 0 0 10px rgba(0, 229, 255, 0.6);
        }

        /* 📱 ريسبونسيف كامل للموبايل والأجهزة اللوحية */
        @media (max-width: 480px) {
          .main-footer {
            padding: 5px 0;
          }
          .footer-full-box {
            padding: 25px 15px;
          }
          .sakina-title {
            font-size: 1.8rem;
          }
          .sakina-text {
            font-size: 1rem;
          }
          .social-container {
            gap: 12px;
          }
          .footer-social-link {
            width: 40px;
            height: 40px;
          }
          .copyright-text {
            font-size: 0.8rem;
          }
        }
      `}</style>

      <footer className="main-footer">
        <div className="footer-full-box">
          <div className="footer-content">

            {/* الهوية الإسلامية للمشروع (Sakina) */}
            <h2 className="sakina-title">🕌</h2>
            <p className="sakina-text">اللهم اجعل هذا العمل صدقة جارية لنا 🤍</p>

            <div className="footer-divider"></div>

            {/* أزرار السوشيال ميديا */}
            <div className="social-container">
              <a href="https://wa.me/201033748811" className="footer-social-link whatsapp" target="_blank" rel="noreferrer">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="https://www.instagram.com/eng._.zooz?igsh=MWJvcWsxb3diMWhidQ%3D%3D&utm_source=qr" className="footer-social-link instagram" target="_blank" rel="noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://github.com/ENG-ZooZ" className="footer-social-link github" target="_blank" rel="noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/zyad-mohamed-sobhy-7ba8b8337" className="footer-social-link linkedin" target="_blank" rel="noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>

            {/* سطر الحقوق الكلاسيكي الثابت والرايق */}
            <p className="copyright-text" style={{ direction: 'ltr' }}>
              &copy; {currentYear} • Designed & Built by <span className="designer-name">ËŇĞ . ŽööŽ</span>
            </p>

          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;