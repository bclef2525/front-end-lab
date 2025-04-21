# 서버 사이드 렌더링 (SSR) 실험

이 디렉토리는 Next.js의 서버 사이드 렌더링(SSR) 기능을 실험하기 위한 예제를 포함하고 있습니다.

## 개념 설명

### 서버 사이드 렌더링 (SSR)이란?

서버 사이드 렌더링은 페이지의 HTML을 서버에서 생성하여 클라이언트로 전송하는 방식입니다. 이는 다음과 같은 특징이 있습니다:

- **초기 로딩 성능**: 서버에서 완성된 HTML을 전송하므로 초기 로딩이 빠릅니다.
- **SEO 최적화**: 검색 엔진이 페이지 내용을 쉽게 인식할 수 있습니다.
- **데이터 페칭**: 서버에서 데이터를 가져와 HTML에 포함시킬 수 있습니다.

### Next.js의 SSR

Next.js는 App Router를 통해 기본적으로 서버 컴포넌트를 사용합니다. 서버 컴포넌트는:

- 서버에서만 실행됩니다.
- 클라이언트로 JavaScript를 전송하지 않습니다.
- 데이터베이스나 파일 시스템에 직접 접근할 수 있습니다.

## 실험 내용

이 예제에서는 다음과 같은 내용을 실험합니다:

1. **서버에서 데이터 가져오기**: API 라우트를 통해 데이터를 가져옵니다.
2. **SSR 동작 확인**: 페이지를 새로고침할 때마다 서버에서 새로운 데이터를 가져옵니다.
3. **HTML 소스 확인**: 페이지 소스에 데이터가 포함되어 있음을 확인합니다.

## 테스트 방법

### 1. 개발 서버 실행

```bash
pnpm dev
```

### 2. 페이지 접속

브라우저에서 `http://localhost:3000/ssr`로 접속합니다.

### 3. SSR 동작 확인

- **새로고침 테스트**: 페이지를 새로고침할 때마다 생성 시간이 변경되는 것을 확인합니다.
- **페이지 소스 확인**: 브라우저에서 우클릭 > "페이지 소스 보기"를 선택하여 HTML에 데이터가 포함되어 있음을 확인합니다.
- **네트워크 탭 확인**: 개발자 도구의 Network 탭에서 서버 응답을 확인합니다.

### 4. 코드 분석

#### API 라우트 (`/api/posts/route.ts`)

```typescript
export async function GET() {
  // 실제 API에서는 여기서 데이터베이스 쿼리를 실행
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 지연 시뮬레이션

  return NextResponse.json(posts);
}
```

- API 라우트는 서버에서 실행됩니다.
- 1초 지연을 추가하여 데이터 가져오기를 시뮬레이션합니다.

#### SSR 페이지 (`/ssr/page.tsx`)

```typescript
async function getPosts(): Promise<Post[]> {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store", // 매 요청마다 새로운 데이터를 가져옴
  });

  // ...
}

export default async function SSRPage() {
  const posts = await getPosts();

  // ...
}
```

- `getPosts` 함수는 서버에서 실행됩니다.
- `cache: "no-store"` 옵션으로 매 요청마다 새로운 데이터를 가져옵니다.
- 페이지 컴포넌트는 `async` 함수로, 서버에서 데이터를 가져와 렌더링합니다.

## SSR vs CSR vs SSG vs ISR

Next.js는 다양한 렌더링 방식을 지원합니다:

- **SSR (Server-Side Rendering)**: 매 요청마다 서버에서 페이지를 생성합니다.
- **CSR (Client-Side Rendering)**: 클라이언트에서 JavaScript를 사용하여 페이지를 렌더링합니다.
- **SSG (Static Site Generation)**: 빌드 시점에 페이지를 생성합니다.
- **ISR (Incremental Static Regeneration)**: 일정 시간마다 페이지를 재생성합니다.

각 방식의 특징과 사용 사례는 다른 디렉토리에서 확인할 수 있습니다.

## 추가 실험 아이디어

1. **데이터 캐싱 실험**: `cache` 옵션을 변경하여 데이터 캐싱 효과를 확인합니다.
2. **동적 라우팅**: 동적 라우트를 사용하여 SSR을 실험합니다.
3. **클라이언트 컴포넌트와 비교**: 클라이언트 컴포넌트로 동일한 기능을 구현하여 차이점을 확인합니다.
