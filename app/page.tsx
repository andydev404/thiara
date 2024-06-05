import Features from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import HeroSection from "@/components/landing/hero-section";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  return (
    <>
      <Header session={session} />
      <main>
        <HeroSection session={session} />
        <Features />
        <Footer />
      </main>
    </>
  );
}
