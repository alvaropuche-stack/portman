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
        start: "top 65%", // Ajusta este valor según tus necesidades
        end: "bottom center", // Ajusta este valor según tus necesidades
        markers: false,
        scrub: true
    }
})
.from(".lightbox-1-wrap", { opacity: 0, scale: 0.95, delay: 0.2 }) // Añade un retraso para que comience después de la animación del logo
.to(".lightbox-1-wrap", { opacity: 1, scale: 1, delay: 0.2 }); // Añade el mismo retraso para sincronizarlo

// ScrollTrigger for fading out the s3-image when it contacts portman-section-photos-4
ScrollTrigger.create({
  trigger: ".portman-section-3",
  start: "top center",
  // End the fade out when the bottom of portman-section-3 hits the top of portman-section-photos-4
  end: () => {
    const photosSectionTop = document.querySelector(".portman-section-photos-4").offsetTop;
    return `top+=${photosSectionTop} top`;
  },
  markers: true,
  containerAnimation: tlMain,
  onEnter: () => {
    // Fade in the s3-image
    gsap.to(".s3-image", {
      opacity: 1, // Fade in the image
      duration: 0.5,
      ease: "power4.in"
    });
  },
  onLeave: () => {
    // Fade out the s3-image
    gsap.to(".s3-image", {
      opacity: 0, // Fade out the image
      duration: 0.5,
      ease: "power4.out"
    });
  }
});

// ScrollTrigger for fading in the s3-image when scrolling back into section-3
ScrollTrigger.create({
  trigger: ".portman-section-3",
  start: "top bottom",
  // Begin to fade in when the top of portman-section-photos-4 leaves the viewport as we scroll back
  end: () => {
    const photosSectionBottom = document.querySelector(".portman-section-photos-4").offsetTop + 
                               document.querySelector(".portman-section-photos-4").offsetHeight;
    return `top+=${photosSectionBottom} bottom`;
  },
  markers: true,
  containerAnimation: tlMain,
  onEnterBack: () => {
    // Fade in the s3-image
    gsap.to(".s3-image", {
      opacity: 1, // Fade in the image
      duration: 0.5,
      ease: "power4.in"
    });
  },
  onLeaveBack: () => {
    // Fade out the s3-image
    if (self.progress === 0) {
      gsap.to(".s3-image", {
        opacity: 0, // Fade out the image
        duration: 0.5,
        ease: "power4.out"
      });
    }
  }
});


// Set the initial state of the s3-text-wrap to be invisible
gsap.set(".s3-text-wrap", { opacity: 0 });

// Create a ScrollTrigger animation for the s3-text-wrap
ScrollTrigger.create({
  trigger: ".portman-section-3",
  start: "top 45%", // This might need adjustment to start after the image comes into view
  end: "center center", // Adjust as needed
  markers: true,
  containerAnimation: tlMain,
  onEnter: () => {
    // Fade in the s3-text-wrap after the image has moved into place
    gsap.to(".s3-text-wrap", {
      opacity: 1, // Fade in to full visibility
      duration: 0.5,
      ease: "power4.in",
      delay: 0.3 // Delay this to start after the image animation completes
    });
  },
  onLeaveBack: (self) => {
    // If scrolling back, fade the s3-text-wrap out
    if (self.progress === 0) {
      gsap.to(".s3-text-wrap", { opacity: 0, duration: 0.5, ease: "power4.out" });
    }
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
  start: "top 15%", // Adjust as needed
  end: "center center", // Adjust as needed
  markers: true,
  containerAnimation: tlMain,
  onEnter: () => {
    // Animate the s5-image back to its original position
    gsap.to(".s5-image", {
      y: "0%", // Move to 0% on the Y axis
      duration: 0.5,
      ease: "power4.out"
    });
  },
  onLeaveBack: (self) => {
    // If scrolling back, move the s5-image up again
    if (self.progress === 0) {
      gsap.to(".s5-image", { opacity: 0, ease: "power4.out" });
    }
  },
});
