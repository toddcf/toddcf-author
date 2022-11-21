// In a future branch: Restrict the dynamic links (where .html is removed, etc.) to just navigational links in the site (not external).  This may mean that each link needs a data attribute that helps determine which type of link it is.  data-link="nav", or something to that effect.

let env = '';
let root = window.location.host;
console.log('root:', root);
let pathname = window.location.pathname; // Perhaps consolidate the way this is leveraged and reassigned between the header and footer.

// Set Environment, then normalize pathname and root:
switch (root) {
  case 'toddcf.com':
    env = 'prod';
    break;
  case 'toddcf.github.io':
    env = 'gh-pages';
    root = '/toddcf-author/';
    pathname = pathname.slice(root.length - 1); // Remove the root from the pathname (except for the slash).  (NOTE: This line could be identical to its 'local' counterpart, it's just that getting the index of the root was always going to be '0' in 'gh-pages', so I took that out.)
    break;
  default:
    // window.location.host will be an empty string for local.
    env = 'local';
    root = '/toddcf-author/';
    pathname = pathname.slice(pathname.indexOf(root) + root.length - 1); // Remove the root from the pathname (except for the slash).
    pathname = pathname.slice(0, pathname.length - 5); // Remove .html -- TRY COMBINING THIS WITH THE LINE ABOVE.
    if (pathname === '/index') {
      pathname = '/'; // Make this dynamic so that ANY pathname that ENDS with 'index' gets it removed.
    }
}

