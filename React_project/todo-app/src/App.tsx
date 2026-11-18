import { useState } from "react";
import "./App.css";

// 각 실습 컴포넌트 가져오기
import Counter from "./examples/App_dom-counter";
import SPA from "./examples/App_SPA";
import JSXPractice from "./examples/App_JSX";
import Components from "./examples/App_Components";
import TodoPractice from "./examples/App_TodoList";

// 실행할 실습 종류 정의
type Page = "counter" | "spa" | "jsx" | "components" | "todo";

function App() {
  // 현재 선택한 실습
  const [page, setPage] = useState<Page>("counter");

  // 선택한 실습에 따라 컴포넌트 반환
  const renderPage = () => {
    switch (page) {
      case "counter":
        return <Counter />;
      case "spa":
        return <SPA />;
      case "jsx":
        return <JSXPractice />;
      case "components":
        return <Components />;
      case "todo":
        return <TodoPractice />;
    }
  };

  return (
    <div className="app-container">
      <h1>React 실습 프로젝트</h1>

      {/* 실습 선택 메뉴 */}
      <nav className="app-menu">
        <button onClick={() => setPage("counter")}>카운터</button>
        <button onClick={() => setPage("spa")}>SPA</button>
        <button onClick={() => setPage("jsx")}>JSX 문법</button>
        <button onClick={() => setPage("components")}>컴포넌트</button>
        <button onClick={() => setPage("todo")}>TodoList</button>
      </nav>

      <hr />

      {/* 현재 선택한 실습 화면 출력 */}
      <main className="practice-content">{renderPage()}</main>
    </div>
  );
}

export default App;
