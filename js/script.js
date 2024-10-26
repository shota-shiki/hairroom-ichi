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