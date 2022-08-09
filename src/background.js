chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == "complete") {
    setTimeout(() => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { msg: "loaded" },
          function (response) {}
        );
      });
    }, 1000);
  }
});

chrome.runtime.onMessage.addListener(function (data) {
  if (data.type === "notification_start") {
    var noti_id = "noti" + Date.now();
    chrome.notifications.create(noti_id, data.options);
    chrome.notifications.onClicked.addListener(function (notifId) {
      if (notifId == noti_id) {
        runRenew();
        chrome.notifications.clear(noti_id);
      }
    });
  }
});

chrome.runtime.onMessage.addListener(function (data) {
  if (data.type === "notification_end") {
    var noti_id = "noti" + Date.now();
    chrome.notifications.create(noti_id, data.options);
    chrome.notifications.onClicked.addListener(function (notifId) {
      if (notifId == noti_id) {
        chrome.notifications.clear(noti_id);
      }
    });
  }
});

function runRenew() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { msg: "runRenew" },
      function (response) {}
    );
  });
}
