// 페이지 16은 개념 설명이므로 classList의 5가지 메서드를 실습으로 구성했습니다.
const title = document.querySelector("#title");
const result = document.querySelector("#result");

if (title !== null) {
    title.classList.add("active");        // 클래스 추가
    console.log(title.classList.contains("active")); // 존재 여부 확인(true)
    title.classList.toggle("selected");   // 없으면 추가, 있으면 삭제
    title.classList.replace("active", "highlight"); // 클래스 이름 교체
    title.classList.remove("selected");   // 클래스 삭제

    if (result !== null) {
        result.textContent = "현재 클래스: " + title.className;
    }
}
