import Hero from "@/components/Hero";
import FeatureProducts from "@/components/FeatureProducts";
import BrandLogo from "@/components/BrandLogo";
import TopCategories from "@/components/TopCategories";
import HotSale from "@/components/HotSale";
import ExtraProducts from "@/components/ExtraProducts";
import Collection from "@/components/Collection";
import Testimonials from "@/components/Testimonials/Testimonials";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureProducts />
      <TopCategories />
      <HotSale />
      <ExtraProducts />
      <Collection />
      <Suspense fallback={null}>
        <Testimonials />
      </Suspense>
      <BrandLogo />
    </>
  );
}
