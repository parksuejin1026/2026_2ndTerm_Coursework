
// 1. DOM 요소 선택
const guessInput = document.querySelector("#guessInput");
const checkBtn = document.querySelector("#checkBtn");
const restartBtn = document.querySelector("#restartBtn");
const result = document.querySelector("#result");
const countResult = document.querySelector("#countResult");

// 2. 게임 상태 변수
let answer = Math.floor(Math.random() * 10) + 1;
let count = 0;
let isFinished = false;

// 3. 숫자 확인 함수
function checkAnswer() {
  if (
    guessInput === null ||
    result === null ||
    countResult === null
  ) {
    return;
  }

  // 이미 정답을 맞힌 경우
  if (isFinished) {
    return;
  }

  // 입력 여부 확인
  if (guessInput.value.trim() === "") {
    result.textContent = "숫자를 입력하세요.";
    return;
  }

  // 문자열을 숫자로 변환
  const guess = Number(guessInput.value);

  // 입력값 유효성 검사
  if (
    !Number.isInteger(guess) ||
    guess < 1 ||
    guess > 10
  ) {
    result.textContent =
      "1~10 사이의 정수를 입력하세요.";
    return;
  }

  // 정상 입력에 대해서만 시도 횟수 증가
  count++;

  // 4. 정답 비교
  if (guess === answer) {
    result.textContent = "정답입니다!";

    // 게임 종료
    isFinished = true;
    guessInput.disabled = true;

    if (checkBtn !== null) {
      checkBtn.disabled = true;
    }

  } else if (guess < answer) {
    result.textContent = "UP! 더 큰 숫자입니다.";

  } else {
    result.textContent = "DOWN! 더 작은 숫자입니다.";
  }

  // 5. 시도 횟수 출력
  countResult.textContent = `시도 횟수: ${count}`;
}

// 6. 게임 초기화 함수
function restartGame() {
  // 새로운 정답 생성
  answer = Math.floor(Math.random() * 10) + 1;

  // 상태 초기화
  count = 0;
  isFinished = false;

  if (guessInput !== null) {
    guessInput.value = "";
    guessInput.disabled = false;
  }

  if (checkBtn !== null) {
    checkBtn.disabled = false;
  }

  if (result !== null) {
    result.textContent = "숫자를 입력하세요.";
  }

  if (countResult !== null) {
    countResult.textContent = "시도 횟수: 0";
  }

  console.log("새 게임 시작");
}

// 7. 이벤트 리스너 등록
if (checkBtn !== null) {
  checkBtn.addEventListener("click", checkAnswer);
}

if (restartBtn !== null) {
  restartBtn.addEventListener("click", restartGame);
}
