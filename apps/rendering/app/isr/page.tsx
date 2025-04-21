interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

// 목 데이터 정의 (생성 시간 제외)
const mockPosts = [
  {
    id: 1,
    title: "Next.js의 ISR",
    content:
      "증분 정적 재생성은 정적 페이지를 일정 시간마다 재생성하는 하이브리드 접근 방식입니다.",
  },
  {
    id: 2,
    title: "ISR의 장점",
    content:
      "SSG의 성능과 SSR의 데이터 신선도를 결합하여 최적의 사용자 경험을 제공합니다.",
  },
  {
    id: 3,
    title: "ISR vs SSG vs SSR",
    content:
      "ISR은 SSG와 SSR의 장점을 결합한 방식으로, 자주 변경되는 데이터를 다룰 때 유용합니다.",
  },
];

// 고정된 생성 시간 (개발 환경에서 사용)
const FIXED_CREATED_AT = new Date().toISOString();

// ISR을 위한 데이터 가져오기 함수
async function getPosts(): Promise<Post[]> {
  // 실제 API 호출 대신 목 데이터를 사용합니다
  // 1초 지연을 추가하여 데이터 가져오기를 시뮬레이션합니다
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 개발 환경에서는 고정된 시간을 사용하고, 프로덕션 환경에서는 현재 시간을 사용합니다
  const createdAt =
    process.env.NODE_ENV === "development"
      ? FIXED_CREATED_AT
      : new Date().toISOString();

  // 현재 시간을 포함하여 데이터가 갱신되었음을 표시
  // 이 시간은 revalidate 시간이 지날 때만 변경됩니다 (프로덕션 환경에서)
  return mockPosts.map((post) => ({
    ...post,
    createdAt,
  }));
}

// ISR 설정: 10초마다 페이지 재생성
export const revalidate = 10;

export default async function ISRPage() {
  const posts = await getPosts();
  const isDev = process.env.NODE_ENV === "development";

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">증분 정적 재생성 (ISR) 예제</h1>

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
          ISR 동작 방식
        </h2>
        <ul className="list-disc list-inside text-blue-600">
          <li>이 페이지는 빌드 시점에 정적으로 생성됩니다</li>
          <li>10초마다 백그라운드에서 새로운 데이터로 페이지가 재생성됩니다</li>
          <li>페이지 소스를 확인해보세요 (우클릭 - 페이지 소스 보기)</li>
          <li>
            새로고침을 해도 revalidate 시간(10초)이 지나기 전에는 캐시된
            데이터가 표시됩니다
          </li>
          <li>
            revalidate 시간이 지난 후에는 백그라운드에서 새로운 데이터를 가져와
            다음 요청에 제공합니다
          </li>
          {isDev && (
            <li className="text-yellow-600 font-semibold">
              참고: 개발 환경에서는 ISR이 제대로 작동하지 않습니다. 프로덕션
              빌드에서 테스트해보세요.
            </li>
          )}
        </ul>
      </div>

      {isDev && (
        <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">
            ISR 테스트 방법
          </h2>
          <p className="text-yellow-700 mb-2">
            ISR을 테스트하려면 프로덕션 빌드를 생성하고 실행해야 합니다:
          </p>
          <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm overflow-x-auto">
            <p># 프로덕션 빌드 생성</p>
            <p>pnpm run build</p>
            <p className="mt-2"># 프로덕션 서버 실행</p>
            <p>pnpm run start</p>
            <p className="mt-2"># 브라우저에서 접속</p>
            <p>http://localhost:3000/isr</p>
          </div>
          <p className="text-yellow-700 mt-2">
            프로덕션 환경에서는 10초마다 페이지를 새로고침하여 생성 시간이
            변경되는지 확인할 수 있습니다.
          </p>
        </div>
      )}
    </div>
  );
}
