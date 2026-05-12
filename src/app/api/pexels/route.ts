import { NextRequest, NextResponse } from "next/server";

const CATEGORY_QUERIES: Record<string, string> = {
  illust: "colorful illustration art",
  photo: "professional photography",
  icon: "minimal icon ui design",
  ai: "digital art fantasy",
  ppt: "business presentation",
  font: "typography lettering",
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  const perPage = Number(searchParams.get("per_page") || "12");
  const type = searchParams.get("type") || "";

  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) return NextResponse.json({ photos: [] });

  // 카테고리별 대표 이미지 일괄 반환
  if (type === "categories") {
    const entries = await Promise.all(
      Object.entries(CATEGORY_QUERIES).map(async ([catType, q]) => {
        const res = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&per_page=1&orientation=portrait`,
          { headers: { Authorization: apiKey }, next: { revalidate: 86400 } }
        );
        const data = await res.json();
        return [catType, data.photos?.[0]?.src?.portrait ?? null];
      })
    );
    return NextResponse.json(Object.fromEntries(entries));
  }

  // 일반 검색 or 큐레이션
  const url = query
    ? `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}`
    : `https://api.pexels.com/v1/curated?per_page=${perPage}`;

  const res = await fetch(url, {
    headers: { Authorization: apiKey },
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  return NextResponse.json(data);
}
