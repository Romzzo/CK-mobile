"use client";

import { useEffect, useRef, useState } from "react";
import StickyHeader from "@/components/layout/StickyHeader";
import HomeHero from "@/components/home/HomeHero";
import ToolCards from "@/components/home/ToolCards";
import CategoryCards from "@/components/home/CategoryCards";
import OriginalCollections from "@/components/home/OriginalCollections";
import TrendingKeywords from "@/components/home/TrendingKeywords";
import EventCarousel from "@/components/home/EventCarousel";
import BrandStats from "@/components/home/BrandStats";
import OnboardingBanner from "@/components/home/OnboardingBanner";
import BottomNav from "@/components/layout/BottomNav";

const ONBOARDING_KEY = "ck-onboarding-dismissed";

export default function HomeClient() {
  const heroSearchRef = useRef<HTMLDivElement>(null);
  const [solidHeader, setSolidHeader] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

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

  useEffect(() => {
    // 클라이언트 전용(sessionStorage) — hydration 불일치 방지를 위해 마운트 후 설정
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!sessionStorage.getItem(ONBOARDING_KEY)) setShowOnboarding(true);
  }, []);

  const dismissOnboarding = () => {
    sessionStorage.setItem(ONBOARDING_KEY, "1");
    setShowOnboarding(false);
  };

  return (
    <div className="min-h-screen bg-surface-muted">
      <StickyHeader solid={solidHeader} />

      <main className={showOnboarding ? "pb-40" : "pb-28"}>
        <HomeHero searchRef={heroSearchRef} />
        <ToolCards />
        <CategoryCards />
        <EventCarousel />
        <OriginalCollections />
        <TrendingKeywords />
        <BrandStats />
      </main>

      {showOnboarding ? <OnboardingBanner onClose={dismissOnboarding} /> : null}
      <BottomNav />
    </div>
  );
}
