# Migrate CMD8 (REACT) to Next.js 
`SSG, SSR`에 기반한 렌더링으로 SEO 최적화를 수행하기 위해서,<br>
`React.js + Typescript + styled-components + react-router` 기반의 프로젝트를, `React.js + Next.js + Typescript + styled-components + Tailwind`로 이식하고자 한다.
<br>

이를 위해, Next.js 공식문서를 기반으로 기본 개념을 학습하고, nextjs-blog-atoz 튜토리얼 프로젝트를 진행했다.
<br>

styled-components를 Next.js에 적용하고자 마음먹고 든 의문과 걱정이 있다.<br>
Next.js는 SSG, SSR 방식의 Pre-rendering을 지원 및 권장하는데, 이 방식은 기본적으로 build-time에 페이지를 렌더링한다.<br>

하지만 내가 아는 한, `styled-components`는 `CSS-In-JS` 방식으로 작성하고 동작하기 때문에 CSR 방식으로 작동하는 것으로 추정된다.
<br>

그리고 찾아본 결과, 실제 이러한 걱정으로 인해 SSR 시 `FOUC(Flash of Unstyled Content)`현상이 발생한다고 한다.
styled-component는 SSR을 지원하기 때문에, 작은 설정으로 이를 해결할 수 있다고 한다.
<br>

https://handhand.tistory.com/m/291 <br>
이 페이지를 참고해보면, Next.js v11 이하의 경우, babel을 사용하고, v12부턴 swc를 사용하기 때문에<br>
Next.js버전에 따라 .babelrc을 만들어 설정할 지, 자체적으로 next.config.js에서 `styledComponents: true`로 설정할 지 결정해야 한다.<br>

나같은 경우 가장 최신의 13.x버전의 Next.js를 사용하기 때문에, `next.config.js`를 변경하여 사용한다.<br>

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  ...
  styledComponents: true,
};

module.exports = nextConfig;
```

또한, _document.js에서 custom Document를 정의하고, getInitialProps 내에서 스타일 정보를 주입한다.<br>

<br><br>




