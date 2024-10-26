(function () {
    let timerId = null;

    // Функция для запуска автопрокрутки
    function startScrolling() {
        if (timerId) return; // Если уже запущен, ничего не делаем

        timerId = setInterval(() => {
            const video = document.querySelector(".html5-video-player video");
            const nextButton = document.querySelector("#navigation-button-down > ytd-button-renderer > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill");

            // Логируем наличие элементов
            if (!video) {
                console.log("Video player not found");
                return; // Видео не найдено
            }

            if (!nextButton) {
                console.log("Next button not found");
                return; // Кнопка не найдена
            }

            console.log(`Current Time: ${video.currentTime.toFixed(2)}, Duration: ${video.duration.toFixed(2)}`);

            // Проверяем, закончилось ли видео или осталось менее 1 секунды
            if (video.currentTime >= video.duration * 0.9 || video.ended) {
                console.log("Video is about to end, switching to next");
                nextButton.click(); // Кликаем по кнопке следующего видео

                // Логируем, чтобы убедиться, что клик произошел
                setTimeout(() => {
                    console.log("Clicked next video button");
                }, 100); // Ждем 100 мс после клика
            }
        }, 1000);
    }

    // Функция для остановки автопрокрутки
    function stopScrolling() {
        clearInterval(timerId);
        timerId = null;
        console.log("Auto scroll stopped");
    }

    // Получаем статус автопрокрутки из background.js
    chrome.runtime.sendMessage({ action: "getStatus" }, (response) => {
        if (response.status) {
            startScrolling();
        } else {
            stopScrolling();
        }
    });

    // Обработка изменения состояния автопрокрутки
    chrome.runtime.onMessage.addListener((request) => {
        if (request.action === "toggleAutoScroll") {
            request.status ? startScrolling() : stopScrolling();
        }
    });
})();
