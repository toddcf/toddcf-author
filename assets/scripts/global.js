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

// Set all image links -- BUT I THINK I WILL DELETE THIS ENTIRELY NOW THAT JS I'M PULLING FROM THE MUSIC OBJECT INSTEAD
// const imageAssets = document.querySelectorAll('.image-assets');
// imageAssets.forEach(imageAsset => {
//   const imgSrc = imageAsset.getAttribute('src');
//   if (!!imgSrc) {
//     console.log('src:', imgSrc);
//     imageAsset.setAttribute('src', setRelativePath(imgSrc)); // Don't pass a filetype for these because they are not consistent yet.
//   }
// });
// ISSUE: Each IMG src is throwing errors when the page first loads because until this script runs, each src is invalid. Refactor by building each element dynamically.

// MUSIC
// All notes are in arrays so that if there are multiple paragraphs, each one can be built as a separate <p> tag.
const music = [
  {
    artist: 'Army of Anyone',
    albums: [
      {
        title: 'Army of Anyone',
        notes: {
          'catch-up-to-myself': ['Richard Patrick from Filter, plus members of Stone Temple Pilots. More on Filter later&nbsp;.&nbsp;.&nbsp;.'],
        },
        saleLink: 'https://amzn.to/3ru33qJ',
        tracks: [
          {
            trackNumber: 4,
            title: 'A Better Place',
            notes: {
              'catch-up-to-myself': ['Contains the amazing lyric, &ldquo;I wish you&rsquo;d come in, but the place is blown apart.&rdquo;'],
            },
          },
          {
            trackNumber: 11,
            title: 'This Wasn&rsquo;t Supposed to Happen',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      }
    ],
  },
  {
    artist: 'The Catherine Wheel',
    albums: [
      {
        title: 'Ferment',
        notes: {
          'catch-up-to-myself': ['These tracks from The Catherine Wheel&rsquo;s first album are positively magical.']
        },
        saleLink: 'https://amzn.to/44Om1qu',
        tracks: [
          {
            trackNumber: 1,
            title: 'Texture',
            notes: {
              'catch-up-to-myself': ['A very romantic, summery sound.'],
            },
          },
          {
            trackNumber: 2,
            title: 'I Want to Touch You',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 3,
            title: 'Black Metallic',
            notes: {
              'catch-up-to-myself': ['I&rsquo;ve heard it described as an &ldquo;android love song,&rdquo; a love song about a car (not a bad guess considering lead singer Rob Dickenson is obsessed with cars and now runs an after-market Porsche customization shop in Southern California), and a song about loving a woman who is growing more and more distant (Rob himself supposedly mentioned this one in an interview).  Whatever it&rsquo;s about lyrically, musically it is one of the dreamiest and most romantic songs I&rsquo;ve ever heard.'],
            },
          },
          {
            trackNumber: 8,
            title: 'Flower to Hide',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
      {
        title: 'Chrome',
        notes: {
          'catch-up-to-myself': ['This is the album I had in mind when Lem put his earbuds in and went running on the beach, listening to the new album his friends just recorded.',],
        },
        saleLink: 'https://amzn.to/3DjSKYW',
        tracks: [
          {
            trackNumber: 1,
            title: 'Kill Rhythm',
            notes: {
              'catch-up-to-myself': ['In fact, this is the opening track I had in mind for that moment. From the novel: &ldquo;The opening riffs of the album exploded into an expanse of sound as I hit the beach running, bringing back a small piece of my mushroom high. The amount of detail in each song was astounding.&rdquo;'],
            },
          },
          {
            trackNumber: 2,
            title: 'I Confess',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 3,
            title: 'Crank',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 4,
            title: 'Broken Head',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 5,
            title: 'Pain',
            notes: {
              'catch-up-to-myself': ['This is sort of crazy, but I originally thought the lyrics were, &ldquo;Before the Summer Faire, I already knew.&rdquo; That one line bloomed in my mind and actually inspired the entire Summer Faire sequence in <cite>Catch Up To Myself</cite>. Only years later did I learn that the actual lyrics are something else, but I like my original misinterpretation.'],
            },
          },
          {
            trackNumber: 6,
            title: 'Strange Fruit',
            notes: {
              'catch-up-to-myself': ['Has that summer feeling of freedom.'],
            },
          },
          {
            notes: {
              'catch-up-to-myself': [],
            },
            title: 'Chrome',
            trackNumber: 7,
          },
          {
            trackNumber: 8,
            title: 'The Nude',
            notes: {
              'catch-up-to-myself': ['Lem&rsquo;s feelings for Monica. I assume Rob is singing about a statue or a painting of a nude that moved him to tears, but for me personally, it evokes the dichotomy of seeing someone else naked &mdash; at what you would think is their most vulnerable &mdash; and yet you are the one who gets your heart broken.'],
            },
          },
          {
            trackNumber: 10,
            title: 'Fripp',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 11,
            title: 'Half Life',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
      {
        title: 'Happy Days',
        notes: {
          'catch-up-to-myself': ['This album was actually my introduction to The Catherine Wheel when it first came out.'],
        },
        saleLink: 'https://amzn.to/4788pIH',
        tracks: [
          {
            trackNumber: 4,
            title: 'Heal',
            notes: {
              'catch-up-to-myself': ['I actually didn&rsquo;t like this track much at first, but once I&rsquo;d gone through the period of my life that inspired <cite>Catch Up To Myself</cite>, I really connected with it.'],
            },
          },
          {
            trackNumber: 8,
            title: 'Eat My Dust You Insensitive Fuck',
            notes: {
              'catch-up-to-myself': ['Contrary to the aggressive title, this is actually the most peaceful track on the album.  I keep waiting for it to explode, and it never does.  Love it.'],
            },
          },
          {
            trackNumber: 9,
            title: 'Shocking',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 10,
            title: 'Love Tips Up',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 11,
            title: 'Judy Staring at the Sun',
            notes: {
              'catch-up-to-myself': ['This upbeat-sounding song is actually about the depravity of heroin addiction. But let&rsquo;s not think about that, shall we? It sounds more like a summertime song to me.'],
            },
          },
          {
            trackNumber: 13,
            title: 'Fizzy Love',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 14,
            title: 'Kill My Soul',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
      {
        title: 'Like Cats and Dogs',
        notes: {
          'catch-up-to-myself': ['This is not an official album; rather it is a compilation of B-sides, covers, and alternative versions of previously-released material.'],
        },
        saleLink: 'https://amzn.to/43ttFFv',
        tracks: [
          {
            trackNumber: 1,
            title: 'Heal 2',
            notes: {
              'catch-up-to-myself': ['Just when I&rsquo;d learned to love the original version of &ldquo;Heal,&rdquo; I discovered this alternative version, which sounds the same until it takes a different turn at the end. I found this jarring at first, but then it, too, grew on me, and now I&rsquo;d be hard-pressed to say which version I prefer.'],
            },
          },
          {
            trackNumber: 2,
            title: 'Wish You Were Here',
            notes: {
              'catch-up-to-myself': ['Amazing Pink Floyd cover.  Brings tears to Lem&rsquo;s eyes after the breakup.'],
            },
          },
          {
            trackNumber: 7,
            title: 'Backwards Guitar',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 8,
            title: 'Tongue Twisted',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 10,
            title: 'High Heels',
            notes: {
              'catch-up-to-myself': ['I love the line, &ldquo;I&rsquo;m a bad decision maker.&rdquo;  This is how Lem felt for most of the book.'],
            },
          },
        ],
      },
      {
        title: 'Adam &amp; Eve',
        notes: {
          'catch-up-to-myself': ['I had this album in mind for Lem&rsquo;s drive out to the summer beach house.'],
        },
        saleLink: 'https://amzn.to/3DispdJ',
        tracks: [
          {
            trackNumber: 1,
            title: 'Intro',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 2,
            title: 'Future Boy',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 3,
            title: 'Delicious',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 4,
            title: 'Broken Nose',
            notes: {
              'catch-up-to-myself': ['An amazing song about dropping all your emotional baggage and bad habits and moving forward in life, which is exactly the tipping point Lem is on the brink of during his drive to the beach house.',],
            },
          },
          {
            trackNumber: 6,
            title: 'Ma Solituda',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 10,
            title: 'Goodbye',
            notes: {
              'catch-up-to-myself': ['This one&rsquo;s a heartbreaker.',],
            },
          },
          {
            trackNumber: 11,
            title: 'For Dreaming',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 12,
            title: 'Outro',
            notes: {
              'catch-up-to-myself': ['Another heartbreaker.',],
            },
          },
        ],
      },
      {
        title: 'Wishville',
        notes: {
          'catch-up-to-myself': ['The Catherine Wheel&rsquo;s final album.'],
        },
        saleLink: 'https://amzn.to/3Q4iK2a',
        tracks: [
          {
            trackNumber: 1,
            title: 'Sparks are Gonna Fly',
            notes: {
              'catch-up-to-myself': ['That amazing, energetic feeling of new love! In fact, if you can find the <a href="https://amzn.to/3rv89CX" target="_blank">radio edit</a>, I think that version&rsquo;s even punchier.'],
            },
          },
          {
            trackNumber: 3,
            title: 'Lifeline',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 9,
            title: 'Crème Caramel',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'The Crystal Method',
    albums: [
      {
        title: 'Community Service',
        notes: {
          'the-druggist': ['The first three tracks on this DJ mix by The Crystal Method are outstanding.'],
        },
        saleLink: 'https://amzn.to/46XeTK0',
        tracks: [
          {
            trackNumber: 1,
            artist: 'ILS',
            title: 'No Soul (PMT Remix)',
            notes: {
              'the-druggist': ['A surprisingly downtempo and ominous way to open a rather mainstream album.'],
            },
          },
          {
            trackNumber: 2,
            artist: 'Evil Nine',
            title: 'Cake Hole',
            notes: {
              'the-druggist': ['The mix picks up momentum with this second track. I love the sample: &ldquo;Every facet, every department of your mind is to be programmed by you. And unless you assume your rightful responsibility and begin to program your own mind, the world will program it for you.&rdquo; Very true, and very Tony Robbins. (In fact, it&lsquo;s from Buddhist practitioner Jack Kornfield.) But it somehow sounds nefarious when distorted and set to this music.']
            },
          },
          {
            trackNumber: 3,
            artist: 'Stir Fry',
            title: 'Breakin on the Streets (False Prophet Remix)',
            notes: {
              'the-druggist': ['Daaaamn! Now we are in another dimension!'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'The Cure',
    albums: [
      {
        title: 'The Head on the Door',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3OkXcwL',
        tracks: [
          {
            trackNumber: 8,
            title: 'A Night Like This',
            notes: {
              'catch-up-to-myself': ['I had this song in mind for Lem&rsquo;s graduation ceremony, when he sees his first college girlfriend again.']
            },
          },
        ],
      },
      {
        title: 'Galore [The Singles 1987 - 1997]',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/459bbLZ',
        tracks: [
          {
            trackNumber: 5,
            title: 'Lullaby',
            notes: {
              'catch-up-to-myself': ['Seductive.'],
            },
          },
          {
            trackNumber: 16,
            title: 'Strange Attraction',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
      {
        title: 'Bloodflowers',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3XZqLah',
        tracks: [
          {
            trackNumber: 1,
            title: 'Out of This World',
            notes: {
              'catch-up-to-myself': [],
            }
          },
          {
            trackNumber: 2,
            title: 'Watching Me Fall',
            notes: {
              'catch-up-to-myself': [],
            }
          },
          {
            trackNumber: 4,
            title: 'Maybe Someday',
            notes: {
              'catch-up-to-myself': [],
            }
          },
          {
            trackNumber: 5,
            title: 'The Last Day of Summer',
            notes: {
              'catch-up-to-myself': [],
            }
          },
          {
            trackNumber: 7,
            title: 'The Loudest Sound',
            notes: {
              'catch-up-to-myself': ['The most heartwrenching &mdash; and my absolute favorite &mdash; track on the album.'],
            }
          },
        ],
      },
    ],
  },
  {
    artist: 'Custom',
    albums: [
      {
        title: 'Fast',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/450eC7D',
        tracks: [
          {
            trackNumber: 2,
            title: 'Hey Mister',
            notes: {
              'catch-up-to-myself': ['This is the kind of debauchery Lem wishes he were capable of.'],
            },
          },
          {
            trackNumber: 4,
            title: 'Like You',
            notes: {
              'catch-up-to-myself': ['And this is how he often feels instead.'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Dave Navarro',
    albums: [
      {
        title: 'Trust No One',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3DDqCAl',
        tracks: [
          {
            trackNumber: 1,
            title: 'Rexall',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 2,
            title: 'Hungry',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 3,
            title: 'Sunny Day',
            notes: {
              'catch-up-to-myself': ['Depression, summarized perfectly: &ldquo;Such a sunny day outside .&nbsp;.&nbsp;. freezing deep inside.&rdquo;'],
            },
          },
          {
            trackNumber: 4,
            title: 'Mourning Son',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 10,
            title: 'Slow Motion Sickness',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Dave Ralph',
    albums: [
      {
        title: 'Tranceport 2',
        notes: {
          'catch-up-to-myself': ['This is an excellent DJ mix by Dave Ralph. One track in particular really fit with <cite>Catch Up To Myself</cite>.'],
        },
        saleLink: 'https://amzn.to/3Olmjja',
        tracks: [
          {
            disc: 2,
            trackNumber: 7,
            title: 'Resistance D &ldquo;Feel So High&rdquo;',
            notes: {
              'catch-up-to-myself': ['The moment when things are going well and Lem is looking out at the campus from his third-floor apartment window at night.'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Deep Dish',
    albums: [
      {
        title: 'George is On',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3rH7gHu',
        tracks: [
          {
            disc: 1,
            trackNumber: 12,
            title: 'In Love with a Friend',
            notes: {
              'catch-up-to-myself': ['I was blown away by this track. I have never before or since heard a song that so perfectly captures the feeling of being in love with a friend and being simultaneously afraid to tell her and unable to hold it in any longer.'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Eve 6',
    albums: [
      {
        title: 'It&lsquo;s All in Your Head',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3K6aFGi',
        tracks: [
          {
            trackNumber: 2,
            title: 'Think Twice',
            notes: {
              'catch-up-to-myself': ['One of the greatest songs about jealousy and impotent rage ever written.'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Filter',
    albums: [
      {
        title: 'Title of Record',
        notes: {
          'catch-up-to-myself': ['Musically and lyrically, this album is perfect for <cite>Catch Up To Myself</cite>.  In real life, it&rsquo;s helped me through not one, not two, but <em>three</em> breakups.'],
        },
        saleLink: 'https://amzn.to/43G0YoN',
        tracks: [
          {
            trackNumber: 1,
            title: 'Sand',
            notes: {
              'catch-up-to-myself': ['An unsettling intro for the album.'],
            },
          },
          {
            trackNumber: 2,
            title: 'Welcome to the Fold',
            notes: {
              'catch-up-to-myself': ['The pure release of anger &mdash; and tripping on mushrooms, which Lem does at one point in the story.  &ldquo;Mama give me my medicine that makes me feel like a tall tree&nbsp;.&nbsp;.&nbsp;.&rdquo;'],
            },
          },
          {
            trackNumber: 3,
            title: 'Captain Bligh',
            notes: {
              'catch-up-to-myself': ['&ldquo;And the time has come, to undo the world I&lsquo;ve done&nbsp;.&nbsp;.&nbsp;.&rdquo;'],
            },
          },
          {
            trackNumber: 4,
            title: 'It&rsquo;s Gonna Kill Me',
            notes: {
              'catch-up-to-myself': ['&ldquo;She&rsquo;s my favorite piece of plastic held to my ear.&rdquo; Richard Patrick has said that those lyrics represent him walking the streets at night, fighting on the phone with his cheating girlfriend.'],
            },
          },
          {
            trackNumber: 5,
            title: 'The Best Things',
            notes: {
              'catch-up-to-myself': ['For me, this song captures the feeling that even when you&rsquo;re experiencing the highest highs of your life, in the back of your mind, you know they aren&rsquo;t going to last forever.'],
            },
          },
          {
            trackNumber: 6,
            title: 'Take a Picture',
            notes: {
              'catch-up-to-myself': ['Everyone probably knows this song &mdash; it was one of Filter&rsquo;s biggest hits &mdash; but beyond that, it is such a perfect <cite>Catch Up To Myself</cite> song.'],
            },
          },
          {
            trackNumber: 7,
            title: 'Skinny',
            notes: {
              'catch-up-to-myself': ['When Lem is coming down from his mushroom voyage and is sadly saying goodbye to all the girls he just made peace with in his mind.'],
            },
          },
          {
            trackNumber: 10,
            title: 'I&rsquo;m Not the Only One',
            notes: {
              'catch-up-to-myself': ['More cheating catharsis for Richard Patrick &mdash; and lovesick catharsis for the rest of us. Perfectly captures the feeling of not being treated with respect by the one you love.'],
            },
          },
          {
            trackNumber: 11,
            title: 'Miss Blue',
            notes: {
              'catch-up-to-myself': ['This is how the end of a relationship feels. A truer question has never been asked: &ldquo;When do you think I&rsquo;ll be okay?&rdquo;'],
            },
          },
        ],
      },
      {
        title: 'The Amalgamut',
        notes: {
          'catch-up-to-myself': [`After the success of <a href="https://amzn.to/43G0YoN" target="_blank"><cite>Title of Record</cite></a>, Richard Patrick bought a new pickup truck and took a road trip across the United States, just experiencing firsthand everything the country has to offer. He drew the conclusion that we are all just an amalgamation of different cultures and personalities, and the title of the next Filter album was born.`],
        },
        saleLink: 'https://amzn.to/44SWV9T',
        tracks: [
          {
            trackNumber: 3,
            title: 'Where Do We Go From Here',
            notes: {
              'catch-up-to-myself': [`Written near the end of the <a href="https://amzn.to/43G0YoN" target="_blank"><cite>Title of Record</cite></a> sessions, this is my favorite track on the album, and fits perfectly with the vibe of <cite>Catch Up To Myself</cite>.`],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Fiona Apple',
    albums: [
      {
        title: 'Tidal',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3K8F6LW',
        tracks: [
          {
            trackNumber: 3,
            title: 'Shadowboxer',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Hooverphonic',
    albums: [
      {
        title: 'The Magnificent Tree',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3rAnnXn',
        tracks: [
          {
            trackNumber: 4,
            title: 'Jackie Cane',
            notes: {
              'catch-up-to-myself': ['Monica&rsquo;s theme.'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Hybrid',
    albums: [
      {
        title: 'Wider Angle',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3pPQ3LK',
        tracks: [
          {
            disc: 1,
            trackNumber: 9,
            title: 'High Life',
            notes: {
              'catch-up-to-myself': ['In my mind, this song always represented how lonely it is at the top. Which is how Lem usually feels when he&rsquo;s staring out his third-floor apartment window at night, alone. It&rsquo;s actually about something else, but my initial interpretation feels like more of a gut punch to me.'],
            },
          },
        ],
      },
      {
        title: 'Morning Sci-Fi',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3DlMos6',
        tracks: [
          {
            trackNumber: 2,
            title: 'True to Form',
            notes: {
              'catch-up-to-myself': ['The feeling of being held back all the time, unable to achieve your true potential.'],
            },
          },
          {
            trackNumber: 5,
            title: 'I&rsquo;m Still Awake',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 11,
            title: 'Out of the Dark',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
      {
        title: 'I Choose Noise',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/43JUzcA',
        tracks: [
          {
            trackNumber: 9,
            title: 'Until Tomorrow',
            notes: {
              'catch-up-to-myself': ['Featuring whistful vocals by Quivver, this track perfectly captures the moment when Lem discovers Monica&rsquo;s panties under the bed and stares out the window at sunset, lost in thought.'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Keane',
    albums: [
      {
        title: 'Hopes and Fears',
        notes: {
          'catch-up-to-myself': ['The album title alone is perfect for <cite>Catch Up To Myself</cite>.'],
        },
        saleLink: 'https://amzn.to/3NXEhXw',
        tracks: [
          {
            trackNumber: 11,
            title: 'Untitled 1',
            notes: {
              'catch-up-to-myself': ['Perfectly captures the feeling of discovering that someone you thought was warm is actually cold inside.'],
            },
          },
        ],
      },
      {
        title: 'Under the Iron Sea',
        notes: {
          'catch-up-to-myself': [
            'Song for song, musically and lyrically, this album is a great companion to <cite>Catch Up To Myself</cite>.',
            'Now, the ultimate <cite>Catch Up To Myself</cite> album is Filter&rsquo;s <cite>Title of Record</cite>.  But whereas that album is an explosion of the anger, aggression, and aggrievement that swirl through a chaotic relationship, Keane&rsquo;s <cite>Under the Iron Sea</cite> captures the feelings that come afterward, when all of that angst burns off: loneliness, self-reflection, and new beginnings. Sometimes it feels good to just let it wash over you.'],
        },
        saleLink: 'https://amzn.to/44wwiaW',
        tracks: [
          {
            trackNumber: 1,
            title: 'Atlantic',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 2,
            title: 'Is it Any Wonder',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 3,
            title: 'Nothing in My Way',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 5,
            title: 'A Bad Dream',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 1,
            title: 'The Iron Sea',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 9,
            title: 'Crystal Ball',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 1,
            title: 'Broken Toy',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
      {
        title: 'Perfect Symmetry',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3Q6YxIQ',
        tracks: [
          {
            trackNumber: 1,
            title: 'Spiralling',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 6,
            title: 'You Don&rsquo;t See Me',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 7,
            title: 'Again &amp; Again',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 8,
            title: 'Playing Along',
            notes: {
              'catch-up-to-myself': ['My favorite track on the album. About getting away from it all, and drowning out the noise of the world with good music.'],
            },
          },
        ],
      },
      {
        title: 'Night Train',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/44TZVTf',
        tracks: [
          {
            trackNumber: 4,
            title: 'Clear Skies',
            notes: {
              'catch-up-to-myself': ['To me, this song evokes the feeling of looking out at all the other people in the world and being simultaneously thankful to be better off than some, and optimistic that you can become as good as those who are doing better than you.'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Nada Surf',
    albums: [
      {
        title: 'High/Low',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3pTa1Fp',
        tracks: [
          {
            trackNumber: 3,
            title: 'Popular',
            notes: {
              'catch-up-to-myself': ['Nada Surf&rsquo;s breakout hit. The teenage guide to popularity.'],
            },
          },
        ],
      },
      {
        title: 'Let Go',
        notes: {
          'catch-up-to-myself': ['A total departure from the alternative rock anthem &ldquo;Popular,&rdquo; Nada Surf went introspective and emotive.  I heard a couple of these tracks on the radio for months before even realizing it was the same band.'],
        },
        saleLink: 'https://amzn.to/44t6xs5',
        tracks: [
          {
            trackNumber: 3,
            title: 'Inside of Love',
            notes: {
              'catch-up-to-myself': ['What it feels like when everyone but you has accomplished the insurmountable feat of getting into a relationship.'],
            },
          },
          {
            trackNumber: 6,
            title: 'Hi-Speed Soul',
            notes: {
              'catch-up-to-myself': ['I was going to quote one of the lines here, but then I realized I couldn&rsquo;t pick just one. The entire song relates to <cite>Catch Up To Myself</cite>.'],
            },
          },
          {
            trackNumber: 7,
            title: 'Killian&rsquo;s Red',
            notes: {
              'catch-up-to-myself': ['Haunting.'],
            },
          },
          {
            trackNumber: 8,
            title: 'The Way You Wear Your Head',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
      {
        title: 'The Weight is a Gift',
        notes: {
          'catch-up-to-myself': ['Such a great album title, and so true. You would never choose to go through the bad times on purpose, but once you&rsquo;ve made it out the other side, you&rsquo;re glad you did. You&rsquo;re better for it.'],
        },
        saleLink: 'https://amzn.to/43BeGJU',
        tracks: [
          {
            trackNumber: 1,
            title: 'Concrete Bed',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 3,
            title: 'Always Love',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
      {
        title: 'The Stars Are Indifferent to Astronomy',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3Q9QXxk',
        tracks: [
          {
            trackNumber: 1,
            title: 'Clear Eye Clouded Mind',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 3,
            title: 'When I Was Young',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 10,
            title: 'The Future',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'New Order',
    albums: [
      {
        title: 'Get Ready',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3Q27uTU',
        tracks: [
          {
            trackNumber: 1,
            title: 'Crystal',
            notes: {
              'catch-up-to-myself': ['Probably my absolute favorite New Order song. Captures the cold tinge of the autumn air as a relationship between Lem and Monica becomes more and more inevitable.'],
            },
          },
          {
            trackNumber: 4,
            title: 'Vicious Streak',
            notes: {
              'catch-up-to-myself': ['&ldquo;You&rsquo;ve got a vicious streak for someone so young.&rdquo;'],
            },
          },
          {
            trackNumber: 8,
            title: 'Someone Like You',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
      {
        title: 'Waiting for the Sirens&rsquo; Call',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/44TY0OO',
        tracks: [
          {
            trackNumber: 1,
            title: 'Who&rsquo;s Joe?',
            notes: {
              'catch-up-to-myself': ['In some ways, these lyrics could be describing Lem.'],
            },
          },
          {
            trackNumber: 2,
            title: 'Hey Now What You Doing',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 3,
            title: 'Waiting for the Siren&rsquo;s Call',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 8,
            title: 'Jetstream',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
    ],
    
  },
  {
    artist: 'Nine Inch Nails',
    albums: [
      {
        title: 'The Downward Spiral [Deluxe Edition]',
        notes: {
          'the-druggist': [],
        },
        saleLink: 'https://amzn.to/3Y1KyWS',
        tracks: [
          {
            disc: 1,
            trackNumber: 5,
            title: 'Dead Souls',
            notes: {
              'the-druggist': ['Joy Division cover. Originally appeared on <a href="https://amzn.to/44Xpov0" target="_blank">The Crow [Soundtrack]</a>. Such great lyrics. You don&rsquo;t usually hear rock songs talk about being contacted by dead conquistadors.'],
            },
          }
        ],
      },
      {
        title: 'The Fragile',
        notes: {
          'catch-up-to-myself': ['It&rsquo;s actually hard to pinpoint specific songs from this two-disc album that relate to <cite>Catch Up To Myself</cite>. They actually work best as a cohesive whole. In fact, some songs that I don&rsquo;t care for on their own actually sound good to me when I&rsquo;m listening to the album straight through &mdash; something I did quite often while writing this novel.']
        },
        saleLink: 'https://amzn.to/3Y0B8e9',
        tracks: [
          {
            disc: 1,
            trackNumber: 4,
            title: 'The Wretched',
            notes: {
              'catch-up-to-myself': ['Okay, okay, I&rsquo;ll call out one track in particular. The lyrics in this one are just too perfect for Lem. All about learning what it feels like to not get what you wanted. And feeling like God is specifically holding you down.'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Rob Dickinson',
    albums: [
      {
        title: 'Fresh Wine for the Horses',
        notes: {
          'catch-up-to-myself': ['The Catherine Wheel disbanded in 2000, but in 2005, lead singer Rob Dickinson reemerged with this amazing solo album. Perfect timing and perfect vibes for when I was writing <cite>Catch Up To Myself</cite>. I listened to this album for a very long time, especially while I was working on Lem&rsquo;s healing phase. And, as always with Dickinson&rsquo;s projects, the album features amazing art design.'],
        },
        saleLink: 'https://amzn.to/3rCGnES',
        tracks: [
          {
            trackNumber: 1,
            title: 'My Name is Love',
            notes: {
              'catch-up-to-myself': ['A perfect album-opening, radio-friendly track to announce Dickinson&rsquo;s return. And it speaks to Lem&rsquo;s emotional state, as well.'],
            },
          },
          {
            trackNumber: 6,
            title: 'Handsome',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 7,
            title: 'Bathe Away',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 8,
            title: 'The Storm',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 9,
            title: 'Bad Beauty',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 10,
            title: 'Don&rsquo;t Change',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 11,
            title: 'Towering and Flowering',
            notes: {
              'catch-up-to-myself': ['No spoilers here, but the ending track of this album is actually perfect for the last scene in the novel. The &ldquo;end credit&rdquo; music, if you will. &ldquo;For so long, my mind was like a woe maker&rsquo;s song. My mood was drained of dreams. From now on, my mind&rsquo;s alive and leading me on. My mood has changed; my mood has an altitude.&rdquo;'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Sasha',
    albums: [
      {
        title: 'Involver',
        notes: {
          'catch-up-to-myself': ['More than just a DJ mix, Sasha pulled the components of each song apart and fit them back together in his own way. I listened to this a lot while writing <cite>Catch Up To Myself</cite>.'],
        },
        saleLink: 'https://amzn.to/3DrnMhs',
        tracks: [
          {
            trackNumber: 1,
            artist: 'Grand National',
            title: 'Talk Amongst Yourselves',
            notes: {
              'catch-up-to-myself': ['The first track is my favorite. Blew me away from the start with its hi-tech yet moody vibe. Love the lyrics, too. &ldquo;So talk amongst yourselves while I try to figure it out&nbsp;.&nbsp;.&nbsp;. I&rsquo;ll let you know in my time&nbsp;.&nbsp;.&nbsp; And there&rsquo;s nothing to do till I put myself up to it&nbsp;.&nbsp;.&nbsp;.&rdquo;'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Sugar Ray',
    albums: [
      {
        title: '14:59',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3O41CXx',
        tracks: [
          {
            trackNumber: 3,
            title: 'Falls Apart',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 6,
            title: 'Someday',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Thursday',
    albums: [
      {
        title: 'Full Collapse',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3K93rBq',
        tracks: [
          {
            trackNumber: 1,
            title: 'A0001',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 1,
            title: 'Understanding in a Car Crash',
            notes: {
              'catch-up-to-myself': ['Amazing, explosive energy and angst. Described by one reviewer as sounding like &ldquo;a young and angry Robert Smith of The Cure.&rdquo;'],
            },
          },
        ],
      },
    ],
  },
];

// For the following, test if the HTML codes such as &ldquo; will get stripped out correctly or not.  If not, the string probably needs to be converted to something else first.
const kebabCase = (str) => {
  let conversion;
  
  if (typeof str === 'string') {
    // Convert everything to lowercase:
    conversion = str.toLowerCase();
    // Remove specific character codes completely (listed alphabetically):
    conversion = conversion.replace('&ldquo;', '');
    conversion = conversion.replace('&lsquo;', '');
    conversion = conversion.replace('&rdquo;', '');
    conversion = conversion.replace('&rsquo;', '');
    // Convert specific character codes to hyphens (listed alphabetically):
    conversion = conversion.replace('&amp;', '-');
    conversion = conversion.replace('&copy;', '-');
    conversion = conversion.replace('&gt;', '-');
    conversion = conversion.replace('&lt;', '-');
    conversion = conversion.replace('&mdash;', '-');
    conversion = conversion.replace('&nbsp;', '-');
    conversion = conversion.replace('&ndash;', '-');
    // Convert all special characters (and spaces) to hyphens:
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
};

// Select the container where the music elements will be appended:
const musicCardsContainer = document.querySelector('.music-cards-container');

const buildParagraphs = (paragraphsArr) => {
  let paragraphsHTML = ``;
  if (Array.isArray(paragraphsArr) && paragraphsArr.length > 0) {
    paragraphsArr.forEach(paragraphText => {
      paragraphsHTML += `<p>${paragraphText}</p>`;
    });
  }
  return paragraphsHTML;
}

const buildTrackInfo = (track, trackNumWidth, trackTitleWidth, trackNotesWidth) => {
  if (!!track && !!trackNumWidth && !!trackTitleWidth && !!trackNotesWidth) {
    return `<div class="row">
      <div class="col col-${trackNumWidth}">
        <p class="track-number">${track.trackNumber}</p>
      </div>
      <div class="col col-${trackTitleWidth}">
        <p class="track-title">${(track.artist) ? track.artist + ' ': ''}&ldquo;${track.title}&rdquo;</p>
      </div>
      <div class="col col-${trackNotesWidth}">
        ${buildParagraphs(track.notes[pageLevel3])}
      </div>
    </div>`;
  }
};

const buildAlbumCard = (artistName, album) => {
  const imgSrc = setRelativePath(`assets/images/music/${kebabCase(artistName)}/${kebabCase(album.title)}.jpg`);
  // NOTE: Minimize all images.
  // Build out all the tracks first, as they will need to be ready to be inserted into the album card at the time the Album Card is created:
  const trackNumWidth = '1';
  const trackTitleWidth = '6';
  const trackNotesWidth = '5';
  
  // Create one row of headings:
  let tracksContainer = `<div class="row"><div class="col col-${trackNumWidth}"><p class="track-number">Track Number</p></div><div class="col col-${trackTitleWidth}"><p class="track-title">Track Title</p></div><div class="col col-${trackNotesWidth}"><p class="track-notes">Notes</p></div></div>`;
  
  // Add each applicable track:
  const tracks = album.tracks;
  tracks.forEach(track => {
    if (pageLevel3 in track.notes) {
      tracksContainer += `${buildTrackInfo(track, trackNumWidth, trackTitleWidth, trackNotesWidth)}`;
    }
  });
  
  // Create the Album Card to store everything in:
  const albumCard = document.createElement('div');
  albumCard.classList.add('row'); // Something is slightly wrong with the row/column nesting in these Album Cards, but I'm not sure what yet.
  albumCard.innerHTML = `
    <div class="album-card">
      <div class="col col-3">
        <figure class="album-art">
          <a href="${album.saleLink}" target="_blank">
            <img class="image-assets" src="${imgSrc}" alt="${artistName}: ${album.title}">
          </a>
          <figcaption class="album-title"><a href="${album.saleLink}" target="_blank">${album.title}</a></figcaption>
        </figure>
      </div>
      <div class="col col-9">
        ${buildParagraphs(album.notes[pageLevel3])}
      </div>
      <div class="row">
        <div class="col-12">
          ${tracksContainer}
        </div>
      </div>
    </div>`;

  // Attach the Album Card to the page:
  if (!!musicCardsContainer) {
    musicCardsContainer.appendChild(albumCard);
  }
}

const artistInit = (artist) => {
  // First create the heading for this artist:
  const artistHeading = document.createElement('div');
  artistHeading.classList.add('row');
  artistHeading.innerHTML = `
    <div class="col col-12">
      <h2 class="artist-name">${artist.artist}</h2>
    </div>`;
  if (!!musicCardsContainer) {
    musicCardsContainer.appendChild(artistHeading);
  }
  // Then build a card for each album that contains tracks for this project:
  const albums = artist.albums;
  albums.forEach(album => {
    if (pageLevel3 in album.notes) {
      buildAlbumCard(artist.artist, album);
    }
  });
}

const checkArtists = () => {
  music.forEach(artist => {
    // If the artist has at least one album pertaining to this project, invoke artistInit() for that artist:
    const albums = artist.albums;
    const projectMatch = albums.some(album => {
      return pageLevel3 in album.notes;
    });
    
    if (!!projectMatch) {
      artistInit(artist);
    }
  });
}

if (pageLevel4 === 'music') {
  checkArtists();
}