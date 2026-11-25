import "./App_8p.css";

import { useState } from "react";

const TodoList_21p: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([
    "커피 마시기",
    "공부하기",
    "산책하기",
  ]);

  return (
    <div className="container">
      <h1>오늘 할일</h1>

      <div>
        <ul>
          <li>{todos[0]}</li>
          <li>{todos[1]}</li>
          <li>{todos[2]}</li>
        </ul>
      </div>
    </div>
  );
};

export default TodoList_21p;
