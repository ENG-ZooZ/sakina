import { useEffect, useState } from "react";

export default function useNextPrayer(timings) {
  const [nextPrayer, setNextPrayer] = useState("");
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    if (!timings) return;

    const prayers = [
      { name: "الفجر", time: timings.Fajr },
      { name: "الظهر", time: timings.Dhuhr },
      { name: "العصر", time: timings.Asr },
      { name: "المغرب", time: timings.Maghrib },
      { name: "العشاء", time: timings.Isha },
    ];

    const getNext = () => {
      const now = new Date();

      const upcoming = prayers.find((p) => {
        if (!p.time) return false;

        const [h, m] = p.time.split(":");
        const prayerTime = new Date();
        prayerTime.setHours(h, m, 0);

        return prayerTime > now;
      });

      return upcoming || prayers[0];
    };

    const next = getNext();
    setNextPrayer(next.name);

    const interval = setInterval(() => {
      const now = new Date();

      const [h, m] = next.time.split(":");
      const target = new Date();
      target.setHours(h, m, 0);

      const diff = target - now;

      if (diff <= 0) {
        setCountdown("00:00:00");
        return;
      }

      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      setCountdown(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [timings]);

  return { nextPrayer, countdown };
}