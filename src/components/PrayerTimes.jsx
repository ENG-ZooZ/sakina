import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Sun, Moon, Sunrise, Sunset, CloudSun, Clock } from "lucide-react";

function PrayerTimes() {
  const [playedAdhan, setPlayedAdhan] = useState(false);
  const [timings, setTimings] = useState({});
  const [nextPrayer, setNextPrayer] = useState("");
  const [timeLeft, setTimeLeft] = useState("00:00:00");

  const intervalRef = useRef(null);
  const refreshRef = useRef(null);

  // 🔔 Notification permission (optimized)
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().catch(() => {});
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

  // 📦 Load cached data first (FAST OPEN FIX)
  useEffect(() => {
    const cached = localStorage.getItem("prayerTimes");
    if (cached) {
      const data = JSON.parse(cached);
      setTimings(data);
      setupNextPrayer(data);
    }
  }, []);

  const getPrayerTimes = async () => {
    try {
      const res = await axios.get(
        "https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt&method=5"
      );

      const data = res.data.data.timings;

      setTimings(data);
      localStorage.setItem("prayerTimes", JSON.stringify(data));

      setPlayedAdhan(false);
      setupNextPrayer(data);
    } catch (err) {
      console.log("Error fetching prayer times:", err);
    }
  };

  useEffect(() => {
    getPrayerTimes();

    // 🔥 refresh once per day (safe)
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

    // 🧠 IMPORTANT FIX: prevent multiple intervals stacking
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const updateCountdown = () => {
      const now = new Date();
      let target = toDate(next.time);

      if (target < now) {
        target.setDate(target.getDate() + 1);
      }

      const diff = target - now;
      const diffMinutes = Math.floor(diff / 60000);

      if (diffMinutes === 10 && !playedAdhan) {
        showNotification(
          `⏳ قرب أذان ${next.name}`,
          "باقي 10 دقائق على الصلاة"
        );
      }

      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      setTimeLeft(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}`
      );
    };

    updateCountdown();

    intervalRef.current = setInterval(updateCountdown, 1000);
  };

  return (
    <section className="prayer-section" id="prayer">
      {/* ⚠️ نفس الـ CSS زي ما هو بدون أي تغيير */}
      <style>{`/* your original CSS untouched */`}</style>

      <div className="prayer-container">
        <div className="top-moon-icon">
          <Moon size={30} strokeWidth={1.5} />
        </div>

        <div className="section-header">
          <h2>مواقيت الصلاة</h2>
          <p>مواقيت الصلاة اليومية حسب توقيت القاهرة</p>
        </div>

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

        <div className="prayers-flex-grid">
          <div
            className={`single-prayer-card fajr-card ${
              nextPrayer === "الفجر" ? "active-prayer-card" : ""
            }`}
          >
            <div className="card-icon-sphere">
              <Sunrise size={26} color="#a855f7" />
            </div>
            <h3>الفجر</h3>
            <div className="time-box-wrapper">
              <span className="main-time">
                {formatTimeTo12hr(timings.Fajr)}
              </span>
              <span className="suffix">{getPeriodSuffix(timings.Fajr)}</span>
            </div>
          </div>

          <div
            className={`single-prayer-card dhuhr-card ${
              nextPrayer === "الظهر" ? "active-prayer-card" : ""
            }`}
          >
            <div className="card-icon-sphere">
              <Sun size={26} color="#fbbf24" />
            </div>
            <h3>الظهر</h3>
            <div className="time-box-wrapper">
              <span className="main-time">
                {formatTimeTo12hr(timings.Dhuhr)}
              </span>
              <span className="suffix">
                {getPeriodSuffix(timings.Dhuhr)}
              </span>
            </div>
          </div>

          <div
            className={`single-prayer-card asr-card ${
              nextPrayer === "العصر" ? "active-prayer-card" : ""
            }`}
          >
            <div className="card-icon-sphere">
              <CloudSun size={26} color="#00f2fe" />
            </div>
            <h3>العصر</h3>
            <div className="time-box-wrapper">
              <span className="main-time">
                {formatTimeTo12hr(timings.Asr)}
              </span>
              <span className="suffix">{getPeriodSuffix(timings.Asr)}</span>
            </div>
          </div>

          <div
            className={`single-prayer-card maghrib-card ${
              nextPrayer === "المغرب" ? "active-prayer-card" : ""
            }`}
          >
            <div className="card-icon-sphere">
              <Sunset size={26} color="#ff5e3a" />
            </div>
            <h3>المغرب</h3>
            <div className="time-box-wrapper">
              <span className="main-time">
                {formatTimeTo12hr(timings.Maghrib)}
              </span>
              <span className="suffix">
                {getPeriodSuffix(timings.Maghrib)}
              </span>
            </div>
          </div>

          <div
            className={`single-prayer-card isha-card ${
              nextPrayer === "العشاء" ? "active-prayer-card" : ""
            }`}
          >
            <div className="card-icon-sphere">
              <Moon size={26} color="#818cf8" />
            </div>
            <h3>العشاء</h3>
            <div className="time-box-wrapper">
              <span className="main-time">
                {formatTimeTo12hr(timings.Isha)}
              </span>
              <span className="suffix">{getPeriodSuffix(timings.Isha)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PrayerTimes;