let env = '';
switch (window.location.host) {
  case 'toddcf.com':
    env = 'prod';
    break;
  case 'toddcf.github.io':
  case 'toddcf-author.github.io':
    env = 'gh-pages';
    break;
  default:
    env = 'local';
}

// Nav
const navIcon = document.querySelector('.nav__menu_button');
const navMenuDropdown = document.querySelector('.nav__list');
const menuIcon = document.querySelector('ion-icon');
const toggleCollapse = () => {
  if (navMenuDropdown.classList.contains('collapsed')) {
    navMenuDropdown.classList.remove('collapsed');
    menuIcon.setAttribute('name', 'close-outline');
  } else {
    navMenuDropdown.classList.add('collapsed');
    menuIcon.setAttribute('name', 'menu-outline');
  }
}
navIcon.addEventListener('click', toggleCollapse);

// Links
let siteLinks = Array.from(document.querySelectorAll('a'));
const modifyHref = (siteLink) => {
  if (siteLink.href.slice(-5) === 'index') {
    switch (env) {
      case 'prod':
      case 'gh-pages':
        // Remove 'index' from the end of any hrefs.
        siteLink.href = siteLink.href.substring(0, siteLink.href.length - 5);
        break;
      case 'local':
        siteLink.href += '.html';
    }
  }
}

siteLinks.forEach(modifyHref);

const addSpaceBelowMainHeader = () => {
  const mainHeader = document.querySelector('.main-header');
  const mainHeaderHeight = mainHeader.clientHeight;
  const main = document.querySelector('.main');
  main.style.margin = `${mainHeaderHeight + 20}px 0 0 0`; // The goal is going to be to convert an em value to px and add it to the mainHeaderHeight.
  console.log(main.style.margin);
}

addSpaceBelowMainHeader(); // This function should be called on pageLoad and window resize.
window.addEventListener('resize', addSpaceBelowMainHeader);



// USE CASES:
// Test everything in local, gh-pages, and prod.
// anchor tag "buttons"
// anchor tag text links
// buttons