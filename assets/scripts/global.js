// NEXT ACTIONS:
// Test static links in gh-pages.  (They seem to be working in local; just need to confirm in gh-pages and make any tweaks necessary.)
// Then fix all the music image file links.

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

// Create Data Layer and set page levels:
window.digitalData = {};
window.digitalData.page = {};
let pathnameArr;
if (pathname === '/') {
  // If Homepage, hardode its page level:
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

const pageLevel1 = window.digitalData?.page?.level1;
const pageLevel2 = window.digitalData?.page?.level2;
const pageLevel3 = window.digitalData?.page?.level3;
const pageLevel4 = window.digitalData?.page?.level4;
// If the data layer ever evolves beyond page levels, put it in sessionStorage and then on each page load try to retrieve it before either editing it or creating it from scratch.

// Pass in the full destination path, starting from the root, and *without* the initial slash:
const setRelativePath = (absolutePath, filetype) => {
  // return relative dest path:
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
}


const createNav = () => {
  const nav = document.querySelector('nav');
  let menu = ``;
  const addMenuItem = (pageLevel, thisPage, absolutePath, linkText) => {
    if (pageLevel !== thisPage) {
      menu += `<li class="nav__list_item"><a href="${setRelativePath(absolutePath, '.html')}"><p class="nav__list_item-p">${linkText}</p></a></li>`;
    }
  }
  addMenuItem(pageLevel1, 'home', 'index', 'Home');
  addMenuItem(pageLevel1, 'about-me', 'about-me', 'About Me');
  addMenuItem(pageLevel1, 'contact', 'contact/form', 'Contact');
  addMenuItem(pageLevel1, 'bonus-content', 'bonus-content/registration', 'Bonus Content');
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
// CONSOLIDATE THIS WITH THE FAVICON FUNCTION.
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

// Set all image links:
const imageAssets = document.querySelectorAll('.image-assets');
imageAssets.forEach(imageAsset => {
  const imgSrc = imageAsset.getAttribute('src');
  if (!!imgSrc) {
    console.log('src:', imgSrc);
    imageAsset.setAttribute('src', setRelativePath(imgSrc)); // Don't pass a filetype for these because they are not consistent yet.
  }
});
// ISSUE: Each IMG src is throwing errors when the page first loads because until this script runs, each src is invalid. Refactor by building each element dynamically:

// MUSIC
// All notes are in arrays so that if there are multiple paragraphs, each one can be built as a separate <p> tag.
const music = [
  {
    artist: 'Army of Anyone',
    albums: [
      {
        coverArt: '',
        notes: {
          'catch-up-to-myself': ['Richard Patrick from Filter, plus members of Stone Temple Pilots. More on Filter later&nbsp;.&nbsp;.&nbsp;.'],
        },
        saleLink: 'https://amzn.to/3ru33qJ',
        title: 'Army of Anyone',
        tracks: [
          {
            notes: {
              'catch-up-to-myself': ['Contains the amazing lyric, &ldquo;I wish you&rsquo;d come in, but the place is blown apart.&rdquo;'],
            },
            saleLink: '',
            title: 'A Better Place',
            trackNumber: 4,
          },
          {
            notes,
            saleLink: '',
            title: 'This Wasn&rsquo;t Supposed to Happen',
            trackNumber: 11,
          },
        ],
      }
    ],
  },
  {
    artist: 'The Catherine Wheel',
    albums: [
      {
        notes: {
          'catch-up-to-myself': ['These tracks from The Catherine Wheel&rsquo;s first album are positively magical.']
        },
        saleLink: 'https://amzn.to/44Om1qu',
        title: 'Ferment',
        tracks: [
          {
            notes: {
              'catch-up-to-myself': ['A very romantic, summery sound.'],
            },
            title: 'Texture',
            trackNumber: 1,
          },
          {
            notes: {
              'catch-up-to-myself': [],
            },
            title: 'I Want to Touch You',
            trackNumber: 2,
          },
          {
            notes: {
              'catch-up-to-myself': ['I&rsquo;ve heard it described as an &ldquo;android love song,&rdquo; a love song about a car (not a bad guess considering lead singer Rob Dickenson is obsessed with cars and now runs an after&#45;market Porsche customization shop in Southern California), and a song about loving a woman who is growing more and more distant (Rob himself supposedly mentioned this one in an interview).  Whatever it&rsquo;s about lyrically, musically it is one of the dreamiest and most romantic songs I&rsquo;ve ever heard.'],
            },
            title: 'Black Metallic',
            trackNumber: 3,
          },
          {
            notes: {
              'catch-up-to-myself': [],
            },
            title: 'Flower to Hide',
            trackNumber: 8,
          },
        ],
      },
      {
        notes: {
          'catch-up-to-myself': ['This is the album I had in mind when Lem put his earbuds in and went running on the beach, listening to the new album his friends just recorded.',],
        },
        saleLink: 'https://amzn.to/3DjSKYW',
        title: 'Chrome',
        tracks: [
          {
            notes: {
              'catch-up-to-myself': ['In fact, this is the opening track I had in mind for that moment. From the novel: &ldquo;The opening riffs of the album exploded into an expanse of sound as I hit the beach running, bringing back a small piece of my mushroom high. The amount of detail in each song was astounding.&rdquo;'],
            },
            title: 'Kill Rhythm',
            trackNumber: 1,
          },
          {
            notes: {
              'catch-up-to-myself': [],
            },
            title: 'I Confess',
            trackNumber: 2,
          },
          {
            notes: {
              'catch-up-to-myself': [],
            },
            title: 'Crank',
            trackNumber: 3,
          },
          {
            notes: {
              'catch-up-to-myself': [],
            },
            title: 'Broken Head',
            trackNumber: 4,
          },
          {
            notes: {
              'catch-up-to-myself': ['This is sort of crazy, but I originally thought the lyrics were, &ldquo;Before the Summer Faire, I already knew.&rdquo; That one line bloomed in my mind and actually inspired the entire Summer Faire sequence in <a href="http://amzn.to/2ipuYA7" target="_blank">Catch Up To Myself</a>. Only years later did I learn that the actual lyrics are something else, but I like my original misinterpretation.'],
            },
            title: 'Pain',
            trackNumber: 5,
          },
          {
            notes: {
              'catch-up-to-myself': ['Has that summer feeling of freedom.'],
            },
            title: 'Strange Fruit',
            trackNumber: 6,
          },
          {
            notes: {
              'catch-up-to-myself': [],
            },
            title: 'Chrome',
            trackNumber: 7,
          },
          {
            notes: {
              'catch-up-to-myself': ['Lem&rsquo;s feelings for Monica. I assume Rob is singing about a statue or a painting of a nude that moved him to tears, but for me personally, it evokes the dichotomy of seeing someone else naked &mdash; at what you would think is their most vulnerable &mdash; and yet you are the one who gets your heart broken.'],
            },
            title: 'The Nude',
            trackNumber: 8,
          },
          {
            notes: {
              'catch-up-to-myself': [],
            },
            title: 'Fripp',
            trackNumber: 10,
          },
          {
            notes: {
              'catch-up-to-myself': [],
            },
            title: 'Half Life',
            trackNumber: 11,
          },
        ],
      },
      {
        notes: {
          'catch-up-to-myself': ['This album was actually my introduction to The Catherine Wheel when it first came out.'],
        },
        saleLink: 'https://amzn.to/4788pIH',
        title: 'Happy Days',
        tracks: [
          {
            notes: {
              'catch-up-to-myself': ['I actually didn&rsquo;t like this track much at first, but once I&rsquo;d gone through the period of my life that inspired <cite>Catch Up To Myself</cite>, I really connected with it.'],
            },
            title: 'Heal',
            trackNumber: 4,
          },
          {
            notes: {
              'catch-up-to-myself': ['Contrary to the aggressive title, this is actually the most peaceful track on the album.  I keep waiting for it to explode, and it never does.  Love it.'],
            },
            title: 'Eat My Dust You Insensitive Fuck',
            trackNumber: 8,
          },
          {
            notes: {
              'catch-up-to-myself': [],
            },
            title: 'Shocking',
            trackNumber: 9,
          },
          {
            notes: {
              'catch-up-to-myself': [],
            },
            title: 'Love Tips Up',
            trackNumber: 10,
          },
          {
            notes: {
              'catch-up-to-myself': ['This upbeat&#45;sounding song is actually about the depravity of heroin addiction. But let&rsquo;s not think about that, shall we? It sounds more like a summertime song to me.'],
            },
            title: 'Judy Staring at the Sun',
            trackNumber: 11,
          },
          {
            notes: {
              'catch-up-to-myself': [],
            },
            title: 'Fizzy Love',
            trackNumber: 13,
          },
          {
            notes: {
              'catch-up-to-myself': [],
            },
            title: 'Kill My Soul',
            trackNumber: 14,
          },
        ],
      },
      {
        notes: {
          'catch-up-to-myself': ['This is not an official album; rather it is a compilation of B&#45;sides, covers, and alternative versions of previously&#45;released material.'],
        },
        saleLink: 'https://amzn.to/43ttFFv',
        title: 'Like Cats and Dogs',
        tracks: [
          {
            notes: {
              'catch-up-to-myself': ['Just when I&rsquo;d learned to love the original version of &ldquo;Heal,&rdquo; I discovered this alternative version, which sounds the same until it takes a different turn at the end. I found this jarring at first, but then it, too, grew on me, and now I&rsquo;d be hard&#45;pressed to say which version I prefer.'],
            },
            title: 'Heal 2',
            trackNumber: 1,
          },
          {
            notes: {
              'catch-up-to-myself': ['Amazing Pink Floyd cover.  Brings tears to Lem&rsquo;s eyes after the breakup.'],
            },
            title: 'Wish You Were Here',
            trackNumber: 2,
          },
          {
            notes: {
              'catch-up-to-myself': [],
            },
            title: 'Backwards Guitar',
            trackNumber: 7,
          },
          {
            notes: {
              'catch-up-to-myself': [],
            },
            title: 'Tongue Twisted',
            trackNumber: 8,
          },
          {
            notes: {
              'catch-up-to-myself': ['I love the line, &ldquo;I&rsquo;m a bad decision maker.&rdquo;  This is how Lem felt for most of the book.'],
            },
            title: 'High Heels',
            trackNumber: 10,
          },
        ],
      },
      {
        coverArt: 'assets/images/music/catherine-wheel/adam-eve.jpg', /* This can be built 100% dynamically based on programmatic naming conventions, then removed from the album objects altogether. */
        notes: {
          'catch-up-to-myself': ['I had this album in mind for Lem&rsquo;s drive out to the summer beach house.'],
        },
        saleLink: 'https://amzn.to/3DispdJ',
        title: 'Adam & Eve',
        tracks: [
          {
            notes: {
              'catch-up-to-myself': [],
            },
            saleLink: '',
            title: 'Intro',
            trackNumber: 1,
          },
          {
            notes: {
              'catch-up-to-myself': [],
            },
            saleLink: '',
            title: 'Future Boy',
            trackNumber: 2,
          },
          {
            notes: {
              'catch-up-to-myself': [],
            },
            saleLink: '',
            title: 'Delicious',
            trackNumber: 3,
          },
          {
            notes: {
              'catch-up-to-myself': ['An amazing song about dropping all your emotional baggage and bad habits and moving forward in life, which is exactly the tipping point Lem is on the brink of during his drive to the beach house.',],
            },
            saleLink: '',
            title: 'Broken Nose',
            trackNumber: 4,
          },
          {
            notes: {
              'catch-up-to-myself': [],
            },
            saleLink: '',
            title: 'Ma Solituda',
            trackNumber: 6,
          },
          {
            notes: {
              'catch-up-to-myself': ['This one&rsquo;s a heartbreaker.',],
            },
            saleLink: '',
            title: 'Goodbye',
            trackNumber: 10,
          },
          {
            notes: {
              'catch-up-to-myself': [],
            },
            saleLink: '',
            title: 'For Dreaming',
            trackNumber: 11,
          },
          {
            notes: {
              'catch-up-to-myself': ['Another heartbreaker.',],
            },
            saleLink: '',
            title: 'Outro',
            trackNumber: 12,
          },
        ],
      },
      {
        notes: {
          'catch-up-to-myself': ['The Catherine Wheel&rsquo;s final album.'],
        },
        saleLink: 'https://amzn.to/3Q4iK2a',
        title: 'Wishville',
        tracks: [
          {
            notes: {
              'catch-up-to-myself': ['That amazing, energetic feeling of new love! In fact, if you can find the <a href="http://amzn.to/2uHb5dh" target="_blank">radio edit</a>, I think that version&rsquo;s even punchier.'],
            },
            title: 'Sparks are Gonna Fly',
            trackNumber: 1,
          },
          {
            notes: {
              'catch-up-to-myself': [],
            },
            title: 'Lifeline',
            trackNumber: 3,
          },
          {
            notes: {
              'catch-up-to-myself': [],
            },
            title: 'Cr&egrave;me Caramel',
            trackNumber: 9,
          },
        ],
      },
    ],
  },
  {
    artist: 'The Crystal Method',
    albums: [
      {
        notes: {
          'the-druggist': ['The first three tracks on this DJ mix by The Crystal Method are outstanding.'],
        },
        saleLink: '',
        title: 'Community Service',
        tracks: [
          {
            notes: {
              'the-druggist': ['A surprisingly downtempo and ominous way to open a rather mainstream album.'],
            },
            saleLink: '',
            title: 'ILS &ldquo;No Soul (PMT Remix)&rdquo;',
            trackNumber: 1,
          },
          {
            notes: {
              'the-druggist': ['The mix picks up momentum with this second track. I love the sample: &ldquo;Every facet, every department of your mind is to be programmed by you. And unless you assume your rightful responsibility and begin to program your own mind, the world will program it for you.&rdquo; Very true, and very Tony Robbins. (In fact, it&lsquo;s from Buddhist practitioner Jack Kornfield.) But it somehow sounds nefarious when distorted and set to this music.']
            },
            saleLink: '',
            title: 'Evil Nine &ldquo;Cake Hole&rdquo;',
            trackNumber: 2,
          },
          {
            notes: {
              'the-druggist': ['Daaaamn! Now we are in another dimension!'],
            },
            saleLink: '',
            title: 'Stir Fry &ldquo;Breakin On The Streets (False Prophet Remix)&rdquo;',
            trackNumber: 3,
          },
        ],
      },
    ],
  },
  {
    artist: 'Various Artists',
    albums: [
      {
        notes: {
          'the-druggist': [],
        },
        saleLink: '',
        title: 'The Crow [Soundtrack]',
        tracks: [
          {
            notes: {
              'the-druggist': [],
            },
            saleLink: '',
            title: 'Nine Inch Nails &ldquo;Dead Souls&rdquo;',
            trackNumber: 4,
          }
        ],
      },
    ],
  },
];

// For the following, test if the HTML codes such as &ldquo; will get stripped out correctly or not.  If not, the string probably needs to be converted to something else first.
const kebabCase = (str) => {
  let allLowercase;
  let specialCharsToHyphens;
  let oneConsecutiveHyphen;
  if (typeof str === 'string') {
    // All lowercase:
    allLowercase = str.toLowerCase();
    // Convert all special characters (and spaces) to hyphens.
    specialCharsToHyphens = allLowercase.replace(/[^a-z0-9]/g, '-');
    // Only one hyphen in a row:
    oneConsecutiveHyphen = specialCharsToHyphens.replace(/-+/g, '-');
    // No hyphens at beginning of string:
    if (oneConsecutiveHyphen[0] === '-') {
      oneConsecutiveHyphen = oneConsecutiveHyphen.substr(1);
    }
    // No hyphens at end of string:
    if (oneConsecutiveHyphen[oneConsecutiveHyphen.length]) {
      oneConsecutiveHyphen = oneConsecutiveHyphen.substring(0, oneConsecutiveHyphen.length - 1);
    }
    return oneConsecutiveHyphen;
  }
};

const artistInit = (artist) => {
  // First create the heading for this artist:
  const artistHeading = `
    <div class="row">
      <div class="col-12">
        <h2 class="artist-name">${artist.artist}</h2>
      </div>
    </div> <!-- Close .row -->
  `;
  console.log('Artist Heading:', artistHeading);
  // Then build a card for each album that contains tracks for this project:
  const albums = artist.albums;
  albums.forEach(album => {
    if (pageLevel3 in album.notes) {
      buildAlbumCard(artist.artist, album);
    }
  });
}

const buildAlbumCard = (artistName, album) => {
  console.log(`Card being built for ${album.title}`);
  // Create image SRC:
  const imgSrc = setRelativePath(`assets/images/music/${kebabCase(artistName)}/${kebabCase(album)}.jpg`);
  // Minimize all images.
  // Create the Album Card to store everything in:
  const albumCard = `<div class="row">
      <div class="album-card">
        <div class="col-3">
          <figure class="album-art">
            <a href="${album.saleLink}" target="_blank">
              <img class="image-assets" src="${imgSrc}" alt="${artistName}: ${album.title}">
            </a>
            <figcaption class="album-title"><a href="${album.saleLink}" target="_blank">${album.title}</a></figcaption>
          </figure>
        </div> <!-- Close .col-3 -->
      </div>
    </div> <!-- Close .row -->`;

  // Attach the Album Card to the page:
  const musicCardsContainer = document.querySelector('.music-cards-container');
  if (!!musicCardsContainer) {
    musicCardsContainer.innerHTML = albumCard; // Could probably just move the HTML here instead of storing it in a variable first?
  }
}

const checkArtists = () => {
  music.forEach(artist => {
    // If the artist has at least one album pertaining to this project, invoke artistInit() for that artist:
    const albums = artist.albums;
    const projectMatch = albums.some(album => {
      return pageLevel3 in album.notes;
    });
    console.log(`${artist.artist} projectMatch = ${projectMatch}`);
    if (!!projectMatch) {
      artistInit(artist);
    }
  });
}

if (pageLevel4 === 'music') {
  checkArtists();
}


/*
<!-- THE CATHERINE WHEEL -->
			<details>
				<summary>The Catherine Wheel</summary>
				
				

				<p class="album-intro"></p>

				<!-- CHROME -->
				<figure class="album-art">
					<a href="http://www.amazon.com/gp/product/B000001E17/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B000001E17&linkCode=as2&tag=toddcf-20&linkId=7VFXOJ7HNPV7QBRA" target="_blank">
						<img class="image-assets" src="assets/images/music/catherine-wheel/chrome.jpg" alt="Chrome">
					</a>
					<figcaption class="album-title"><a href="http://www.amazon.com/gp/product/B000001E17/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B000001E17&linkCode=as2&tag=toddcf-20&linkId=7VFXOJ7HNPV7QBRA" target="_blank">Chrome</a></figcaption>
				</figure>

				<p class="album-intro">This is the album I had in mind when Lem put his earbuds in and went running on the beach, listening to the new album his friends just recorded.</p>

				<table>
					<tr>
						<td class="song-title">&quot;Kill Rhythm&quot;</td>
						<td class="notes">In fact, this is the opening track I had in mind for that moment. &quot;The opening riffs of the album exploded into an expanse of sound as I hit the beach running, bringing back a small piece of my mushroom high.  The amount of detail in each song was astounding.&quot;</td>
					</tr>
					<tr>
						<td class="song-title">&quot;I Confess&quot;</td>
						<td class="notes"></td>
					</tr>
					<tr>
						<td class="song-title">&quot;Crank&quot;</td>
						<td class="notes"></td>
					</tr>
					<tr>
						<td class="song-title">&quot;Broken Head&quot;</td>
						<td class="notes"></td>
					</tr>
					<tr>
						<td class="song-title">&quot;Pain&quot;</td>
						<td class="notes">This is sort of crazy, but I originally thought the lyrics were, &quot;Before the summer faire, I already knew.&quot; That one line bloomed in my mind and actually inspired the entire summer faire sequence in <a href="http://amzn.to/2ipuYA7" target="_blank">Catch Up To Myself</a>. Only years later did I learn that the actual lyrics are, &quot;Before the summer fell . . .&quot;</td>
					</tr>
					<tr>
						<td class="song-title">&quot;Strange Fruit&quot;</td>
						<td class="notes">Has that summer feeling of freedom.</td>
					</tr>
					<tr>
						<td class="song-title">&quot;Chrome&quot;</td>
						<td class="notes"></td>
					</tr>
					<tr>
						<td class="song-title">&quot;The Nude&quot;</td>
						<td class="notes">Lem's feelings for Monica.</td>
					</tr>
					<tr>
						<td class="song-title">&quot;Fripp&quot;</td>
						<td class="notes"></td>
					</tr>
					<tr>
						<td class="song-title">&quot;Half Life&quot;</td>
						<td class="notes"></td>
					</tr>
				</table>

				<!-- FERMENT -->
				<figure class="album-art">
					<a href="http://www.amazon.com/gp/product/B000001DVN/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B000001DVN&linkCode=as2&tag=toddcf-20&linkId=DT5FR5SNDIBHEGHL" target="_blank">
						<img class="image-assets" src="assets/images/music/catherine-wheel/ferment.jpg" alt="Ferment">
					</a>
					<figcaption class="album-title"><a href="http://www.amazon.com/gp/product/B000001DVN/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B000001DVN&linkCode=as2&tag=toddcf-20&linkId=DT5FR5SNDIBHEGHL" target="_blank">Ferment</a></figcaption>
				</figure>

				<p class="album-intro">These three tracks from The Catherine Wheel's first album are positively magical.</p>

				<table>
					<tr>
						<td class="song-title">&quot;I Want To Touch You&quot;</td>
						<td class="notes"></td>
					</tr>
					<tr>
						<td class="song-title">&quot;Black Metallic&quot;</td>
						<td class="notes"></td>
					</tr>
					<tr>
						<td class="song-title">&quot;Flower To Hide&quot;</td>
						<td class="notes"></td>
					</tr>
				</table>

				<!-- HAPPY DAYS -->
				<figure class="album-art">
					<a href="http://www.amazon.com/gp/product/B000001EDA/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B000001EDA&linkCode=as2&tag=toddcf-20&linkId=U5SJN6TMF2TS5MPE" target="_blank">
						<img class="image-assets" src="assets/images/music/catherine-wheel/happy-days.jpg" alt="Happy Days">
					</a>
					<figcaption class="album-title"><a href="http://www.amazon.com/gp/product/B000001EDA/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B000001EDA&linkCode=as2&tag=toddcf-20&linkId=U5SJN6TMF2TS5MPE" target="_blank">Happy Days</a></figcaption>
				</figure>

				<p class="album-intro">My favorite of all The Catherine Wheel's great albums. While I like every track on the album, here are the songs that fit with <a href="http://amzn.to/2ipuYA7" target="_blank">Catch Up To Myself</a>.</p>

				<table>
					<tr>
						<td class="song-title">&quot;Heal&quot;</td>
						<td class="notes">I actually didn't like this track much at first, but once I'd experienced the highest highs and lowest lows of my life, I realized how true to life it is.</td>
					</tr>
					<tr>
						<td class="song-title">&quot;Eat My Dust You Insensitive Fuck&quot;</td>
						<td class="notes">Contrary to the aggressive title, this is actually the most peaceful track on the album. I always expected it to explode into noise, and it never does. Love it.</td>
					</tr>
					<tr>
						<td class="song-title">&quot;Shocking&quot;</td>
						<td class="notes"></td>
					</tr>
					<tr>
						<td class="song-title">&quot;Love Tips Up&quot;</td>
						<td class="notes"></td>
					</tr>
					<tr>
						<td class="song-title">&quot;Judy Staring At The Sun&quot;</td>
						<td class="notes">This upbeat&ndash;sounding song is actually about the depravity of heroin addiction. But let's not think about that, shall we? It sounds more like a summertime song to me.</td>
					</tr>
					<tr>
						<td class="song-title">&quot;Fizzy Love&quot;</td>
						<td class="notes"></td>
					</tr>
					<tr>
						<td class="song-title">&quot;Kill My Soul&quot;</td>
						<td class="notes"></td>
					</tr>
				</table>

				<!-- LIKE CATS AND DOGS -->
				<figure class="album-art">
					<a href="http://www.amazon.com/gp/product/B000001EM6/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B000001EM6&linkCode=as2&tag=toddcf-20&linkId=NPMWQWCMCUCEIRA4" target="_blank">
						<img class="image-assets" src="assets/images/music/catherine-wheel/cats-and-dogs.jpg" alt="Like Cats and Dogs">
					</a>
					<figcaption class="album-title"><a href="http://www.amazon.com/gp/product/B000001EM6/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B000001EM6&linkCode=as2&tag=toddcf-20&linkId=NPMWQWCMCUCEIRA4" target="_blank">Like Cats and Dogs</a></figcaption>
				</figure>

				<p class="album-intro">This is sort of an unofficial album containing b&ndash;sides, covers, and alternate versions of previously released songs.</p>

				<table>
					<tr>
						<td class="song-title">&quot;Heal 2&quot;</td>
						<td class="notes">Just when I'd learned to love the original "Heal," I discovered this alternate version, which sounds the same until it takes a different turn at the end. I found this jarring at first, but then it, too, grew on me, and now I'd be hard&ndash;pressed to say which version I prefer.</td>
					</tr>
					<tr>
						<td class="song-title">&quot;Wish You Were Here&quot;</td>
						<td class="notes">Amazing Pink Floyd cover. Brings tears to Lem's eyes after the breakup.</td>
					</tr>
					<tr>
						<td class="song-title">&quot;Backwards Guitar&quot;</td>
						<td class="notes"></td>
					</tr>
					<tr>
						<td class="song-title">&quot;Tongue Twisted&quot;</td>
						<td class="notes"></td>
					</tr>
					<tr>
						<td class="song-title">&quot;High Heels&quot;</td>
						<td class="notes">I love the line, &quot;I'm a bad decision maker.&quot; This is how Lem felt for most of the book.</td>
					</tr>
				</table>

				<!-- WISHVILLE -->
				<figure class="album-art">
					<a href="http://www.amazon.com/gp/product/B00004TB84/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B00004TB84&linkCode=as2&tag=toddcf-20&linkId=GEX5SLAMNSXTGHY4" target="_blank">
						<img class="image-assets" src="assets/images/music/catherine-wheel/wishville.jpg" alt="Wishville">
					</a>
					<figcaption class="album-title"><a href="http://www.amazon.com/gp/product/B00004TB84/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B00004TB84&linkCode=as2&tag=toddcf-20&linkId=GEX5SLAMNSXTGHY4" target="_blank">Wishville</a></figcaption>
				</figure>

				<p class="album-intro">The Catherine Wheel's last album.</p>

				<table>
					<tr>
						<td class="song-title">&quot;Sparks Are Gonna Fly&quot;</td>
						<td class="notes">That amazing, energetic feeling of new love! In fact, if you can find the <a href="http://amzn.to/2uHb5dh" target="_blank">radio edit</a>, I think that version's even punchier.</td>
					</tr>
					<tr>
						<td class="song-title">&quot;Lifeline&quot;</td>
						<td class="notes"></td>
					</tr>
					<tr>
						<td class="song-title">&quot;Cr&egrave;me Caramel&quot;</td>
						<td></td>
					</tr>
				</table>

			</details>
      */