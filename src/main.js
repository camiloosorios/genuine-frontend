document.addEventListener('DOMContentLoaded', () => {
  const setupSmoothScroll = () => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  };

  const setupNumberAnimation = () => {
    const finalValues = {
      students: 400,
      staff: 28,
      teachers: 44,
    };

    const animationDuration = 2000;

    const animateValue = (element, start, end, duration) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateValue(document.getElementById('students-count'), 0, finalValues.students, animationDuration);
          animateValue(document.getElementById('staff-count'), 0, finalValues.staff, animationDuration);
          animateValue(document.getElementById('teachers-count'), 0, finalValues.teachers, animationDuration);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5,
    });

    const statsSection = document.querySelector('#estadounidenses');
    if (statsSection) {
      observer.observe(statsSection);
    }
  };

  const setupDesktopMenu = () => {
    const menu = document.getElementById("menu");
    const closeButton = document.getElementById("closeMenu");
    const openButton = document.getElementById("openMenu");
    const menuContent = document.getElementById("menuContent");
    const containers = document.querySelectorAll("main, section");

    const closeMenu = () => {
      menuContent.classList.add("hidden");
      closeButton.classList.add("hidden");
      openButton.classList.add("absolute");
      openButton.classList.add("right-10");
      openButton.classList.add("top-12");
      openButton.classList.add("scale-180");

      menu.classList.remove("w-1/4");
      menu.classList.add("w-0");

      menu.style.position = "absolute";

      containers.forEach(container => {
        if (container.classList.contains("xl:w-3/4")) {
          container.classList.replace("xl:w-3/4", "xl:w-full");
          container.classList.add("transition-all");
        }
      });
    };

    const openMenu = () => {
      if (menuContent.classList.contains("hidden")) {
        menuContent.classList.remove("hidden");
        closeButton.classList.remove("hidden");
        openButton.classList.remove("absolute");
        openButton.classList.remove("scale-180");

        menu.classList.remove("w-fit");
        menu.classList.add("w-1/4");

        menu.style.position = "fixed";

        containers.forEach(container => {
          if (container.classList.contains("xl:w-full")) {
            container.classList.replace("xl:w-full", "xl:w-3/4");
          }
        });
      }
    };

    if (closeButton) {
      closeButton.addEventListener("click", closeMenu);
    }

    if (openButton) {
      openButton.addEventListener("click", openMenu);
    }
  };

  const setupMobileSidebar = () => {
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');
    const closeMobile = document.getElementById('closeMobile');
    const openMobile = document.getElementById('openMobile');
    const navLinks = document.querySelectorAll('#mobileMenu a[href^="#"]');

    const openSidebar = () => {
      mobileMenu.classList.remove('w-0');
      mobileMenu.classList.add('w-96');
      mobileMenu.classList.add('transition-all');
      overlay.classList.remove('hidden');
    };

    const closeSidebar = () => {
      mobileMenu.classList.add('w-0');
      mobileMenu.classList.remove('w-96');
      overlay.classList.add('hidden');
    };

    if (openMobile) {
      openMobile.addEventListener('click', openSidebar);
    }

    if (closeMobile) {
      closeMobile.addEventListener('click', closeSidebar);
    }

    if (overlay) {
      overlay.addEventListener('click', closeSidebar);
    }

    navLinks.forEach(link => {
      link.addEventListener('click', closeSidebar);
    });
  };

  setupSmoothScroll();
  setupNumberAnimation();
  setupDesktopMenu();
  setupMobileSidebar();
});