// ALL OF THIS WILL HAVE TO BE REFACTORED TO WORK HAND-IN-HAND WITH THE NEW GLOBAL-PRE.JS AND GLOBAL-POST.JS LOGIC.
const createNav = () => {
  const nav = document.querySelector('nav');
  let menu = ``;
  const addMenuItem = (pageLevel, thisPage, corePath, linkText) => {
    if (pageLevel !== thisPage) {
      menu += `<li class="nav__list_item"><a data-link="internal" href="${window.globalControl.prependRoot(corePath)}"><p class="nav__list_item-p">${linkText}</p></a></li>`;
    }
  }
  const pageLevel1 = window.digitalData.page.level1;
  const pageLevel2 = window.digitalData.page.level2;
  addMenuItem(pageLevel1, 'home', 'index', 'Home');
  if (
    pageLevel1 === 'titles' &&
    !!pageLevel2
  ) {
    // Only add to the menu if Page Level 2 also exists (so we know this isn't the Titles Hub already).
    addMenuItem(pageLevel2, 'titles', 'titles', 'Titles');
  }
  addMenuItem(pageLevel1, 'about-me', 'about-me', 'About Me');
  addMenuItem(pageLevel1, 'bonus-content', 'bonus-content/registration', 'Bonus Content');
  addMenuItem(pageLevel1, 'contact', 'contact/form', 'Contact');
  
  nav.innerHTML = `
    <div class="nav__bar">
      <button class="nav__menu-button">
        <ion-icon name="menu-outline" class="nav__menu-icon"></ion-icon>
      </button>
    </div>
    <ul class="nav__list collapsed">${menu}</ul>`;
}
if (!!window.digitalData.page.level1 && window.digitalData.page.level1 !== 'home') {
  createNav();
}

// Add Nav Functionality
const navIcon = document.querySelector('.nav__menu-button');
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
  // Add collapse if user clicks outside of dropdown.
  // Add collapse if user hits "escape".
}

// Standardize Static Nav Links:
// TEST THIS WHOLE THING ON LATERAL MOVES FROM 'MUSIC' TO 'INDEX' PAGES.  OR 'ABOUT-ME' TO HOME.
const modifyHref = (link) => {
  let dest = link.getAttribute('data-link-dest');
  let simplifiedPathname = pathname;
  if (pathname[0] === '/') {
    simplifiedPathname = pathname.slice(1); // If there is an initial slash, remove it. Note that this is redundant to part of some earlier code.
  }
  if (
    !!dest
    && !!simplifiedPathname
  ) {
    if (dest.includes(simplifiedPathname)) {
      // If the current pathname is included in the dest, we are going DOWN the directory tree and need to strip it out:
      dest = dest.slice(simplifiedPathname.length);
    } else if (simplifiedPathname.includes(dest.substring(0, dest.lastIndexOf('/')))) {
      // Otherwise, if the simplifiedPathname includes the dest (minus everything after the dest's final slash), we are moving laterally within the same directory, such as navigating from 'music' to 'index' within a project title.
      dest = dest.slice(dest.lastIndexOf('/') + 1, dest.length);
    } else {
      // If the simplifiedPathname and dest do NOT have commonalities, we are going UP to the root:
      dest = pathToRoot + dest;
    }
    switch (env) {
      case 'prod':
      case 'gh-pages':
        // Remove '/index' from the end of any destinations:
        if (dest.slice(-6) === '/index') {
          dest = dest.substring(0, dest.length - 6);
        }
        break;
      case 'local':
        dest += '.html';
    }
    link.href = dest;
  }
}
const staticNavLinks = Array.from(document.querySelectorAll('[data-nav-link-type="static"]')); // We gotta standardize and document these naming conventions.
if (!!staticNavLinks && Array.isArray(staticNavLinks)) { staticNavLinks.forEach(modifyHref) };

const calculateSpacing = () => {
  const mainHeader = document.querySelector('.header');
  const mainHeaderHeight = mainHeader.clientHeight;
  const secondEl = document.body.children[1];
  secondEl.style.margin = `${mainHeaderHeight}px 0 0 0`; // The goal is going to be to convert an em value to px and add it to the mainHeaderHeight.
}

if (!!window.digitalData.page.level1 && window.digitalData.page.level1 !== 'home') {
  // Add space on both pageLoad and window resize:
  calculateSpacing();
  window.addEventListener('resize', calculateSpacing);
}


// Nav for reference:
// nav.innerHTML = `
//   <div class="nav__bar">
//     <button class="nav__menu-button">
//       <ion-icon name="menu-outline" class="nav__menu-icon"></ion-icon>
//     </button>
//   </div>
//   <ul class="nav__list collapsed">
//     <li class="nav__list_item"><a href="index"><p class="nav__list_item-p">Home</p></a></li>
//     <!-- <li class="nav__list_heading">Fiction</li> -->
//       <!-- <ul class="nav__sublist"> -->
//         <!-- <li class="nav__list_heading">Novels</li> -->
//         <!-- <ul class="nav__sublist"> -->
//           <li class="nav__list_item"><a href="fiction/novels/catch-up-to-myself/index"><p class="nav__list_item-p">Catch Up To Myself</p></a></li>
//         <!-- </ul> -->
//         <!-- <li class="nav__list_heading">Short Stories</li> -->
//         <!-- <ul class="nav__sublist"> -->
//           <li class="nav__list_item"><a href="fiction/short-stories/the-druggist/index"><p class="nav__list_item-p">The Druggist</p></a></li>
//         <!-- </ul> -->
//       <!-- </ul> -->
//     <li class="nav__list_item"><a href="about"><p class="nav__list_item-p">About Me</p></a></li>
//     <li class="nav__list_item"><a href="contact"><p class="nav__list_item-p">Contact</p></a></li>
//     <li class="nav__list_item"><a href="bonus-content/index"><p class="nav__list_item-p">Bonus Content</p></a></li>
//     <!-- See https://html.spec.whatwg.org/#the-nav-element -->
//   </ul>
//   <!-- <ul class="main-nav js--main-nav">
//   </ul> -->`