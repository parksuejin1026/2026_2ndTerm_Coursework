import { useState } from "react";

// React 함수형 컴포넌트 선언
function App() {
  // useState : React의 상태 관리 훅(Hook)
  // count: 현재 상태값
  // setCount: 상태 변경을 요청하는 함수
  // 초기값은 0, 상태 타입은 number
  // 배열 구조 분해 할당
  const [count, setCount] = useState<number>(0);

  // 버튼 클릭 시 실행할 함수
  const handleClick = () => {
    // 이전 상태값을 기준으로 1 증가
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <h1>React 카운터</h1>

      {/* 현재 상태값 출력 */}
      <p>Count: {count}</p>

      {/* 버튼 클릭 이벤트 */}
      <button onClick={handleClick}>증가</button>
    </div>
  );
}

export default App;
