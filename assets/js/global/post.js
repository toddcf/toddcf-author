window.globalControl.tagBuilder({
  appendTo: 'body',
  attr: {
    src: 'nav',
    type: 'text/javascript',
  },
  pathToRoot: true,
});
// window.globalControl.tagBuilder('assets/scripts/nav', 'relative', 'js', 'body', true);

if (window.digitalData.page.level1 === 'titles') {
  window.globalControl.tagBuilder({
    appendTo: 'body',
    attr: {
      src: 'titles',
      type: 'text/javascript',
    },
    pathToRoot: true,
  });
  // window.globalControl.tagBuilder('assets/scripts/titles', 'relative', 'js', 'body', true); // Need additional logic to drill a level deeper if this is a series.  Also, Page Level 1 alone may or may not be a good idea, given that this will load the Titles script on Music pages, as well.
}

// First build the data layer, then load the Nav logic, which will use those values to dynamically build the Nav:

switch (window.digitalData.page.category) {
  case 'music':
    window.globalControl.tagBuilder({
      appendTo: 'body',
      attr: {
        src: 'music',
        type: 'text/javascript',
      },
      pathToRoot: true,
    });
    // window.globalControl.tagBuilder('assets/scripts/music', 'relative', 'js', 'body', true); // Maybe this process can be even more programmatic, in that every single directory level has an asset, and we just load whatever those files are (with validations that prevent them from attempting to load if they don't exist).
    break;
}

// If the page contains testimonials, load that script:
if (document.querySelector('.testimonials')) {
  window.globalControl.tagBuilder({
    appendTo: 'body',
    attr: {
      src: 'testimonials',
      type: 'text/javascript',
    },
    pathToRoot: true,
  });
  // window.globalControl.tagBuilder('assets/scripts/testimonials', 'relative', 'js', 'body', true);
}

window.globalControl.tagBuilder({
  appendTo: 'body',
  attr: {
    src: 'footer',
    type: 'text/javascript',
  },
  pathToRoot: true,
});
// window.globalControl.tagBuilder('assets/scripts/footer', 'relative', 'js', 'body', true);

// Decide if the 'local' logic should just go inside the internalLinkLogic method itself:
//window.onload = (event) => {
  if (window.digitalData?.site?.env === 'local') {
    window.globalControl.internalLinkLogic();
  }
//}