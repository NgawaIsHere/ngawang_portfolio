// Advanced Dynamic Scroll Animations
document.addEventListener("DOMContentLoaded", function () {
  // Animation types
  const animations = {
    fadeUp: {
      start: { opacity: 0, transform: "translateY(40px)" },
      end: { opacity: 1, transform: "translateY(0)" },
    },
    fadeDown: {
      start: { opacity: 0, transform: "translateY(-40px)" },
      end: { opacity: 1, transform: "translateY(0)" },
    },
    fadeLeft: {
      start: { opacity: 0, transform: "translateX(40px)" },
      end: { opacity: 1, transform: "translateX(0)" },
    },
    fadeRight: {
      start: { opacity: 0, transform: "translateX(-40px)" },
      end: { opacity: 1, transform: "translateX(0)" },
    },
    zoomIn: {
      start: { opacity: 0, transform: "scale(0.8)" },
      end: { opacity: 1, transform: "scale(1)" },
    },
    zoomOut: {
      start: { opacity: 0, transform: "scale(1.2)" },
      end: { opacity: 1, transform: "scale(1)" },
    },
    flip: {
      start: { opacity: 0, transform: "rotateY(90deg)" },
      end: { opacity: 1, transform: "rotateY(0)" },
    },
    spin: {
      start: { opacity: 0, transform: "rotate(180deg) scale(0.7)" },
      end: { opacity: 1, transform: "rotate(0) scale(1)" },
    },
  };

  // Animation mappings for different elements
  const elementAnimations = [
    { selector: ".section-title", animation: "fadeDown", delay: 0, stagger: 0 },
    {
      selector: ".portfolio-details-slider",
      animation: "fadeUp",
      delay: 200,
      stagger: 0,
    },
    { selector: ".icon-box", animation: "fadeUp", delay: 100, stagger: 150 },
    { selector: ".box", animation: "zoomIn", delay: 0, stagger: 150 },
    {
      selector: ".persona .nav-item",
      animation: "fadeRight",
      delay: 0,
      stagger: 100,
    },
    {
      selector: ".tab-content .tab-pane",
      animation: "fadeLeft",
      delay: 200,
      stagger: 0,
    },
    { selector: ".gallery-item", animation: "zoomIn", delay: 0, stagger: 150 },
    {
      selector: ".affinity-image img",
      animation: "flip",
      delay: 200,
      stagger: 0,
    },
    {
      selector: ".storyboard-item",
      animation: "fadeUp",
      delay: 200,
      stagger: 200,
    },
    { selector: ".about-img", animation: "fadeLeft", delay: 100, stagger: 0 },
    {
      selector: ".content p, .content li",
      animation: "fadeRight",
      delay: 300,
      stagger: 50,
    },
    { selector: ".map-item", animation: "fadeUp", delay: 100, stagger: 200 },
    { selector: "h3, h4", animation: "fadeDown", delay: 100, stagger: 50 },
    {
      selector: ".hmw-questions li",
      animation: "fadeLeft",
      delay: 100,
      stagger: 80,
    },
    {
      selector: ".pov-statements p",
      animation: "fadeRight",
      delay: 200,
      stagger: 100,
    },
  ];

  // Observer configuration
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  // Apply initial styles and create a map to track animations
  const animationTracker = new Map();

  elementAnimations.forEach((config) => {
    const elements = document.querySelectorAll(config.selector);
    elements.forEach((element, index) => {
      // Apply initial animation state
      const animStyle = animations[config.animation].start;
      Object.keys(animStyle).forEach((prop) => {
        element.style[prop] = animStyle[prop];
      });

      // Set transition but delay applying it to prevent initial animation
      setTimeout(() => {
        element.style.transition = `all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1.0)`;
      }, 50);

      // Store animation data
      animationTracker.set(element, {
        animation: config.animation,
        triggered: false,
        delay: config.delay + index * config.stagger,
      });
    });
  });

  // Handle intersection observer
  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (
        entry.isIntersecting &&
        !animationTracker.get(entry.target).triggered
      ) {
        const element = entry.target;
        const { animation, delay } = animationTracker.get(element);

        // Mark as triggered to prevent re-animation
        animationTracker.get(element).triggered = true;

        // Apply animation with delay
        setTimeout(() => {
          const endStyle = animations[animation].end;
          Object.keys(endStyle).forEach((prop) => {
            element.style[prop] = endStyle[prop];
          });
        }, delay);

        // Stop observing after animation
        setTimeout(() => {
          observer.unobserve(element);
        }, delay + 1000);
      }
    });
  };

  // Create observer and observe all animations
  const observer = new IntersectionObserver(
    handleIntersection,
    observerOptions
  );
  animationTracker.forEach((_, element) => {
    observer.observe(element);
  });

  // Dynamic parallax for header/hero section
  const heroSection = document.querySelector("#hero");
  if (heroSection) {
    window.addEventListener("scroll", function () {
      const scrollY = window.scrollY;
      const opacity = Math.max(1 - scrollY / 500, 0.2);
      const yMovement = scrollY * 0.4;

      heroSection.style.opacity = opacity;
      heroSection.style.transform = `translateY(${yMovement}px)`;

      // Add 3D effect to children if they exist
      const heroChildren = heroSection.children;
      Array.from(heroChildren).forEach((child, index) => {
        const depth = (index + 1) * 0.05;
        child.style.transform = `translateY(${yMovement * depth}px)`;
      });
    });
  }

  // Special image sequence effect for project gallery
  const galleryItems = document.querySelectorAll(".gallery-item img");
  if (galleryItems.length > 0) {
    galleryItems.forEach((img, index) => {
      img.style.transition = `all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1.0) ${
        index * 200
      }ms`;

      // Add hover effect
      img.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.05)";
        this.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.2)";
      });

      img.addEventListener("mouseleave", function () {
        this.style.transform = "scale(1)";
        this.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
      });
    });
  }

  // Enhanced Back to top button
  const backToTopButton = document.querySelector(".back-to-top");
  if (backToTopButton) {
    const updateButton = () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("active");
        backToTopButton.style.transform = "translateY(0)";
        backToTopButton.style.opacity = "1";
      } else {
        backToTopButton.style.transform = "translateY(20px)";
        backToTopButton.style.opacity = "0";
        setTimeout(() => {
          if (window.scrollY <= 300) {
            backToTopButton.classList.remove("active");
          }
        }, 300);
      }
    };

    window.addEventListener("scroll", updateButton);
    updateButton(); // Initialize on load

    backToTopButton.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});

// Smooth scroll animation for navigation links
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();

        window.scrollTo({
          top: targetElement.offsetTop - 70, // Adjust for header height
          behavior: "smooth",
        });
      }
    });
  });
});
