// NEXT ACTIONS:
// Test static links in gh-pages.  (They seem to be working in local; just need to confirm in gh-pages and make any tweaks necessary.)

// In a future branch: Restrict the dynamic links (where .html is removed, etc.) to just navigational links in the site (not external).  This may mean that each link needs a data attribute that helps determine which type of link it is.  data-link="nav", or something to that effect.

// Host fonts myself.

// Remove all jQuery and replace Waypoints.

let env = '';
let root = window.location.host;
console.log('window.location.host root:', root);
let pathname = window.location.pathname; // Perhaps consolidate the way this is leveraged and reassigned between the header and footer.

// Set Environment, then standardize pathname and root:
switch (root) {
  case 'toddcf.com':
    env = 'prod';
    break;
  case 'toddcf.github.io':
    env = 'gh-pages';
    root = '/toddcf-author/';
    pathname = pathname.slice(root.length - 1); // Remove the root from the pathname (except for the slash).  (NOTE: This line could be identical to its 'local' counterpart, it's just that getting the index of the root was always going to be '0' in 'gh-pages', so I took that out.)
    if (pathname.slice(-6) === '/index') {
      pathname = pathname.slice(0, pathname.length - 5); // Remove 'index' from the end of any pathname.
    }
    break;
  default:
    // window.location.host will be an empty string for local.
    env = 'local';
    root = '/toddcf-author/';
    pathname = pathname.slice(pathname.indexOf(root) + root.length - 1); // Remove the root from the pathname (except for the slash).
    pathname = pathname.slice(0, pathname.length - 5); // Remove .html -- TRY COMBINING THIS WITH THE LINE ABOVE.
    if (pathname.slice(-6) === '/index') {
      pathname = pathname.slice(0, pathname.length - 5); // Remove 'index' from the end of any pathname.
    }
}

