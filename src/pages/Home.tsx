import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import Features from "@/components/Features";
import Benefits from "@/components/Benefits";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import GifDemo from "@/components/GifDemo";
import PricingHome from "./PricingHome";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <VideoSection videoId={"H9P0yRufnKc"}/>
      <GifDemo />
      <Features />
      <Benefits />
      <PricingHome />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
