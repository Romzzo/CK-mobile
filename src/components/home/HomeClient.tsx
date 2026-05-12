"use client";

import { useEffect, useRef, useState } from "react";
import StickyHeader from "@/components/layout/StickyHeader";
import HomeHero from "@/components/home/HomeHero";
import ToolCards from "@/components/home/ToolCards";
import CategoryCards from "@/components/home/CategoryCards";
import ImageGrid from "@/components/home/ImageGrid";
import TrendingKeywords from "@/components/home/TrendingKeywords";
import EventCarousel from "@/components/home/EventCarousel";
import BrandStats from "@/components/home/BrandStats";
import BottomNav from "@/components/layout/BottomNav";

export default function HomeClient() {
  const heroSearchRef = useRef<HTMLDivElement>(null);
  const [solidHeader, setSolidHeader] = useState(false);

  useEffect(() => {
    const el = heroSearchRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSolidHeader(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-56px 0px 0px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-surface-muted">
      <StickyHeader solid={solidHeader} />

      <main className="pb-28">
        <HomeHero searchRef={heroSearchRef} />
        <ToolCards />
        <CategoryCards />
        <ImageGrid />
        <TrendingKeywords />
        <EventCarousel />
        <BrandStats />
      </main>

      <BottomNav />
    </div>
  );
}