const levelCount = pathname.match(/\//g).length - 1; // Counts number of slashes in pathnames. Used to set relative paths.  Must be done after pathname variable is normalized.
let pathToRoot = '';
for (i = levelCount; i > 0; i--) {
  pathToRoot += '../';
}
console.log('env:', env);
console.log('Standardized root:', root);
console.log('pathname:', pathname);
console.log('levelCount:', levelCount);
console.log('pathToRoot:', pathToRoot);

// Create Data Layer:
window.digitalData = {};

window.global = {
  kebabCase: (str) => {
    // For the following, test if the HTML codes such as &ldquo; will get stripped out correctly or not.  If not, the string probably needs to be converted to something else first.
    let conversion;
    
    if (typeof str === 'string') {
      // Convert everything to lowercase:
      conversion = str.toLowerCase();
      // Remove specific character codes completely (listed alphabetically):
      conversion = conversion.replace('&ldquo;', '');
      conversion = conversion.replace('&lsquo;', '');
      conversion = conversion.replace('&rdquo;', '');
      conversion = conversion.replace('&rsquo;', '');
      // Convert specific character codes to words:
      conversion = conversion.replace('&amp;', '-and-'); // Hyphens are in case there are no spaces around the ampersand. Multiple hyphens will be removed at the end.
      // Convert specific character codes to hyphens (listed alphabetically):
      conversion = conversion.replace('&copy;', '-');
      conversion = conversion.replace('&gt;', '-');
      conversion = conversion.replace('&lt;', '-');
      conversion = conversion.replace('&mdash;', '-');
      conversion = conversion.replace('&nbsp;', '-');
      conversion = conversion.replace('&ndash;', '-');
      // Convert all remaining special characters (and spaces) to hyphens:
      conversion = conversion.replace(/[^a-z0-9]/g, '-');
      // Only one hyphen in a row:
      conversion = conversion.replace(/-+/g, '-');
      // No hyphens at beginning of string:
      if (conversion[0] === '-') {
        conversion = conversion.substr(1);
      }
      // No hyphens at end of string:
      if (conversion.slice(conversion.length - 1) === '-') {
        conversion = conversion.substring(0, conversion.length - 1);
      }
      return conversion;
    }
  },  
  digitalDataBuilder: () => {
    console.log('window.global.digitalDataBuilder function invoked.');
  },
  setRelativePath: (absolutePath, filetype) => {
    // Pass in the full destination path, starting from the root, and *without* the initial slash.
    // Determine relative dest path:
    let relativePath = pathToRoot + absolutePath;
    if (
      !!filetype
      && env === 'local'
      || (env !== 'local' && filetype !== '.html')
    ) {
      relativePath += filetype; // Adding .html is just for local && .html files.  But we do want to add .css, etc. for all environments.
    }
    console.log('relativePath:', relativePath);
    return relativePath;
  },
  elementBuilder: (filepath, filepathType, fileExt, placement, async) => {
    console.log('window.global.elementBuilder function invoked.');
    let el;
    let dynamicFilepath;

    if (typeof filepath === 'string' && typeof filepathType === 'string') {
      switch(filepathType) {
        case 'relative':
          dynamicFilepath = window.global.setRelativePath(filepath);
          break;
        case 'absolute':
          dynamicFilepath = filepath;
          break;
      }
    }

    // Create element and set all attributes according to file extenstion type:
    switch(fileExt) {
      case 'js':
        el = document.createElement('script');
        el.setAttribute('src', `${dynamicFilepath}.js`);
        el.setAttribute('type', 'text/javascript');
        if (async === true) {
          el.setAttribute('async', true);
        }
        break;
      case 'css':
        el = document.createElement('link');
        el.setAttribute('href', `${dynamicFilepath}.css`);
        el.setAttribute('rel', 'stylesheet');
        el.setAttribute('type', 'text/css');
        break;
    }
    
    // Attach element to DOM:
    if (!!el && typeof placement === 'string') {
      document[placement].appendChild(el);
    }
  },
  titleBuilder: () => {
    console.log('window.global.titleBuilder function invoked.');
  },
};


// Set page levels -- but refactor to using window.global.digitalDataBuilder:
window.digitalData.page = {};
let pathnameArr; // Also create a place to store the pathname in the data layer.
if (pathname === '/') {
  // If Homepage, hardcode its page level:
  window.digitalData.page.level1 = 'home';
} else {
  // For all other pages, build the page levels dynamically:
  // First, convert the pathname into an array:
  pathnameArr = pathname;
  if (pathname[0] === '/') {
    pathnameArr = pathnameArr.slice(1); // If there is an initial slash, remove it.
  }
  if (pathname[pathname.length -1] === '/') {
    pathnameArr = pathnameArr.slice(0, -1); // If there is an ending slash, remove it.
  }
  console.log('pathname for array:', pathnameArr);
  pathnameArr = pathnameArr.split('/');
  console.log('pathnameArr:', pathnameArr);

  // Next, assign each array value to a page level:
  pathnameArr.forEach( function(levelValue, i) {
    window.digitalData.page[`level${i + 1}`] = levelValue;
  });
}

// Refactor this to programatically set however many page levels there wind up being:
const pageLevel1 = window.digitalData?.page?.level1;
const pageLevel2 = window.digitalData?.page?.level2;
const pageLevel3 = window.digitalData?.page?.level3;
const pageLevel4 = window.digitalData?.page?.level4;

// Load Titles script if this is a Title page:
if (pageLevel1 === 'titles' && !!pageLevel2) {
  window.global.elementBuilder('assets/scripts/titles', 'relative', 'script', 'body', true); // Need additional logic to drill a level deeper if this is a series.  Also, Page Level 1 alone may or may not be a good idea, given that this will load the Titles script on Music pages, as well.
}

// First build the data layer, then use those values in the logic to dynamically build the Nav:
const createNav = () => {
  const nav = document.querySelector('nav');
  let menu = ``;
  const addMenuItem = (pageLevel, thisPage, absolutePath, linkText) => {
    if (pageLevel !== thisPage) {
      menu += `<li class="nav__list_item"><a href="${window.global.setRelativePath(absolutePath, '.html')}"><p class="nav__list_item-p">${linkText}</p></a></li>`;
    }
  }
  addMenuItem(pageLevel1, 'home', 'index', 'Home');
  addMenuItem(pageLevel1, 'about-me', 'about-me', 'About Me');
  addMenuItem(pageLevel1, 'contact', 'contact/form', 'Contact');
  addMenuItem(pageLevel1, 'bonus-content', 'bonus-content/registration', 'Bonus Content');
  addMenuItem(pageLevel2, 'catch-up-to-myself', 'titles/catch-up-to-myself/index', 'Catch Up To Myself');
  addMenuItem(pageLevel2, 'the-druggist', 'titles/the-druggist/index', 'The Druggist');
  
  nav.innerHTML = `
    <div class="nav__flexbox_sub">
      <button class="nav__menu_button">
        <ion-icon name="menu-outline" class="nav__menu-icon"></ion-icon>
      </button>
    </div>
    <ul class="nav__list collapsed">${menu}</ul>`;
}
if (!!pageLevel1 && pageLevel1 !== 'home') {
  createNav();
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
const staticNavLinks = Array.from(document.querySelectorAll('[data-nav-link-type="static"]'));
if (!!staticNavLinks && Array.isArray(staticNavLinks)) { staticNavLinks.forEach(modifyHref) };

const addSpaceBelowMainHeader = () => {
  const mainHeader = document.querySelector('.main-header');
  const mainHeaderHeight = mainHeader.clientHeight;
  const secondEl = document.body.children[1];
  secondEl.style.margin = `${mainHeaderHeight + 20}px 0 0 0`; // The goal is going to be to convert an em value to px and add it to the mainHeaderHeight.
}

if (!!pageLevel1 && pageLevel1 !== 'home') {
  // Add space on both pageLoad and window resize:
  addSpaceBelowMainHeader();
  window.addEventListener('resize', addSpaceBelowMainHeader);
}

// Footer
const thisYear = new Date().getFullYear();

// For the footer, maybe I should hardcode an empty footer element into each page's HTML.  Then I can give it a class if I want the full-blown dynamic footer built and inserted, and leave the class off if I just want the copyright date inserted.  That would be a little more dynamic than hardcoding a check for the homepage -- if I ever add another page later where I don't want the full-blown footer, it will be built automatically.
if (!!pageLevel1 && pageLevel1 !== 'home') {
  const footerEl = document.createElement('footer');
  footerEl.classList.add('footer');
  footerEl.innerHTML = `<section class="footer__section">
  <div class="footer__icon_flexbox">
    <a href="https://www.facebook.com/toddcf.writer/" target="_blank"><img src="${window.global.setRelativePath('assets/images/icons/facebook/facebook-20', '.png')}" alt="Facebook Author Page" class="footer__icon"></a>
    <a href="https://www.amazon.com/Todd-Croak-Falen/e/B003A1UF3I/ref=sr_ntt_srch_lnk_1?qid=1499390370&sr=8-1" target="_blank"><img src="${window.global.setRelativePath('assets/images/icons/amazon/amazon_a_ding', '.png')}" alt="Amazon Author Page" class="footer__icon"></a>
    <a href="https://www.goodreads.com/toddcf" target="_blank"><img src="${window.global.setRelativePath('assets/images/icons/goodreads/goodreads', '.png')}" alt="Goodreads Author Page" class="footer__icon"></a>
  </div>
  </section>

  <section class="footer__section">
    <p class="copyright font_size_body footer_p">We are a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for us to earn fees by linking to Amazon.com and affiliated sites.</p>
    <p class="font_size_body footer_p">Website by <a href="https://www.tcf-webdesign.com" target="_blank" class="footer__text-link"> TCF Web Design</a></p>
    <p class="copyright font_size_body footer_p">Copyright &copy; 2008 ${(!!thisYear) ? `&ndash; ${thisYear} ` : ''}Todd Croak-Falen</p>
  </section>`;
  document.body.appendChild(footerEl);
} else if (!!thisYear) {
  const currentYearHTML = document.querySelector('.currentYear');
  if (!!currentYearHTML) {
    currentYearHTML.innerHTML = `&ndash; ${thisYear} `; // Homepage
  }
}

// Add CSS Links:
// REFACTOR TO USE WINDOW.GLOBAL.ELEMENTBUILDER, AND CONSOLIDATE THIS WITH THE FAVICON FUNCTION.
const createCSSlink = (filename) => {
  const cssLink = document.createElement('link');
  cssLink.rel = 'stylesheet';
  cssLink.type = 'text/css';
  cssLink.href = window.global.setRelativePath(`assets/styles/${filename}`, '.css');
  document.querySelector('head').appendChild(cssLink);
}

// Attach global CSS links:
createCSSlink('global');
createCSSlink('grid');
createCSSlink('fonts');
if (!!pageLevel1 && pageLevel1 !== 'home') {
  createCSSlink('nav');
  createCSSlink('ionicons.min');
  createCSSlink('footer');
}

// Attach specific CSS links based on page levels:
// An even better way to do this will be to give each CSS file the same name as a page level, and then programmatically add any file for page levels that exist.
switch (pageLevel1) {
  case 'home':
    createCSSlink('index');
    break;
  case 'about-me':
    createCSSlink('about-me');
    break;
  case 'bonus-content':
    switch (pageLevel2) {
      case 'registration':
        // createCSSlink('bonus-content-deprecated');
        break;
      case 'confirmation':
        // The new page is not created yet.
        break;
    }
    break;
  case 'contact':
    switch (pageLevel2) {
      case 'form':
        createCSSlink('contact');
        break;
      case 'confirmation':
        break;
    }
    break;
  case 'titles':
    if (pageLevel3 === 'music') {
      createCSSlink(pageLevel3);
      createCSSlink(`${pageLevel3}-${pageLevel2}`);
    } else {
      createCSSlink('projects'); // NOTE: I don't think the Music pages need the 'projects' CSS file.
      createCSSlink(pageLevel2); // NOTE: I don't think the Music pages need the book title CSS file.
    }
    break;
}

// Create all favicon links and add them to the page.
const createFaviconTag = (createEl, elType, rel, sizes, hrefFilename, color, tagName, content) => {
  const faviconTag = document.createElement(createEl);
  if (!!elType) {faviconTag.setAttribute('type', elType)}
  if (!!rel) {faviconTag.setAttribute('rel', rel)}
  if (!!sizes) {faviconTag.setAttribute('sizes', sizes)}
  if (!!hrefFilename) {faviconTag.setAttribute('href', `${pathToRoot}assets/images/favicon/${hrefFilename}`)}
  if (!!color) {faviconTag.setAttribute('color', color)}
  if (!!tagName) {faviconTag.setAttribute('name', tagName)}
  if (!!content) {faviconTag.setAttribute('content', content)}
  document.head.append(faviconTag);
}

createFaviconTag('link', null, 'apple-touch-icon', '180x180', 'apple-touch-icon.png', null, null, null);
createFaviconTag('link', 'image/png', 'icon', '32x32', 'favicon-32x32.png', null, null, null);
createFaviconTag('link', 'image/png', 'icon', '16x16', 'favicon-16x16.png', null, null, null);
createFaviconTag('link', null, 'manifest', null, 'site.webmanifest', null, null, null);
createFaviconTag('link', null, 'mask-icon', null, 'safari-pinned-tab.svg', '#000', null, null);
createFaviconTag('meta', null, null, null, null, null, 'msapplication-TileColor', '#000');
createFaviconTag('meta', null, null, null, null, null, 'theme-color', '#FFF');

// USE CASES:
// Test everything in local, gh-pages, and prod.
// anchor tag "buttons"
// anchor tag text links
// buttons


// Nav for reference:
// nav.innerHTML = `
//   <div class="nav__flexbox_sub">
//     <button class="nav__menu_button">
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