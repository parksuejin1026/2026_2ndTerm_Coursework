// 1. DOM 요소 선택
const keyInput = document.querySelector("#keyInput");
const keyResult = document.querySelector("#keyResult");
const mouseArea = document.querySelector("#mouseArea");
const mouseResult = document.querySelector("#mouseResult");

// 2. 키보드 이벤트
if (keyInput !== null && keyResult !== null) {
  keyInput.addEventListener("keydown", (event) => {
    keyResult.textContent = `keydown | key: ${event.key}, code: ${event.code}, repeat: ${event.repeat}`;
    console.log("keydown:", event.key);
  });
  keyInput.addEventListener("keyup", (event) => {
    console.log("keyup:", event.key);
  });
}

// 3. 마우스 이벤트
if (mouseArea !== null && mouseResult !== null) {
  mouseArea.addEventListener("mousemove", (event) => {
    mouseResult.textContent = `마우스 좌표: (${event.clientX}, ${event.clientY})`;
  });
  mouseArea.addEventListener("mousedown", (event) => {
    console.log("mousedown:", event.button);
  });
  mouseArea.addEventListener("mouseup", (event) => {
    console.log("mouseup:", event.button);
  });
  mouseArea.addEventListener("click", () => {
    console.log("click 이벤트 발생");
  });
}
