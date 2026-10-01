import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import {
  Banner,
  Care,
  Collection,
  Craft,
  FaqSection,
  Footer,
  LookbookSection,
  Marquee,
  OrderSection,
  Process,
} from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Collection />
        <Craft />
        <Banner />
        <Process />
        <Care />
        <LookbookSection />
        <FaqSection />
        <OrderSection />
      </main>
      <Footer />
    </>
  );
}
