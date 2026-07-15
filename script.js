// 아이스크림 목록
const flavors = [
    "엄마는외계인",
    "아몬드봉봉",
    "민트초콜릿칩",
    "레인보우샤베트",
    "뉴욕치즈케이크",
    "바닐라",
    "체리쥬빌레",
    "자모카아몬드훠지",
    "이상한나라의솜사탕",
    "소금우유",
    "오레오쿠키앤크림",
    "그린티",
    "초콜릿",
    "애플민트",
    "봄날의곰",
    "카페오레크런치",
    "두바이에서온엄마는외계인",
    "아빠는딸바봉",
    "코튼캔디크런치",
    "후르츠어드벤처"
];

// 직전에 뽑힌 아이스크림의 번호를 저장합니다.
// 처음에는 아무것도 뽑지 않았으므로 -1로 설정합니다.
let previousIndex = -1;

// HTML 요소를 가져옵니다.
const pickButton = document.getElementById("pickButton");
const result = document.getElementById("result");

// 추첨 버튼을 클릭하면 pickFlavor 함수가 실행됩니다.
pickButton.addEventListener("click", pickFlavor);

// 아이스크림을 무작위로 추첨하는 함수
function pickFlavor() {
    let randomIndex;

    // 직전 결과와 같은 맛이 나오면 다시 추첨합니다.
    do {
        randomIndex = Math.floor(Math.random() * flavors.length);
    } while (randomIndex === previousIndex);

    // 이번 결과를 다음 추첨을 위해 저장합니다.
    previousIndex = randomIndex;

    // 추첨 결과를 화면에 표시합니다.
    result.innerHTML = `
        🍨 오늘의 아이스크림은<br>
        <strong>${flavors[randomIndex]}</strong>입니다!
    `;
}