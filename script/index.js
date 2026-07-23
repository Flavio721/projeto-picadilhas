// MENU RESPONSIVo
function toggleMenu() {
    if (window.innerWidth <= 768) {
        const nav = document.querySelector('nav');
        const navRight = document.querySelector('.nav-right');
        const menuHamburguer = document.querySelector('.menu-hamburguer');
        
        if (nav && navRight && menuHamburguer) {
            nav.classList.toggle('active');
            navRight.classList.toggle('active');
            menuHamburguer.classList.toggle('active');
        }
    }
}


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

    gsap.to(".main-article", {
        backgroundPosition: "50% 30%", // desloca o foco do bg
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
        display:'none',
        ease: "none",
        scrollTrigger: {
            trigger: ".art-about-us",
            start: "top center",
            end: "top top",
            toggleActions: "play none none reverse",
        }
    });

    gsap.utils.toArray('.animation-fade, .swiper-slide, .player, .items').forEach(el => {
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

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const swiper = new Swiper('.swiper', {
        loop: true,
        slidesPerView: 'auto',
        loopedSlides: 15,
        spaceBetween: 20,
        speed: isMobile ? 5000 : 3000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        allowTouchMove: true
    });

        const wrappers = document.querySelectorAll('.player-wrapper');

        const isTouch = window.matchMedia('(hover: none)').matches;

        if (isTouch) {
        let tooltipAberta = null;
        wrappers.forEach(wrapper => {
            wrapper.addEventListener('click', (e) => {
            e.stopPropagation();
            const tooltip = wrapper.querySelector('.player-tooltip');
            if (tooltipAberta && tooltipAberta !== tooltip) {
                gsap.to(tooltipAberta, { opacity: 0, onComplete: () => tooltipAberta.style.visibility = 'hidden' });
            }
            const isOpen = tooltip.style.visibility === 'visible';
            gsap.set(tooltip, { visibility: isOpen ? 'hidden' : 'visible' });
            gsap.to(tooltip, { opacity: isOpen ? 0 : 1, duration: 0.3 });
            tooltipAberta = isOpen ? null : tooltip;
            });
        });
        document.addEventListener('click', () => {
            if (tooltipAberta) gsap.to(tooltipAberta, { opacity: 0, onComplete: () => tooltipAberta.style.visibility = 'hidden' });
        });
        } else {
            wrappers.forEach(wrapper => {
          const tooltip = wrapper.querySelector('.player-tooltip');
          if (!tooltip) return;

          let hoverTimeline = null;

          wrapper.addEventListener('mouseenter', function(e) {
            if (hoverTimeline) {
              hoverTimeline.kill();
              hoverTimeline = null;
            }

            // Verifica se o tooltip deve aparecer para cima ou para baixo
            const direction = wrapper.dataset.tooltipDirection || 'up';
            
            // Configura a direção no tooltip (já definida via classe, mas garantimos)
            if (direction === 'down') {
              tooltip.classList.add('tooltip-down');
              tooltip.classList.remove('tooltip-up');
            } else {
              tooltip.classList.add('tooltip-up');
              tooltip.classList.remove('tooltip-down');
            }

            // Posição inicial da animação
            const startY = direction === 'down' ? -10 : 10;
            const endY = 0;

            gsap.set(tooltip, { 
              visibility: 'visible', 
              opacity: 0, 
              scale: 0.85, 
              y: startY 
            });

            hoverTimeline = gsap.timeline({
              defaults: { ease: 'back.out(1.7)', duration: 0.5 },
              onComplete: () => { hoverTimeline = null; }
            });

            hoverTimeline
              .to(tooltip, {
                opacity: 1,
                scale: 1,
                y: endY,
                duration: 0.45,
                ease: 'back.out(1.4)'
              })
              .to(tooltip, {
                boxShadow: '0 16px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,215,100,0.2)',
                duration: 0.2,
                ease: 'power1.out'
              }, 0);
          });

          wrapper.addEventListener('mouseleave', function(e) {
            if (hoverTimeline) {
              hoverTimeline.kill();
              hoverTimeline = null;
            }

            const direction = wrapper.dataset.tooltipDirection || 'up';
            const endY = direction === 'down' ? -8 : 8;

            hoverTimeline = gsap.timeline({
              defaults: { ease: 'power2.inOut', duration: 0.25 },
              onComplete: () => {
                gsap.set(tooltip, { visibility: 'hidden' });
                hoverTimeline = null;
              }
            });

            hoverTimeline
              .to(tooltip, {
                opacity: 0,
                scale: 0.9,
                y: endY,
                duration: 0.2,
                ease: 'power2.in'
              })
              .set(tooltip, { visibility: 'hidden' }, 0.25);
          });
        });
        }
      


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

            const container = document.querySelector(".about-uniforme");

            container.style.backgroundColor = isMobile ? '#FCF4E5' : '#1D1C1C'
        });
    });

    initSlides();
});