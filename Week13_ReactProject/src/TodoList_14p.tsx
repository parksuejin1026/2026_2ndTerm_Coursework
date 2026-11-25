import "./App_8p.css";
import React from "react";

// 부모 컴포넌트에서 전달받을 Props 타입 정의
interface MyComponentProps {
  title: string; // 자료형은 문자열
}

const TodoList_14p: React.FC<MyComponentProps> = ({ title }) => {
  return (
    <div className="container">
      <h1>{title}</h1>
    </div>
  );
};

export default TodoList_14p;
