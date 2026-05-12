"use client";

import { useEffect, useRef, useState } from "react";
import StickyHeader from "@/components/layout/StickyHeader";
import HeroSearch from "@/components/home/HeroSearch";
import EventCarousel from "@/components/home/EventCarousel";
import CategoryCards from "@/components/home/CategoryCards";
import TrendingKeywords from "@/components/home/TrendingKeywords";
import ImageGrid from "@/components/home/ImageGrid";
import BrandStats from "@/components/home/BrandStats";
import BottomNav from "@/components/layout/BottomNav";

export default function HomeClient() {
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [showStickySearch, setShowStickySearch] = useState(false);

  useEffect(() => {
    const el = searchBarRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowStickySearch(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-56px 0px 0px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <StickyHeader showSearch={showStickySearch} />

      <main className="pb-24">
        <HeroSearch ref={searchBarRef} />
        <EventCarousel />
        <CategoryCards />
        <TrendingKeywords />
        <ImageGrid />
        <BrandStats />
        <div className="h-4" />
      </main>

      <BottomNav />
    </div>
  );
}
