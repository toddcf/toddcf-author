window.globalControl.titlePageBuilder = {
  testimonials: (testimonialsArr) => {
    const testimonialsFlexbox = document.querySelector('.testimonials-flexbox');
    if (!!testimonialsFlexbox) {
      if (Array.isArray(testimonialsArr)) {
        testimonialsArr.forEach((testimonial, testimonialNumber) => {
          // First create the quote:
          const testimonialParagraphs = testimonial.text;
          let testimonialQuote = '';
          if (Array.isArray(testimonialParagraphs)) {
            testimonialParagraphs.forEach((testimonialParagraph, paragraphNumber) => {
              testimonialQuote += `<p class="body_p font_size_body">&ldquo;${testimonialParagraph}${(paragraphNumber === testimonialParagraphs.length - 1) ? '&rdquo;' : ''}</p>`;
            });
          }

          // Then create the attribution:
          let testimonialAttribution;
          if (!!testimonial.citeLink) {
            testimonialAttribution = `<a class="testimonials-card__attribution-link" href="${testimonial.citeLink}" target="_blank"' : ''}>${testimonial.platform}</a>`;
          } else {
            testimonialAttribution = testimonial.platform;
          }
          
          // Then create the card:
          let animationDelay = testimonialNumber * 400; // ms
          const testimonialsFlexboxItem = document.createElement('div');
          testimonialsFlexboxItem.classList.add('testimonials-flexbox__item');
          const cardNumber = testimonialNumber + 1;
          testimonialsFlexboxItem.innerHTML = `<div class="testimonials-card testimonials-card_${cardNumber}" style="-webkit-animation-delay: ${animationDelay}ms;animation-delay: ${animationDelay}ms;"><blockquote class="testimonials-card__quote" cite="${testimonial.citeLink}">${testimonialQuote}</blockquote><p class="body_p font_size_body testimonials-card__attribution">&ndash;&nbsp;via ${testimonialAttribution}</p></div>`;
          
          // Then append the card:
          testimonialsFlexbox.appendChild(testimonialsFlexboxItem);
        });
      } else {
        console.warn('testimonialsArr was not an array.');
      }
    } else {
      console.warn('No Testimonials Flexbox found on page.');
    }
  },
  // Kind of deciding this is not worth it. It would work, but what is the advantage? I think it will only ever be on this one page, so might as well hardcode it.
  // synopsis: (currentTitleObj) => {
  //   let fullSynopsisArr;
  //   if (typeof currentTitleObj.id === 'string') {
  //     fullSynopsisArr = currentTitleObj.synopsis.full;
  //     console.log('fullSynopsisArr:', fullSynopsisArr);
  //     // Probably use Object.keys(obj);
  //   } else {
  //     console.warn('No valid title passed into titlePageBuilder.synopsis.');
  //   }
  // },
  cta: (currentTitleObj) => {
    const ctaFlexboxes = document.querySelectorAll('.cta-flexbox');
    ctaFlexboxes.forEach(ctaFlexbox => {
      ctaFlexbox.innerHTML = `<div class="cta-flexbox__item">
        <a class="button" href="${currentTitleObj.format.kindle.saleLink}" target="_blank">
          <p class="button_primary">Buy on Amazon</p>
        </a>
      </div>

      <div class="cta-flexbox__item">
        <a class="button" data-link="internal" href="${window.digitalData.page.pathToRoot}/bonus-content/registration">
          <p class="button_secondary">Bonus Content</p>
        </a>
      </div>

      <div class="cta-flexbox__item">
        <a class="button" data-link="internal" href="music">
          <p class="button_secondary">The Music of <cite>${currentTitleObj.title}</cite></p>
        </a>
      </div>`;
    });
    window.globalControl.internalLinkLogic();
  },
  artwork: (currentTitleObj) => {
    // Background Art:
    const backgroundArt = document.querySelector('.synopsis-section');
    let backgroundURL;
    if (!!backgroundArt) {
      backgroundURL = `${window.digitalData.page.pathToRoot}/assets/img/titles/${currentTitleObj.id}/wide-no-text.jpg`;
      backgroundRGBA = 'rgba(0, 0, 0, 0.7)';
      backgroundArt.setAttribute('style', `background-image: -webkit-gradient(linear, left top, left bottom, from(${backgroundRGBA}), to(${backgroundRGBA})) , url(${backgroundURL});
      background-image: -webkit-linear-gradient(${backgroundRGBA}, ${backgroundRGBA}) , url(${backgroundURL});
      background-image: -o-linear-gradient(${backgroundRGBA}, ${backgroundRGBA}) , url(${backgroundURL});
      background-image: linear-gradient(${backgroundRGBA}, ${backgroundRGBA}) , url(${backgroundURL});`);
    } else {
      console.error('.synopsis-section not found; unable to set background art.');
    }
    // Cover Art:
    const synopsisCoverArtImg = document.querySelector('.synopsis-cover-art__img');
    synopsisCoverArtImg.src = `${window.digitalData.page.pathToRoot}/assets/img/titles/${currentTitleObj.id}/front.jpg`;
    synopsisCoverArtImg.alt = `${currentTitleObj.title} ${synopsisCoverArtImg.alt}`;
  },
  init: () => {
    let titleKebab;
    const pageLevels = window.digitalData.page.levels;
    const finalPageLevel = pageLevels[pageLevels.length - 1];
    switch (finalPageLevel?.category) {
      case 'specific-title':
        titleKebab = finalPageLevel.id;
        break;
      // case 'series-hub': // The hub will have to take all the titles. Then the individual title case will be 'specific-title' just like above, so figure that out.
      //   titleKebab = window.digitalData.page.level3;
      //   break;
    }
    
    // Get current title object:
    const allTitlesArr = window.digitalData.titles;
    const currentTitleObj = allTitlesArr.find(title => {
      return title.id === titleKebab;
    });
    console.log('currentTitleObj', currentTitleObj);
    
    if (typeof titleKebab === 'string') {
      window.globalControl.titlePageBuilder.artwork(currentTitleObj);
      // window.globalControl.titlePageBuilder.synopsis(currentTitleObj);
      window.globalControl.titlePageBuilder.cta(currentTitleObj);
      window.globalControl.titlePageBuilder.testimonials(currentTitleObj.testimonials);
    }
  },
}

window.globalControl.titlePageBuilder.init();

// Waypoints for Testimonials:
if (!!document.querySelector('.testimonials-card')) {
  $('.testimonials-card_1').waypoint( function( direction ) {
    const testimonialsCards = document.querySelectorAll('.testimonials-card');
    if (testimonialsCards.length > 0) {
      testimonialsCards.forEach(testimonialsCard => {
        testimonialsCard.classList.add('testimonials-card_fade-in');
      });
    }
  }, {
    offset: '75%',
  });

  window.globalControl.internalLinkLogic(); // Not sure if this should go inside or outside of this condition.
}
