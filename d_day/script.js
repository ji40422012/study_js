const eventNameInput = document.getElementById("eventName");
const targetDateInput = document.getElementById("targetDate");
const daysLaterInput = document.getElementById("daysLater");

const calculateDdayButton =
    document.getElementById("calculateDdayButton");

const calculateDateButton =
    document.getElementById("calculateDateButton");

const ddayResult = document.getElementById("ddayResult");
const dateResult = document.getElementById("dateResult");

calculateDdayButton.addEventListener("click", calculateDday);
calculateDateButton.addEventListener("click", calculateFutureDate);

function getTodayAtMidnight() {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return today;
}

function parseDate(dateString) {
    return new Date(`${dateString}T00:00:00`);
}

function formatDate(date) {
    return new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long"
    }).format(date);
}

function calculateDday() {
    const eventName =
        eventNameInput.value.trim() || "목표일";

    const targetDateValue = targetDateInput.value;

    ddayResult.classList.remove("error");

    if (!targetDateValue) {
        showError(
            ddayResult,
            "목표 날짜를 선택해 주세요."
        );

        return;
    }

    const today = getTodayAtMidnight();
    const targetDate = parseDate(targetDateValue);

    const millisecondsPerDay =
        1000 * 60 * 60 * 24;

    const difference =
        Math.ceil(
            (targetDate - today) / millisecondsPerDay
        );

    if (difference > 0) {
        ddayResult.innerHTML = `
            <div>
                <strong>${eventName}</strong>까지<br>
                <strong>D-${difference}</strong><br>
                ${difference}일 남았습니다.
            </div>
        `;
    } else if (difference === 0) {
        ddayResult.innerHTML = `
            <div>
                오늘은 <strong>${eventName}</strong>입니다.<br>
                <strong>D-Day</strong>
            </div>
        `;
    } else {
        ddayResult.innerHTML = `
            <div>
                <strong>${eventName}</strong>은<br>
                <strong>D+${Math.abs(difference)}</strong><br>
                ${Math.abs(difference)}일 지났습니다.
            </div>
        `;
    }
}

function calculateFutureDate() {
    const daysValue = daysLaterInput.value;
    const daysLater = Number(daysValue);

    dateResult.classList.remove("error");

    if (
        daysValue === "" ||
        !Number.isInteger(daysLater) ||
        daysLater < 0
    ) {
        showError(
            dateResult,
            "0 이상의 정수를 입력해 주세요."
        );

        return;
    }

    const resultDate = getTodayAtMidnight();

    resultDate.setDate(
        resultDate.getDate() + daysLater
    );

    const formattedDate = formatDate(resultDate);

    if (daysLater === 0) {
        dateResult.innerHTML = `
            <div>
                오늘 날짜는<br>
                <strong>${formattedDate}</strong>입니다.
            </div>
        `;
    } else {
        dateResult.innerHTML = `
            <div>
                오늘부터 <strong>${daysLater}일 후</strong>는<br>
                <strong>${formattedDate}</strong>입니다.
            </div>
        `;
    }
}

function showError(element, message) {
    element.classList.add("error");
    element.textContent = message;
}