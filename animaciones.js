// Inicialización de la posición del logo
gsap.set(".hero-logo", { x: 0, y: 0, opacity: 100 });

// Configuración de las alturas de las secciones para el scroll horizontal
function setTrackHeights() {
    document.querySelectorAll(".section-height").forEach(section => {
        let trackWidth = section.querySelector(".track").offsetWidth;
        section.style.height = `${trackWidth}px`;
    });
}
setTrackHeights();
window.addEventListener("resize", setTrackHeights);

// Scroll horizontal principal
let tlMain = gsap.timeline({
    scrollTrigger: {
        trigger: ".section-height",
        start: "top top",
        end: "98% bottom",
        scrub: 1
    }
}).to(".track", {
    xPercent: -100,
    ease: "none"
});

// Ocultado el segundo logo
gsap.set(".hero-logo-2", { opacity: 0 });

// Código existente para el cambio entre la primera y la segunda sección
gsap.timeline({
  scrollTrigger: {
      trigger: ".portman-section-2",
      containerAnimation: tlMain,
      start: "center center",
      onEnter: () => {
          gsap.to(".hero-logo", { opacity: 0, duration: 0.1 });
          gsap.to(".hero-logo-2", { opacity: 1, duration: 0.3, delay: 0.1 });
      },
      onLeaveBack: () => {
          gsap.to(".hero-logo", { opacity: 1, duration: 0.3 });
          gsap.to(".hero-logo-2", { opacity: 0, duration: 0.1 });
      }
  }
});

// Código adicional para manejar las secciones siguientes (ejemplo con la sección 3)
gsap.timeline({
  scrollTrigger: {
      trigger: ".portman-section-3",
      containerAnimation: tlMain,
      start: "center center",
      onEnter: () => {
          gsap.to(".hero-logo", { opacity: 0, duration: 0.1 });
          gsap.to(".hero-logo-2", { opacity: 1, duration: 0.3 });
      },
      onLeaveBack: () => {
          gsap.to(".hero-logo-2", { opacity: 1, duration: 0.3 });
          gsap.to(".hero-logo", { opacity: 0, duration: 0.1 });
      }
  }
});


// Animación del lightbox al llegar a la segunda sección
gsap.timeline({
    scrollTrigger: {
        trigger: ".portman-section-2",
        containerAnimation: tlMain,
        start: "top 40%", // Ajusta este valor según tus necesidades
        end: "top 20%", // Ajusta este valor según tus necesidades
        markers: false,
        scrub: true
    }
})
.from(".lightbox-1-wrap", { opacity: 0, scale: 0.95, delay: 0.2 }) // Añade un retraso para que comience después de la animación del logo
.to(".lightbox-1-wrap", { opacity: 1, scale: 1, delay: 0.2 }); // Añade el mismo retraso para sincronizarlo



// Inicialización de la altura de la imagen a 0%
gsap.set(".s5-image-wrap", { height: "0%" });

// ScrollTrigger para la última sección que revelará la imagen
ScrollTrigger.create({
  trigger: ".portman-section-5",
  markers: true,
  containerAnimation: tlMain,
  start: "top+=25% center", // Comienza cuando el trigger está un 25% abajo del top
  end: "bottom center", // Ajusta según la posición en la que quieres que termine la animación
  onEnter: () => {
    // Retraso de la animación de revelado
    gsap.to(".s5-image-wrap", {
      height: "75%", // Ajusta este valor al tamaño final deseado
      duration: 1.5,
      ease: "power4.out",
      delay: 0 // Delay de 2.5 segundos después de entrar en la sección
    });
  },
  onLeaveBack: (self) => {
    // Revertir la animación si se regresa a la sección anterior
    if (self.progress === 0) {
      gsap.to(".s5-image-wrap", { height: "0%", duration: 1.5, ease: "power4.out" });
    }
  },
  markers: true // Solo para depuración, elimina en producción
});