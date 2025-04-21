interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

async function getPosts(): Promise<Post[]> {
  // 서버 컴포넌트에서는 상대 경로로 API를 호출
  const res = await fetch("http://localhost:3000/api/posts", {
    // SSR을 위해 cache 옵션을 설정
    cache: "no-store", // 매 요청마다 새로운 데이터를 가져옴
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export default async function SSRPage() {
  const posts = await getPosts();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">서버 사이드 렌더링 (SSR) 예제</h1>

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
          SSR 동작 방식
        </h2>
        <ul className="list-disc list-inside text-blue-600">
          <li>이 페이지는 서버에서 렌더링됩니다</li>
          <li>데이터는 서버에서 가져와 HTML에 포함됩니다</li>
          <li>페이지 소스를 확인해보세요 (우클릭 - 페이지 소스 보기)</li>
          <li>새로고침할 때마다 서버에서 새로운 데이터를 가져옵니다</li>
        </ul>
      </div>
    </div>
  );
}
