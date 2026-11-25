import "./App_23p.css";

import { useState } from "react";

const TodoList_23p: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([
    "커피마시기",
    "공부하기",
    "잠자기",
  ]);

  return (
    <div>
      <h1 className="titlebk">오늘 할일</h1>
      <p></p>
      <div className="container">
        <ul className="board">
          <li>{todos[0]}</li>
          <li>{todos[1]}</li>
          <li>{todos[2]}</li>
        </ul>
      </div>
    </div>
  );
};

export default TodoList_23p;
