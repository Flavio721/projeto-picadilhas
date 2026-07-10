function initSlides() {
    const slides = document.querySelectorAll('.about-uniforme .slide');
    const botao1 = document.getElementById('botaoSlide1');
    const botao2 = document.getElementById('botaoSlide2');
    let currentSlide = 0;
    
    // Garantir que apenas o primeiro slide esteja visível
    slides.forEach((slide, index) => {
        if (index === 0) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    // Função para trocar slide
    function changeSlide() {
        // Remover active do slide atual
        slides[currentSlide].classList.remove('active');
        
        // Avançar para próximo slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Adicionar active no próximo slide
        slides[currentSlide].classList.add('active');
        
        // Atualizar textos dos botões
        const isDark = slides[currentSlide].classList.contains('dark');
        if (botao1) botao1.textContent = isDark ? 'VER MODELO WHITE' : 'VER MODELO BLACK';
        if (botao2) botao2.textContent = isDark ? 'VER MODELO WHITE' : 'VER MODELO BLACK';
    }
    
    // Adicionar eventos aos botões
    if (botao1) botao1.addEventListener('click', changeSlide);
    if (botao2) botao2.addEventListener('click', changeSlide);
}

document.addEventListener('DOMContentLoaded', () => {

    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".overlay", {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
            trigger: ".main-article",
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
    });

    ScrollTrigger.create({
        trigger: ".art-about-us",
        start: "top center",
        onEnter: () => document.querySelector('.home-fixo').style.display = 'block',
        onLeaveBack: () => document.querySelector('.home-fixo').style.display = 'none'
    });

    const overlay = document.querySelector('.scroll-overlay');
    let scrollTimer;

    window.addEventListener('scroll', () => {
        overlay.style.opacity = '1';
        
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            overlay.style.opacity = '0';
        }, 800); // some 800ms depois que o usuário parar de scrollar
    });

    gsap.to(".navbar", {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
            trigger: ".art-about-us",
            start: "top center",
            end: "top top",
            toggleActions: "play none none reverse",
        }
    });

    gsap.utils.toArray('.player, .items, .main-teams-text, .main-captains-text, .modalitie, .swiper-slide, .title-carrosel, .text-about-us, .modalitie-volei').forEach(el => {
    gsap.from(el, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });
});

    // gsap.to(".overlay-sect", {
    //     opacity: 1,
    //     ease: "none",
    //     scrollTrigger: {
    //         trigger: ".sect-uniforme",
    //         start: "top top",
    //         end: "bottom top",
    //         scrub: 1
    //     }
    // });

    const swiper = new Swiper('.swiper', {
        loop: true,
        slidesPerView: 'auto',
        loopedSlides: 15,
        spaceBetween: 20,
        speed: 3000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        allowTouchMove: true
    });


    document.addEventListener('DOMContentLoaded', function() {
        const slides = document.querySelectorAll('.slide');
        const botao = document.getElementById('botaoSlide');
        let currentSlide = 0;
        
        // Mostrar primeiro slide inicialmente
        slides[0].classList.add('active');
        
        botao.addEventListener('click', function() {
            // Esconder slide atual
            slides[currentSlide].classList.remove('active');
            
            // Avançar para próximo slide
            currentSlide = (currentSlide + 1) % slides.length;
            
            // Mostrar próximo slide
            slides[currentSlide].classList.add('active');
            
            // Atualizar texto do botão
            const isWhite = currentSlide === 0;
            botao.textContent = isWhite ? 'VER MODELO WHITE' : 'VER MODELO BLACK';

            const textColor = document.querySelectorAll(".change")

            textColor.style.color = isWhite ? '#1D1C1C' : '#FCF4E5';
        });
    });

    initSlides();
});