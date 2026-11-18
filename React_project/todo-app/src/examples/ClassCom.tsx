import { Component } from "react";
import type { ReactNode } from "react";

// 클래스형 컴포넌트는 반드시 React 패키지가 제공하는
// Component 클래스를 상속
class ClassCom extends Component {
  // ClassCom 컴포넌트는 render 함수를 포함해야 하며
  // render 함수는 그 안에서 JSX를 반환
  render(): ReactNode {
    return <div>클래스형 컴포넌트</div>;
  }
}

// ClassCom 컴포넌트를 내보내어
// 다른 컴포넌트에서 불러들여 사용할 수 있도록 함
export default ClassCom;
