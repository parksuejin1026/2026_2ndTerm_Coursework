import "./App_8p.css";

import { useState } from "react";

const TodoList_16p: React.FC = () => {
  const [todos] = useState<string>("공부하기");

  return (
    <div className="container">
      <h1> 오늘 할일</h1>
      <div>
        <ul>
          <li>{todos}</li>
        </ul>
      </div>
    </div>
  );
};

export default TodoList_16p;
