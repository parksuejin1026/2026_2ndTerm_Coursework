import "./App_23p.css";

import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  isChecked: boolean;
};

const TodoList_30p: React.FC = () => {
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
            <li key={todo.id}>
              <input
                type="checkbox"
                onChange={() => {
                  window.alert("체크 박스 상태 변경 : " + todo.text);
                }}
              ></input>

              <span>{todo.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList_30p;
