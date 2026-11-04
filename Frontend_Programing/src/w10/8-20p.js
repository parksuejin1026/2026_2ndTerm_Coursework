// 1. 삭제할 문단을 선택합니다.
const message = document.querySelector("#message");

// 2. DOM에서 해당 요소를 제거합니다.
if (message !== null) {
    message.remove();
}
