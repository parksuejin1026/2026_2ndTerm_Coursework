// 1. 제목 요소를 선택합니다.
const title = document.querySelector("#title");

if (title !== null) {
    // 2. CSS에 미리 작성한 highlight 클래스를 적용합니다.
    title.classList.add("highlight");
}
