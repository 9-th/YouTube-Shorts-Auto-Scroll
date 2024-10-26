let isAutoScrollEnabled = false;

// Обработка сообщений от popup.js и content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleAutoScroll") {
        isAutoScrollEnabled = !isAutoScrollEnabled;
        updateIcon();
        sendResponse({ status: isAutoScrollEnabled });

        // Уведомляем все вкладки о состоянии
        chrome.tabs.query({ url: "https://www.youtube.com/shorts/*" }, (tabs) => {
            tabs.forEach((tab) => {
                chrome.tabs.sendMessage(tab.id, { action: "toggleAutoScroll", status: isAutoScrollEnabled });
            });
        });
    } else if (request.action === "getStatus") {
        sendResponse({ status: isAutoScrollEnabled });
    }
});

// Обновляем иконку в зависимости от состояния
function updateIcon() {
    const iconPath = isAutoScrollEnabled ? "icons/icon_on.png" : "icons/icon_off.png";
    chrome.action.setIcon({ path: iconPath });
}
