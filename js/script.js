const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('load', function() {
        const videos = document.querySelectorAll('video');
        let videosLoaded = 0;
        
        const checkAllVideosLoaded = () => {
            videosLoaded++;
            if (videosLoaded === videos.length) {
                hideLoading();
            }
        };
        
        videos.forEach(video => {
            if (video.readyState >= 4) {
                checkAllVideosLoaded();
            } else {
                video.addEventListener('loadeddata', checkAllVideosLoaded);
            }
        });

        const images = document.querySelectorAll('img');
        let imagesLoaded = 0;
        
        const checkAllImagesLoaded = () => {
            imagesLoaded++;
            if (imagesLoaded === images.length) {
                hideLoading();
            }
        };
        
        images.forEach(img => {
            if (img.complete) {
                checkAllImagesLoaded();
            } else {
                img.addEventListener('load', checkAllImagesLoaded);
            }
        });
    });
});

function hideLoading() {
    const loading = document.getElementById('loading');
    const content = document.getElementById('content');
    
    if (loading && content) {
        loading.style.transition = 'opacity 0.5s';
        loading.style.opacity = '0';
        content.style.display = 'block';
        
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }
}

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

const animElements = document.querySelectorAll('.top-message, .greeting-title, .greeting-sentence, .menu-price-title, .mens, .ladies, .photos-title, .photo, .info-title, .info-contents');

const animateText = (elem) => {
    const content = elem.innerHTML.split(/<br.*?>/g);

    elem.innerHTML = content
        .map(text =>
            text.split('').map(char =>
                `<span>${char}</span>`
            ).join('')
        )
        .join('<br>');

    const spans = elem.querySelectorAll('span');
    spans.forEach((span, i) => {
        setTimeout(() => span.classList.add('visible'), 50 * i);
    });
};

const options = {
    root: null,
    rootMargin: '-50px',
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('greeting-sentence')) {
                animateText(entry.target.querySelector('p'));
            } else if (entry.target.classList.contains('mens') || entry.target.classList.contains('ladeis')) {
                entry.target.classList.add('active');
                const rows = entry.target.querySelectorAll('tr');
                rows.forEach((row, index) => {
                    setTimeout(() => {
                        row.style.opacity = '1';
                    }, index * 100);
                });
            } else {
                entry.target.classList.add('active');
            }
            observer.unobserve(entry.target);
        }
    });
}, options);

animElements.forEach(el => observer.observe(el));