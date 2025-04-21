# Server-Side Rendering (SSR) Example 🖥️

이 예제는 Next.js에서 서버 사이드 렌더링(SSR)을 구현하는 방법을 보여줍니다.

## 주요 특징 ✨

1. **서버 컴포넌트**

   - 기본적으로 모든 컴포넌트는 서버 컴포넌트
   - 서버에서 HTML 생성

2. **데이터 페칭**

   - 서버에서 직접 데이터 페칭
   - 캐시 제어 (`cache: 'no-store'`)
   - 동적 데이터 처리

3. **동적 렌더링**
   - 매 요청마다 새로운 HTML 생성
   - 실시간 데이터 반영

## 코드 설명 📝

```typescript
// 기본적으로 서버 컴포넌트
export default async function SSRPage() {
  // 서버 측 데이터 페칭
  const data = await fetch('API_URL', {
    cache: 'no-store'  // 캐시 비활성화
  })

  // 서버에서 HTML 생성
  return (
    // JSX
  )
}
```

## 장단점 ⚖️

### 장점 👍

- 뛰어난 SEO
- 빠른 초기 페이지 로드
- 실시간 데이터 반영
- 보안성 (서버에서 민감한 로직 처리)

### 단점 👎

- 서버 부하 증가
- TTFB (Time to First Byte) 증가
- 서버 자원 소비

## 사용 사례 💡

- 검색 엔진 최적화가 필요한 페이지
- 실시간 데이터를 보여주는 페이지
- 소셜 미디어 피드
- 뉴스 사이트
