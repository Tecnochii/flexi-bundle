import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import Features from "@/components/Features";
import Benefits from "@/components/Benefits";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <VideoSection />
      <Features />
      <Benefits />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
