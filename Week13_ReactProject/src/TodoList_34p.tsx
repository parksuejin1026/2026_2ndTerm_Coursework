import "./App_23p.css";
import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  isChecked: boolean;
};

const TodoList_34p: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "커피마시기", isChecked: false },
    { id: 2, text: "공부하기", isChecked: false },
    { id: 3, text: "산책하기", isChecked: false },
  ]);

  const handleCheckboxChange = (todoObj: Todo) => {
    window.alert(
      "체크 박스 상태 변경 : " +
        todoObj.text + "=" + !todoObj.isChecked
    );

    setTodos((prevItems) =>
      prevItems.map((item) =>
        item.id === todoObj.id
          ? { ...item, isChecked: !item.isChecked }
          : item
      )
    );
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
                  handleCheckboxChange(todo);
                }}
              ></input>

              <span>
                {todo.isChecked ? (
                  <del>{todo.text}</del>
                ) : (
                  <span>{todo.text}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList_34p;