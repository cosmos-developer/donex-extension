chrome.runtime.onMessage.addListener((msg, sender) => {
    if ((msg.subject == "showPopupAction") && (msg.from == "content")) {
        chrome.windows.create({
            focused: true,
            type: 'popup',
            url: 'index.html',
            width:414
          },
          () => {});
    }
  })
