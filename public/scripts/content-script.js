const sendDonateRequest = (SocialLink) => {
    window.open(SocialLink);
}

const updateContent = () => {
    // Lấy tất cả các thẻ h4 có class "abc nm zmzm"
    const h4Elements = document.querySelectorAll('h4.x1heor9g.x1qlqyl8.x1pd3egz.x1a2a7pz.x1gslohp.x1yc453h');
    const h3Elements = document.querySelectorAll('h3.x1heor9g.x1qlqyl8.x1pd3egz.x1a2a7pz.x1gslohp.x1yc453h');

    // Lặp qua danh sách các thẻ h4 đã lấy được
    h4Elements.forEach((h4) => {
        // Tìm thẻ con đầu tiên là thẻ span có class "vxcv"
        const spanElement = h4.querySelector('span.xt0psk2');
        if (spanElement && !h4.querySelector('button')) {
            const button = document.createElement('button');
            button.textContent = "DONATE";
            const a_tag = spanElement.firstElementChild;
            const socialLink = a_tag.getAttribute("href");
            button.onclick = function() {
                sendDonateRequest(socialLink);
            }
            h4.appendChild(button);
        }
    });

    // Lặp qua danh sách các thẻ h3 đã lấy được
    h3Elements.forEach((h3) => {
        // Tìm thẻ con đầu tiên là thẻ span có class "vxcv"
        const spanElement = h3.querySelector('span.xt0psk2');
        if (spanElement && !h3.querySelector('button')) {
            const button = document.createElement('button');
            button.textContent = "DONATE";
            const a_tag = spanElement.firstElementChild;
            const socialLink = a_tag.getAttribute("href");
            button.onclick = function() {
                sendDonateRequest(socialLink);
            }
            h3.appendChild(button);
        }
    });
}

setInterval(updateContent, 10000);