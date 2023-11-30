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



// Hiding the second logo initially
gsap.set(".hero-logo-2", { opacity: 0 });

// Timeline para el cambio de logo entre la primera y la segunda sección
let logoTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".portman-section-2",
    containerAnimation: tlMain,
    markers: true,
    start: "center 80%",
    end: "center center",
    scrub: true,
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
      markers: true,
      start: "center 80%",
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



// ScrollTrigger animation for the s3-image
ScrollTrigger.create({
  trigger: ".portman-section-3",
  start: "top 55%", // Start when the top of the trigger hits the 55% mark of the viewport
  end: "85%", // End when the bottom of the trigger hits the 85% mark of the viewport
  markers: false,
  containerAnimation: tlMain,
  scrub: true, // Smooth scrubbing with the scroll
  onUpdate: (self) => {
    // Calculate the scale and opacity based on the scroll progress
    // Assuming the animation starts at 55% and ends at 85%, calculate progress relative to that range
    let relativeProgress = (self.progress - 0.55) / (0.85 - 0.55);
    relativeProgress = Math.max(0, relativeProgress); // Clamp to minimum 0
    const scale = 1 - relativeProgress * 0.2; // Scale down to 0.8
    const opacity = 1 - relativeProgress; // Fade out to 0

    // Apply the scale and opacity transformations
    gsap.to(".s3-image", {
      scale: scale,
      opacity: opacity,
      ease: "none" // Use linear easing for smooth scrubbing
    });
  }
});


// ScrollTrigger animation for the s3-text-wrap
ScrollTrigger.create({
  trigger: ".portman-section-3",
  start: "top 45%", // This might need adjustment to start after the image comes into view
  end: "60%", // Adjust as needed
  markers: false,
  containerAnimation: tlMain,
  onEnter: () => {
    // Fade in the s3-text-wrap after the image has moved into place
    gsap.to(".s3-text-wrap", {
      opacity: 1, // Fade in to full visibility
      duration: 0.5,
      ease: "power4.in",
      delay: 0.6 // Delay this to start after the image animation completes
    });
  },
  onLeave: () => {
    // Fade out the s3-text-wrap
    gsap.to(".s3-text-wrap", { opacity: 0, duration: 0.5, ease: "power4.out" });
  },
  onEnterBack: () => {
    // Fade in the s3-text-wrap again when scrolling back into the section
    gsap.to(".s3-text-wrap", {
      opacity: 1, // Fade in to full visibility
      duration: 0.5,
      ease: "power4.in"
    });
  },
  onLeaveBack: (self) => {
    // Fade out the s3-text-wrap if scrolling back before the section
    if (self.progress === 0) {
      gsap.to(".s3-text-wrap", { opacity: 0, duration: 0.5, ease: "power4.out" });
    }
  }
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
