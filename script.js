// --- 1. Логика для кнопки "Нажми на меня" ---
const button = document.getElementById('myButton');

if (button) {
    button.addEventListener('click', function() {
        const originalText = button.textContent;
        button.textContent = 'Ура! Это работает! 🎉';
        button.style.backgroundColor = '#28a745';
        button.style.borderColor = '#28a745';
        button.style.color = '#fff';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = 'transparent';
            button.style.borderColor = '#4da3ff';
            button.style.color = '#4da3ff';
        }, 2000);
    });
}

// --- 2. Анимация появления при прокрутке ---
// Теперь мы следим не только за секциями, но и за карточками проектов
const animatedElements = document.querySelectorAll('.section, .project-card');

animatedElements.forEach(el => {
    el.classList.add('fade-in');
});

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animatedElements.forEach(el => {
    observer.observe(el);
});