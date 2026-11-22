
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


// --- 3. Переключение темы ---

const themeButton = document.getElementById("theme-toggle");

// Загружаем сохранённую тему
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
}

if (themeButton) {

    // Устанавливаем правильный текст кнопки
    themeButton.textContent =
        document.body.classList.contains("light-theme")
        ? "☀️ Светлая тема"
        : "🌙 Тёмная тема";

    // Переключаем тему
    themeButton.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        const isLight = document.body.classList.contains("light-theme");

        if (isLight) {
            themeButton.textContent = "☀️ Светлая тема";
            localStorage.setItem("theme", "light");
        } else {
            themeButton.textContent = "🌙 Тёмная тема";
            localStorage.setItem("theme", "dark");
        }

    });
}

// МОБИЛЬНОЕ МЕНЮ

const menuButton = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        menuButton.textContent =
            navLinks.classList.contains("active") ? "✕" : "☰";

    });

    // Закрываем меню после выбора раздела

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuButton.textContent = "☰";
        });

    });

}

// Анимация меняющегося текста
const typingText = document.getElementById('typing-text');

if (typingText) {
    const phrases = [
        'начинающий веб-разработчик',
        'изучаю программирование',
        'создаю красивые сайты',
        'воплощаю свои идеи'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (deleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typingText.textContent = currentPhrase.substring(0, charIndex);

        let speed = deleting ? 45 : 90;

        if (!deleting && charIndex === currentPhrase.length) {
            deleting = true;
            speed = 1500;
        } else if (deleting && charIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 400;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();
}

/* Движение свечения за мышкой */
const mouseGlow = document.querySelector('.mouse-glow');

if (mouseGlow) {
    document.addEventListener('mousemove', (event) => {
        mouseGlow.style.left = event.clientX + 'px';
        mouseGlow.style.top = event.clientY + 'px';
    });
}

/* Живой фон с частицами */
const canvas = document.getElementById('particles');
const ctx = canvas ? canvas.getContext('2d') : null;

if (canvas && ctx) {
    let particles = [];
    let width;
    let height;

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;

        particles = [];

        const count = Math.min(
            Math.floor(width * height / 12000),
            100
        );

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#38bdf8';
            ctx.fill();

            particles.slice(i + 1).forEach(other => {
                const dx = p.x - other.x;
                const dy = p.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.strokeStyle =
                        `rgba(56, 189, 248, ${1 - distance / 120})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();
    animateParticles();
}

// Анимация появления блоков при прокрутке
const revealElements = document.querySelectorAll(
    '.section, .project-card, .hero-content'
);

revealElements.forEach(element => {
    element.classList.add('reveal');
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Загрузка сайта
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');

    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1000);
    }
});

// Анимированные счётчики
const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = Number(counter.dataset.target);
            const duration = 1500;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1
                );

                const value = Math.floor(progress * target);
                counter.textContent = value;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }

            requestAnimationFrame(updateCounter);
            counterObserver.unobserve(counter);
        }
    });
}, {
    threshold: 0.5
});

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// Подсветка активного раздела меню
const activeNavLinks = document.querySelectorAll('.nav-links a');

const pageSections = document.querySelectorAll(
    'main section[id]'
);

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            activeNavLinks.forEach(link => {
                link.classList.toggle(
                    'active',
                    link.getAttribute('href') === '#' + entry.target.id
                );
            });
        }
    });
}, {
    threshold: 0.35
});

pageSections.forEach(section => {
    sectionObserver.observe(section);
});

const contactForm = document.querySelector('.contact-form');
const successMessage = document.getElementById('form-success');

if (contactForm && successMessage) {
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');

        submitButton.disabled = true;
        submitButton.textContent = 'Отправляем...';

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                contactForm.reset();
                contactForm.style.display = 'none';
                successMessage.classList.add('show');
            } else {
                alert('Не удалось отправить сообщение. Попробуй ещё раз!');
            }
        } catch (error) {
            alert('Ошибка соединения. Попробуй ещё раз!');
        }

        submitButton.disabled = false;
        submitButton.textContent = 'Отправить сообщение 🚀';
    });
}
// Загружаем достижения из JSON
async function loadAchievements() {
    const container = document.getElementById('achievements-list');

    if (!container) return;

    try {
        const response = await fetch('achievements.json');

        if (!response.ok) {
            throw new Error('Не удалось загрузить достижения');
        }

        const achievements = await response.json();

        container.innerHTML = '';

        achievements.forEach(item => {
            const card = document.createElement('div');
            card.className = 'project-card';

            card.innerHTML = `
                <div class="project-icon">🏆</div>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <small>📅 ${item.date}</small>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error('Ошибка загрузки достижений:', error);
        container.textContent = 'Не удалось загрузить достижения.';
    }
}

loadAchievements();
