  // PRELOADER
  window.addEventListener("load", () => {
    // Transición del fondo de negro a blanco
    gsap.to("#page-overlay", {
      backgroundColor: "white", // Fundido a blanco
      duration: 1,
      ease: "steps.inOut",
      onComplete: () => {
        // Después de completar la animación, ocultamos el preloader
        gsap.to("#page-overlay", {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            // Eliminar el preloader del DOM o establecer 'display: none'
            document.getElementById("page-overlay").style.display = "none";
          }
        });
      }
    });
  });

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


// Asegúrate de que los elementos tengan el estado inicial correcto
gsap.set(".s3-image", { opacity: 0, scale: 0.8 }); // Asigna un estado inicial
gsap.set(".s3-text-wrap", { opacity: 0 }); // Asegúrate de que el texto esté oculto inicialmente
// Animación para la imagen s3 al entrar en la sección
ScrollTrigger.create({
  trigger: ".portman-section-3",
  start: "center 80%", // Ajustar a un valor que capture el momento justo al entrar en la sección
  end: "center center",
  markers: false, // Establecer en true para depuración y ajustar la animación
  containerAnimation: tlMain,
  onEnter: () => {
    gsap.to(".s3-image", {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "power4.inOut"
    });
  },
  // ... (resto de las animaciones para la sección 3) ...
});

// Animación para el texto s3 al entrar en la sección
ScrollTrigger.create({
  trigger: ".portman-section-3",
  start: "center 80%", // Ajustar de la misma manera que la imagen para que la animación sea coherente
  end: "buttom center",
  markers: false, // Establecer en true para depuración y ajustar la animación
  containerAnimation: tlMain,
  onEnter: () => {
    gsap.to(".s3-text-wrap", {
      opacity: 1,
      duration: 0.5,
      ease: "power4.inOut",
      delay: 0.3 // Ajustar el retraso si es necesario
    });
  },
});

// Animaciones de parallax para los elementos de la sección 'portman-section-photos-4'
const parallaxElements = [
  ".interview-01-wrap",
  ".interview-02-wrap",
  ".interview-03-wrap",
  ".interview-04-wrap",
  ".interview-05-wrap"
];

parallaxElements.forEach((element, index) => {
  // Definimos una distancia horizontal que varía para cada elemento
  const horizontalDistance = 50 * (index % 3 === 0 ? 1 : -1);

  // Parallax horizontal al hacer scroll
  gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: "top bottom", // El efecto parallax empieza cuando la sección entra en el viewport
      end: "bottom top", // El efecto parallax termina cuando la sección sale del viewport
      scrub: true, // Suaviza el movimiento con el scroll
      markers: false, // Poner en true para depuración
      containerAnimation: tlMain
    }
  }).fromTo(element, {
    x: 0
  }, {
    x: horizontalDistance, // Desplazamiento horizontal
    ease: "none"
  });

});


// Set the initial state of the s5-image to be moved up by its own height
gsap.set(".s5-image", { y: "100%" });

// Create the ScrollTrigger animation
ScrollTrigger.create({
  trigger: ".portman-section-5",
  start: "top 25%", // Adjust as needed
  end: "center center", // Adjust as needed
  markers: false,
  containerAnimation: tlMain,
  onEnter: () => {
    // Animate the s5-image back to its original position
    gsap.to(".s5-image", {
      y: "25%", // Move to 0% on the Y axis
      duration: 3,
      ease: "power4.out"
    });
  },
  onLeaveBack: (self) => {
    // If scrolling back, move the s5-image up again
    if (self.progress === 0) {
      gsap.to(".s5-image", { opacity: 100, ease: "power4.out" });
    }
  },
});
