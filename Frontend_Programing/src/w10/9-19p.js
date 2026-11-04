// 1. DOM 요소 선택
const clickBtn = document.querySelector("#clickBtn");
const addBtn = document.querySelector("#addBtn");
const removeBtn = document.querySelector("#removeBtn");
const message = document.querySelector("#message");
const countText = document.querySelector("#count");
let count = 0;

// 2. 클릭 이벤트에 사용할 함수 (제거 시 같은 함수 참조 필요)
function handleClick() {
  count++;
  console.log("클릭 이벤트 실행:", count);
  if (countText !== null) countText.textContent = `클릭 횟수: ${count}`;
}

// 3. '리스너 등록' 버튼 클릭 시 클릭 테스트 버튼에 등록
if (addBtn !== null && clickBtn !== null) {
  addBtn.addEventListener("click", () => {
    clickBtn.addEventListener("click", handleClick);
    if (message !== null) message.textContent = "이벤트 리스너 등록 완료";
    console.log("리스너 등록");
  });
}

// 4. '리스너 제거' 버튼 클릭 시 동일한 콜백을 제거
if (removeBtn !== null && clickBtn !== null) {
  removeBtn.addEventListener("click", () => {
    clickBtn.removeEventListener("click", handleClick);
    if (message !== null) message.textContent = "이벤트 리스너 제거 완료";
    console.log("리스너 제거");
  });
}
