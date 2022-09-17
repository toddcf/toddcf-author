let env = '';
let pathname = window.location.pathname; // Perhaps consolidate the way this is leveraged and reassigned between the header and footer.

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

// Create Data Layer:
window.digitalData = {};
switch (env) {
  case 'prod':
    switch (pathname) {
      case '/':
        window.digitalData.page = {};
        window.digitalData.page.level1 = 'home';
        break;
      case '/about':
        window.digitalData.page = {};
        window.digitalData.page.level1 = 'about';
        break;
    }
    break;
  case 'gh-pages':
    switch (pathname) {
      case '/toddcf-author/':
        window.digitalData.page = {};
        window.digitalData.page.level1 = 'home';
        break;
      case '/toddcf-author/about':
        window.digitalData.page = {};
        window.digitalData.page.level1 = 'about';
        break;
    }
    break;
  case 'local':
    if (pathname.substring(pathname.length, pathname.length -18) === '/toddcf/index.html') {
      window.digitalData.page = {};
      window.digitalData.page.level1 = 'home';
    } else if (pathname.substring(pathname.length, pathname.length -18) === '/toddcf/about.html') {
      window.digitalData.page = {};
      window.digitalData.page.level1 = 'about';
    }
    break;
}
// Later, put the data layer in sessionStorage and then on each page load try to retrieve it before either editing it or creating it from scratch.

const createNavHeader = () => {
  const navHeader = document.createElement('header');
  navHeader.classList.add('main-header');
  navHeader.innerHTML = `
    <div class="center__1440 nav__flexbox">
      <div class="nav__flexbox_item"></div>
      <h1 class="h1 nav__flexbox_item font_size_6">About</h1>
      <nav class="nav nav__flexbox_item">
        <div class="nav__flexbox_sub">
          <button class="nav__menu_button">
            <ion-icon name="menu-outline" class="nav__menu-icon"></ion-icon>
          </button>
        </div>
        <ul class="nav__list collapsed">
          <li class="nav__list_item"><a href="index"><p class="nav__list_item-p">Home</p></a></li>
          <!-- <li class="nav__list_heading">Fiction</li> -->
            <!-- <ul class="nav__sublist"> -->
              <!-- <li class="nav__list_heading">Novels</li> -->
              <!-- <ul class="nav__sublist"> -->
                <li class="nav__list_item"><a href="fiction/novels/catch-up-to-myself/index"><p class="nav__list_item-p">Catch Up To Myself</p></a></li>
              <!-- </ul> -->
              <!-- <li class="nav__list_heading">Short Stories</li> -->
              <!-- <ul class="nav__sublist"> -->
                <li class="nav__list_item"><a href="fiction/short-stories/the-druggist/index"><p class="nav__list_item-p">The Druggist</p></a></li>
              <!-- </ul> -->
            <!-- </ul> -->
          <li class="nav__list_item"><a href="about"><p class="nav__list_item-p">About the Author</p></a></li>
          <li class="nav__list_item"><a href="contact"><p class="nav__list_item-p">Contact</p></a></li>
          <li class="nav__list_item"><a href="bonus-content/index"><p class="nav__list_item-p">Bonus Content</p></a></li>
          <!-- See https://html.spec.whatwg.org/#the-nav-element -->
        </ul>
        <!-- <ul class="main-nav js--main-nav">
        </ul> -->
      </nav>
    </div>`
  document.body.insertBefore(navHeader, document.body.firstChild);
}
if (window.digitalData?.page?.level1 !== 'home') {
  createNavHeader();
}

// Add Nav Functionality
const navIcon = document.querySelector('.nav__menu_button');
if (!!navIcon) {
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
}

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
  const secondEl = document.body.children[1];
  secondEl.style.margin = `${mainHeaderHeight + 20}px 0 0 0`; // The goal is going to be to convert an em value to px and add it to the mainHeaderHeight.
}

if (window.digitalData.page.level1 !== 'home') {
  addSpaceBelowMainHeader(); // This function should be called on pageLoad and window resize.
  window.addEventListener('resize', addSpaceBelowMainHeader);
}

// Footer
const thisYear = new Date().getFullYear();
let levels;
let assets = '';

if (window.location.host === 'toddcf.com') {
  // If Prod
  levels = (pathname === '/') ? 0 : pathname.match(/\//g).length;
} else {
  // If Local File or GH-Pages
  pathname = pathname.slice(pathname.indexOf('toddcf/'));
  levels = pathname.match(/\//g).length - 1;
}
// Will probably have to add a gh-pages condition, too. Create gh-pages branch next.

for (levels; levels > 0; levels--) {
  assets += '../';
}
assets += 'assets';

if (window.digitalData.page.level1 !== 'home') {
  const footerEl = document.createElement('footer');
  footerEl.classList.add('footer');
  footerEl.innerHTML = `<section class="footer__section">
  <div class="footer__icon_flexbox">
    <a href="https://www.facebook.com/toddcf.writer/" target="_blank"><img src="${assets}/images/icons/facebook/facebook-20.png" alt="Facebook Author Page" class="footer__icon"></a>
    <a href="https://www.amazon.com/Todd-Croak-Falen/e/B003A1UF3I/ref=sr_ntt_srch_lnk_1?qid=1499390370&sr=8-1" target="_blank"><img src="${assets}/images/icons/amazon/amazon_a_ding.png" alt="Amazon Author Page" class="footer__icon"></a>
    <a href="https://www.goodreads.com/toddcf" target="_blank"><img src="${assets}/images/icons/goodreads/goodreads.png" alt="Goodreads Author Page" class="footer__icon"></a>
  </div>
  </section>

  <section class="footer__section">
    <p class="copyright font_size_body footer_p">We are a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for us to earn fees by linking to Amazon.com and affiliated sites.</p>
    <p class="font_size_body footer_p">Website by <a href="https://www.tcf-webdesign.com" target="_blank" class="footer__text-link"> TCF Web Design</a></p>
    <p class="copyright font_size_body footer_p">Copyright &copy; 2008 ${(!!thisYear) ? `&ndash; ${thisYear} ` : ''}Todd Croak-Falen</p>
  </section>`;
  document.body.appendChild(footerEl);
} else if (!!thisYear) {
  document.querySelector('.currentYear').innerHTML = `&ndash; ${thisYear} `; // Homepage
}




// USE CASES:
// Test everything in local, gh-pages, and prod.
// anchor tag "buttons"
// anchor tag text links
// buttons