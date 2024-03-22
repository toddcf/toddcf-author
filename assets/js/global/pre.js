// Declare global methods:
window.globalControl = {
  minify: (fileType, bool) => {
    if (
      typeof bool === 'boolean' &&
      (fileType === 'css' || fileType === 'js')
    ) {
      if (bool) {
        sessionStorage.setItem(`min.${fileType}`, 'true');
      } else {
        sessionStorage.removeItem(`min.${fileType}`);
      }
      location.reload();
    }
  },
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
  internalLinkLogic: () => {
    console.log('internalLinkLogic fired.');
    let internalLinks;
    if (window.digitalData?.site?.env === 'local') {
      internalLinks = document.querySelectorAll('[data-link="internal"]');
      internalLinks.forEach(internalLink => {
        if (!internalLink.getAttribute('data-link-appended')) {
          internalLink.href += '.html';
          internalLink.setAttribute('data-link-appended', 'true'); // Prevent the extension from being appended repeatedly.
        }
      });
    }
  },
  prependRoot: (corePath) => {
    console.log('prependRoot invoked. corePath:', corePath);
    // Pass in the full destination path, starting from the root, and *without* the initial slash.
    // Determine relative dest path:
    let relativePath;
    if (!!corePath) {
      relativePath = (!!window.digitalData.page.pathToRoot) ? window.digitalData.page.pathToRoot + corePath : corePath;
    }
    console.log('relativePath:', relativePath);
    return relativePath;
  },
  tagBuilder: (tag) => {
    console.log('tag:', tag);
    let el;

    if (typeof tag === 'object') {
      // Set any attributes that exist:
      if (typeof tag.attr === 'object') {

        // Do all necessary customizations to these values *before* adding them to the actual element:
        if (tag.favicon === true) {
          tag.appendTo = 'head';
          tag.pathToRoot = true;
        }

        if (
          tag.favicon === true &&
          !!tag.attr.href
        ) {
          if (
            window.digitalData.page.level1 === 'titles' &&
            !!window.digitalData.page.level2
          ) {
            tag.attr.href = `assets/img/favicon/${window.digitalData.page.level2}/${tag.attr.href}`;
          } else {
            tag.attr.href = `assets/img/favicon/default/${tag.attr.href}`;
          }
        }
        
        if (typeof tag.attr.type === 'string') {
          switch (tag.attr.type) {
            case 'text/css':
              tag.appendTo = 'head';
              tag.attr.href = `assets/css/${tag.attr.href}`;
              tag.attr.rel = 'stylesheet';
              tag.elType = 'link';
              tag.fileType = 'css';
              if (
                sessionStorage.getItem('min.css') &&
                ![tag.attr.href].includes('ionicons')
              ) {
                tag.attr.href += '-min';
              }
              break;
            case 'text/javascript':
              tag.attr.src = `assets/js/${tag.attr.src}`;
              tag.elType = 'script';
              tag.fileType = 'js';
              if (
                sessionStorage.getItem('min.js') &&
                ![tag.attr.src].includes('coverr') &&
                ![tag.attr.src].includes('waypoints') &&
                ![tag.attr.src].includes('mailchimp')
              ) {
                tag.attr.src += '-min';
              }
              break;
          }
        }
        
        if (tag.pathToRoot === true) {
          if (typeof tag.attr.href === 'string') {
            tag.attr.href = window.globalControl.prependRoot(tag.attr.href);
          }
          if (typeof tag.attr.src === 'string') {
            tag.attr.src = window.globalControl.prependRoot(tag.attr.src);
          }
        }
        
        if (typeof tag.fileType === 'string') {
          console.log('tag.fileType === string condition met.');
          if (typeof tag.attr.href === 'string') {
            tag.attr.href += `.${tag.fileType}`;
          }
          if (typeof tag.attr.src === 'string') {
            tag.attr.src += `.${tag.fileType}`;
          }
          console.log('tag.attr.href:', tag.attr.href);
        }
      }
      console.log('Post-customization tag:', tag);
      // End Customizations

      // Then create and build the tag:
      if (typeof tag.elType === 'string') {
        el = document.createElement(tag.elType);
        for (const property in tag.attr) {
          el[property] = tag.attr[property];
        }
        if (tag.elType === 'script') {
          console.log('script tag:', el);
        }
      }

      // Attach element to DOM:
      if (!!el && typeof tag.appendTo === 'string') {
        document[tag.appendTo].appendChild(el);
      }
    }
  },
};

