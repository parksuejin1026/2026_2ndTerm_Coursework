import type { CSSProperties } from "react";
import "./App_JSX.css";

function App() {
  const title: string = "오늘 할일";
  const todo1: string = "커피마시기";
  const todo2: string = "공부하기";
  const todo3: string = "산책하기";

  // 제목 스타일 객체
  const titleStyle: CSSProperties = {
    backgroundColor: "yellowgreen",
    color: "blue",
    fontSize: "2em",
    textAlign: "center",
    padding: "12px",
  };

  return (
    <>
      {/* 제목 영역 */}
      <div className="todo-container">
        <h1 style={titleStyle}>{title}</h1>

        {/* 할 일 목록 */}
        <ul>
          <li>{todo1}</li>
          <li>{todo2}</li>
          <li>{todo3}</li>
        </ul>

        <hr />

        {/* 할 일 입력 영역 */}
        <label htmlFor="newTodo">새로운 할 일</label>
        <br />
        <input id="newTodo" type="text" placeholder="할 일을 입력하세요" />
      </div>
    </>
  );
}

export default App;
