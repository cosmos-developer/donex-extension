const sendDonateRequest = (SocialLink) => {
    chrome.storage.local.set({ count: SocialLink });
    chrome.runtime.sendMessage(
        {
            from: "content",
            subject: "showPopupAction"
        }
    );
}

const queryh3 = 'h3.x1heor9g.x1qlqyl8.x1pd3egz.x1a2a7pz.x1gslohp.x1yc453h';
const queryh4 = 'h4.x1heor9g.x1qlqyl8.x1pd3egz.x1a2a7pz.x1gslohp.x1yc453h';
const queryspan = 'span.xt0psk2';
const updateContent = () => {
    // Lấy tất cả các thẻ h4 có class "abc nm zmzm"
    const h4Elements = document.querySelectorAll(queryh3);
    const h3Elements = document.querySelectorAll(queryh4);

    // Lặp qua danh sách các thẻ h4 đã lấy được
    h4Elements.forEach((h4) => {
        // Tìm thẻ con đầu tiên là thẻ span có class "vxcv"
        const spanElement = h4.querySelector(queryspan);
        if (spanElement && !h4.querySelector('button') && h4.firstChild.tagName == 'SPAN') {
            const button = document.createElement('button');
            button.textContent = "DONATE";
            const a_tag = spanElement.firstElementChild;
            const socialLink = a_tag.getAttribute("href");
            button.onclick = function () {
                sendDonateRequest(socialLink);
            }
            h4.appendChild(button);
        }
    });

    // Lặp qua danh sách các thẻ h3 đã lấy được
    h3Elements.forEach((h3) => {
        // Tìm thẻ con đầu tiên là thẻ span có class "vxcv"
        const spanElement = h3.querySelector(queryspan);
        if (spanElement && !h3.querySelector('button') && h3.firstChild.tagName == 'SPAN') {
            const button = document.createElement('button');
            button.textContent = "DONATE";
            const a_tag = spanElement.firstElementChild;
            const socialLink = a_tag.getAttribute("href");
            button.onclick = function () {
                sendDonateRequest(socialLink);
            }
            h3.appendChild(button);
        }
    });
}

setInterval(updateContent, 10000);
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request["type"] == 'msg_from_popup') {
            console.log("msg receive from popup");
            sendResponse("msg received and sending back reply");// this is how you send message to popup
        }
        else {
            console.log("get message but fail to response");
        }
        return true; // this make sure sendResponse will work asynchronously
    }
);