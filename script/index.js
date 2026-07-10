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

    gsap.to(".uniforme-3d", {
        y: -500,
        scale: .75,
        ease: "none",

        scrollTrigger:{
            trigger: ".sect-uniforme",
            start: "top top",
            end: "bottom bottom",
            scrub: true
        }
    });
});

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

});