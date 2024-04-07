const thisYear = new Date().getFullYear();

// For the footer, maybe I should hardcode an empty footer element into each page's HTML.  Then I can give it a class if I want the full-blown dynamic footer built and inserted, and leave the class off if I just want the copyright date inserted.  That would be a little more dynamic than hardcoding a check for the homepage -- if I ever add another page later where I don't want the full-blown footer, it will be built automatically.

const footerEl = document.querySelector('.footer');
if (!!footerEl) {
  footerEl.innerHTML = `<section class="footer__section">
  <div class="footer__icon-flexbox">
    <a data-link="external" href="https://www.facebook.com/toddcf.writer/" target="_blank"><img src="${window.globalControl.prependRoot('assets/img/icons/facebook/facebook-20.png')}" alt="Facebook Author Page" class="footer__icon"></a>
    <a data-link="external" href="https://www.amazon.com/Todd-Croak-Falen/e/B003A1UF3I/ref=sr_ntt_srch_lnk_1?qid=1499390370&sr=8-1" target="_blank"><img src="${window.globalControl.prependRoot('assets/img/icons/amazon/amazon_a_ding.png')}" alt="Amazon Author Page" class="footer__icon"></a>
    <a data-link="external" href="https://www.goodreads.com/toddcf" target="_blank"><img src="${window.globalControl.prependRoot('assets/img/icons/goodreads/goodreads.png')}" alt="Goodreads Author Page" class="footer__icon"></a>
  </div>
  </section>

  <section class="footer__section">
    <p class="font_size_body footer__p">We are a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for us to earn fees by linking to Amazon.com and affiliated sites.</p>
    <p class="font_size_body footer__p">Website by <a data-link="external" href="https://tcf-web-development.com/" target="_blank" class="footer__text-link"> TCF Web Development</a></p>
    <p class="font_size_body footer__p">Copyright &copy; 2008 ${(!!thisYear) ? `&ndash; ${thisYear} ` : ''}Todd Croak-Falen</p>
  </section>`;
  document.body.appendChild(footerEl);
}