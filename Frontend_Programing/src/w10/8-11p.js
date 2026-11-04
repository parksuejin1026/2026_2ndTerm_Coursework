// 1. id가 userName인 입력 요소를 선택합니다.
const userName = document.querySelector("#userName");

// 2. 요소가 실제 존재할 때만 value 속성에 접근합니다.
if (userName !== null) {
    // value는 입력창에 들어 있는 현재 문자열입니다.
    console.log("userName : " + userName.value);
    window.alert("userName : " + userName.value);
}
