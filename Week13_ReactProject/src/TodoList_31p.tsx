import "./App_23p.css";

import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  isChecked: boolean;
};

const TodoList_31p: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "커피마시기", isChecked: false },
    { id: 2, text: "공부하기", isChecked: false },
    { id: 3, text: "잠자기", isChecked: false },
  ]);

  const handleCheckboxChange = (todoText: string) => {
    // 전달받은 할 일 내용을 알림창으로 출력
    window.alert("체크 박스 상태 변경 : " + todoText);
  };
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
                  handleCheckboxChange(todo.text);
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

export default TodoList_31p;
