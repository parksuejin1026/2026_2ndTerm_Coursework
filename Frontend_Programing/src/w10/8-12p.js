// 1. HTML 속성(Attribute) 변경하기
const link = document.querySelector("#site");
if (link !== null) {
    // 링크의 href 속성을 설정하고 읽습니다.
    link.setAttribute("href", "https://example.com");
    console.log("href:", link.getAttribute("href"));
}

// 2. style 속성으로 인라인 CSS 변경하기
const title = document.querySelector("#title");
if (title !== null) {
    title.style.color = "blue";
    title.style.fontSize = "32px";
}

// 3. classList로 CSS 클래스 추가/제거/전환하기
const card = document.querySelector(".card");
if (card !== null) {
    card.classList.add("active");      // active 클래스 추가
    card.classList.remove("hidden");  // hidden 클래스 삭제: 카드 표시
    card.classList.toggle("selected"); // selected 클래스가 없으면 추가
}
