// 1. id가 logo인 img 요소를 선택합니다.
const logo = document.querySelector("#logo");

if (logo !== null) {
    // 2. img의 src/alt HTML 속성을 변경합니다.
    logo.setAttribute("src", "image2.jpg");
    logo.setAttribute("alt", "변경된 이미지");

    // 3. 변경된 src 값을 콘솔에 출력합니다.
    console.log(logo.getAttribute("src"));

    // 참고: img 전용 프로퍼티로도 변경 가능합니다.
    // logo.src = "image2.jpg";
    // logo.alt = "변경된 이미지";
}
