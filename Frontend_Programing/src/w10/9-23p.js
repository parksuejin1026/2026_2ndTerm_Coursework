const btn1 = document.querySelector("#btn1");
const btn2 = document.querySelector("#btn2");

// 1. onclick 프로퍼티: 나중에 할당한 함수가 기존 함수를 대체
if (btn1 !== null) {
  btn1.onclick = function () {
    console.log("onclick - 첫 번째 함수");
  };
  btn1.onclick = function () {
    console.log("onclick - 두 번째 함수");
  };
}

// 2. addEventListener: 같은 이벤트에도 여러 함수 등록 가능
if (btn2 !== null) {
  btn2.addEventListener("click", function () {
    console.log("addEventListener - 첫 번째 함수");
  });
  btn2.addEventListener("click", function () {
    console.log("addEventListener - 두 번째 함수");
  });
}
