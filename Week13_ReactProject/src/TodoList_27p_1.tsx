import "./App_23p.css";

import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  isChecked: boolean;
};

const TodoList_27p_1: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "커피마시기", isChecked: false },
    { id: 2, text: "공부하기", isChecked: false },
    { id: 3, text: "잠자기", isChecked: false },
  ]);

  return (
    <div>
      <h1 className="titlebk">오늘 할일</h1>
      <p></p>

      <div className="container">
        <ul className="board">
          {todos.map((todo) => (
            <li>{todo.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList_27p_1;
