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
const toggleCollapse = () => {
  if (navMenuDropdown.classList.contains('collapsed')) {
    navMenuDropdown.classList.remove('collapsed');
  } else {
    navMenuDropdown.classList.add('collapsed');
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


// USE CASES:
// Test everything in local, gh-pages, and prod.
// anchor tag "buttons"
// anchor tag text links
// buttons