# Next.js Rendering Strategies 🎨

Next.js의 다양한 렌더링 전략을 실험하고 비교하는 프로젝트입니다.
각 렌더링 방식의 특징과 사용 사례를 실제 예제를 통해 학습할 수 있습니다.

## 렌더링 전략 비교 🔄

### 1. CSR (Client-Side Rendering)

- **경로:** `/csr`
- **특징:**
  - 브라우저에서 JavaScript를 통해 콘텐츠를 렌더링
  - 초기 로딩 시 빈 HTML을 받고, JavaScript가 실행된 후 콘텐츠 표시
  - SEO에 불리하지만, 동적 인터랙션이 많은 페이지에 적합
- **사용 사례:** 대시보드, 관리자 페이지

### 2. SSR (Server-Side Rendering)

- **경로:** `/ssr`
- **특징:**
  - 서버에서 HTML을 생성하여 전송
  - 매 요청마다 새로운 HTML 생성
  - SEO 친화적이며, 실시간 데이터가 필요한 페이지에 적합
- **사용 사례:** 실시간 뉴스, 소셜 미디어 피드

### 3. ISR (Incremental Static Regeneration)

- **경로:** `/isr`
- **특징:**
  - 정적 페이지를 주기적으로 재생성
  - SSG의 성능과 SSR의 데이터 신선도를 결합
  - 캐시된 페이지를 제공하면서 백그라운드에서 새 버전 생성
- **사용 사례:** 블로그, 제품 목록 페이지

### 4. SSG (Static Site Generation)

- **경로:** `/ssg`
- **특징:**
  - 빌드 시점에 HTML 생성
  - 가장 빠른 페이지 로드 속도
  - 정적 콘텐츠에 최적화
- **사용 사례:** 마케팅 페이지, 문서

## 실행 방법 🚀

```bash
# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

## 성능 측정 📊

각 렌더링 방식의 성능을 다음 지표로 비교할 수 있습니다:

- TTFB (Time to First Byte)
- FCP (First Contentful Paint)
- TTI (Time to Interactive)
- LCP (Largest Contentful Paint)

## 학습 포인트 📝

1. 각 렌더링 방식의 작동 원리
2. 적절한 사용 사례 이해
3. 성능과 사용자 경험의 트레이드오프
4. SEO 영향도
5. 캐싱 전략

## 참고 자료 📚

- [Next.js 공식 문서](https://nextjs.org/docs)
- [React 공식 문서](https://react.dev)
- [Web Vitals](https://web.dev/vitals/)
