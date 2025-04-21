import { NextResponse } from "next/server";

// 실제로는 데이터베이스에서 가져올 데이터
const posts = [
  {
    id: 1,
    title: "Next.js의 SSR",
    content:
      "서버 사이드 렌더링은 서버에서 페이지를 생성하여 클라이언트에 전송합니다.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "SSR의 장점",
    content: "SEO 최적화와 초기 로딩 성능 향상에 도움이 됩니다.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "SSR vs CSR",
    content:
      "서버 사이드 렌더링과 클라이언트 사이드 렌더링의 차이점을 이해하는 것이 중요합니다.",
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  // 실제 API에서는 여기서 데이터베이스 쿼리를 실행
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 지연 시뮬레이션

  return NextResponse.json(posts);
}
