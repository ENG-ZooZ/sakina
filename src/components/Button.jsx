import { useState, useEffect } from "react";
// 🌟 استيراد الأيقونات الحقيقية (واتساب، جيت هاب، لينكد إن)
import { FaWhatsapp, FaGithub, FaLinkedinIn } from "react-icons/fa";

function DeveloperButton() {
  // حالة فتح وقفل مودال البيانات
  const [isModalOpen, setIsModalOpen] = useState(false);
  // حالة إظهار الزرار العائم عند الاسكرول
  const [showFloatBtn, setShowFloatBtn] = useState(false);

  // مراقبة النزول في الصفحة (Scroll) لإظهار الزرار العائم
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowFloatBtn(true);
      } else {
        setShowFloatBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        /* 🔴 ✨ الـ Floating Button النبّاض ✨ */
        .dev-float-btn {
          position: fixed;
          bottom: 35px;
          right: 35px;
          width: 55px;
          height: 55px;
          background: linear-gradient(135deg, #8b5cf6, #00f2fe);
          border: none;
          border-radius: 50%;
          color: #060913;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          transform: translateY(20px) scale(0.8);
          pointer-events: none; /* يمنع الضغط عليه وهو مختفي */
          /* تأثير النبض الكهربائي المستمر */
          animation: neonPulse 2s infinite ease-in-out;
        }

        /* فئة التفعيل عند الاسكرول لظهوره بسلاسة */
        .dev-float-btn.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        .dev-float-btn:hover {
          transform: scale(1.1) rotate(15deg);
        }

        .dev-float-btn:active {
          transform: scale(0.9);
        }

        /* أنيميشن النبض النيون المتوهج */
        @keyframes neonPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.5), 0 0 0 0 rgba(0, 242, 254, 0.3);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(139, 92, 246, 0), 0 0 0 25px rgba(0, 242, 254, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(139, 92, 246, 0), 0 0 0 0 rgba(0, 242, 254, 0);
          }
        }

        /* 🔴 ستايل المودال المنبثق والخلفية الضبابية */
        .dev-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(4, 6, 12, 0.82);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
        }

        .dev-card {
          background: #090e17;
          border: 1px solid rgba(0, 242, 254, 0.15);
          border-radius: 32px;
          padding: 40px 30px;
          max-width: 440px;
          width: 92%; /* متجاوب بالكامل على الشاشات الصغيرة */
          text-align: center;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(139, 92, 246, 0.05);
          position: relative;
          direction: rtl;
          animation: popUp 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          box-sizing: border-box;
        }

        @keyframes popUp {
          from { transform: scale(0.85); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .close-modal-btn {
          position: absolute;
          top: 20px;
          left: 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #94a3b8;
          width: 35px;
          height: 35px;
          border-radius: 50px;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .close-modal-btn:hover {
          color: #ff4a4a;
          border-color: #ff4a4a;
          background: rgba(255, 74, 74, 0.05);
        }

        .dev-avatar {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          margin: 0 auto 20px auto;
          border: 3px solid #00f2fe;
          box-shadow: 0 0 20px rgba(0, 242, 254, 0.25);
          object-fit: cover;
          background: #060913;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }

        .dev-card h3 {
          font-size: 24px;
          color: #ffffff;
          margin-bottom: 6px;
          font-weight: 700;
          font-family: 'Consolas', 'Courier New', monospace;
          letter-spacing: 0.5px;
        }

        .dev-tag {
          font-size: 13px;
          color: #00f2fe;
          font-weight: 600;
          letter-spacing: 0.5px;
          margin-bottom: 20px;
        }

        .dev-bio {
          color: #94a3b8;
          font-size: 15px;
          line-height: 1.7;
          margin-bottom: 28px;
        }

        /* 🌟 ستايل كبسولات الأيقونات الدائرية المستقرة 🌟 */
        .dev-socials {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap; /* يسمح بنزولهم لو الشاشة متناهية الصغر جداً */
        }

        .dev-socials a {
          width: 46px;
          height: 46px;
          border-radius: 50% !important; /* إجبار الزرار يفضل دائرى 100% */
          font-size: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          background: rgba(4, 6, 12, 0.3);
          flex-shrink: 0; /* يمنع انضغاط الدائرة أو تشويهها */
        }

        /* 🌟 واتساب 🌟 */
        .dev-socials a.wa {
          color: #25d366;
          border: 1px solid rgba(37, 211, 102, 0.4);
          box-shadow: 0 0 10px rgba(37, 211, 102, 0.2);
        }
        .dev-socials a.wa:hover {
          background: rgba(37, 211, 102, 0.08);
          box-shadow: 0 0 20px rgba(37, 211, 102, 0.5);
          transform: translateY(-5px) scale(1.1);
          border-color: #25d366;
        }

        /* 🌟 جيت هاب 🌟 */
        .dev-socials a.gh {
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.15);
        }
        .dev-socials a.gh:hover {
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
          transform: translateY(-5px) scale(1.1);
          border-color: #ffffff;
        }

        /* 🌟 لينكد إن 🌟 */
        .dev-socials a.li {
          color: #0a66c2;
          border: 1px solid rgba(10, 102, 194, 0.4);
          box-shadow: 0 0 10px rgba(10, 102, 194, 0.2);
        }
        .dev-socials a.li:hover {
          background: rgba(10, 102, 194, 0.08);
          box-shadow: 0 0 20px rgba(10, 102, 194, 0.5);
          transform: translateY(-5px) scale(1.1);
          border-color: #0a66c2;
        }

        /* 📱 تظبيط الـ Responsiveness لكل الشاشات والميديا */
        @media (max-width: 480px) {
          .dev-card { 
            padding: 35px 20px; 
            border-radius: 24px;
          }
          .dev-avatar {
            width: 150px;
            height: 150px;
          }
          .dev-card h3 {
            font-size: 20px;
          }
          .dev-bio {
            font-size: 14px;
            line-height: 1.6;
            margin-bottom: 22px;
          }
          .dev-socials { 
            gap: 15px; 
          }
          /* الأيقونات بتفضل دائرية ومحافظة على حجمها النيون الفخم */
          .dev-socials a { 
            width: 44px; 
            height: 44px; 
            font-size: 20px;
          } 
          .dev-float-btn { 
            bottom: 20px; 
            right: 20px; 
            width: 50px; 
            height: 50px; 
          }
        }
      `}</style>

      <button
        className={`dev-float-btn ${showFloatBtn ? "visible" : ""}`}
        onClick={() => setIsModalOpen(true)}
        title="ËŇĞ . ŽööŽ"
      >
        🤍
      </button>

      {isModalOpen && (
        <div className="dev-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="dev-card" onClick={(e) => e.stopPropagation()}>

            <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>✕</button>

            {/* صورتك الشخصية */}
            <img
              className="dev-avatar"
              src="/ZooZ_Photo_Ai.jpg"
              alt="Developer"
            />

            <h3>{"</ Zyad Mohamed Sobhy >"}</h3>
            <div className="dev-tag">Full-Stack Developer</div>

            <p className="dev-bio">
              "سكينة" صدقة جارية، نسأل الله القبول والبركة، وأن يجعلها سببًا في سكينة القلوب وراحة النفوس.
              نسأل الله أن يتقبل منا ومنكم صالح الأعمال. 🤍
            </p>

            <div className="dev-socials">
              <a href="https://wa.me/201033748811" target="_blank" rel="noreferrer" className="wa" title="Whatsapp">
                <FaWhatsapp />
              </a>
              <a href="https://github.com/ENG-ZooZ" target="_blank" rel="noreferrer" className="gh" title="github">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/zyad-mohamed-sobhy-7ba8b8337" target="_blank" rel="noreferrer" className="li" title="LinkedIn">
                <FaLinkedinIn />
              </a>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default DeveloperButton;