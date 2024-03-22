const nav = document.querySelector('nav');
const pageLevel1 = window?.digitalData?.page?.level1;
const pageLevel2 = window?.digitalData?.page?.level2;
const navBuilder = {
  functionality: () => {
    // Add Nav Functionality
    const navIcon = document.querySelector('.nav__button_menu');
    if (!!navIcon) {
      const navMenuDropdown = document.querySelector('.nav__list');
      const menuIcon = document.querySelector('ion-icon');
      const toggleCollapse = () => {
        if (navMenuDropdown.classList.contains('nav__list_collapsed')) {
          navMenuDropdown.classList.remove('nav__list_collapsed');
          menuIcon.setAttribute('name', 'close-outline');
        } else {
          navMenuDropdown.classList.add('nav__list_collapsed');
          menuIcon.setAttribute('name', 'menu-outline');
        }
      }
      navIcon.addEventListener('click', toggleCollapse);
      // Add collapse if user clicks outside of dropdown.
      // Add collapse if user hits "escape".
    }
  },
  createNav: () => {  
    let menu = ``;
    const addMenuItem = (pageLevel, thisPage, corePath, linkText) => {
      if (pageLevel !== thisPage) {
        menu += `<li class="nav__list-item"><a class="nav__list-item-anchor" data-link="internal" href="${window.globalControl.prependRoot(corePath)}"><p class="nav__list-item-paragraph font_size_2">${linkText}</p></a></li>`;
      }
    }
    addMenuItem(pageLevel1, 'home', 'index', 'Home');
    if (
      pageLevel1 === 'titles' &&
      !!pageLevel2
    ) {
      // Only add to the menu if Page Level 2 also exists (so we know this isn't the Titles Hub already).
      addMenuItem(pageLevel2, 'titles', 'titles/index', 'Titles');
    } else if (pageLevel1 !== 'titles') {
      addMenuItem(pageLevel1, 'titles', 'titles/index', 'Titles');
    }
    addMenuItem(pageLevel1, 'about-me', 'about-me', 'About Me');
    addMenuItem(pageLevel1, 'bonus-content', 'bonus-content/registration', 'Bonus Content');
    addMenuItem(pageLevel1, 'contact', 'contact/form', 'Contact');
    
    nav.innerHTML = `
    <div class="content__center center__1440">
      <div class="nav__bar">
        <div class="nav__bar-flex-item-breadcrumbs"><p style="color:#fff">Home / Titles / The Druggist</p></div>
        <div class="nav__bar-flex-item-dropdown">
          <button class="nav__button_menu">
            <ion-icon name="menu-outline" class="nav__icon_menu"></ion-icon>
          </button>
        </div>
      </div>
      <ul class="nav__list nav__list_collapsed">${menu}</ul>
    </div>`;

    window.globalControl.internalLinkLogic();
    
    navBuilder.functionality();
  },
}

if (!!nav) {
  navBuilder.createNav();
}

/*const calculateSpacing = () => {
  const mainHeader = document.querySelector('.header');
  const mainHeaderHeight = mainHeader.clientHeight;
  const secondEl = document.body.children[1];
  secondEl.style.margin = `${mainHeaderHeight - 1}px 0 0 0`; // Subtracting a pixel prevents a white line gap on some screen sizes.
}

if (pageLevel1 !== 'home') {
  // Add space on both pageLoad and window resize:
  calculateSpacing();
  window.addEventListener('resize', calculateSpacing);
}*/

// Sticky Nav Logic:
const stickyNav = {
  // When the nav loads, grab the position of the top of the navbar:
  navTop: nav.offsetTop,
  fixNav: () => {
    if (window.scrollY >= stickyNav.navTop) {
      // When scrollY reaches the position of the top of the nav, fix the nav's position:
      nav.classList.add('nav_fixed');
      // Also compensate for the reflow that will occur when the nav is changed to a fixed position:
      document.body.style.paddingTop = nav.offsetHeight + 'px';
    } else {
      // Otherwise, un-fix the nav's position:
      nav.classList.remove('nav_fixed');
      // And un-pad the top of the body:
      document.body.style.paddingTop = 0;
    }
  },
  init: () => {
    // Execute the fixNav method every time the user scrolls:
    window.addEventListener('scroll', stickyNav.fixNav);
    console.log('Sticky Nav initiated.');
  },
}

if (!!nav) {
  stickyNav.init();
}

const breadcrumbBuilder = {
  init: () => {

  },
}

if (pageLevel1 !== 'home') {
  breadcrumbBuilder.init();
}