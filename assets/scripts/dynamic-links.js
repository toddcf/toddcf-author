let env = '';
switch (window.location.host) {
  case 'toddcf.com':
    env = 'prod';
    break;
  case 'toddcf.github.io':
    env = 'gh-pages';
    break;
  default:
    env = 'local';
}

let siteLinks = Array.from(document.querySelectorAll('a'));
const modifyHref = (siteLink) => {
  console.log('modifyHref invoked. siteLink.href.slice(-5) === ', siteLink.href.slice(-5));
  if (siteLink.href.slice(-5) === 'index') {
    console.log('This link ends with index.');
    console.log(`env is ${env}.`);
    switch (env) {
      case 'prod':
      case 'gh-pages':
        console.log('prod or gh-pages condition met.');
        // Remove 'index' from the end of any hrefs.
        siteLink.href = siteLink.href.substring(0, siteLink.href.length - 5);
        break;
      case 'local':
        console.log('local condition met.');
        siteLink.href += '.html';
    }
  } else {
    console.log('modifyHref did nothing.');
  }
}

siteLinks.forEach(modifyHref);

// USE CASES:
// Test everything in local, gh-pages, and prod.
// anchor tag "buttons"
// anchor tag text links
// buttons