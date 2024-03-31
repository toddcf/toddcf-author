window.globalControl.titlesHubBuilder = {
  buildCards: () => {
    const titlesArr = window.digitalData?.titles;
    const hubTitles = titlesArr.filter(title => title.hub === true);
    
  },
  init: () => {
    window.globalControl.titlesHubBuilder.buildCards();
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