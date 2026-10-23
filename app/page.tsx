import Header from "@/components/Header";
import Hero from "@/components/Hero";
import IdeaSection from "@/components/IdeaSection";
import StackLayers from "@/components/StackLayers";
import { Contact, Elements, Footer, How, Marquee, Pipeline, Spotlight, Trust } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Spotlight />
      <Header />
      <main id="top">
        <Hero />
        <Marquee />
        <Trust />
        <StackLayers />
        <IdeaSection />
        <Elements />
        <Pipeline />
        <How />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
