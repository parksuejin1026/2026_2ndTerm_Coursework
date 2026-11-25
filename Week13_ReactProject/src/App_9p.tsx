// React 라이브러리 가져오기
import React from "react";
// TodoList 컴포넌트 가져오기
import TodoList_9p from "./TodoList_9p";
// App 함수형 컴포넌트 정의
const App2: React.FC = () => {
  return (
    // JSX를 이용한 화면 구성
    <div>
      {/* TodoList 컴포넌트를 화면에 표시 */}
      <TodoList_9p></TodoList_9p>
    </div>
  );
};
// App 컴포넌트를 다른 파일에서 사용할 수 있도록 내보내기
export default App2;
