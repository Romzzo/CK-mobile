import type { Metadata, Viewport } from "next";
import "./globals.css";
import BfcacheReload from "@/components/common/BfcacheReload";

export const metadata: Metadata = {
  title: "클립아트코리아 — 디자인 소스, 여기서 다 끝내세요",
  description: "1,500만+ 일러스트·사진·아이콘·AI 이미지·폰트. 모바일에서 검색하고 바로 다운로드.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="min-h-full bg-[#E9E9EC]">
        <BfcacheReload />
        <div className="mx-auto min-h-full w-full max-w-[480px] bg-surface-muted">
          {children}
        </div>
      </body>
    </html>
  );
}
