// 1. DOM 요소 선택
const menu = document.querySelector("#menu");
const addBtn = document.querySelector("#addBtn");
const result = document.querySelector("#result");
let menuCount = 3;

// 2. 이벤트 위임: 각각의 버튼 대신 부모 ul에 리스너 하나만 등록
if (menu !== null) {
  menu.addEventListener("click", (event) => {
    // 이벤트 발생 대상이 HTML 요소인지 확인
    if (!(event.target instanceof Element)) return;
    // 클릭한 요소나 상위 요소 중 가장 가까운 button 탐색
    const button = event.target.closest("button");
    if (button === null || !menu.contains(button)) return;
    console.log("선택한 메뉴:", button.textContent);
    if (result !== null) result.textContent = `${button.textContent} 선택`;
  });
}

// 3. 동적으로 새 버튼 생성 (새 버튼에도 위임 리스너가 작동)
if (addBtn !== null && menu !== null) {
  addBtn.addEventListener("click", () => {
    menuCount++;
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `메뉴 ${menuCount}`;
    li.appendChild(button);
    menu.appendChild(li);
  });
}
