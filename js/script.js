const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const animElements = document.querySelectorAll('.top-message, .greeting-title, .menu-price-title, .photos-title, .photo, .info-title');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        const target = document.querySelector(item.getAttribute('href'));
        window.scrollTo({
            top: target.offsetTop - 50,
            behavior: 'smooth'
        });
    });
});

const options = {
    root: null,
    rootMargin: '-50px',
    threshold: 0.2
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, options);
animElements.forEach(el => observer.observe(el));

// ビデオ要素の読み込みを待つPromiseを作成する関数
function waitForVideoLoad(videoElement) {
    return new Promise((resolve) => {
        // すでにビデオが読み込まれている場合
        if (videoElement.readyState >= 3) {
            resolve();
            return;
        }

        // canplaythrough イベントを待つ
        videoElement.addEventListener('canplaythrough', () => {
            resolve();
        }, { once: true });

        // エラーハンドリング
        videoElement.addEventListener('error', () => {
            console.error('Video loading error:', videoElement.error);
            resolve(); // エラーが発生しても続行
        }, { once: true });
    });
}

// メインのコンテンツを非表示にする
document.querySelectorAll('.top-message, #greeting, #menu-price, #photos, #info, #fixed-button').forEach(el => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.5s ease-in';
});

// 全てのビデオ要素を取得
const pcVideo = document.querySelector('.pc-top');
const mobileVideo = document.querySelector('.mobile-top');

// ビデオの読み込みを待ってから実行
Promise.all([
    waitForVideoLoad(pcVideo),
    waitForVideoLoad(mobileVideo)
]).then(() => {
    // ハンバーガーメニューの設定
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const animElements = document.querySelectorAll('.top-message, .greeting-title, .menu-price-title, .photos-title, .photo, .info-title');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            const target = document.querySelector(item.getAttribute('href'));
            window.scrollTo({
                top: target.offsetTop - 50,
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer の設定
    const options = {
        root: null,
        rootMargin: '-50px',
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    animElements.forEach(el => observer.observe(el));

    // コンテンツを表示
    document.querySelectorAll('.top-message, #greeting, #menu-price, #photos, #info, #fixed-button').forEach(el => {
        el.style.opacity = '1';
    });
});