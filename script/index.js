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