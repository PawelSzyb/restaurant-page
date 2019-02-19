// Glide Slider
const slides = document.querySelectorAll("glide__slide");
const glide = new Glide(".glide", {
  autoplay: 5000,
  gap: 0,
  hoverpause: true
});
glide.mount();

// page loaded - remove overlay, add animations
const overlay = document.querySelector(".overlay");
const loader = document.querySelector(".overlay__loader");
const nav = document.querySelector(".nav");

window.addEventListener("load", () => {
  overlay.classList.add("is-loaded");
  nav.classList.add("anime");
  setTimeout(() => {
    loader.classList.add("paused");
  }, 3000);
});

// mobile nav animation
const hamburgerIcon = document.getElementById("nav__hamburger-icon");
const navItems = [...document.querySelectorAll(".nav__item")];

hamburgerIcon.addEventListener("click", e => {
  if (hamburgerIcon.checked === true) {
    nav.style.transform = "translateY(0)";
    navItems.map(navItem => (navItem.style.opacity = 1));
  } else {
    nav.style.transform = "translateY(-100%)";
    navItems.map(navItem => (navItem.style.opacity = 0));
  }
});

// Scroll to menu
const homeBtn = document.querySelector(".nav__link-menu");
const menuTitle = document.querySelector(".menu__title");
homeBtn.addEventListener("click", e => {
  e.preventDefault();
  menuTitle.scrollIntoView({ behavior: "smooth", block: "center" });
});

// scroll to gallery
const galleryBtn = document.querySelector(".nav__link-gallery");
const galleryImg = document.querySelector(".gallery__img-one");
galleryBtn.addEventListener("click", e => {
  e.preventDefault();
  galleryImg.scrollIntoView({ behavior: "smooth", block: "center" });
});

// scroll to contact
const contactBtn = document.querySelector(".nav__link-contact");
const contactSection = document.querySelector(".contact__header");
contactBtn.addEventListener("click", e => {
  e.preventDefault();
  contactSection.scrollIntoView({ behavior: "smooth", block: "center" });
});

// Menu animations -adding class to a navbar, scrolling into view, and displaying current menu
const menuNavItems = [...document.querySelectorAll(".menu__nav-item")];
const menuListItems = [...document.querySelectorAll(".menu__list")];
const menuListContainers = [...document.querySelectorAll(".container")];

menuNavItems.map(item => {
  item.addEventListener("click", e => {
    const dataSet = e.target.dataset.menu;
    menuNavItems.map(item => item.classList.remove("menu__nav-active"));
    e.target.classList.add("menu__nav-active");
    menuDisplay(dataSet);
  });
});

// Helper function that assign styles to element
const setStylesOnElement = function(styles, element) {
  Object.assign(element.style, styles);
};

function menuDisplay(dataset) {
  menuListItems.map(item => {
    setStylesOnElement(
      { display: "none", opacity: 0, transform: "translateY(30px)" },
      item
    );

    if (item.classList.value.includes(dataset)) {
      item.style.display = "block";
      setTimeout(() => {
        setStylesOnElement(
          {
            opacity: 1,
            transform: "translateY(0)"
          },
          item
        );
      }, 100);
      console.log();
      item.firstElementChild.nextElementSibling.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  });
}

const controller = new ScrollMagic.Controller();

// menu animation
const sections = [...document.querySelectorAll(".menu__section")];
const menuItems = [...document.querySelectorAll(".menu__item")];
const menusDescriptions = [...document.querySelectorAll(".menu__description")];

// fade in for menu sections
sections.map(section => {
  new ScrollMagic.Scene({
    triggerElement: section,
    triggerHook: 0.8
  })
    .setClassToggle(section, "fade-in")
    .addTo(controller);
});

// fade in for menu items
menuItems.map(item => {
  new ScrollMagic.Scene({
    triggerElement: item,
    triggerHook: 0.8
  })
    .setClassToggle(item, "fade-in")
    .addTo(controller);
});

// fade in for menu's descriptions
menusDescriptions.map(desc => {
  new ScrollMagic.Scene({
    triggerElement: desc,
    triggerHook: 0.8
  })
    .setClassToggle(desc, "fade-in")
    .addTo(controller);
});

// Menu animations - showing menu navbar
new ScrollMagic.Scene({
  triggerElement: ".menu"
})
  .setClassToggle(".menu__nav", "move-in")
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: ".gallery",
  triggerHook: "onCenter"
})
  .setClassToggle(".menu__nav", "move-out")
  .addTo(controller);
