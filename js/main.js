const aboutBtn = document.getElementById('aboutBtn');
const projectBtn = document.getElementById('projectBtn');
const contactsBtn = document.getElementById('contactsBtn');
const aboutSection = document.querySelector('.about');
const projectsSection = document.querySelector('.projects');
const contactsSection = document.querySelector('.contact');
const hiddenMenu = document.querySelector('.dinamic-menu');
const btnUp = document.getElementById('btn-up');
const logoLinks = document.querySelectorAll('.nav__logo');
const sectionAbout = document.querySelector('.about');
const sectionProjects = document.querySelector('.projects');
const sectionContacts = document.querySelector('.contact');

btnUp.onclick = function () {
    window.scrollTo({ behavior: 'smooth', top: 0 });
}

logoLinks.forEach(link => {
    link.addEventListener('click', () => {
        window.scrollTo({ behavior: 'smooth', top: 0 })
    })
})

window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
        hiddenMenu.style.opacity = 1;
        hiddenMenu.style.display = 'block';

        btnUp.style.opacity = 1;
        btnUp.style.bottom = '20px';

        setTimeout(function () {
            hiddenMenu.style.top = '0px';
        }, 100)
    } else {
        hiddenMenu.style.top = '-100px';
        hiddenMenu.style.opacity = 0;

        setTimeout(function () {
            hiddenMenu.style.display = 'none';
        }, 100)

        btnUp.style.bottom = '-100px';
        btnUp.style.opacity = 0;
    }
})

document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.project-slider', {
        loop: true,
        // pagination: {
        //     el: '.swiper-pagination',
        //     clickable: true,
        // },
        // navigation: {
        //     nextEl: '.swiper-button-next',
        //     prevEl: '.swiper-button-prev',
        // },
        // Дополнительные настройки
        slidesPerView: 1,
        spaceBetween: 0,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });
});


// Отслеживание пролистываения на сайте
const options = {
    root: null,
    rootMargin: '0px',
    threshold: buildThresholdList() // Много порогов для точности
};

function buildThresholdList() {
    const thresholds = [];
    for (let i = 0; i <= 1.0; i += 0.01) {
        thresholds.push(i);
    }
    return thresholds;
}

// Храним все секции и их видимость
const sections = {};
const sectionElements = [sectionAbout, sectionProjects, sectionContacts];

// Создаем наблюдатель
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        sections[entry.target.id] = entry.intersectionRatio;
    });
    
    // Находим секцию с максимальной видимостью
    let maxVisibility = 0;
    let activeSectionId = null;
    
    for (const [sectionId, visibility] of Object.entries(sections)) {
        if (visibility > maxVisibility) {
            maxVisibility = visibility;
            activeSectionId = sectionId;
        }
    }
    
    if (activeSectionId && maxVisibility > 0.1) { // Минимум 10% видимости
        updateNavigation(activeSectionId);
    }
}, options);

// Функция обновления навигации
function updateNavigation(sectionId) {
    document.querySelectorAll('.nav__item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeNavItems = document.querySelectorAll(`[data-link="${sectionId}"]`);
    activeNavItems.forEach(item => {
        item.classList.add('active');
    });
}

// Начинаем наблюдение
sectionElements.forEach(section => {
    if (section) {
        sections[section.id] = 0;
        observer.observe(section);
    }
});