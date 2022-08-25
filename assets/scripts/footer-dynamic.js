const thisYear = new Date().getFullYear();
let pathname = window.location.pathname;
let levels;
let assets = '';

if (!!window.location.host) {
  // If Prod
  levels = (pathname === '/') ? 0 : pathname.match(/\//g).length;
} else {
  // If Local File
  pathname = pathname.slice(pathname.indexOf('toddcf/'));
  levels = pathname.match(/\//g).length - 1;
}

for (levels; levels > 0; levels--) {
  assets += '../';
}
assets += 'assets';


const footerEl = document.createElement('footer');
footerEl.classList.add('footer');
footerEl.innerHTML = `<section class="footer__section">
<div class="footer__icon_flexbox">
  <a href="https://www.facebook.com/toddcf.writer/" target="_blank"><img src="${assets}/images/icons/facebook/facebook-20.png" alt="Facebook Author Page" class="footer__icon"></a>
  <a href="https://www.amazon.com/Todd-Croak-Falen/e/B003A1UF3I/ref=sr_ntt_srch_lnk_1?qid=1499390370&sr=8-1" target="_blank"><img src="${assets}/images/icons/amazon/amazon_a_ding.png" alt="Amazon Author Page" class="footer__icon"></a>
  <a href="https://www.goodreads.com/toddcf" target="_blank"><img src="${assets}/images/icons/goodreads/goodreads.png" alt="Goodreads Author Page" class="footer__icon"></a>
</div>
</section>

<section class="footer__section">
  <p class="copyright font_size_body footer_p">We are a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for us to earn fees by linking to Amazon.com and affiliated sites.</p>
  <p class="font_size_body footer_p">Website by <a href="https://www.tcf-webdesign.com" target="_blank" class="footer__text-link"> TCF Web Design</a></p>
  <p class="copyright font_size_body footer_p">Copyright &copy; 2008 ${(!!thisYear) ? `&ndash; ${thisYear} ` : ''}Todd Croak-Falen</p>
</section>`;
document.body.appendChild(footerEl);
