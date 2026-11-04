// 1. DOM 요소 선택
const parent = document.querySelector("#parent");
const child = document.querySelector("#child");
const stopCheck = document.querySelector("#stopCheck");
const result = document.querySelector("#result");

// 2. 결과 출력 함수
function showResult(message) {
  console.log(message);
  if (result !== null) {
    const li = document.createElement("li");
    li.textContent = message;
    result.appendChild(li);
  }
}

// 3. 부모의 버블링 리스너
if (parent !== null) {
  parent.addEventListener("click", () => {
    showResult("부모 요소 - 버블링");
  });
}

// 4. 자식의 리스너
if (child !== null) {
  child.addEventListener("click", (event) => {
    if (result !== null) result.replaceChildren();
    showResult("자식 요소 - 타깃");
    if (stopCheck !== null && stopCheck.checked) {
      // 체크 시 이벤트가 부모까지 올라가지 않도록 차단
      event.stopPropagation();
      showResult("이벤트 전파 중단");
    }
  });
}
