const aboutBtn = document.getElementById('aboutBtn');
const projectBtn = document.getElementById('projectBtn');
const contactsBtn = document.getElementById('contactsBtn');
const aboutSection = document.querySelector('.about');
const projectsSection = document.querySelector('.projects');
const contactsSection = document.querySelector('.contact');
const hiddenMenu = document.querySelector('.dinamic-menu');
const btnUp = document.getElementById('btn-up');

btnUp.onclick = function() {
    window.scrollTo({behavior: 'smooth', top: 0});
}

window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
        hiddenMenu.style.opacity = 1;
        hiddenMenu.style.display = 'block';
        
        btnUp.style.opacity = 1;
        btnUp.style.bottom = '20px';
        
        setTimeout(function(){
            hiddenMenu.style.top = '0px';
        }, 100)
    } else {
        hiddenMenu.style.top = '-100px';
        hiddenMenu.style.opacity = 0;

        setTimeout(function(){
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