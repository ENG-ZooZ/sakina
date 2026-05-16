import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Azkar from "./components/Azkar"; 
import PrayerTimes from "./components/PrayerTimes";
import Tasbeeh from "./components/Tasbeeh"; 
import Footer from "./components/Footer";
import DeveloperButton from "./components/button"; // 👈 استدعاء الزرار الجديد هنا

function App() {
  return (
    <>
      <Navbar />

      <Hero />

      <Azkar />

      <PrayerTimes />

      <Tasbeeh />

      <Footer />

      {/* 🌟 الزرار العائم هيتحط هنا في الآخر خالص عشان يظهر فوق كل العناصر لما تعمل سكرول */}
      <DeveloperButton /> 
    </>
  );
}

export default App;