import { useState, useEffect } from "react";

function Azkar() {
  const [section, setSection] = useState("azkar");
  const [index, setIndex] = useState(() => {
    // حفظ مكان اليوزر عشان لو قفل الصفحة ورجع تاني
    const savedIndex = localStorage.getItem(`azkar_index_${section}`);
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });

  const azkar = [
    { title: "أذكار الصباح", text: "اللهم بك أصبحنا وبك أمسينا وبك نحيا وبك نموت وإليك النشور.", count: 1 },
    { title: "أذكار الصباح", text: "أعوذ بالله من الشيطان الرجيم: اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...", count: 1 },
    { title: "أذكار المساء", text: "أمسينا وأمسى الملك لله رب العالمين.", count: 1 },
    { title: "استغفار", text: "أستغفر الله العظيم الذي لا إله إلا هو الحي القيوم وأتوب إليه.", count: 3 },
    { title: "تسبيح", text: "سبحان الله وبحمده، سبحان الله العظيم.", count: 33 },
    { title: "بعد الصلاة", text: "أستغفر الله، اللهم أنت السلام ومنك السلام تباركت يا ذا الجلال والإكرام.", count: 3 },
  ];

  const duas = [
    { title: "دعاء الراحة", text: "اللهم رزقني راحة البال وطمأنينة القلب وسعة الرزق.", count: 1 },
    { title: "دعاء المغفرة", text: "اللهم اغفر لي ذنوبي كلها دقها وجلها أولها وآخرها.", count: 1 },
    { title: "دعاء الرزق", text: "اللهم رزقني رزقًا حلالًا طيبًا مباركًا فيه.", count: 1 },
    { title: "دعاء الحفظ", text: "اللهم احفظني من بين يدي ومن خلفي وعن يميني وعن شمالي.", count: 1 },
    { title: "دعاء التوكل", text: "حسبي الله لا إله إلا هو عليه توكلت وهو رب العرش العظيم.", count: 7 },
    { title: "دعاء قبل النوم", text: "اللهم باسمك أحيا وأموت، اللهم قني عذابك يوم تبعث عبادك.", count: 3 },
  ];

  const data = section === "azkar" ? azkar : duas;
  
  // عداد السبحة الداخلي لكل ذكر
  const [currentCount, setCurrentCount] = useState(data[index]?.count || 1);

  // تحديث العداد وحفظ الاندكس عند التغيير
  useEffect(() => {
    setCurrentCount(data[index]?.count || 1);
    localStorage.setItem(`azkar_index_${section}`, index);
  }, [index, section, data]);

  const next = () => setIndex((prev) => (prev + 1) % data.length);
  const prev = () => setIndex((prev) => (prev - 1 + data.length) % data.length);

  // الضغط على الكارد للتسبيح
  const handleCountClick = () => {
    if (currentCount > 1) {
      setCurrentCount((prev) => prev - 1);
    } else {
      // لو العداد وصل 1 وضغطت تاني، بينقلك تلقائياً للذكر اللي بعده
      next();
    }
  };

  return (
    <>
      <style>{`
        .azkar {
          padding: 120px 24px;
          text-align: center;
          background: #060913;
          position: relative;
          overflow: hidden;
        }

        .azkar-tabs {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 40px;
        }

        .azkar-tabs button {
          padding: 14px 28px;
          border: 1px solid rgba(0, 242, 254, 0.15);
          border-radius: 16px;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.02);
          color: #94a3b8;
          font-weight: 700;
          font-size: 16px;
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
        }

        .azkar-tabs button.active {
          background: linear-gradient(135deg, #00f2fe, #8b5cf6);
          color: #060913;
          border-color: transparent;
          box-shadow: 0 0 25px rgba(0, 242, 254, 0.35);
        }

        /* بوكس الأذكار التفاعلي */
        .azkar-box {
          background: #090e17;
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 37px;
          padding: 50px 40px 45px 40px;
          max-width: 750px;
          margin: auto;
          box-shadow: inset 0 0 30px rgba(0, 242, 254, 0.05), 0 20px 50px rgba(0, 0, 0, 0.5);
          position: relative;
          direction: rtl;
          cursor: pointer;
          transition: transform 0.1s ease, box-shadow 0.3s ease;
        }

        /* تأثير نبضة عند الضغط للتسبيح */
        .azkar-box:active {
          transform: scale(0.99);
          box-shadow: inset 0 0 40px rgba(0, 242, 254, 0.15), 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .azkar-box h2 {
          font-size: 26px;
          font-family: 'Amiri', 'Cairo', serif;
          font-weight: 700;
          margin-bottom: 24px;
          background: linear-gradient(135deg, #00f2fe, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 2px 10px rgba(0, 242, 254, 0.2));
        }

        .azkar-box p {
          color: #e2e8f0;
          font-family: 'Amiri', 'Cairo', serif;
          font-size: 24px;
          line-height: 2;
          margin-bottom: 40px;
          min-height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* دايرة العداد الكبيرة */
        .subha-counter {
          width: 70px;
          height: 70px;
          border-radius: 50px;
          background: rgba(0, 242, 254, 0.05);
          border: 2px solid #00f2fe;
          color: #00f2fe;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
          margin: 0 auto 30px auto;
          box-shadow: 0 0 20px rgba(0, 242, 254, 0.2);
          transition: all 0.3s ease;
        }

        .subha-counter.done {
          border-color: #8b5cf6;
          color: #8b5cf6;
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);
        }

        .azkar-controls {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 30px;
        }

        .azkar-controls button {
          padding: 14px 32px;
          border: 1px solid rgba(0, 242, 254, 0.25);
          border-radius: 16px;
          background: rgba(0, 242, 254, 0.03);
          color: #00f2fe;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.4s ease;
        }

        .azkar-controls button:hover {
          background: linear-gradient(135deg, #00f2fe, #8b5cf6);
          color: #060913;
          border-color: transparent;
          transform: translateY(-3px);
        }

        .azkar-counter {
          color: #64748b;
          font-size: 14px;
          font-weight: 600;
          font-family: monospace;
          background: rgba(255, 255, 255, 0.02);
          padding: 6px 14px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.03);
          display: inline-block;
          margin-top: 10px;
        }

        /* 📱 التحديثات الذكية للشاشات الصغيرة */
        @media (max-width: 600px) {
          .azkar {
            padding: 60px 16px;
          }
          
          /* جعل تابات التبديل متجاوبة أيضاً وتحت بعضها */
          .azkar-tabs {
            flex-direction: column;
            gap: 12px;
            width: 100%;
            max-width: 320px;
            margin: 0 auto 30px auto;
          }
          .azkar-tabs button {
            width: 100%;
            padding: 12px;
          }

          .azkar-box { 
            padding: 40px 20px 30px 20px; 
            border-radius: 28px;
          }
          .azkar-box h2 {
            font-size: 22px;
          }
          .azkar-box p { 
            font-size: 19px; 
            line-height: 1.8;
            margin-bottom: 30px;
          }

          /* الأزرار تحت بعضها بملء العرض بالكامل لسهولة الضغط */
          .azkar-controls { 
            flex-direction: column-reverse; 
            gap: 12px;
          }
          .azkar-controls button {
            width: 100%;
            padding: 14px;
          }
        }
      `}</style>

      <section className="azkar" id="azkar">
        <div className="container">

          <div className="azkar-tabs">
            <button
              className={section === "azkar" ? "active" : ""}
              onClick={() => { setSection("azkar"); setIndex(0); }}
            >
              📿 الأذكار
            </button>
            <button
              className={section === "duas" ? "active" : ""}
              onClick={() => { setSection("duas"); setIndex(0); }}
            >
              🤲 الأدعية
            </button>
          </div>

          <div className="azkar-box" onClick={handleCountClick}>
            <h2>{data[index]?.title}</h2>
            
            {/* دايرة السبحة التفاعلية */}
            <div className={`subha-counter ${currentCount === 1 ? 'done' : ''}`}>
              {currentCount}
            </div>

            <p>{data[index]?.text}</p>

            <div className="azkar-controls">
              <button onClick={(e) => { e.stopPropagation(); prev(); }}>السابق</button>
              <button onClick={(e) => { e.stopPropagation(); next(); }}>
                {section === "azkar" ? "الذكر التالي ←" : "الدعاء التالي ←"}
              </button>
            </div>

            <div className="azkar-counter">
              {index + 1} / {data.length}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default Azkar;