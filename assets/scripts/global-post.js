// Crawl the DOM and append '.html' to any internal links:
const internalLinkLogic = () => {
  const internalLinks = document.querySelectorAll('[data-link="internal"]');
  internalLinks.forEach(internalLink => {
    internalLink.href += '.html';
  });
}

if (window.digitalData?.site?.env === 'local') {
  internalLinkLogic();
}