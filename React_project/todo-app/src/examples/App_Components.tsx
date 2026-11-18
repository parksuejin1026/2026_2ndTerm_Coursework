// 컴포넌트 가져오기
import ClassCom from "./ClassCom";
import FuncCom from "./FuncCom";

// 최상위 루트 컴포넌트(App)
function App() {
  return (
    <div className="title">
      <ClassCom></ClassCom>
      <FuncCom></FuncCom>
    </div>
  );
}

// 컴포넌트를 내보냄
export default App;
