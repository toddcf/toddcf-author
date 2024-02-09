// Declare global methods:
window.globalControl = {
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
  // digitalDataBuilder: (digitalDataPath, val) => {
  //   console.log('window.globalControl.digitalDataBuilder function invoked.');
  //   // digitalDataPath is a string of the final data layer dot notation path where you want the value to be stored.  Never include 'window.digitalData'.  Example: 'page.level1'.
  //   // val can be any data type, and is the content that is to be populated in this property.
  //   const digitalDataPathArr = digitalDataPath.split('.'); // Note that this may also need to be split via [] because some values will contain hyphens.
  //   console.log('digitalDataPathArr:', digitalDataPathArr);
  //   let pathNotation = window.digitalData;
    
  //   digitalDataPathArr.forEach(pathItem => {
  //     if (!!pathNotation[pathItem]) {
  //       console.log(`${pathNotation[pathItem]} exists.`);
  //       pathNotation = pathNotation[pathItem];
  //       console.log('pathNotation:', pathNotation);
  //     } else {
  //       console.log(`${pathNotation[pathItem]} does not exist.`);
  //       pathNotation[pathItem] = {};
  //       //pathNotation = pathNotation
  //       console.log('pathNotation:', pathNotation);
  //     }
  //   });

  //   digitalDataPath = val;

/*
window.digitalDataHelper = {
    addData: function(t, e, i) {
        "object" === _typeof(e) && (i = e,
        e = void 0);
        var a, o = ["countryName", "countryPhone", "lastUpdated"];
        function n(t) {
            var e = ["true", "Y", "1", "false", "N", "0"]
              , i = e.indexOf(t);
            return i > -1 ? "true" === e[i] || "Y" === e[i] || "1" === e[i] : t
        }
        switch (_typeof(i)) {
        case "object":
            for (var d in a = {},
            i)
                i.hasOwnProperty(d) && -1 === o.indexOf(d) && (a[d] = n(i[d]));
            break;
        case "array":
            a = [],
            i.forEach((function(t, e, i) {
                a[e] = n(t)
            }
            ));
            break;
        default:
            a = n(i)
        }
        if (e)
            if ("object" === _typeof(a))
                for (var d in window.digitalData[t][e] = window.digitalData[t][e] || {},
                a)
                    window.digitalData[t][e][d] = a[d];
            else
                window.digitalData[t][e] = a;
        else
            for (var d in window.digitalData[t] = window.digitalData[t] || {},
            a)
                window.digitalData[t][d] = a[d]
    },
*/

    
    // RESUME HERE
    // digitalData.titles = digitalData.titles || [];
    // digitalData.titles: [{title: 'The Druggist',}];
  //},
  prependRoot: (corePath, filetype) => {
    console.log('prependRoot invoked. corePath:', corePath);
    // Pass in the full destination path, starting from the root, and *without* the initial slash.
    // Determine relative dest path:
    let relativePath;
    if (!!corePath) {
      relativePath = (!!pathToRoot) ? pathToRoot + corePath : corePath;
    }
    /*if (
      !!filetype
      && window.digitalData.site.env === 'local'
      || (window.digitalData.site.env !== 'local' && filetype !== '.html')
    ) {
      relativePath += filetype; // Adding .html is just for local && .html files.  But we do want to add .css, etc. for all environments. ALTHOUGH I CREATED A SEPARATE FUNCTION JUST FOR THIS IN GLOBAL-POST.JS, SO PROBABLY NEED TO REMOVE IT HERE? IF NOTHING ELSE, LOGIC FOR APPENDING THE FILETYPE SHOULD NOT BE COMBINED WITH THE LOGIC FOR SETTING THE RELATIVE PATH, I DON'T THINK. GETS TOO UNWIELDY.
    }*/
    console.log('relativePath:', relativePath);
    return relativePath;
  },
  tagBuilder: (tag) => {
    console.log('window.globalControl.tagBuilder function invoked.');
    let el;

    if (typeof tag === 'object') {
      // Set any attributes that exist:
      if (typeof tag.attr === 'object') {

        // Do all necessary customizations to these values *before* adding them to the actual element:
        if (typeof tag.attr.href === 'string') {
          if (tag.pathType === 'relative') {
            tag.attr.href = window.globalControl.prependRoot(tag.attr.href);
          }
          
          if (typeof tag.attr.type === 'string') {
            switch (tag.attr.type) {
              case 'text/css':
                tag.appendTo = 'head';
                tag.attr.href += '.css';
                tag.attr.rel = 'stylesheet';
                tag.elType = 'link';
                break;
              case 'text/javascript':
                tag.attr.href += '.js';
                tag.elType = 'script';
                break;
            }
          }
        }
        // End Customizations

        // Then create and build the tag:
        if (typeof tag.elType === 'string') {
          el = document.createElement(tag.elType);
          for (const property in tag.attr) {
            el[property] = tag.attr[property];
          }
        }
      }

      // Attach element to DOM:
      if (!!el && typeof tag.appendTo === 'string') {
        document[tag.appendTo].appendChild(el);
      }
    }
  },
};

