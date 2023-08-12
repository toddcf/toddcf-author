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
      // Convert specific character codes to alternative values:
      conversion = conversion.replace('&amp;', '-and-'); // Hyphens are in case there are no spaces around the ampersand. Multiple hyphens will be removed at the end.
      conversion = conversion.replace('ö', 'o'); // Specifically used for Björk
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
  digitalDataBuilder: (loc, val) => {
    console.log('window.global.digitalDataBuilder function invoked.');
    // loc should be an array, with each item a string containing the property name.
    // val can be any data type, and is the content that is to be populated in this property.
    if (Array.isArray(loc)) {
      // RESUME HERE
      // digitalData.titles = digitalData.titles || [];
      // digitalData.titles: [{title: 'The Druggist',}];
      // Assign the value inside this condition, too.
    }
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

    if (typeof dynamicFilepath === 'string') {
      if (typeof fileExt === 'string') {
        dynamicFilepath += `.${fileExt}`;
      }
      
      // Create element and set all attributes according to file extenstion type:
      switch(fileExt) {
        case 'js':
          el = document.createElement('script');
          el.src = dynamicFilepath;
          el.type = 'text/javascript';
          if (async === true) {
            el.setAttribute('async', true);
          }
          break;
        case 'css':
          el = document.createElement('link');
          el.href = dynamicFilepath;
          // cssLink.href = window.global.setRelativePath(`assets/styles/${filename}`, '.css'); // This is how it should have been passed in in the first place.
          el.rel = 'stylesheet';
          el.type = 'text/css';
          break;
      }
      
      // Attach element to DOM:
      if (!!el && typeof placement === 'string') {
        document[placement].appendChild(el);
      }
    }
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

  // Set Page Category:
  const finalPageLevel = pathnameArr[pathnameArr.length - 1];
  if (finalPageLevel === 'music') {
    window.digitalData.page.category = 'music';
  } else if (finalPageLevel.includes('-series')) {
    window.digitalData.page.category = 'series-hub';
  } else if (window.digitalData.page.level1 === 'titles') {
    window.digitalData.page.category = (!!window.digitalData.page.level2) ? 'specific-title' : 'title-hub';
  }
}

// Load CSS after data layer is set, but before JS files are loaded:
// REFACTOR TO USE WINDOW.GLOBAL.ELEMENTBUILDER.
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
if (!!window.digitalData.page.level1 && window.digitalData.page.level1 !== 'home') {
  createCSSlink('nav');
  createCSSlink('ionicons.min');
  createCSSlink('footer');
}

// Attach specific CSS links based on page levels:
// An even better way to do this will be to give each CSS file the same name as a page level, and then programmatically add any file for page levels that exist.
switch (window.digitalData.page.level1) {
  case 'home':
    createCSSlink('index');
    break;
  case 'about-me':
    createCSSlink('about-me');
    break;
  case 'bonus-content':
    switch (window.digitalData.page.level2) {
      case 'registration':
        // createCSSlink('bonus-content-deprecated');
        break;
      case 'confirmation':
        // The new page is not created yet.
        break;
    }
    break;
  case 'contact':
    switch (window.digitalData.page.level2) {
      case 'form':
        createCSSlink('contact');
        break;
      case 'confirmation':
        break;
    }
    break;
  case 'titles':
    if (window.digitalData.page.level3 === 'music') {
      createCSSlink(window.digitalData.page.level3);
      createCSSlink(`${window.digitalData.page.level3}-${window.digitalData.page.level2}`);
    } else {
      createCSSlink('titles'); // NOTE: I don't think the Music pages need the 'projects' CSS file.
      createCSSlink(window.digitalData.page.level2); // NOTE: I don't think the Music pages need the book title CSS file.
    }
    break;
}

// Create all favicons last, since they are less important than the page content.  And see if there is a way to 
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