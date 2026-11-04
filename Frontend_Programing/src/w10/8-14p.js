// 1. 제목 요소를 선택합니다.
const title = document.querySelector("#title");

if (title !== null) {
    // 2. JavaScript의 style 프로퍼티로 CSS를 설정합니다.
    title.style.color = "blue";            // 글자색
    title.style.backgroundColor = "yellow"; // 배경색 (CSS background-color)
    title.style.fontSize = "40px";         // 글자 크기 (CSS font-size)
}
