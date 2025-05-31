// marquee.js
function VerticalMarquee(selector, speed) {
    const container = document.querySelector(selector);
    const inner = container.querySelector('.marquee-inner');
    const content = inner.innerHTML;
    inner.innerHTML += content + content; // 复制两次

    let i = 0;

    setInterval(function () {
        inner.style.transform = `translateY(-${i}px)`;
        const contentHeight = inner.scrollHeight / 3; // 一组的高度
        if (i > contentHeight) {
            i = 0;
        }
        i += speed;
    }, 16); // 约等于 60fps
}

window.addEventListener('load', () => {
    VerticalMarquee('.marquee-vertical', 1.5);//速度
});
