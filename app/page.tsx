import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { MockupPreview } from "@/components/landing/MockupPreview";
import { Navbar } from "@/components/landing/Navbar";
import { Pricing } from "@/components/landing/Pricing";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <MockupPreview />
      <Features />
      <Pricing />
      <Footer />
    </main>
  );
}
