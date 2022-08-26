let indexLinks = Array.from(document.querySelectorAll('a'));
const modifyHref = (str) => {
  if (str.slice(-5 === 'index')) {
    if (!!window.location.host) {
      // If Prod or GH Pages, replace that final 'index' with an empty string -- but only the final 'index', in case there are multiples in the pathname on the way there.
    } else {
      // If Local File:
      str.href += '.html';
    }
  }
}