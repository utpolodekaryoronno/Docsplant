// global object
MOMB = {};

// color profile
MOMB.themeColors = {
  light: {
    primary: "#002868",
    primary_light: "#586585",
    secondary: "#547C45",
    secondary_light: "#CFDACB",
    text: "#131D1E",
    background: "#FFFFFF",
  },
  dark: {
    primary: "#527DC1",
    primary_light: "#C0CAE3",
    secondary: "#547C45",
    secondary_light: "#4E5A49",
    text: "#FFFFFF",
    background: "#2C2C2C",
  },
};

// toggle theme
MOMB.toggleTheme = () => {
  const triggers = Array.from(document.getElementsByClassName("theme_toggler"));
  const root = document.documentElement;
  const isSysDark = matchMedia("(prefers-color-scheme: dark)");

  // if theme toggler is null or undefined
  if (!triggers.length) return;

  function setTheme(theme) {
    for (let property in theme) {
      const color = theme[property];
      root.style.setProperty(`--${property}`, color);
    }
  }

  function toggleTheme() {
    const theme = localStorage.getItem("theme");

    if (theme === "light") {
      localStorage.setItem("theme", "dark");
      document.body.className = localStorage.getItem("theme");
      setTheme(MOMB.themeColors.dark);
      return;
    }

    localStorage.setItem("theme", "light");
    document.body.className = localStorage.getItem("theme");
    setTheme(MOMB.themeColors.light);
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", toggleTheme);
  });

  if (localStorage.getItem("theme")) {
    document.body.className = localStorage.getItem("theme");
    setTheme(MOMB.themeColors[localStorage.getItem("theme")]);
  } else {
    if (isSysDark.matches) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }

    document.body.className = localStorage.getItem("theme");
    setTheme(MOMB.themeColors[localStorage.getItem("theme")]);
  }
};

// chatbox
MOMB.chatBox = () => {
  const chatBtn = document.querySelector(".contact-massage");

  if (!chatBtn) return;

  function toggle() {
    const chatBox = document.querySelector(".contact-popup-area");

    this.classList.toggle("active");
    chatBox.classList.toggle("active");
  }

  chatBtn.addEventListener("click", toggle);
};

// mobile menu
MOMB.mobileMenu = () => {
  const menuBtn = document.getElementById("nav-icon4");

  if (!menuBtn) return;

  function toggle() {
    const menu = document.querySelector(".menu-toggler");

    this.classList.toggle("open");
    menu.classList.toggle("active");
  }

  menuBtn.addEventListener("click", toggle);
};

// toggle lang
MOMB.toggleLang = () => {
  const triggers = Array.from(document.getElementsByClassName("lang_flag"));
  const outfit = document.getElementById("langFlagOutfit");
  const path = "./assets/images/";

  if (!triggers.length) return;

  function changeLang(lang) {
    const flag = outfit.querySelector("img");
    const text = outfit.querySelector(".lang_text");

    flag.src = `${path}flag_${lang}.png`;
    text.innerHTML = lang.toUpperCase();

    var languageSelect = document.querySelector("select.goog-te-combo");
    languageSelect.value = lang;
    languageSelect.dispatchEvent(new Event("change"));
  }

  function toggle(e) {
    e.preventDefault();
    const lang = this.dataset.lang;

    changeLang(lang);
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", toggle);
  });

  // if (!localStorage.getItem("lang")) localStorage.setItem("lang", "en");
  // changeLang(localStorage.getItem("lang"));
};

// sticky header
MOMB.stickyHeader = () => {
  const header = document.getElementById("headerMain");

  function toggleSticky() {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 0) {
      header.classList.add("sticky");
      return;
    }

    header.classList.remove("sticky");
  }

  toggleSticky();
  window.addEventListener("scroll", toggleSticky);
};

// document on load
document.addEventListener("DOMContentLoaded", function () {
  // theme toggler
  MOMB.toggleTheme();
  // chatbox
  MOMB.chatBox();
  // mobile menu
  MOMB.mobileMenu();
  // toggle lang
  MOMB.toggleLang();
  // sticky header
  MOMB.stickyHeader();
});

// document on resize
document.addEventListener("resize", function () {});

// document on scroll
document.addEventListener("scroll", function () {});
