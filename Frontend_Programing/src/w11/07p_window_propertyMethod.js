
// 1. DOM 요소 선택
const infoBtn = document.querySelector("#infoBtn");
const alertBtn = document.querySelector("#alertBtn");
const timerBtn = document.querySelector("#timerBtn");

const sizeResult = document.querySelector("#sizeResult");
const urlResult = document.querySelector("#urlResult");
const langResult = document.querySelector("#langResult");
const timerResult = document.querySelector("#timerResult");

// 2. 브라우저 정보 출력
function showBrowserInfo() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const url = window.location.href;
  const language = window.navigator.language;

  if (sizeResult !== null) {
    sizeResult.textContent = `창 크기: ${width} × ${height}`;
  }

  if (urlResult !== null) {
    urlResult.textContent = `현재 주소: ${url}`;
  }

  if (langResult !== null) {
    langResult.textContent = `브라우저 언어: ${language}`;
  }

  console.log("브라우저 정보 확인 완료");
}

// 3. 알림창 실행
function showAlert() {
  window.alert("Window 객체의 alert() 메서드입니다.");
}

// 4. 타이머 실행
function startTimer() {
  if (timerResult !== null) {
    timerResult.textContent = "타이머 실행 중...";
  }

  console.log("타이머 등록");

  window.setTimeout(() => {
    if (timerResult !== null) {
      timerResult.textContent = "5초 후 실행 완료!";
    }

    console.log("타이머 콜백 함수 실행");
  }, 5000);
}

// 5. 이벤트 리스너 등록
if (infoBtn !== null) {
  infoBtn.addEventListener("click", showBrowserInfo);
}

if (alertBtn !== null) {
  alertBtn.addEventListener("click", showAlert);
}

if (timerBtn !== null) {
  timerBtn.addEventListener("click", startTimer);
}
