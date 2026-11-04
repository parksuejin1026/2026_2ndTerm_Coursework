// 1. .item에 일치하는 모든 요소를 NodeList로 가져옵니다.
const items = document.querySelectorAll(".item");

// 2. forEach()로 각 li의 텍스트를 순서대로 출력합니다.
items.forEach((item) => {
    console.log(item.textContent);
});
