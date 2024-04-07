const musicCardsContainer = document.querySelector('.music-cards-container');

const buildParagraphs = (paragraphsArr) => {
  let paragraphsHTML = ``;
  if (Array.isArray(paragraphsArr) && paragraphsArr.length > 0) {
    paragraphsArr.forEach(paragraphText => {
      paragraphsHTML += `<p>${paragraphText}</p>`;
    });
  }
  return paragraphsHTML;
}

const buildTrackInfo = (track, trackNumWidth, trackTitleWidth, trackNotesWidth) => {
  if (!!track && !!trackNumWidth && !!trackTitleWidth && !!trackNotesWidth) {
    return `<div class="row">
      <div class="col col-${trackNumWidth}">
        <p class="track-number">${track.trackNumber}</p>
      </div>
      <div class="col col-${trackTitleWidth}">
        <p class="track-title">${(track.artist) ? track.artist + ' ': ''}&ldquo;${track.title}&rdquo;</p>
      </div>
      <div class="col col-${trackNotesWidth}">
        ${buildParagraphs(track.notes[window.digitalData.page.levels[1].id])}
      </div>
    </div>`;
  }
};

const buildAlbumCard = (artistName, album) => {
  const imgSrc = window.globalControl.prependRoot(`assets/img/music/${window.globalControl.kebabCase(artistName)}/${window.globalControl.kebabCase(album.title)}.jpg`);
  // NOTE: Minimize all images.
  // Build out all the tracks first, as they will need to be ready to be inserted into the album card at the time the Album Card is created:
  const trackNumWidth = '1';
  const trackTitleWidth = '6';
  const trackNotesWidth = '5';
  
  // Create one row of headings:
  let tracksContainer = `<div class="row"><div class="col col-${trackNumWidth}"><p class="track-number">Track Number</p></div><div class="col col-${trackTitleWidth}"><p class="track-title">Track Title</p></div><div class="col col-${trackNotesWidth}"><p class="track-notes">Notes</p></div></div>`;
  
  // Add each applicable track:
  const tracks = album.tracks;
  tracks.forEach(track => {
    if (window.digitalData.page.levels[1].id in track.notes) {
      tracksContainer += `${buildTrackInfo(track, trackNumWidth, trackTitleWidth, trackNotesWidth)}`;
    }
  });
  
  // Create the Album Card to store everything in:
  const albumCard = document.createElement('div');
  albumCard.classList.add('row'); // Something is slightly wrong with the row/column nesting in these Album Cards, but I'm not sure what yet.

  // Only create anchor tags if a link exists:
  const anchorTagOpen = (!!album.saleLink) ? `<a href="${album.saleLink}" target="_blank">` : '';
  const anchorTagClose = (!!album.saleLink) ? '</a>' : '';

  albumCard.innerHTML = `
    <div class="album-card">
      <div class="col col-3">
        <figure class="album-art">
          ${anchorTagOpen}
            <img class="image-assets" src="${imgSrc}" alt="${artistName}: ${album.title}">
          ${anchorTagClose}
          <figcaption class="album-title">${anchorTagOpen}${album.title}${anchorTagClose}</figcaption>
        </figure>
      </div>
      <div class="col col-9">
        ${buildParagraphs(album.notes[window.digitalData.page.levels[1].id])}
      </div>
      <div class="row">
        <div class="col-12">
          ${tracksContainer}
        </div>
      </div>
    </div>`;

  // Attach the Album Card to the page:
  if (!!musicCardsContainer) {
    musicCardsContainer.appendChild(albumCard);
  }
}

const artistInit = (artist) => {
  // First create the heading for this artist:
  const artistHeading = document.createElement('div');
  artistHeading.classList.add('row');
  artistHeading.innerHTML = `
    <div class="col col-12">
      <h2 class="artist-name">${artist.artist}</h2>
    </div>`;
  if (!!musicCardsContainer) {
    musicCardsContainer.appendChild(artistHeading);
  }
  // Then build a card for each album that contains tracks for this project:
  const albums = artist.albums;
  albums.forEach(album => {
    if (window.digitalData.page.levels[1].id in album.notes) {
      buildAlbumCard(artist.artist, album);
    }
  });
}

const checkArtists = () => {
  const pageLevels = window.digitalData?.page?.levels;
  if (pageLevels[pageLevels.length - 1].category === 'music') {
    const musicData = window?.digitalData?.music;
    musicData.forEach(artist => {
      // If the artist has at least one album pertaining to this project, invoke artistInit() for that artist:
      const albums = artist.albums;
      const projectMatch = albums.some(album => {
        return window.digitalData.page.levels[1].id in album.notes;
      });
      
      if (!!projectMatch) {
        artistInit(artist);
      }
    });
  }
}

// Refactor this to be an 'init' method, and put all the other functions into one object as methods:
checkArtists();
