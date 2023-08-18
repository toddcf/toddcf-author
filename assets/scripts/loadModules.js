window.global.elementBuilder('assets/scripts/nav', 'relative', 'js', 'body', true);

if (window.digitalData.page.level1 === 'titles') {
  window.global.elementBuilder('assets/scripts/titles', 'relative', 'js', 'body', true); // Need additional logic to drill a level deeper if this is a series.  Also, Page Level 1 alone may or may not be a good idea, given that this will load the Titles script on Music pages, as well.
}

// First build the data layer, then load the Nav logic, which will use those values to dynamically build the Nav:

switch (window.digitalData.page.category) {
  case 'music':
    window.global.elementBuilder('assets/scripts/music', 'relative', 'js', 'body', true); // Maybe this process can be even more programmatic, in that every single directory level has an asset, and we just load whatever those files are (with validations that prevent them from attempting to load if they don't exist).
    break;
}

// If the page contains testimonials, load that script:
if (document.querySelector('.testimonials')) {
  window.global.elementBuilder('assets/scripts/testimonials', 'relative', 'js', 'body', true);
}


window.global.elementBuilder('assets/scripts/footer', 'relative', 'js', 'body', true);