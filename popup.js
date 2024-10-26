document.getElementById("toggleScroll").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "toggleAutoScroll" }, (response) => {
        document.getElementById("toggleScroll").innerText = response.status
            ? "Disable Auto Scroll"
            : "Enable Auto Scroll";
    });
});

// При открытии popup загружаем статус автопрокрутки
chrome.runtime.sendMessage({ action: "getStatus" }, (response) => {
    document.getElementById("toggleScroll").innerText = response.status
        ? "Disable Auto Scroll"
        : "Enable Auto Scroll";
});
