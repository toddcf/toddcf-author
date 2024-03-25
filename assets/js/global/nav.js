const navBuilder = {
  nav: document.querySelector('nav'),
  pageLevel1: window?.digitalData?.page?.levels[0].id,
  pageLevel2: window?.digitalData?.page?.levels[1].id,
  addFunctionality: () => {
    // Add Nav Functionality
    const navIcon = document.querySelector('.nav__button_dropdown');
    if (!!navIcon) {
      const navDropdown = document.querySelector('.nav__list');
      const navIcon = document.querySelector('ion-icon');
      const toggleCollapse = () => {
        if (navDropdown.classList.contains('nav__list_collapsed')) {
          navDropdown.classList.remove('nav__list_collapsed');
          navIcon.setAttribute('name', 'close-outline');
        } else {
          navDropdown.classList.add('nav__list_collapsed');
          navIcon.setAttribute('name', 'menu-outline');
        }
      }
      navIcon.addEventListener('click', toggleCollapse);
      // Add collapse if user clicks outside of dropdown.
      // Add collapse if user hits "escape".
    }
  },
  createNavHTML: (dropdown, breadcrumbs) => {
    breadcrumbs = breadcrumbs || '';
    navBuilder.nav.innerHTML = `
    <div class="content__center center__1440">
      <div class="nav__bar">
        <div class="nav__bar-flex-item-breadcrumbs">${breadcrumbs}</div>
        <div class="nav__bar-flex-item-dropdown">
          <button class="nav__button_dropdown">
            <ion-icon name="menu-outline" class="nav__icon_dropdown"></ion-icon>
          </button>
        </div>
      </div>
      <ul class="nav__list nav__list_collapsed">${dropdown}</ul>
    </div>`;

    window.globalControl.internalLinkLogic();
    
    navBuilder.addFunctionality();
  },
  createBreadcrumbs: (dropdown) => {
    const pageLevelsArr = window.digitalData.page.levels;
    let breadcrumbHTML; // This is what will get returned from the map.
    let cumulativePath = '';
    const breadcrumbHTMLarr = pageLevelsArr.map((pageLevelData, pageLevelIndex) => {
      // Hub Logic:
      const category = pageLevelData.category;
      let pathEnd = pageLevelData.id; // Default
      if (category.includes('-hub')) {
        pathEnd = `${pathEnd}/index`; // Hub pages need '/index' appended.
      }
      
      if (pageLevelIndex === pageLevelsArr.length - 1) {
        // The last item in the array will *not* be an anchor tag, so the HTML is different:
        breadcrumbHTML = `<span class="breadbrumbs__item_text">${pageLevelData.name}</span>`;
      } else {
        // All other layers:
        console.log('cumulativePath:', cumulativePath);
        breadcrumbHTML = `<a class="breadbrumbs__item_anchor" data-link="internal" href="${window.digitalData.page.pathToRoot}${cumulativePath}${pathEnd}">${pageLevelData.name}</a>`;
        cumulativePath += `/${pageLevelData.id}`; // Append for use in the next iteration of the loop.
        console.log('cumulativePath:', cumulativePath);
      }
      console.log('pageLevelIndex:', pageLevelIndex);
      console.log('breadcrumbHTML:', breadcrumbHTML);
      return breadcrumbHTML;
    });
    console.log('breadcrumbHTMLarr:', breadcrumbHTMLarr);
    // Homepage will not be one of the page levels, so it must be hardcoded:
    breadcrumbs = `<p class="breadcrumbs"><a class="breadbrumbs__item_anchor" data-link="internal" href="${window.digitalData.page.pathToRoot}index">Home</a> / ${breadcrumbHTMLarr.join(' / ')}</p>`;
    window.globalControl.internalLinkLogic();
    navBuilder.createNavHTML(dropdown, breadcrumbs);
  },
  addDropdownItem: (pageLevel, thisPage, corePath, linkText) => {
    let dropdownItem = '';
    if (pageLevel !== thisPage) {
      dropdownItem = `<li class="nav__list-item"><a class="nav__list-item-anchor" data-link="internal" href="${window.globalControl.prependRoot(corePath)}"><p class="nav__list-item-paragraph font_size_2">${linkText}</p></a></li>`;
    }
    return dropdownItem;
  },
  createDropdownList: () => {
    let dropdown = ``;
    dropdown += navBuilder.addDropdownItem(navBuilder.pageLevel1, 'home', 'index', 'Home');
    if (
      navBuilder.pageLevel1 === 'titles' &&
      !!navBuilder.pageLevel2
    ) {
      // Only add to the dropdown if Page Level 2 also exists (so we know this isn't the Titles Hub already). NOW WE CAN POSSIBLY REFACTOR TO CHECK WHETHER THE CATEGORY IS THE HUB.
      dropdown += navBuilder.addDropdownItem(navBuilder.pageLevel2, 'titles', 'titles/index', 'Titles');
    } else if (navBuilder.pageLevel1 !== 'titles') {
      dropdown += navBuilder.addDropdownItem(navBuilder.pageLevel1, 'titles', 'titles/index', 'Titles');
    }
    dropdown += navBuilder.addDropdownItem(navBuilder.pageLevel1, 'about-me', 'about-me', 'About Me');
    dropdown += navBuilder.addDropdownItem(navBuilder.pageLevel1, 'bonus-content', 'bonus-content/registration', 'Bonus Content');
    dropdown += navBuilder.addDropdownItem(navBuilder.pageLevel1, 'contact', 'contact/form', 'Contact');

    // Skip breadcrumbs if it's the homepage:
    if (window.digitalData.page.levels[0].id === 'home') {
      navBuilder.createNavHTML(dropdown);
    } else {
      navBuilder.createBreadcrumbs(dropdown);
    }
  },
  init: () => {
    navBuilder.createDropdownList();
  },
}

if (!!navBuilder.nav) {
  navBuilder.init();
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
  navTop: navBuilder.nav.offsetTop,
  fixNav: () => {
    if (window.scrollY >= stickyNav.navTop) {
      // When scrollY reaches the position of the top of the nav, fix the nav's position:
      navBuilder.nav.classList.add('nav_fixed');
      // Also compensate for the reflow that will occur when the nav is changed to a fixed position:
      document.body.style.paddingTop = nav.offsetHeight + 'px';
    } else {
      // Otherwise, un-fix the nav's position:
      navBuilder.nav.classList.remove('nav_fixed');
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

if (!!navBuilder.nav) {
  stickyNav.init();
}