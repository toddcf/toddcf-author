const musicCardsContainer = document.querySelector('.music-cards-container');
const projectTitle = window.digitalData.page.levels[2].id;

window.globalControl.musicPageBuilder = {
  buildParagraphs: (paragraphsArr) => {
    let paragraphsHTML = ``;
    if (Array.isArray(paragraphsArr) && paragraphsArr.length > 0) {
      paragraphsArr.forEach(paragraphText => {
        paragraphsHTML += `<p>${paragraphText}</p>`;
      });
    }
    return paragraphsHTML;
  },
  buildTrackInfo: (track, trackNumWidth, trackTitleWidth, trackNotesWidth) => {
    if (!!track && !!trackNumWidth && !!trackTitleWidth && !!trackNotesWidth) {
      return `<div class="row">
        <div class="col col-${trackNumWidth}">
          <p class="track-number">${track.trackNumber}</p>
        </div>
        <div class="col col-${trackTitleWidth}">
          <p class="track-title">${(track.artist) ? track.artist + ' ': ''}&ldquo;${track.title}&rdquo;</p>
        </div>
        <div class="col col-${trackNotesWidth}">
          ${window.globalControl.musicPageBuilder.buildParagraphs(track.notes[projectTitle])}
        </div>
      </div>`;
    }
  },
  buildAlbumCard1: (artistName, album) => {
    // THIS IS THE LEGACY VERSION
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
      if (projectTitle in track.notes) {
        tracksContainer += `${window.globalControl.musicPageBuilder.buildTrackInfo(track, trackNumWidth, trackTitleWidth, trackNotesWidth)}`;
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
          ${window.globalControl.musicPageBuilder.buildParagraphs(album.notes[projectTitle])}
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
  },
  buildArtistNotes: (artistNotesArr) => {
    let artistNotes = ``;
    if (artistNotesArr.length > 0) {
      artistNotesArr.forEach(artistNoteItem => {
        // Each item in the array only has one key, so just get [0]:
        const itemKey = Object.keys(artistNoteItem)[0];
        const itemValue = artistNoteItem[itemKey];
        switch(itemKey) {
          case 'p':
          case 'q':
            artistNotes += `<${itemKey} class="font_size_body music-card__artist-notes_${itemKey}">${itemValue}</${itemKey}>`;
            break;
          case 'ul':
            // If the key is 'ul', even more logic is required to parse the 'li' items it will contain and build all of those tags -- enough that it probably needs to be abstracted yet again into another method all its own.
            break;
        }
        console.log('artistNotes:', artistNotes);
      });
    }
    return artistNotes;
  },
  buildAlbumCard: (album) => {
    // Before building the HTML for the Album Card itself, build the dynamic HTML that it may or may not contain:
    const albumNotesHTML; // This will invoke a separate method.
    const albumTracksHTML; // This will invoke a separate method.

    return `<div class="music-card_album">
      <figure class="music-card__album-artwork_figure">
        <img class="music-card__album-artwork_img" src="../../assets/img/music/army-of-anyone/army-of-anyone.jpg" alt="Army of Anyone: ${album.title} album cover">
      </figure>`; // The Album Artwork and the Album Text flexbox items' HTML will go here, with the dynamic HTML elements inserted into the Album Text flebox.
  },
  filterAlbums: (artistAlbums) => {
    let albumCardsHTML = '';
    artistAlbums.forEach(album => {
      if (projectTitle in album.notes) {
        albumCardsHTML += window.globalControl.musicPageBuilder.buildAlbumCard(album);
      }
    });
    return albumCardsHTML;
  },
  buildArtistCard: (applicableArtists) => {
    applicableArtists.forEach(artist => {
      // Before building the HTML for the Artist Card itself, build the dynamic HTML that it may or may not contain:
      const albumCardsHTML = window.globalControl.musicPageBuilder.filterAlbums(artist.albums.notes[projectTitle]);
      const artistNotesHTML = window.globalControl.musicPageBuilder.buildArtistNotes(artist.notes[projectTitle]);

      // *Now* build the HTML for the actual Artist Card, inserting each applicable element:
      const artistCard = document.createElement('div');
      artistCard.classList.add('music-card_artist');
      artistCard.innerHTML = `
        <div class="content__center content__center_700">
          <h2 class="font_size_2 music-card__artist-name">${artist.artist}</h2>
          ${artistNotesHTML}
        </div>
        ${albumCardsHTML}`;

      musicCardsContainer.appendChild(artistCard);
    });
  },
  filterArtists: () => {
    // LIKE IN THE METHODS THAT GET CALLED LATER, REFACTOR THIS TO USE A FOREACH HERE, AND RETURN ONE ARTIST CARD AT A TIME.
    // Determine which artists have album(s) pertaining to this project:
    const musicData = window?.digitalData?.music;
    const applicableArtists = musicData.filter(artist => {
      const artistNotes = artist.notes;
      return projectTitle in artistNotes;
    });
    
    // If any artists have albums pertaining to this project, build a card for each artist:
    if (applicableArtists.length > 0) {
      window.globalControl.musicPageBuilder.buildArtistCard(applicableArtists);
    }
  },
  init: () => {
    window.globalControl.musicPageBuilder.filterArtists();
  },
}


if (!!musicCardsContainer) {
  window.globalControl.musicPageBuilder.init();
}