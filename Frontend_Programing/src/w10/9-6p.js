// 버튼 클릭 이벤트
const button = document.querySelector("#myButton");
button?.addEventListener("click", () => {
console.log("click 이벤트 발생");
});
// 키보드 입력 이벤트
const input = document.querySelector("#myInput");
    input?.addEventListener("keydown", (event) => {
    console.log("keydown 이벤트:", event.key);
});

// 입력값 변경 이벤트
input?.addEventListener("input", (event) => {
console.log("input 이벤트 발생");
});
