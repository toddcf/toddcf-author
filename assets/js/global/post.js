function postTags () {
  window.globalControl.tagBuilder({
    appendTo: 'body',
    attr: {
      src: 'nav',
      type: 'text/javascript',
    },
    pathToRoot: true,
  });

  if (window.digitalData.page.level1 === 'titles') {
    window.globalControl.tagBuilder({
      appendTo: 'body',
      attr: {
        src: 'titles',
        type: 'text/javascript',
      },
      pathToRoot: true,
    });
    // Need additional logic to drill a level deeper if this is a series.  Also, Page Level 1 alone may or may not be a good idea, given that this will load the Titles script on Music pages, as well.
  }

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
      // Make this process can be even more programmatic, in that every single directory level has an asset, and we just load whatever those files are (with validations that prevent them from attempting to load if they don't exist).
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
  }

  window.globalControl.tagBuilder({
    appendTo: 'body',
    attr: {
      src: 'footer',
      type: 'text/javascript',
    },
    pathToRoot: true,
  });

  return new Promise((resolve) => {
    resolve('resolve');
  });
}

// Use async await to fire this only after all the previous methods have finished updating the DOM:
// OR TRY DOING THIS WITHIN EACH APPLICABLE INDIVIDUAL SCRIPT FILE YOU ARE LOADING, SUCH AS NAV.
async function asyncCall() {
  await postTags();
  window.globalControl.internalLinkLogic();
}

asyncCall(); // This current setup fires, but it doesn't resolve my timing issue.