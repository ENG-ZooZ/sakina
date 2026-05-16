import React, { useEffect, useState } from "react";

function Hero() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(currentTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const today = new Date();

  // 📅 التاريخ الميلادي
  const gregorianDate = today.toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 🌙 التاريخ الهجري
  const hijriDate = new Intl.DateTimeFormat("ar-TN-u-ca-islamic", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(today);

  return (
    <>
      <style>{`
        :root {
          --neon-cyan: #00f2fe;
          --neon-purple: #8b5cf6;
          --neon-glow: rgba(0, 242, 254, 0.4);
          --text-muted: #94a3b8;
        }

        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          background: #060913; 
          padding: 140px 24px 80px 24px;
        }

        /* إضاءات خلفية ناعمة */
        .hero-section::before {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          background: var(--neon-purple);
          filter: blur(200px);
          opacity: 0.12;
          top: -200px;
          right: -150px;
          pointer-events: none;
        }

        .hero-section::after {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          background: var(--neon-cyan);
          filter: blur(200px);
          opacity: 0.1;
          bottom: -200px;
          left: -150px;
          pointer-events: none;
        }

        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 60px;
          align-items: center;
        }

        /* الجزء الأيسر: النصوص والأزرار */
        .hero-text {
          direction: rtl; 
        }

        .hero-text h1 {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 64px;
          font-weight: 800;
          line-height: 1.3;
          color: #ffffff;
          margin-bottom: 24px;
        }

        .hero-text h1 span {
          background: linear-gradient(135deg, #ffffff 30%, var(--neon-cyan) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 15px var(--neon-glow));
        }

        .hero-text p {
          color: var(--text-muted);
          line-height: 2;
          margin-bottom: 40px;
          font-size: 18px;
          max-width: 540px;
        }

        .hero-buttons {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .primary-btn, .secondary-btn {
          padding: 14px 32px;
          border-radius: 16px;
          font-weight: 700;
          font-size: 16px;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .primary-btn {
          background: linear-gradient(135deg, var(--neon-cyan), var(--neon-purple));
          color: #060913;
          box-shadow: 0 0 24px rgba(0, 242, 254, 0.3);
        }

        .primary-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 0 35px rgba(0, 242, 254, 0.5);
        }

        .secondary-btn {
          border: 1px solid rgba(0, 242, 254, 0.4);
          color: #ffffff;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
        }

        .secondary-btn:hover {
          background: rgba(0, 242, 254, 0.08);
          border-color: var(--neon-cyan);
          box-shadow: 0 0 20px rgba(0, 242, 254, 0.2);
          transform: translateY(-5px);
        }

        .hero-card {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          background: #090e17; /* خلفية داكنة نظيفة تعزل حواف النيون */
          border-radius: 37px; /* متناسقة مع إطار الـ wrapper */
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          gap: 24px;
          box-shadow: inset 0 0 20px rgba(0, 242, 254, 0.15); 
        }

        /* كود الأنيميشن المسؤول عن الدوران المستمر للـ LED بدون توقف */
        @keyframes rotateLED {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* الآية الكريمة */
        .hero-card h2 {
          font-family: 'Amiri', 'Cairo', serif;
          font-size: 28px;
          font-weight: 700;
          line-height: 1.8;
          color: #ffffff;
          margin: 0;
          text-align: center;
        }

        /* حاوية البيانات المنسقة */
        .card-date-info {
          width: 100%;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .card-gregorian {
          color: #ffffff;
          font-size: 18px;
          font-weight: 600;
          margin: 0;
        }

        .card-hijri {
          color: #ffe259; 
          font-size: 18px;
          font-weight: 600;
          margin: 0;
          filter: drop-shadow(0 0 8px rgba(255, 226, 89, 0.2));
        }

        /* صندوق الوقت الديجيتال النيون */
        .card-time-box {
          display: inline-block;
          padding: 12px 32px;
          border-radius: 20px;
          background: rgba(0, 242, 254, 0.03);
          border: 1px solid rgba(0, 242, 254, 0.25);
          color: var(--neon-cyan);
          font-family: monospace; 
          font-weight: bold;
          font-size: 24px;
          letter-spacing: 1px;
          margin-top: 10px;
          box-shadow: inset 0 0 15px rgba(0, 242, 254, 0.05), 0 0 20px rgba(0, 242, 254, 0.15);
        }

        /* أنيميشن حركة الطفو (Floating) */
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        /* الشاشات الصغيرة والتجاوب */
        @media (max-width: 768px) {
          .hero-section {
            padding-top: 140px;
          }

          .hero-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .hero-text {
            text-align: center;
          }

          .hero-text h1 {
            font-size: 42px;
          }

          .hero-buttons {
            justify-content: center;
          }

        .hero-card h2 {
  font-size: 24px;
  font-family: 'Amiri', 'Cairo', 'Traditional Arabic', serif; /* خطوط عربية فخمة ومناسبة للقرآن */
  font-weight: 700;
  line-height: 1.8;
  text-align: center;
  margin: 0;

  /* 🌟 تأثير التدرج اللوني الذهبي الفخم 🌟 */
  background: linear-gradient(135deg, #ffffff 40%, #ffe259 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  /* 🌟 هالة ضوئية ناعمة جداً حول الحروف لتعطي إحساس النيون الاحترافي 🌟 */
  filter: drop-shadow(0 2px 8px rgba(255, 226, 89, 0.25));
  
  /* مسافة خفيفة بين الحروف العربية تعطي لمسة جمالية للتسكيل */
  letter-spacing: 0.5px; 
}
          
          .card-time-box {
            font-size: 20px;
          }
        }
      `}</style>

      <section className="hero-section" id="home">
        <div className="hero-container">

          {/* الكارد المعدل تماماً بالمربع والمحيط الضوئي الملتف النظيف */}
          <div className="hero-card-wrapper">
            <div className="hero-card">
              <h2>﴾ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ ﴿</h2>

              <div className="card-date-info">
                <p className="card-gregorian">📅 {gregorianDate}</p>
                <p className="card-hijri">🌙 {hijriDate} هـ</p>

                <div className="card-time-box">
                  🕒 {time}
                </div>
              </div>
            </div>
          </div>

          {/* الجزء الشمال: العناوين والأزرار */}
          <div className="hero-text">
            <h1>
              ابدأ يومك بـ <br />
              <span>سكينة</span>
            </h1>

            <p>
              مستشارك الروحاني اليومي للمحافظة على صلواتك، قراءة أذكارك وتسابيحك،
              ليظل قلبك عامراً بذكر الله وطمأنينة القرب منه في كل وقت. ❤️
            </p>

            <div className="hero-buttons">
              <a href="#prayer" className="primary-btn">
                مواقيت الصلاة
              </a>
              <a href="#azkar" className="secondary-btn">
                أذكار والورد اليومي
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default Hero;