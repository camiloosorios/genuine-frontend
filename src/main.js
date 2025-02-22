import './styles.css';
document.addEventListener('DOMContentLoaded', () => {
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

  const menu = document.getElementById("menu");
  const closeButton = document.getElementById("closeMenu");
  const openButton = document.getElementById("openMenu");
  const menuContent = document.getElementById("menuContent");
  const containers = document.querySelectorAll("main, section");

  closeButton.addEventListener("click", () => {
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
        container.classList.add("transition-all")
      }
    });
  });

  openButton.addEventListener("click", () => {
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
  });
});
