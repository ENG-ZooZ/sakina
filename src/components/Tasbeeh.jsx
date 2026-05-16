import { useState, useEffect } from "react";
// أيقونات مودرن لتعزيز واجهة المستخدم
import { RotateCcw, Plus } from "lucide-react";

function Tasbeeh() {
  // الـ 6 أذكار كاملة بالتوالي
  const phrases = [
    "سبحان الله", 
    "الحمد لله", 
    "لا إله إلا الله", 
    "الله أكبر", 
    "أستغفر الله العظيم", 
    "اللهم صلِّ وسلم على نبينا محمد"
  ];

  // هنخزن العداد الكلي فقط لمنع التضارب والكاش القديم
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("tasbeeh-perfect-count");
    return savedCount ? Number(savedCount) : 0;
  });

  // حفظ العداد تلقائياً فور حدوث أي تغيير
  useEffect(() => {
    localStorage.setItem("tasbeeh-perfect-count", count);
  }, [count]);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const reset = () => {
    if (window.confirm("هل تريد تصفير العداد تماماً والعودة للذكر الأول؟")) {
      setCount(0);
      localStorage.removeItem("tasbeeh-perfect-count");
    }
  };

  /* 🔥 الحسبة السحرية الفورية المضمونة:
    الـ index بيتحسب مباشرة من العداد الكلي، مستحيل يغلط أو ينط!
    كل 33 ضغطة هيزود الـ index بمقدار 1 بالتوالي (0 ثم 1 ثم 2... لحد 5 ويرجع 0)
  */
  const currentIndex = Math.floor(count / 33) % phrases.length;

  // شريط التقدم الانسيابي الهادي من 0 لـ 33
  const progress = ((count % 33) / 33) * 100;

  return (
    <section className="tasbeeh-section" id="tasbeeh">
      <style>{`
        /* 🎨 الخلفية الداكنة الغامرة المريحة للعين */
        .tasbeeh-section {
          background-color: #030712;
          background-image: radial-gradient(circle at 50% 85%, #0c1a30 0%, #030712 75%);
          padding: 60px 15px;
          color: #ffffff;
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
          direction: rtl;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 80vh;
          box-sizing: border-box;
        }

        /* 🔮 الحاوية الخارجية وعليها توهج نيون ثابت حول الكارد - Responsive */
        .neon-card-wrapper {
          width: 100%;
          max-width: 480px;
          margin: 0 auto;
          border-radius: 32px;
          padding: 1.5px;
          background: linear-gradient(135deg, rgba(0, 242, 254, 0.4), rgba(122, 92, 250, 0.4));
          box-shadow: 0 0 20px rgba(0, 242, 254, 0.15), 
                      0 0 40px rgba(122, 92, 250, 0.1),
                      0 30px 60px rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
        }

        /* 📿 كارت جلاسمورفيزم الداخلي - Responsive */
        .tasbeeh-box {
          width: 100%;
          background: rgba(6, 15, 30, 0.82); 
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 31px;
          padding: 40px 25px;
          text-align: center;
          box-sizing: border-box;
          border: 1px solid rgba(255, 255, 255, 0.03);
        }

        .tasbeeh-box h2 {
          color: #ffffff;
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0 0 25px 0;
          letter-spacing: -0.5px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        /* ✨ شاشة عرض الذكر الحالي بجلف جلاس هادي */
        .phrase-container {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 18px 15px;
          border-radius: 16px;
          margin-bottom: 25px;
          min-height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .phrase {
          font-size: 1.3rem;
          font-weight: 600;
          margin: 0;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
          background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1.4;
        }

        /* ⚡ العداد الرقمي المستمر */
        .counter-wrapper {
          margin: 20px 0;
          position: relative;
          display: inline-block;
        }

        .counter {
          font-size: 5.25rem;
          font-weight: 800;
          font-family: 'Consolas', monospace;
          color: #00f2fe;
          text-shadow: 0 0 15px rgba(0, 242, 254, 0.3);
          line-height: 1;
          margin: 0;
          user-select: none;
        }

        /* 📊 شريط التقدم الانسيابي الدوار لكل 33 */
        .progress-bar {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 35px;
          border: 1px solid rgba(255, 255, 255, 0.02);
        }

        .progress {
          height: 100%;
          background: linear-gradient(90deg, #7a5cfa, #00b4d8);
          box-shadow: 0 0 8px rgba(0, 180, 216, 0.3);
          transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* 🔘 أزرار التحكم الاحترافية */
        .tasbeeh-buttons {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
          margin-bottom: 15px;
        }

        /* زر التسبيح (+) */
        .btn-increment {
          flex: 2;
          padding: 16px;
          border: none;
          border-radius: 18px;
          color: #ffffff;
          background: linear-gradient(135deg, #00b4d8 0%, #7a5cfa 100%);
          box-shadow: 0 6px 20px rgba(122, 92, 250, 0.2);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-increment:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(122, 92, 250, 0.3),
                      0 0 10px rgba(0, 180, 216, 0.2);
          filter: brightness(1.05);
        }

        .btn-increment:active {
          transform: translateY(1px);
          box-shadow: 0 4px 12px rgba(122, 92, 250, 0.1);
        }

        /* زر إعادة التصفير */
        .btn-reset {
          flex: 1;
          padding: 16px;
          border: 1px solid rgba(239, 68, 68, 0.15);
          border-radius: 18px;
          color: #f87171;
          background: rgba(239, 68, 68, 0.04);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .btn-reset:hover {
          background: rgba(239, 68, 68, 0.1);
          border-color: #ef4444;
          color: #ff8787;
          transform: translateY(-2px);
        }

        .btn-reset:active {
          transform: translateY(1px);
        }

        /* مؤشر التوالي الحالي للأذكار (شغال 1، 2، 3، 4، 5، 6 بالمسطرة) */
        .phrases-indicator {
          font-size: 0.8rem;
          color: #64748b;
          background: rgba(255, 255, 255, 0.02);
          padding: 4px 12px;
          border-radius: 12px;
          display: inline-block;
          margin-top: 5px;
          border: 1px solid rgba(255, 255, 255, 0.03);
        }

        .tasbeeh-footer-hint {
          margin-top: 15px;
          font-size: 0.75rem;
          color: #4b5563;
          font-weight: 500;
          line-height: 1.5;
          padding: 0 10px;
        }

        /* 📱 الـ Responsive للموبايل */
        @media (max-width: 480px) {
          .tasbeeh-section {
            padding: 40px 10px;
          }
          .tasbeeh-box {
            padding: 30px 16px;
            border-radius: 26px;
          }
          .neon-card-wrapper {
            border-radius: 28px;
          }
          .tasbeeh-box h2 {
            font-size: 1.5rem;
          }
          .phrase {
            font-size: 1.15rem;
          }
          .counter {
            font-size: 4rem;
          }
          .tasbeeh-buttons {
            flex-direction: column;
            gap: 12px;
          }
          .btn-increment, .btn-reset {
            width: 100%;
            flex: none;
            padding: 16px;
          }
        }
      `}</style>

      <div className="neon-card-wrapper">
        <div className="tasbeeh-box">
          <h2>📿 السبحة الإلكترونية</h2>

          {/* صندوق عرض الذكر الحالي المحسوب فورياً بدقة */}
          <div className="phrase-container">
            <h3 className="phrase">{phrases[currentIndex]}</h3>
          </div>

          {/* العداد الكلي المستمر */}
          <div className="counter-wrapper">
            <div className="counter">{count}</div>
          </div>

          {/* شريط التقدم الدوار لكل 33 ضغطة */}
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }} />
          </div>

          <div className="tasbeeh-buttons">
            <button className="btn-increment" onClick={increment} title="تسبيح">
              <Plus size={28} strokeWidth={3} />
            </button>
            
            <button className="btn-reset" onClick={reset} title="تصفير العداد بالكامل">
              <RotateCcw size={22} />
            </button>
          </div>

          {/* المؤشر المظبوط اللي هيعد معاك من 1 لـ 6 بانتظام تام */}
          <div className="phrases-indicator">
            الذكر الحالي: {currentIndex + 1} / {phrases.length}
          </div>

          <div className="tasbeeh-footer-hint">
            * العداد مستمر تصاعدياً، ويتغير الذكر تلقائياً بالترتيب الصحيح (من 1 إلى 6) كل 33 تسبيحة.
          </div>
        </div>
      </div>
    </section>
  );
}

export default Tasbeeh;