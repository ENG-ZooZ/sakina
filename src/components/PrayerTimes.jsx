import { useEffect, useRef, useState } from "react";
import axios from "axios";
// أيقونات Lucide مطابقة تماماً للأشكال المودرن في الصورة
import { Sun, Moon, Sunrise, Sunset, CloudSun, Clock } from "lucide-react";

function PrayerTimes() {
  const [playedAdhan, setPlayedAdhan] = useState(false);
  const [timings, setTimings] = useState({});
  const [nextPrayer, setNextPrayer] = useState("");
  const [timeLeft, setTimeLeft] = useState("00:00:00");

  const intervalRef = useRef(null);
  const refreshRef = useRef(null);
  const adhanAudio = useRef(new Audio("/adhan.mp3"));

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  const showNotification = (title, body) => {
    if (Notification.permission === "granted") {
      new Notification(title, {
        body,
        icon: "/logo.png",
      });
    }
  };

  const getPrayerTimes = async () => {
    try {
      const res = await axios.get(
        "https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt&method=5"
      );
      const data = res.data.data.timings;
      setTimings(data);
      setPlayedAdhan(false);
      setupNextPrayer(data);
    } catch (err) {
      console.log("Error fetching prayer times:", err);
    }
  };

  useEffect(() => {
    getPrayerTimes();
    refreshRef.current = setInterval(() => {
      getPrayerTimes();
    }, 1000 * 60 * 60 * 24);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (refreshRef.current) clearInterval(refreshRef.current);
    };
  }, []);

  const formatTimeTo12hr = (time) => {
    if (!time) return "--:--";
    let [h, m] = time.split(":");
    h = parseInt(h);
    h = h % 12 || 12;
    return `${h}:${m}`;
  };

  const getPeriodSuffix = (time) => {
    if (!time) return "";
    let [h] = time.split(":");
    return parseInt(h) >= 12 ? "PM" : "AM";
  };

  const toDate = (t) => {
    if (!t) return new Date();
    const [h, m] = t.split(":");
    const d = new Date();
    d.setHours(parseInt(h), parseInt(m), 0, 0);
    return d;
  };

  const setupNextPrayer = (data) => {
    const prayers = [
      { name: "الفجر", time: data.Fajr },
      { name: "الظهر", time: data.Dhuhr },
      { name: "العصر", time: data.Asr },
      { name: "المغرب", time: data.Maghrib },
      { name: "العشاء", time: data.Isha },
    ].filter((p) => p.time);

    const now = new Date();
    let next = prayers.find((p) => toDate(p.time) > now);
    if (!next) next = prayers[0];

    setNextPrayer(next.name);

    if (intervalRef.current) clearInterval(intervalRef.current);

    const updateCountdown = () => {
      const now = new Date();
      let target = toDate(next.time);

      if (target < now) {
        target.setDate(target.getDate() + 1);
      }

      const diff = target - now;
      const diffMinutes = Math.floor(diff / 60000);

      if (diffMinutes === 10 && !playedAdhan) {
        showNotification(`⏳ قرب أذان ${next.name}`, "باقي 10 دقائق على الصلاة");
      }

      if (diff <= 0 && !playedAdhan) {
        showNotification(`🕌 حان الآن أذان ${next.name}`, "قم للصلاة بارك الله فيك 🤍");
        setTimeLeft("00:00:00");
        adhanAudio.current.currentTime = 0;
        adhanAudio.current.play().catch(() => {});
        setPlayedAdhan(true);
        getPrayerTimes();
        return;
      }

      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      setTimeLeft(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      );
    };

    updateCountdown();
    intervalRef.current = setInterval(updateCountdown, 1000);
  };

  return (
    <section className="prayer-section" id="prayer">
      <style>{`
        /* 🎨 خلفية داكنة غامرة مستوحاة من ستايل الصورة تماماً */
        .prayer-section {
          background-color: #030712;
          background-image: radial-gradient(circle at 50% 15%, #07162c 0%, #030712 75%);
          padding: 60px 20px;
          color: #ffffff;
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
          direction: rtl;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          box-sizing: border-box;
        }

        .prayer-container {
          max-width: 1040px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* 🌙 أيقونة الهلال العلوية الجمالية المتوهجة نيون */
        .top-moon-icon {
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
          color: #00f2fe;
          filter: drop-shadow(0 0 8px rgba(0, 242, 254, 0.8));
        }

        /* 📋 ترويسة العنوان الرئيسي المطابق للصورة */
        .section-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .section-header h2 {
          font-size: 52px;
          font-weight: 700;
          margin: 0 0 12px 0;
          color: #ffffff;
          letter-spacing: -0.5px;
        }

        .section-header p {
          color: #4b5563;
          font-size: 16px;
          margin: 0;
        }

        /* ⚡ كارت التايمر المحدث طبق الأصل من الصورة الثانية */
        .main-countdown-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(3, 10, 21, 0.7);
          border: 1px solid rgba(0, 242, 254, 0.2);
          border-radius: 20px;
          padding: 24px 45px;
          width: 100%;
          max-width: 680px;
          margin-bottom: 45px;
          box-shadow: 0 0 25px rgba(0, 242, 254, 0.08);
          backdrop-filter: blur(16px);
          box-sizing: border-box;
        }

        .countdown-info-block {
          display: flex;
          align-items: center;
          justify-content: space-around;
          flex: 1;
        }

        .info-sub-segment {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .info-sub-segment.left-side {
          align-items: flex-start;
        }

        .countdown-info-block .label {
          color: #9ca3af;
          font-size: 13px;
          font-weight: 500;
        }

        .countdown-info-block .value-prayer {
          font-size: 34px;
          font-weight: 700;
          margin: 0;
          color: #ffffff;
        }

        .countdown-info-block .value-time {
          font-size: 40px;
          font-weight: 700;
          font-family: 'Consolas', monospace;
          color: #00f2fe;
          text-shadow: 0 0 12px rgba(0, 242, 254, 0.5);
          letter-spacing: 1px;
          margin: 0;
        }

        .divider-line {
          width: 1px;
          height: 50px;
          background: rgba(255, 255, 255, 0.12);
        }

        .clock-neon-wrapper {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #00f2fe;
          border: 2px solid #00f2fe;
          box-shadow: inset 0 0 6px rgba(0, 242, 254, 0.3), 0 0 12px rgba(0, 242, 254, 0.4);
          margin-right: 25px;
        }

        /* 🎴 شبكة كروت مواقيت الصلوات الخمس */
        .prayers-flex-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 18px;
          width: 100%;
        }

        .single-prayer-card {
          background: rgba(10, 17, 32, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 30px 15px;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          backdrop-filter: blur(8px);
        }

        /* ستايل الأيقونات الدائرية الملونة المتطابقة مع الأنيميشن المريح للعين */
        .card-icon-sphere {
          width: 56px;
          height: 56px;
          margin: 0 auto 20px auto;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s ease;
        }

        .card-icon-sphere svg {
          transition: all 0.4s ease;
        }

        .single-prayer-card h3 {
          font-size: 24px;
          font-weight: 600;
          margin: 0 0 20px 0;
          color: #ffffff;
        }

        .time-box-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .time-box-wrapper .main-time {
          font-size: 34px;
          font-weight: 700;
          transition: all 0.4s ease;
        }

        .time-box-wrapper .suffix {
          font-size: 13px;
          color: #6b7280;
          font-weight: 600;
        }

        /* 🎨 الألوان المخصصة الافتراضية لكل صلاة (الأيقونة والوقت متطابقين تماماً) */
        .fajr-card .main-time { color: #a855f7; }
        .dhuhr-card .main-time { color: #fbbf24; }
        .asr-card .main-time { color: #00f2fe; }
        .maghrib-card .main-time { color: #ff5e3a; }
        .isha-card .main-time { color: #818cf8; }

        /* 🌟 الكرت النشط المتوهج نيون بالكامل متطابق مع العصر بالصورة */
        .single-prayer-card.active-prayer-card {
          background: rgba(5, 18, 36, 0.7);
          border: 2px solid #00f2fe !important;
          box-shadow: 0 0 30px rgba(0, 242, 254, 0.3) !important;
          transform: translateY(-4px);
        }

        .single-prayer-card.active-prayer-card .card-icon-sphere {
          background: rgba(0, 242, 254, 0.1) !important;
          border: 1px solid #00f2fe !important;
        }

        .single-prayer-card.active-prayer-card .card-icon-sphere svg {
          color: #00f2fe !important;
          filter: drop-shadow(0 0 6px #00f2fe);
        }

        /* العصر النشط يحافظ على وهجه، وإذا كان الفجر هو النشط هياخد خصائصه */
        .single-prayer-card.active-prayer-card .main-time {
          color: #00f2fe !important;
          text-shadow: 0 0 10px rgba(0, 242, 254, 0.6);
        }
        
        /* إذا كان الفجر هو الصلاة النشطة القادمة */
        .single-prayer-card.fajr-card.active-prayer-card {
          border-color: #a855f7 !important;
          box-shadow: 0 0 30px rgba(168, 85, 247, 0.3) !important;
        }
        .single-prayer-card.fajr-card.active-prayer-card .card-icon-sphere {
          background: rgba(168, 85, 247, 0.1) !important;
          border-color: #a855f7 !important;
        }
        .single-prayer-card.fajr-card.active-prayer-card .card-icon-sphere svg {
          color: #a855f7 !important;
          filter: drop-shadow(0 0 6px #a855f7);
        }
        .single-prayer-card.fajr-card.active-prayer-card .main-time {
          color: #a855f7 !important;
          text-shadow: 0 0 10px rgba(168, 85, 247, 0.6);
        }

        /* ⚡ تأثير الـ Hover المتكامل (توهج الوقت + الأيقونة بنفس اللون المخصص) ⚡ */
        
        /* 1. الفجر (البنفسجي المتناسق بالكامل الآن) */
        .single-prayer-card.fajr-card:hover {
          border-color: #a855f7;
          box-shadow: 0 0 25px rgba(168, 85, 247, 0.25);
          transform: translateY(-4px);
        }
        .single-prayer-card.fajr-card:hover .card-icon-sphere {
          background: rgba(168, 85, 247, 0.2) !important;
        }
        .single-prayer-card.fajr-card:hover .card-icon-sphere svg {
          filter: drop-shadow(0 0 6px #a855f7);
        }
        .single-prayer-card.fajr-card:hover .main-time {
          text-shadow: 0 0 10px rgba(168, 85, 247, 0.6);
        }

        /* 2. الظهر (الأصفر الشمسي) */
        .single-prayer-card.dhuhr-card:hover {
          border-color: #fbbf24;
          box-shadow: 0 0 25px rgba(251, 191, 36, 0.25);
          transform: translateY(-4px);
        }
        .single-prayer-card.dhuhr-card:hover .card-icon-sphere {
          background: rgba(251, 191, 36, 0.2) !important;
        }
        .single-prayer-card.dhuhr-card:hover .card-icon-sphere svg {
          filter: drop-shadow(0 0 6px #fbbf24);
        }
        .single-prayer-card.dhuhr-card:hover .main-time {
          text-shadow: 0 0 10px rgba(251, 191, 36, 0.6);
        }

        /* 3. العصر (الأزرق السماوي النيون) */
        .single-prayer-card.asr-card:hover {
          border-color: #00f2fe;
          box-shadow: 0 0 25px rgba(0, 242, 254, 0.25);
          transform: translateY(-4px);
        }
        .single-prayer-card.asr-card:hover .card-icon-sphere {
          background: rgba(0, 242, 254, 0.2) !important;
        }
        .single-prayer-card.asr-card:hover .card-icon-sphere svg {
          filter: drop-shadow(0 0 6px #00f2fe);
        }
        .single-prayer-card.asr-card:hover .main-time {
          text-shadow: 0 0 10px rgba(0, 242, 254, 0.6);
        }

        /* 4. المغرب (البرتقالي المحمر) */
        .single-prayer-card.maghrib-card:hover {
          border-color: #ff5e3a;
          box-shadow: 0 0 25px rgba(255, 94, 58, 0.25);
          transform: translateY(-4px);
        }
        .single-prayer-card.maghrib-card:hover .card-icon-sphere {
          background: rgba(255, 94, 58, 0.2) !important;
        }
        .single-prayer-card.maghrib-card:hover .card-icon-sphere svg {
          filter: drop-shadow(0 0 6px #ff5e3a);
        }
        .single-prayer-card.maghrib-card:hover .main-time {
          text-shadow: 0 0 10px rgba(255, 94, 58, 0.6);
        }

        /* 5. العشاء (الأزرق النيلي/الموفي) */
        .single-prayer-card.isha-card:hover {
          border-color: #818cf8;
          box-shadow: 0 0 25px rgba(129, 140, 248, 0.25);
          transform: translateY(-4px);
        }
        .single-prayer-card.isha-card:hover .card-icon-sphere {
          background: rgba(129, 140, 248, 0.2) !important;
        }
        .single-prayer-card.isha-card:hover .card-icon-sphere svg {
          filter: drop-shadow(0 0 6px #818cf8);
        }
        .single-prayer-card.isha-card:hover .main-time {
          text-shadow: 0 0 10px rgba(129, 140, 248, 0.6);
        }

        /* بادج "الصلاة القادمة" العلوي المنسق */
        .next-prayer-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #022336, #004558);
          border: 1px solid rgba(0, 242, 254, 0.4);
          color: #00f2fe;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 16px;
          border-radius: 20px;
          white-space: nowrap;
          z-index: 2;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .prayers-flex-grid { grid-template-columns: repeat(3, 1fr); gap: 15px; }
        }
        @media (max-width: 680px) {
          .main-countdown-card { flex-direction: column; gap: 20px; padding: 25px; }
          .countdown-info-block { flex-direction: column; gap: 20px; width: 100%; }
          .info-sub-segment { align-items: center !important; }
          .divider-line { width: 80%; height: 1px; }
          .clock-neon-wrapper { margin: 0; }
          .prayers-flex-grid { grid-template-columns: repeat(2, 1fr); }
          .section-header h2 { font-size: 36px; }
        }
        @media (max-width: 460px) {
          .prayers-flex-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="prayer-container">
        
        {/* أيقونة الهلال العلوية */}
        <div className="top-moon-icon">
          <Moon size={30} strokeWidth={1.5} />
        </div>

        {/* العناوين والترويسة */}
        <div className="section-header">
          <h2>مواقيت الصلاة</h2>
          <p>مواقيت الصلاة اليومية حسب توقيت القاهرة</p>
        </div>

        {/* كارت التايمر المطور المنفصل بدون تداخل الفوتر */}
        {nextPrayer && (
          <div className="main-countdown-card">
            <div className="countdown-info-block">
              <div className="info-sub-segment">
                <span className="label">الصلاة القادمة</span>
                <h2 className="value-prayer">{nextPrayer}</h2>
              </div>
              <div className="divider-line"></div>
              <div className="info-sub-segment left-side">
                <span className="label">الوقت المتبقي لصلاة</span>
                <h2 className="value-time">{timeLeft}</h2>
              </div>
            </div>

            <div className="clock-neon-wrapper">
              <Clock size={22} />
            </div>
          </div>
        )}

        {/* شبكة مواقيت الصلوات الخمس بالتطابق اللوني الكامل للأيقونات والوقت الافتراضي */}
        <div className="prayers-flex-grid">
          
          {/* الفجر */}
          <div className={`single-prayer-card fajr-card ${nextPrayer === "الفجر" ? "active-prayer-card" : ""}`}>
            {nextPrayer === "الفجر" && <div className="next-prayer-badge" style={{ borderColor: '#a855f7', color: '#a855f7', background: 'linear-gradient(135deg, #1e1135, #3b185f)' }}>الصلاة القادمة</div>}
            <div className="card-icon-sphere" style={{ background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
              <Sunrise size={26} color="#a855f7" />
            </div>
            <h3>الفجر</h3>
            <div className="time-box-wrapper">
              <span className="main-time">{formatTimeTo12hr(timings.Fajr)}</span>
              <span className="suffix">{getPeriodSuffix(timings.Fajr)}</span>
            </div>
          </div>

          {/* الظهر */}
          <div className={`single-prayer-card dhuhr-card ${nextPrayer === "الظهر" ? "active-prayer-card" : ""}`}>
            {nextPrayer === "الظهر" && <div className="next-prayer-badge">الصلاة القادمة</div>}
            <div className="card-icon-sphere" style={{ background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.2)' }}>
              <Sun size={26} color="#fbbf24" />
            </div>
            <h3>الظهر</h3>
            <div className="time-box-wrapper">
              <span className="main-time">{formatTimeTo12hr(timings.Dhuhr)}</span>
              <span className="suffix">{getPeriodSuffix(timings.Dhuhr)}</span>
            </div>
          </div>

          {/* العصر */}
          <div className={`single-prayer-card asr-card ${nextPrayer === "العصر" ? "active-prayer-card" : ""}`}>
            {nextPrayer === "العصر" && <div className="next-prayer-badge">الصلاة القادمة</div>}
            <div className="card-icon-sphere" style={{ background: 'rgba(0, 242, 254, 0.1)', border: '1px solid rgba(0, 242, 254, 0.2)' }}>
              <CloudSun size={26} color="#00f2fe" />
            </div>
            <h3>العصر</h3>
            <div className="time-box-wrapper">
              <span className="main-time">{formatTimeTo12hr(timings.Asr)}</span>
              <span className="suffix">{getPeriodSuffix(timings.Asr)}</span>
            </div>
          </div>

          {/* المغرب */}
          <div className={`single-prayer-card maghrib-card ${nextPrayer === "المغرب" ? "active-prayer-card" : ""}`}>
            {nextPrayer === "المغرب" && <div className="next-prayer-badge">الصلاة القادمة</div>}
            <div className="card-icon-sphere" style={{ background: 'rgba(255, 94, 58, 0.1)', border: '1px solid rgba(255, 94, 58, 0.2)' }}>
              <Sunset size={26} color="#ff5e3a" />
            </div>
            <h3>المغرب</h3>
            <div className="time-box-wrapper">
              <span className="main-time">{formatTimeTo12hr(timings.Maghrib)}</span>
              <span className="suffix">{getPeriodSuffix(timings.Maghrib)}</span>
            </div>
          </div>

          {/* العشاء */}
          <div className={`single-prayer-card isha-card ${nextPrayer === "العشاء" ? "active-prayer-card" : ""}`}>
            {nextPrayer === "العشاء" && <div className="next-prayer-badge">الصلاة القادمة</div>}
            <div className="card-icon-sphere" style={{ background: 'rgba(129, 140, 248, 0.1)', border: '1px solid rgba(129, 140, 248, 0.2)' }}>
              <Moon size={26} color="#818cf8" />
            </div>
            <h3>العشاء</h3>
            <div className="time-box-wrapper">
              <span className="main-time">{formatTimeTo12hr(timings.Isha)}</span>
              <span className="suffix">{getPeriodSuffix(timings.Isha)}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default PrayerTimes;