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
        <div class="nav__bar-flex-item-breadcrumbs">
          <p class="breadcrumbs"><a class="breadbrumbs__item_anchor" href="${window.digitalData.page.pathToRoot}index">Home</a> / <a class="breadbrumbs__item_anchor" href="${window.digitalData.page.pathToRoot}titles">Titles</a> / <span class="breadbrumbs__item_text">The Druggist</span></p>
        </div>
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

// Breadcrumbs
const breadcrumbBuilder = {
  generateUI: (breadcrumbData) => {
    console.log('breadcrumbData:', breadcrumbData);
    const breadcrumbsFlexItem = nav.querySelector('.nav__bar-flex-item-breadcrumbs');
    if (!!breadcrumbsFlexItem) {
      
    }
  },
  stylizeMap: (breadcrumbArr) => {
    const breadcrumbData = breadcrumbArr.map((breadcrumbArrItem, i) => {
      // There could be a hyphen in a title (such as 'The Image-Conscious War Zone'), so in that case we don't want to automatically replace all hyphens with spaces. Instead, we'll have to use logic to detect if the page is a title page, and then pull the stylized title from the data layer. Else, we could use .replace().
      let breadcrumbItem = {
        uiText: '',
        pathText: breadcrumbArrItem,
      };
      let individualWords;
      let individualWordsCaps;
      if (
        window.digitalData.page.category === 'specific-title' &&
        i === 2
      ) {
        // For now, this can safely be assumed to be Page Level 2, but once there is a series, it will probably be Page Level 3, and we'll need to figure out how to know when to check which level. We also have to remember that there may be a Music page nested below it (although I may change that architecture later).
        breadcrumbItem.uiText = window.digitalData.titles[breadcrumbArrItem].title;
      } else {
        individualWords = breadcrumbArrItem.split('-');
        individualWordsCaps = individualWords.map(word => {
          return `${word[0].toUpperCase()}${word.substring(1)}`;
        });
        breadcrumbItem.uiText = individualWordsCaps.join(' ');
      }
      return breadcrumbItem;
    });
    breadcrumbBuilder.generateUI(breadcrumbData);
  },
  getPageLevels: () => {
    let breadcrumbArr = ['Home'];
    let levelNum = 1;
    let pageLevel = '';
    do {
      pageLevel = window.digitalData.page[`level${levelNum}`];
      if (!!pageLevel) {
        breadcrumbArr.push(pageLevel);
      }
      levelNum++;
    } while (!!window.digitalData.page[`level${levelNum}`]);
    
    if (Array.isArray(breadcrumbArr)) {
      breadcrumbBuilder.stylizeMap(breadcrumbArr);
    }
    // mergedTrackingAttributesArr.forEach((trackingAttribute, i) => {
    //   switch (i) {
    //     case numberOfValues - 1:
    //       currentElement.setAttribute('data-track-verb', trackingAttribute);
    //       break;
    //     case numberOfValues - 2:
    //       currentElement.setAttribute('data-track-noun', trackingAttribute);
    //       break;
    //     default:
    //       currentElement.setAttribute(`data-track-component-level-${i + 1}`, trackingAttribute);
    //   }
    // });



    // getTrackingAttributes: (currentElement, parentTrackingAttributes) => {
    //   parentTrackingAttributes = (!!parentTrackingAttributes && Array.isArray(parentTrackingAttributes)) ? parentTrackingAttributes : [];
    //   const existingTrackingAttributes = [];
  
    //   let level = 1;
    //   let parentComponentLevelX = '';
    //   do {
    //     parentComponentLevelX = currentElement.getAttribute(`data-track-component-level-${level}`);
    //     if (!!parentComponentLevelX) {
    //       existingTrackingAttributes.push(parentComponentLevelX);
    //     }
    //     level++;
    //   } while (!!currentElement.getAttribute(`data-track-component-level-${level}`));
  
    //   const dataTrackNoun = currentElement.getAttribute('data-track-noun');
    //   if (!!dataTrackNoun && dataTrackNoun !== 'no-title') {
    //     existingTrackingAttributes.push(dataTrackNoun);
    //   }
  
    //   const dataTrackVerb = currentElement.getAttribute('data-track-verb');
    //   if (!!dataTrackVerb && dataTrackVerb !== 'no-title') {
    //     existingTrackingAttributes.push(dataTrackVerb);
    //   }
  
    //   const dataTrackComponentAttributesSet = currentElement.getAttribute('data-track-component-attributes-set');
    //   if (
    //     !!dataTrackComponentAttributesSet &&
    //     dataTrackComponentAttributesSet === 'true'
    //   ) {
    //     aemComponentTracking.checkChildren(currentElement, existingTrackingAttributes);
    //   } else {
    //     aemComponentTracking.mergeTrackingAttributes(currentElement, existingTrackingAttributes, parentTrackingAttributes);
    //   }
    // },
  },
  init: () => {
    // Don't know if I need this layer.
    // Dynamically grab however many page levels there are, and push each one into an array.
    breadcrumbBuilder.getPageLevels();
    // Convert each item in the array to Capital and spaces, and create a relative link for all except the final one.
    // Push each one into breadcrumbsFlexItem.innerHTML
  },
}

if (
  pageLevel1 !== 'home' &&
  !!nav
) {
  breadcrumbBuilder.init();
}