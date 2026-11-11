
// 1. DOM 요소 선택
const alertBtn = document.querySelector("#alertBtn");
const promptBtn = document.querySelector("#promptBtn");
const confirmBtn = document.querySelector("#confirmBtn");
const result = document.querySelector("#result");

// 2. 결과 출력 함수
function showResult(message) {
  console.log(message);

  if (result !== null) {
    result.textContent = message;
  }
}

// 3. alert() - 알림 대화상자
function showAlert() {
  window.alert("프론트엔드 프로그래밍 실습입니다.");
  showResult("알림창을 확인했습니다.");
}

// 4. prompt() - 사용자 이름 입력
function showPrompt() {
  const userName = window.prompt("이름을 입력하세요.");

  // 취소 버튼 클릭
  if (userName === null) {
    showResult("이름 입력을 취소했습니다.");
    return;
  }

  // 빈 문자열 또는 공백 입력
  if (userName.trim() === "") {
    showResult("이름이 입력되지 않았습니다.");
    return;
  }

  // 정상 입력
  showResult(`${userName}님, 환영합니다!`);
}

// 5. confirm() - 삭제 여부 확인
function showConfirm() {
  const confirmed =
    window.confirm("정말 삭제하시겠습니까?");

  if (confirmed) {
    showResult("삭제를 진행합니다.");
  } else {
    showResult("삭제를 취소했습니다.");
  }
}

// 6. 이벤트 리스너 등록
if (alertBtn !== null) {
  alertBtn.addEventListener("click", showAlert);
}

if (promptBtn !== null) {
  promptBtn.addEventListener("click", showPrompt);
}

if (confirmBtn !== null) {
  confirmBtn.addEventListener("click", showConfirm);
}
