window.globalControl.postTags = () => {
  const pageLevels = window.digitalData?.page?.levels;
  const pageLevel2id = window.digitalData?.page?.levels[1]?.id;
  const pageLevel3id = window.digitalData?.page?.levels[2]?.id;
  // 'titles/digitalData.js' must be loaded before 'nav.js' due to a dependency.
  if (pageLevel2id === 'titles') {
    // Add titles to the data layer:
    const dataLayerTitles = () => {
      new Promise(resolve => window.globalControl.tagBuilder({
        appendTo: 'body',
        attr: {
          src: 'titles/digitalData',
          type: 'text/javascript',
        },
        pathToRoot: true,
      }));
    };

    // Code that must wait to run *after* the titles have been successfully added to the data layer:
    async function dataLayerTitleDependencies() {
      await dataLayerTitles();
      // Then run the logic that is dependent on the data layer:
      if (!!pageLevel3id) {
        // If Page Level 3 exists, this is a 'Title' Page:
        window.globalControl.tagBuilder({
          appendTo: 'body',
          attr: {
            src: 'titles/page',
            type: 'text/javascript',
          },
          pathToRoot: true,
        });
        // Need additional logic to drill a level deeper if this is a series.  Also, Page Levels alone may or may not be a good idea, given that this will load the Titles script on Music pages, as well.
      } else {
        // If there is no Page Level 3, this is the Titles Hub:
        window.globalControl.tagBuilder({
          appendTo: 'body',
          attr: {
            src: 'titles/hub',
            type: 'text/javascript',
          },
          pathToRoot: true,
        });
      }
    }
    dataLayerTitleDependencies();
  }

  window.globalControl.tagBuilder({
    appendTo: 'body',
    attr: {
      src: 'global/nav',
      type: 'text/javascript',
    },
    pathToRoot: true,
  });

  switch (pageLevels[pageLevels.length - 1].category) {
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
  await window.globalControl.postTags();
  window.globalControl.internalLinkLogic();
}

asyncCall(); // This current setup fires, but it doesn't resolve my timing issue. The promise probably needs to use 'resolve all' or something to that effect.