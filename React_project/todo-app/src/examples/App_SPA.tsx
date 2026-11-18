import { useState } from "react";

// 화면에 표시할 페이지 종류 정의
type Page = "home" | "products" | "about";

// 홈 화면 컴포넌트
function Home() {
  return <h2>홈 화면입니다.</h2>;
}

// 상품 목록 컴포넌트
function Products() {
  return <h2>상품 목록 화면입니다.</h2>;
}

// 소개 화면 컴포넌트
function About() {
  return <h2>회사 소개 화면입니다.</h2>;
}

// 최상위 App 컴포넌트
function App() {
  // 현재 표시할 화면의 상태
  const [page, setPage] = useState<Page>("home");

  // 상태에 따라 화면 선택
  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home />;

      case "products":
        return <Products />;

      case "about":
        return <About />;
    }
  };

  return (
    <div>
      <h1>React SPA 예제</h1>

      {/* 메뉴 영역 */}
      <nav>
        <button onClick={() => setPage("home")}>홈</button>
        <button onClick={() => setPage("products")}>상품 목록</button>
        <button onClick={() => setPage("about")}>회사 소개</button>
      </nav>

      <hr />

      {/* 현재 선택한 화면 출력 */}
      <main>{renderPage()}</main>

      <hr />

      <footer>React 컴포넌트 실습</footer>
    </div>
  );
}

export default App;