// Create Data Layer (later, this will be refactored to use window.globalControl.digitalDataBuilder):
window.digitalData = window.digitalData || {};
window.digitalData.page = window.digitalData.page || {};
window.digitalData.site = window.digitalData.site || {};
let root = window.location.host;
console.log('root:', root);

// Set Environment:
switch (root) {
  case 'toddcf.com':
    window.digitalData.site.env = 'prod';
    break;
  case 'toddcf.github.io':
    window.digitalData.site.env = 'gh-pages';
    break;
  default:
    // Root will have been an empty string for local.
    window.digitalData.site.env = 'local';
}
console.log('env:', window.digitalData.site.env);

// Standardize root based on environment, and store in data layer:
switch (window.digitalData.site.env) {
  case 'prod':
    // No root standardization necessary.
    window.digitalData.site.root = root;
    break;
  case 'gh-pages':
  case 'local':
    root = window.digitalData.site.root = '/toddcf-author/';
    break;
}
console.log('Standardized root:', root);

// Standardize pathname using both the environment and root:
let pathname = window.location.pathname;
switch (window.digitalData.site.env) {
  case 'prod':
    // No pathname standardization necessary.
    break;
  case 'gh-pages':
    pathname = pathname.slice(root.length - 1); // Remove the root from the pathname (except for the slash).  (NOTE: This line could be identical to its 'local' counterpart, it's just that getting the index of the root was always going to be '0' in 'gh-pages', so I took that out.)
    if (pathname.slice(-6) === '/index') {
      pathname = pathname.slice(0, pathname.length - 5); // Remove 'index' from the end of any pathname.
    }
    break;
  case 'local':
    pathname = pathname.slice(pathname.indexOf(root) + root.length - 1); // Remove the root from the pathname (except for the slash).
    pathname = pathname.slice(0, pathname.length - 5); // Remove .html -- TRY COMBINING THIS WITH THE LINE ABOVE.
    if (pathname.slice(-6) === '/index') {
      pathname = pathname.slice(0, pathname.length - 5); // Remove 'index' from the end of any pathname.
    }
    break;
}
window.digitalData.page.pathname = pathname;
console.log('pathname:', pathname);

// START RELATIVE PATH LOGIC:
// Count number of slashes in pathnames. Will be used to set relative paths. Must be done after pathname variable is standardized.
const levelCount = pathname.match(/\//g).length - 1;
console.log('levelCount:', levelCount);

// Determine relative path from current page to the root:
let pathToRoot = '';
for (i = levelCount; i > 0; i--) {
  pathToRoot += '../';
}
console.log('pathToRoot:', pathToRoot);

// Set page levels. NEEDS TO KNOW PATHNAME FIRST. (Later, refactor to using window.globalControl.digitalDataBuilder)
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
// REFACTOR TO USE window.globalControl.TAGBUILDER.
// const createCSSlink = (filename) => {
//   const cssLink = document.createElement('link');
//   cssLink.rel = 'stylesheet';
//   cssLink.type = 'text/css';
//   cssLink.href = window.globalControl.prependRoot(`assets/styles/${filename}`, '.css');
//   document.querySelector('head').appendChild(cssLink);
// }

// Attach global CSS links:
window.globalControl.tagBuilder({
  attr: {
    href: 'assets/styles/global',
    type: 'text/css',
  },
  pathType: 'relative',
});
//createCSSlink('global');
window.globalControl.tagBuilder({
  attr: {
    href: 'assets/styles/grid',
    type: 'text/css',
  },
  pathType: 'relative',
});
// createCSSlink('grid');
window.globalControl.tagBuilder({
  attr: {
    href: 'assets/styles/fonts',
    type: 'text/css',
  },
  pathType: 'relative',
});
//createCSSlink('fonts');
if (!!window.digitalData.page.level1 && window.digitalData.page.level1 !== 'home') {
  createCSSlink('nav');
  createCSSlink('ionicons.min');
  createCSSlink('footer');
}

// Attach specific CSS links based on page levels:
// An even better way to do this will be to give each CSS file the same name as a page level, and then programmatically add any file for page levels that exist.
switch (window.digitalData.page.level1) {
  case 'home':
    window.globalControl.tagBuilder({
      attr: {
        href: 'assets/styles/index',
        type: 'text/css',
      },
      pathType: 'relative',
    });
    //createCSSlink('index');
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

// Create all favicons last, since they are less important than the page content. REFACTOR TO USE TAGBUILDER.
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