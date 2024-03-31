window.globalControl.titlesHubBuilder = {
  buildCards: (hubTitles) => {
    const titlesHubFlexbox = document.querySelector('.titles-hub-flexbox');
    if (!!titlesHubFlexbox) {
      hubTitles.forEach(hubTitle => {
        const titleHubCard = `<div class="titles-hub-flexbox__item">
          <div class="title-card">
            <img class="title-card__artwork" src="${window.digitalData.page.pathToRoot}/assets/img/titles/${hubTitle.id}/front.jpg" alt="${hubTitle.title} cover art">
            <cite><h2 class="title-card__title font_size_1">${hubTitle.title}</h2></cite>
            <h3 class="title-card__media font_size_body">- ${hubTitle.media.name} -</h3>
          </div>
        </div>`;
        titlesHubFlexbox.appendChild(titleHubCard);
      });
    }
  },
  getHubTitles: () => {
    const titlesArr = window.digitalData?.titles;
    const hubTitles = titlesArr.filter(title => title.hub === true);
    if (hubTitles.length > 0) {
      window.globalControl.titlesHubBuilder.buildCards(hubTitles);
    }
  },
  init: () => {
    window.globalControl.titlesHubBuilder.getHubTitles();
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