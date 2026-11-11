// 1. DOM 요소 선택
const infoBtn = document.querySelector("#infoBtn");
const result = document.querySelector("#result");

// 2. Window 객체 정보 확인
function showWindowInfo() {
  console.log("window 객체:", window);
  console.log("창 너비:", window.innerWidth);
  console.log("창 높이:", window.innerHeight);
  console.log("현재 URL:", window.location.href);
  console.log(
    "document 동일 여부:",
    window.document === document
  );

  // 브라우저 정보 표시
  if (result !== null) {
    result.textContent =
      `브라우저 영역: ${window.innerWidth} × ${window.innerHeight}`;
  }
}

// 3. 이벤트 리스너 등록
if (infoBtn !== null) {
  infoBtn.addEventListener("click", showWindowInfo);
}
