import "./Home.css";
import Hero from "./components/home/Hero";
import Features from "./components/home/Features";
import RecentActivities from "./components/home/RecentActivities";
import Footer from "./components/home/Footer";

export default function Home() {
  return (
    <div className="home-page"> 
      <Hero />
      <Features />
      <RecentActivities /> 
      <Footer />
    </div>

  );
}