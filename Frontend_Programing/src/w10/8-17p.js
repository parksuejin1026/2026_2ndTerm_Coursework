// 1. HTML의 목록과 버튼을 선택합니다.
const list = document.querySelector("#todoList");
const addBtn = document.querySelector("#addBtn");
const removeBtn = document.querySelector("#removeBtn");
let count = 0; // 지금까지 생성한 항목 번호

// 2. 새 li를 만들어 ul의 마지막에 추가합니다.
if (list !== null && addBtn !== null) {
    addBtn.addEventListener("click", () => {
        count++;
        const li = document.createElement("li"); // 새로운 DOM 요소 생성
        li.textContent = "새 항목 " + count;   // 요소에 내용 설정
        li.classList.add("todo-item");       // 클래스 추가
        list.appendChild(li);                 // 목록에 삽입
    });
}

// 3. 목록의 마지막 자식 요소를 제거합니다.
if (list !== null && removeBtn !== null) {
    removeBtn.addEventListener("click", () => {
        list.lastElementChild?.remove(); // 없으면 아무것도 하지 않음
    });
}
