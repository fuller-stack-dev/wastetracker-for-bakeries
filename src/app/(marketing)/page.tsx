import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonial } from "@/components/landing/Testimonial";

export default function MarketingPage() {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      <Testimonial />
    </>
  );
}
