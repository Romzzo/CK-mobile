// /category 페이지용 가로형 썸네일 이미지
// public/category/ 폴더에 이미지 업로드 후 경로 추가
// curated.ts(홈 세로형)와 별도 관리

const CATEGORY_THUMBS: Record<string, string> = {
  ai:        "/category/ai.jpg",
  illust:    "/category/illust.jpg",
  photo:     "/category/photo.jpg",
  icon:      "/category/icon.jpg",
  // ppt:       "/category/ppt.jpg",
  // composite: "/category/composite.jpg",
  // "3d":      "/category/3d.jpg",
  // png:       "/category/png.jpg",
  // update:    "/category/update.jpg",
};

export default CATEGORY_THUMBS;