const levelCount = pathname.match(/\//g).length - 1; // Counts number of slashes in pathnames. Used to set relative paths.  Must be done after pathname variable is normalized.
console.log('env:', env);
console.log('root:', root);
console.log('pathname:', pathname);
console.log('levelCount:', levelCount);

// Create Data Layer and set page levels:
// SEE IF I CAN JUST DYNAMICALLY BUILD THE LEVELS BASED ON THE SLASHES INSTEAD.  PROBABLY JUST THE ROOT AND ANY "INDEX" FILES WILL NEED SPECIAL HANDLING.
window.digitalData = {};
window.digitalData.page = {};
if (pathname === '/') {
  window.digitalData.page.level1 = 'home';
} else if (pathname === '/about') {
  window.digitalData.page.level1 = 'about';
} else if (pathname.includes('/bonus-content')) {
  window.digitalData.page.level1 = 'bonus-content';
  window.digitalData.page.level2 = (pathname.includes('confirmation')) ? 'confirmation' : 'registration';
} else if (pathname.includes('/contact/')) {
  window.digitalData.page.level1 = 'contact';
  window.digitalData.page.level2 = (pathname.includes('confirmation')) ? 'confirmation' : 'form';
} else if (pathname.includes('/fiction/')) {
  window.digitalData.page.level1 = 'fiction';
  if (pathname.includes('/music')) {
    window.digitalData.page.level4 = 'music';
  }
  if (pathname.includes('/novels/')) {
    window.digitalData.page.level2 = 'novels';
    if (pathname.includes('/catch-up-to-myself/')) {
      window.digitalData.page.level3 = 'catch-up-to-myself';
    }
  } else if (pathname.includes('/short-stories/')) {
    window.digitalData.page.level2 = 'short-stories';
    if (pathname.includes('/the-druggist/')) {
      window.digitalData.page.level3 = 'the-druggist';
    }
  }
}
const pageLevel1 = window.digitalData?.page?.level1;
const pageLevel2 = window.digitalData?.page?.level2;
const pageLevel3 = window.digitalData?.page?.level3;
const pageLevel4 = window.digitalData?.page?.level4;
// If the data layer ever evolves beyond page levels, put it in sessionStorage and then on each page load try to retrieve it before either editing it or creating it from scratch.

// Before creating the Nav, determine the paths to the root, etc.
// Add ability for Nav to figure out if it needs to go up (or down) a directory level for the href value.
// Local env use cases:
  // 1. Homepage: /C:/Users/toddc/Documents/code/webdesign/toddcf-author-site/github/toddcf/index.html
  // 2. About: /C:/Users/toddc/Documents/code/webdesign/toddcf-author-site/github/toddcf/about.html
  // 3. Bonus Content (Registration): /C:/Users/toddc/Documents/code/webdesign/toddcf-author-site/github/toddcf/bonus-content/index.html
  // 4. Bonus Content (Confirmation): /C:/Users/toddc/Documents/code/webdesign/toddcf-author-site/github/toddcf/bonus-content/confirmation.html
  // 5. Contact (Form): /C:/Users/toddc/Documents/code/webdesign/toddcf-author-site/github/toddcf/contact/index.html
  // 6. Contact (Confirmation): /C:/Users/toddc/Documents/code/webdesign/toddcf-author-site/github/toddcf/contact/confirmation.html
  // 7. Fiction (Hub): Doesn't exist yet.
  // 8. Catch Up To Myself: /C:/Users/toddc/Documents/code/webdesign/toddcf-author-site/github/toddcf/fiction/novels/catch-up-to-myself/index.html
  // 9. Catch Up To Myself Music: /C:/Users/toddc/Documents/code/webdesign/toddcf-author-site/github/toddcf/fiction/novels/catch-up-to-myself/music.html
  // 10. The Druggist: /C:/Users/toddc/Documents/code/webdesign/toddcf-author-site/github/toddcf/fiction/short-stories/the-druggist/index.html
  // 11. The Druggist Music: /C:/Users/toddc/Documents/code/webdesign/toddcf-author-site/github/toddcf/fiction/short-stories/the-druggist/music.html
  // 12. Email Thanks (to be deprecated): /C:/Users/toddc/Documents/code/webdesign/toddcf-author-site/github/toddcf/email-thanks.html
// Pass in the full destination path, starting from the root, and *without* the initial slash:
const setRelativePath = (absolutePath, filetype) => {
  let pathToRoot = '';
  for (i = levelCount; i > 0; i--) {
    pathToRoot += '../';
  }
  console.log('pathToRoot:', pathToRoot);
  // return relative dest path:
  let relativePath = pathToRoot + absolutePath;
  if (
    env === 'local'
    || (env !== 'local' && filetype !== '.html')
  ) {
    relativePath += filetype; // Adding .html is just for local && .html files.  But we do want to add .css, etc. for all environments.
  }
  console.log('relativePath:', relativePath);
  return relativePath;
}


const createNav = () => {
  const nav = document.querySelector('nav');
  let menu = ``;
  const addMenuItem = (pageLevel, thisPage, absolutePath, linkText) => {
    if (pageLevel !== thisPage) {
      // The hrefCore insert needs to calculate more of the path than just what is passed in.  For example, About and Contact are on the same level, so those work.  But Bonus Content is in a subdirectory, and doesn't know to go up a level.
      menu += `<li class="nav__list_item"><a href="${setRelativePath(absolutePath, '.html')}"><p class="nav__list_item-p">${linkText}</p></a></li>`;
    }
  }
  addMenuItem(pageLevel1, 'home', 'index', 'Home');
  addMenuItem(pageLevel1, 'about', 'about', 'About the Author');
  addMenuItem(pageLevel1, 'contact', 'contact/index', 'Contact');
  addMenuItem(pageLevel1, 'bonus-content', 'bonus-content/index', 'Bonus Content');
  addMenuItem(pageLevel3, 'catch-up-to-myself', 'fiction/novels/catch-up-to-myself/index', 'Catch Up To Myself');
  addMenuItem(pageLevel3, 'the-druggist', 'fiction/short-stories/the-druggist/index', 'The Druggist');
  
  nav.innerHTML = `
    <div class="nav__flexbox_sub">
      <button class="nav__menu_button">
        <ion-icon name="menu-outline" class="nav__menu-icon"></ion-icon>
      </button>
    </div>
    <ul class="nav__list collapsed">${menu}</ul>`;
}
if (pageLevel1 !== 'home') {
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

// Dynamic Links
let siteLinks = Array.from(document.querySelectorAll('a')); // Limit these to just internal links.  IN FACT, MAYBE DELETE THIS WHOLE CODE BLOCK AND SIMPLY USE 'SETRELATIVEPATH' FOR ALL EXISTING LINKS ON THE PAGE, TOO?
const modifyHref = (siteLink) => {
  if (siteLink.href.slice(-5) === 'index') {
    switch (env) {
      case 'prod':
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
  // Add space on both pageLoad and window resize:
  addSpaceBelowMainHeader();
  window.addEventListener('resize', addSpaceBelowMainHeader);
}

// Footer
const thisYear = new Date().getFullYear();

// For the footer, maybe I should hardcode an empty footer element into each page's HTML.  Then I can give it a class if I want the full-blown dynamic footer built and inserted, and leave the class off if I just want the copyright date inserted.  That would be a little more dynamic than hardcoding a check for the homepage -- if I ever add another page later where I don't want the full-blown footer, it will be built automatically.
if (pageLevel1 !== 'home') {
  const footerEl = document.createElement('footer');
  footerEl.classList.add('footer');
  footerEl.innerHTML = `<section class="footer__section">
  <div class="footer__icon_flexbox">
    <a href="https://www.facebook.com/toddcf.writer/" target="_blank"><img src="${setRelativePath('assets/images/icons/facebook/facebook-20', '.png')}" alt="Facebook Author Page" class="footer__icon"></a>
    <a href="https://www.amazon.com/Todd-Croak-Falen/e/B003A1UF3I/ref=sr_ntt_srch_lnk_1?qid=1499390370&sr=8-1" target="_blank"><img src="${setRelativePath('assets/images/icons/amazon/amazon_a_ding', '.png')}" alt="Amazon Author Page" class="footer__icon"></a>
    <a href="https://www.goodreads.com/toddcf" target="_blank"><img src="${setRelativePath('assets/images/icons/goodreads/goodreads', '.png')}" alt="Goodreads Author Page" class="footer__icon"></a>
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
const createCSSlink = (filename) => {
  const cssLink = document.createElement('link');
  cssLink.rel = 'stylesheet';
  cssLink.type = 'text/css';
  cssLink.href = setRelativePath(`assets/styles/${filename}`, '.css');
  document.querySelector('head').appendChild(cssLink);
}

// Attach global CSS links:
createCSSlink('global');
createCSSlink('fonts');
if (pageLevel1 !== 'home') {
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
  case 'about':
    createCSSlink('about');
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
  case 'fiction':
  case 'nonfiction':
    if (pageLevel4 === 'music') {
      createCSSlink(pageLevel4);
      createCSSlink(`${pageLevel4}-${pageLevel3}`);
    } else {
      createCSSlink('projects'); // NOTE: I don't think the Music pages need the 'projects' CSS file.
      createCSSlink(pageLevel3); // NOTE: I don't think the Music pages need the book title CSS file.
    }
    break;
}



// HERE: Create all favicon links and add them to the page.




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
//     <li class="nav__list_item"><a href="about"><p class="nav__list_item-p">About the Author</p></a></li>
//     <li class="nav__list_item"><a href="contact"><p class="nav__list_item-p">Contact</p></a></li>
//     <li class="nav__list_item"><a href="bonus-content/index"><p class="nav__list_item-p">Bonus Content</p></a></li>
//     <!-- See https://html.spec.whatwg.org/#the-nav-element -->
//   </ul>
//   <!-- <ul class="main-nav js--main-nav">
//   </ul> -->`