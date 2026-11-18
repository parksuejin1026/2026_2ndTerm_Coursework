import { StrictMode } from "react";
// React 애플리케이션의 루트 생성 함수 가져오기
import { createRoot } from "react-dom/client";
// 프로젝트 기본 CSS 스타일 가져오기
import "./index.css";
// 최상위 App 컴포넌트 가져오기
import App from "./App.tsx";

// HTML에서 id가 "root"인 DOM 요소 가져오기
const rootElement = document.getElementById("root");

// root 요소가 존재하지 않으면 오류 발생
if (!rootElement) {
  throw new Error("root 요소를 찾을 수 없습니다.");
}

// root DOM 요소에 React 렌더링 루트 생성
createRoot(rootElement).render(
  // 개발 모드에서 잠재적인 문제를 검사
  <StrictMode>
    {/* App 컴포넌트를 화면에 렌더링 */}
    <App />
  </StrictMode>,
);