// Then set a listener to run all the DOM-modification logic once the page finishes loading:
window.onload = (event) => {
  window.globalControl.tagBuilder({
    appendTo: 'body',
    attr: {
      src: 'global/post',
      type: 'text/javascript',
    },
    pathToRoot: true,
  });

  window.globalControl.tagBuilder({
    appendTo: 'body',
    attr: {
      src: 'global/favicon',
      type: 'text/javascript',
    },
    pathToRoot: true,
  });
}

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
    root = window.digitalData.site.root = '/toddcf-author/';
    break;
  case 'local':
    root = window.digitalData.site.root = '/toddcf-author/github/toddcf-author/';
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
window.digitalData.page.pathToRoot = '';
for (i = levelCount; i > 0; i--) {
  window.digitalData.page.pathToRoot += '../';
}
console.log('window.digitalData.page.pathToRoot:', window.digitalData.page.pathToRoot);

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
// Attach global CSS links:
window.globalControl.tagBuilder({
  attr: {
    href: 'global/global',
    type: 'text/css',
  },
  pathToRoot: true,
});
window.globalControl.tagBuilder({
  attr: {
    href: 'global/grid',
    type: 'text/css',
  },
  pathToRoot: true,
});
window.globalControl.tagBuilder({
  attr: {
    href: 'global/fonts',
    type: 'text/css',
  },
  pathToRoot: true,
});
if (!!window.digitalData.page.level1 && window.digitalData.page.level1 !== 'home') {
  window.globalControl.tagBuilder({
    attr: {
      href: 'global/header',
      type: 'text/css',
    },
    pathToRoot: true,
  });
  window.globalControl.tagBuilder({
    attr: {
      href: 'ionicons.min', /* THIS ONE ALREADY HAS .MIN, SO DON'T DYNAMICALLY RE-APPEND THAT */
      type: 'text/css',
    },
    pathToRoot: true,
  });
  window.globalControl.tagBuilder({
    attr: {
      href: 'global/footer',
      type: 'text/css',
    },
    pathToRoot: true,
  });
}

// Attach specific CSS links based on page levels:
// An even better way to do this will be to give each CSS file the same name as a page level, and then programmatically add any file for page levels that exist.
switch (window.digitalData.page.level1) {
  case 'home':
    window.globalControl.tagBuilder({
      attr: {
        href: 'index',
        type: 'text/css',
      },
      pathToRoot: true,
    });
    break;
  case 'about-me':
    window.globalControl.tagBuilder({
      attr: {
        href: window.digitalData.page.level1,
        type: 'text/css',
      },
      pathToRoot: true,
    });
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
    window.globalControl.tagBuilder({
      attr: {
        href: window.digitalData.page.level1,
        type: 'text/css',
      },
      pathToRoot: true,
    });
    switch (window.digitalData.page.level2) {
      case 'form':
      case 'confirmation':
        window.globalControl.tagBuilder({
          attr: {
            href: window.digitalData.page.level2,
            type: 'text/css',
          },
          pathToRoot: true,
        });
        break;
    }
    break;
  case 'titles':
    // First check if Music page:
    if (window.digitalData.page.level3 === 'music') {
      window.globalControl.tagBuilder({
        attr: {
          href: window.digitalData.page.level3,
          type: 'text/css',
        },
        pathToRoot: true,
      });
      window.globalControl.tagBuilder({
        attr: {
          href: `${window.digitalData.page.level3}-${window.digitalData.page.level2}`,
          type: 'text/css',
        },
        pathToRoot: true,
      });
    } else if (!window.digitalData.page.level2) {
      // Then check if it's the Titles Hub:
      window.globalControl.tagBuilder({
        attr: {
          href: `${window.digitalData.page.level1}/index`,
          type: 'text/css',
        },
        pathToRoot: true,
      });
    } else {
      // Then, by default, this must be an individual title page:
      window.globalControl.tagBuilder({
        attr: {
          href: `${window.digitalData.page.level1}/title`,
          type: 'text/css',
        },
        pathToRoot: true,
      });

      // The following used to be for individual title pages' background images, but this CSS is now being handled dynamically in the titles.js file and no longer requires an individual CSS file for each one.
      // window.globalControl.tagBuilder({
      //   attr: {
      //     href: `${window.digitalData.page.level1}/${window.digitalData.page.level2}`,
      //     type: 'text/css',
      //   },
      //   pathToRoot: true,
      // });
    }
    break;
}

// USE CASES:
// Test everything in local, gh-pages, and prod.
// anchor tag "buttons"
// anchor tag text links
// buttons