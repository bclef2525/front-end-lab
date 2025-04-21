"use client";

import { useEffect, useState } from "react";

/**
 * CSR(Client-Side Rendering) 예제
 *
 * CSR의 특징:
 * 1. 초기 HTML은 비어있고, JavaScript가 실행된 후에 콘텐츠가 렌더링됩니다.
 * 2. 데이터 페칭은 브라우저에서 이루어집니다.
 * 3. SEO에 불리할 수 있습니다 (검색 엔진이 JavaScript를 실행하지 않는 경우).
 * 4. 초기 로딩 시간이 길어질 수 있습니다.
 * 5. 사용자 인터랙션이 많은 페이지에 적합합니다.
 */

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

// 목 데이터 정의 (SSR과 동일한 구조)
const mockPosts: Post[] = [
  {
    id: 1,
    title: "Next.js의 CSR",
    content:
      "클라이언트 사이드 렌더링은 브라우저에서 JavaScript를 사용하여 페이지를 생성합니다.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "CSR의 장점",
    content:
      "사용자 인터랙션이 많은 애플리케이션에 적합하고, 서버 부하를 줄일 수 있습니다.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "CSR vs SSR",
    content:
      "클라이언트 사이드 렌더링과 서버 사이드 렌더링의 차이점을 이해하는 것이 중요합니다.",
    createdAt: new Date().toISOString(),
  },
];

export default function CSRPage() {
  // 상태 관리: 게시물 목록, 로딩 상태, 에러 상태
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 컴포넌트가 마운트될 때 목 데이터를 사용합니다 (클라이언트 사이드에서 실행)
  useEffect(() => {
    // 목 데이터를 사용하여 지연 시간을 시뮬레이션합니다
    const fetchPosts = async () => {
      try {
        // 실제 API 호출 대신 목 데이터를 사용합니다
        // 1초 지연을 추가하여 로딩 상태를 시뮬레이션합니다
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setPosts(mockPosts);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 로딩 중일 때 표시할 UI
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // 에러가 발생했을 때 표시할 UI
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  // 데이터가 로드되었을 때 표시할 UI
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        클라이언트 사이드 렌더링 (CSR) 예제
      </h1>

      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.id} className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.content}</p>
            <p className="text-sm text-gray-500">
              생성 시간: {new Date(post.createdAt).toLocaleString()}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">
          CSR 동작 방식
        </h2>
        <ul className="list-disc list-inside text-blue-600">
          <li>이 페이지는 클라이언트(브라우저)에서 렌더링됩니다</li>
          <li>데이터는 클라이언트에서 가져와 JavaScript로 렌더링됩니다</li>
          <li>페이지 소스를 확인해보세요 (우클릭 - 페이지 소스 보기)</li>
          <li>새로고침할 때마다 클라이언트에서 새로운 데이터를 가져옵니다</li>
        </ul>
      </div>
    </div>
  );
}
