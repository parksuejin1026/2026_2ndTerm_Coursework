// ① DOM 요소 선택
const button = document.querySelector("#btn");
const message = document.querySelector("#message");
console.log("① DOM 요소 선택");
// ④ 이벤트 발생 시 실행할 콜백 함수
function handleClick() {
console.log("④ 콜백 함수 실행");
// ⑤ DOM 변경
 if (message !== null) {
message.textContent = "클릭 완료!";
console.log("⑤ DOM 내용 변경");
}
}
// ② 이벤트 리스너 등록
if (button !== null) {
button.addEventListener("click", handleClick);
console.log("② 이벤트 리스너 등록");
}
console.log("등록 코드 실행 완료");
// ③ 사용자가 실제로 버튼을 클릭할 때 브라우저에서 click 이벤트가 발생하고 등록한 handleClick 함수가 호출됨