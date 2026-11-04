// PDF 25쪽의 두 onclick 방식 예제를 한 페이지에서 실행하도록 통합
// 1. HTML의 onclick="myFunction()"에서 호출되는 함수
function myFunction() {
  alert("버튼이 클릭되었습니다.");
}

// 2. JavaScript에서 onclick 프로퍼티에 함수 할당
const btnHello = document.getElementById("btnHello");
if (btnHello !== null) {
  btnHello.onclick = function () {
    alert("버튼이 클릭되었습니다.");
  };
}
