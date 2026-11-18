// 1. DOM 요소 선택
const button = document.querySelector("#btn");
const countText = document.querySelector("#count");
// 2. 카운터 변수 선언
let count = 0;
// 3. 버튼 클릭 이벤트 등록
if (button !== null && countText !== null) {
  button.addEventListener("click", () => {
    // 4. 변수값 증가
    count += 1;
    console.log("증가 버튼 클릭");
    // 5. DOM 요소의 텍스트 직접 변경
    countText.textContent = `Count: ${count}`;
  });
}
