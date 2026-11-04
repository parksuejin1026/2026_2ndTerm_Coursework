// 1. DOM 요소 선택
const button = document.querySelector("#btn");
const result = document.querySelector("#result");

// 2. 브라우저가 넘겨주는 이벤트 객체 활용
function handleClick(event) {
  console.log("이벤트 종류:", event.type);
  console.log("이벤트 발생 대상:", event.target);
  console.log("리스너 등록 요소:", event.currentTarget);
  console.log("X 좌표:", event.clientX);
  console.log("Y 좌표:", event.clientY);

  // span을 클릭했다면 target은 SPAN, currentTarget은 BUTTON
  const target = event.target;
  const currentTarget = event.currentTarget;
  if (result !== null && target instanceof Element && currentTarget instanceof Element) {
    result.textContent = `이벤트: ${event.type}, target: ${target.tagName}, currentTarget: ${currentTarget.tagName}`;
  }
}

// 3. 이벤트 리스너 등록
if (button !== null) button.addEventListener("click", handleClick);
