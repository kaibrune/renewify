chrome.runtime.onMessage.addListener(function (data) {
  if (data.msg === "loaded") {
    var pathname = window.location.pathname;
    if (pathname == "/m-meine-anzeigen.html") {
      const buttons =
        document.querySelectorAll("a.managead-listitem-action-extend") || []; // renew_class: a.managead-listitem-action-extend
      let btnCount = 0;

      for (let button of buttons) {
        const isHidden = button.closest(".is-hidden") !== null;
        if (isHidden == false) {
          btnCount++;
        }
      }
      console.log("valid_renew_btns_found: "+btnCount);
      if (btnCount > 0) {
        chrome.runtime.sendMessage({
          type: "notification_start",
          options: {
            title: "Do you want to run renewify?",
            message:
              "Click here to renew your expiring classifieds with one click.",
            iconUrl: "icons/icon128.png",
            type: "basic",
          },
        });
      }
    }
  }
  if (data.msg === "runRenew") {
    let count = 0;
    const buttons =
      document.querySelectorAll("a.managead-listitem-action-extend") || [];

      console.log('renew_btns_found_onclick:'+buttons);
    if (buttons.length) {
      for (let button of buttons) {
        const isHidden = button.closest(".is-hidden") !== null;

        if (isHidden == false) {
          count = count + 1;
          console.log(count + button);
          console.log("clicked_renew_btn");
          button.click();
          if (count == buttons.length) {
            console.log("clicked_all_btns");
            chrome.runtime.sendMessage({
              type: "notification_end",
              options: {
                title: "All listings renewed! 🥳",
                message: "All classifieds were renewed in the background.",
                iconUrl: "icons/icon128.png",
                type: "basic",
              },
            });
            setTimeout(() => {
              document.querySelector(".mfp-close").click();
            }, 1000);
          }
        }
      }
    }
  }
});
