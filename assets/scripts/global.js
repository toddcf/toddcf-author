// In a future branch: Restrict the dynamic links (where .html is removed, etc.) to just navigational links in the site (not external).  This may mean that each link needs a data attribute that helps determine which type of link it is.  data-link="nav", or something to that effect.

let env = '';
let root = ''; // I think this is necessary for normalizing pathname and destination pathnames before counting their slashes.
let pathname = window.location.pathname; // Perhaps consolidate the way this is leveraged and reassigned between the header and footer.

// Determine Environment:
switch (window.location.host) {
  case 'toddcf.com':
    env = 'prod';
    break;
  case 'toddcf.github.io':
  case 'toddcf-author.github.io':
    env = 'gh-pages';
    break;
  default:
    // window.location.host will be an empty string for local.
    env = 'local';
    root = 'toddcf/';
}

// Create Data Layer:
window.digitalData = {};
window.digitalData.page = {};
switch (env) {
  case 'prod':
    switch (pathname) {
      case '/':
        window.digitalData.page.level1 = 'home';
        break;
      case '/about':
        window.digitalData.page.level1 = 'about';
        break;
    }
    break;
  case 'gh-pages':
    switch (pathname) {
      case '/toddcf-author/':
        window.digitalData.page.level1 = 'home';
        break;
      case '/toddcf-author/about':
        window.digitalData.page.level1 = 'about';
        break;
      case '/toddcf-author/fiction/novels/catch-up-to-myself/':
        window.digitalData.page.level1 = 'fiction';
        window.digitalData.page.level2 = 'novels';
        window.digitalData.page.level3 = 'catch-up-to-myself';
        break;
      case '/toddcf-author/fiction/short-stories/the-druggist/':
        window.digitalData.page.level1 = 'fiction';
        window.digitalData.page.level2 = 'short-stories';
        window.digitalData.page.level3 = 'the-druggist';
        break;
    }
    break;
  case 'local':
    //if (pathname.substring(pathname.length, pathname.length -18) === '/toddcf/index.html') {
    if (pathname.includes('/toddcf/index.html')) {
      window.digitalData.page.level1 = 'home';
    } else if (pathname.includes('/toddcf/about.html')) {
      window.digitalData.page.level1 = 'about';
    } else if (pathname.includes('/bonus-content/')) {
      window.digitalData.page.level1 = 'bonus-content';
      if (pathname.includes('/index.html')) {
        window.digitalData.page.level2 = 'registration';
      } else if (pathname.includes('/confirmation.html')) {
        window.digitalData.page.level2 = 'confirmation';
      }
    } else if (pathname.includes('/contact/')) {
      window.digitalData.page.level1 = 'contact';
      if (pathname.includes('/index.html')) {
        window.digitalData.page.level2 = 'form';
      } else if (pathname.includes('/confirmation.html')) {
        window.digitalData.page.level2 = 'confirmation';
      }
    } else if (pathname.includes('/fiction/')) {
      window.digitalData.page.level1 = 'fiction';
      if (pathname.includes('/music.html')) {
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
    break;
}
const pageLevel1 = window.digitalData?.page?.level1;
const pageLevel2 = window.digitalData?.page?.level2;
const pageLevel3 = window.digitalData?.page?.level3;
const pageLevel4 = window.digitalData?.page?.level4;
// Later, put the data layer in sessionStorage and then on each page load try to retrieve it before either editing it or creating it from scratch.


// THESE ARE GETTING TRIPPED UP ON SUB-ROOT INDEX FILES, BUT THIS WHOLE THING SHOULD GET ROLLED INTO THE 'GETRELATIVEPATH' FUNCTION BELOW, ANYWAY.
let levels;
let assets = '';

if (env === 'prod') {
  levels = (pathname === '/') ? 0 : pathname.match(/\//g).length;
} else {
  // If Local File or GH-Pages:
  pathname = pathname.slice(pathname.indexOf('toddcf/'));
  levels = pathname.match(/\//g).length - 1;
}
// Will probably have to add a gh-pages condition, too. Create gh-pages branch next.

for (levels; levels > 0; levels--) {
  assets += '../';
}
assets += 'assets';


// Before creating the Nav, determine the paths to the root, etc.
// Add ability for Nav to figure out if it needs to go up (or down) a directory level for the href value.
  // Local env use cases:
    // 1. Homepage: /C:/Users/toddc/Documents/code/webdesign/toddcf-author-site/github/toddcf/index.html
    // 2. About: /C:/Users/toddc/Documents/code/webdesign/toddcf-author-site/github/toddcf/about.html
    // 3. Bonus Content (Registration): /C:/Users/toddc/Documents/code/webdesign/toddcf-author-site/github/toddcf/bonus-content/index.html
    // 4. Bonus Content (Confirmation): /C:/Users/toddc/Documents/code/webdesign/toddcf-author-site/github/toddcf/bonus-content/confirmation.html
    // 5. Contact (Form): /C:/Users/toddc/Documents/code/webdesign/toddcf-author-site/github/toddcf/contact/index.html
    // 6. Contact (Confirmation): /C:/Users/toddc/Documents/code/webdesign/toddcf-author-site/github/toddcf/contact/confirmation.html
    // 7. Catch Up To Myself: /C:/Users/toddc/Documents/code/webdesign/toddcf-author-site/github/toddcf/fiction/novels/catch-up-to-myself/index.html
    // 8. Catch Up To Myself Music: /C:/Users/toddc/Documents/code/webdesign/toddcf-author-site/github/toddcf/fiction/novels/catch-up-to-myself/music.html
    // 9. The Druggist: /C:/Users/toddc/Documents/code/webdesign/toddcf-author-site/github/toddcf/fiction/short-stories/the-druggist/index.html
    // 10. The Druggist Music: /C:/Users/toddc/Documents/code/webdesign/toddcf-author-site/github/toddcf/fiction/short-stories/the-druggist/music.html
    // 11. Email Thanks (to be deprecated): /C:/Users/toddc/Documents/code/webdesign/toddcf-author-site/github/toddcf/email-thanks.html
  // Will probably need to count the number of slashes in the pathname from the host forward.  Or, if not from the host, then from whatever location you're trying to get to, forward.  That count becomes your "levels" value.
  // Function must first take its current pathname.  Then it must figure out and return the route from that pathname to each destination pathname in the nav.
  // Pass in the full destination path, starting from the root, and *without* the initial slash:
  const getRelativePath = (dest) => {
  // from pathname (already stored in global variable)
  // Remove root from pathname to normalize it with the dest pathname:
  pathname = pathname.substring(root.length);
  console.log('Pathname:', pathname);
  // Count the number of slashes from the root forward in the current pathname:
  const fromSlashes = pathname.match(/\//g).length;
  console.log('fromSlashes:', fromSlashes);
  console.log('dest:', dest);
  //Count the number of slashes from the root forward in the dest pathname:
  let toSlashes = dest.match(/\//g);
  if (!!toSlashes) {
    toSlashes = toSlashes.length;
    // if (toSlashes < 2) {
    //   toSlashes = 0;
    // }
  } else {
    // If there were no slashes and .match returned "null":
    toSlashes = 0;
  }
  console.log('toSlashes:', toSlashes);
  let diffSlashes = fromSlashes - toSlashes;
  if (diffSlashes > 0) {
    // If there are more slashes in the "from" than the "to," the destination is "up" the tree.  Prepend the same number of "../" to the "to" path as there are more slashes in the "from" filepath.
    let dots = '';
    for (diffSlashes; diffSlashes > 0; diffSlashes--) {
      dots += '../';
    }
    console.log('dots:', dots);
    dest = dots + dest;
  } else {
    // If there are equal (zero) or fewer slashes in the "from" than the "to," the destination is "equal" or "down" the tree.  Just prepend a slash:
    dest = `/${dest}`; // Do we want the slash or not?  We may not.
  }
  // return relative path:
  dest += '.html'; // Adding .html is just for local, I think.  Once I know that the next function properly appends (or does not append) these according to environment, remove it here.  This is just for testing in local right now.
  console.log('Dest:', dest);
  return dest;
}


const createNav = () => {
  const nav = document.querySelector('nav');
  let menu = ``;
  const addMenuItem = (pageLevel, thisPage, hrefCore, linkText) => {
    if (pageLevel !== thisPage) {
      // The hrefCore insert needs to calculate more of the path than just what is passed in.  For example, About and Contact are on the same level, so those work.  But Bonus Content is in a subdirectory, and doesn't know to go up a level.
      menu += `<li class="nav__list_item"><a href="${getRelativePath(hrefCore)}"><p class="nav__list_item-p">${linkText}</p></a></li>`;
    }
  }
  addMenuItem(pageLevel1, 'home', 'index', 'Home'); // Make sure to pass in the full pathname so that this is not a problem if the user is in a subdirectory that also contains an index file.
  // addMenuItem(pageLevel1, 'about', 'about', 'About the Author');
  // addMenuItem(pageLevel1, 'contact', 'contact/index', 'Contact');
  // addMenuItem(pageLevel1, 'bonus-content', 'bonus-content/index', 'Bonus Content');
  // addMenuItem(pageLevel3, 'catch-up-to-myself', 'fiction/novels/catch-up-to-myself/index', 'Catch Up To Myself');
  // addMenuItem(pageLevel3, 'the-druggist', 'fiction/short-stories/the-druggist/index', 'The Druggist');
  
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
let siteLinks = Array.from(document.querySelectorAll('a')); // Limit these to just internal links.
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

// Add CSS Links:
const createCSSlink = (filename) => {
  const cssLink = document.createElement('link');
  cssLink.rel = 'stylesheet';
  cssLink.type = 'text/css';
  cssLink.href = `${assets}/styles/${filename}.css`;
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
        createCSSlink('bonus-content');
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