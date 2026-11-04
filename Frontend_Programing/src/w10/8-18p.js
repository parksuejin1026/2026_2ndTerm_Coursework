// 1. 새 요소를 넣을 부모 div를 선택합니다.
const container = document.querySelector("#container");

// 2. 아직 HTML 문서에 연결되지 않은 p 요소를 생성합니다.
const message = document.createElement("p");

// 3. 새 p 요소의 텍스트를 지정합니다.
message.textContent = "새로운 DOM 요소입니다.";

// 4. 부모가 존재하면 새 요소를 부모의 자식으로 추가합니다.
if (container !== null) {
    container.append(message);
}
