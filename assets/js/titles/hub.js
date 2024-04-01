window.globalControl.titlesHubBuilder = {
  buildCards: (hubTitles) => {
    const titlesHubFlexbox = document.querySelector('.titles-hub-flexbox');
    console.log(titlesHubFlexbox);
    if (!!titlesHubFlexbox) {
      hubTitles.forEach((hubTitle, cardNumber) => {
        const titleHubCard = document.createElement('div');
        titleHubCard.classList.add('titles-hub-flexbox__item');
        let animationDelay = cardNumber * 250; // ms
        titleHubCard.innerHTML = `<a class="title-card__anchor" data-link="internal" href="${hubTitle.id}/index">
          <div class="title-card title-card_fade-in-right" style="-webkit-animation-delay: ${animationDelay}ms;animation-delay: ${animationDelay}ms;">
            <img class="title-card__artwork" src="${window.digitalData.page.pathToRoot}/assets/img/titles/${hubTitle.id}/front.jpg" alt="${hubTitle.title} cover art">
            <cite><h2 class="title-card__title font_size_1">${hubTitle.title}</h2></cite>
            <h3 class="title-card__media font_size_body">- A ${hubTitle.media.name} -</h3>
          </div>
        </a>`;
        titlesHubFlexbox.appendChild(titleHubCard);
      });
    }
    window.globalControl.internalLinkLogic();
  },
  getHubTitles: () => {
    const titlesArr = window.digitalData?.titles;
    const hubTitles = titlesArr.filter(title => title.hub === true);
    if (hubTitles.length > 0) {
      window.globalControl.titlesHubBuilder.buildCards(hubTitles);
    }
  },
  setBackground: () => {
    // Background Art:
    const backgroundArt = document.querySelector('.titles-hub-main');
    let backgroundURL;
    if (!!backgroundArt) {
      backgroundURL = `${window.digitalData.page.pathToRoot}/assets/img/cannon-beach-haystack-rock.jpg`;
      backgroundRGBA = 'rgba(0, 0, 0, 0.7)';
      backgroundArt.setAttribute('style', `background-image: -webkit-gradient(linear, left top, left bottom, from(${backgroundRGBA}), to(${backgroundRGBA})) , url(${backgroundURL});
      background-image: -webkit-linear-gradient(${backgroundRGBA}, ${backgroundRGBA}) , url(${backgroundURL});
      background-image: -o-linear-gradient(${backgroundRGBA}, ${backgroundRGBA}) , url(${backgroundURL});
      background-image: linear-gradient(${backgroundRGBA}, ${backgroundRGBA}) , url(${backgroundURL});`);
    } else {
      console.error('.synopsis-section not found; unable to set background art.');
    }

    window.globalControl.titlesHubBuilder.getHubTitles();
  },
  init: () => {
    window.globalControl.titlesHubBuilder.setBackground();
  },
}

window.globalControl.titlesHubBuilder.init();

// CHECK IF 'CITE' CAN CONTAIN 'H2'.
{/* <div class="titles-hub-flexbox__item">
					<div class="title-card">
						<img class="title-card__artwork" src="../assets/img/titles/catch-up-to-myself/front.jpg" alt="Catch Up To Myself cover art">
						<cite><h2 class="title-card__title font_size_1">Catch Up To Myself</h2></cite>
						<h3 class="title-card__media font_size_body">- Novel -</h3>
					</div>
				</div> */}