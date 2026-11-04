// 1. DOM 요소 선택
const parent = document.querySelector("#parent");
const child = document.querySelector("#child");
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

// 3. 캡처링: 부모 → 자식으로 내려가며 먼저 실행
if (parent !== null) {
  parent.addEventListener("click", () => {
    if (result !== null) result.replaceChildren();
    showResult("부모 요소 - 캡처링");
  }, { capture: true });
}

// 4. 타깃: 자식 버튼 클릭 시 실행
if (child !== null) {
  child.addEventListener("click", () => {
    showResult("자식 요소 - 타깃");
  });
}

// 5. 버블링: 자식 → 부모로 올라오며 실행
if (parent !== null) {
  parent.addEventListener("click", () => {
    showResult("부모 요소 - 버블링");
  }, { capture: false });
}
