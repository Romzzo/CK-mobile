import StickyHeader from "@/components/layout/StickyHeader";
import PromoBanner from "@/components/home/PromoBanner";
import CategoryCards from "@/components/home/CategoryCards";
import ImageGrid from "@/components/home/ImageGrid";
import TrendingKeywords from "@/components/home/TrendingKeywords";
import EventCarousel from "@/components/home/EventCarousel";
import BrandStats from "@/components/home/BrandStats";
import BottomNav from "@/components/layout/BottomNav";

export default function HomeClient() {
  return (
    <div className="min-h-screen bg-surface-muted">
      <StickyHeader />

      <main className="pb-28">
        <PromoBanner />
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
