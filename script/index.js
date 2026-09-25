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
      


    /*
  Efeito glitch dos rótulos de suspense (painéis-mistério da seção de uniformes).
  Cole no final do seu script/index.js, ou linke como <script> separado antes dele.
  Não depende de GSAP/Swiper — roda isolado.
*/
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var glyphs = '@#$%*¿!¥£&/?§±';
  var nodes = document.querySelectorAll('.us-glitch[data-glitch]');

  if (reduce) {
    nodes.forEach(function (n) { n.textContent = n.dataset.glitch; });
    return;
  }

  nodes.forEach(function (node) {
    var real = node.dataset.glitch;
    var frame = 0;

    function scrambled(revealCount) {
      var out = '';
      for (var i = 0; i < real.length; i++) {
        if (real[i] === ' ') { out += ' '; continue; }
        out += (i < revealCount) ? real[i] : glyphs[Math.floor(Math.random() * glyphs.length)];
      }
      return out;
    }

    setInterval(function () {
      frame++;
      var cycle = frame % 90;
      if (cycle < 70) {
        node.textContent = scrambled(0);
      } else {
        var reveal = Math.floor((cycle - 70) / 20 * real.length);
        node.textContent = scrambled(reveal);
      }
    }, 110);
  });
})();

});