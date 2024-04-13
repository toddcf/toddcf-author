const musicCardsContainer = document.querySelector('.music-cards-container');
const projectTitle = window.digitalData.page.levels[2].id;

window.globalControl.musicPageBuilder = {
  buildTrackInfo: (track, trackNumWidth, trackTitleWidth, trackNotesWidth) => {
    // LEGACY
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
    // Only create anchor tags if a link exists:
    const anchorTagOpen = (!!album.saleLink) ? `<a href="${album.saleLink}" target="_blank">` : '';
    const anchorTagClose = (!!album.saleLink) ? '</a>' : '';

    // Attach the Album Card to the page:
    if (!!musicCardsContainer) {
      musicCardsContainer.appendChild(albumCard);
    }
  },
  buildTrackNotes: () => {

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
  buildAlbumNotes: (albumNotes) => {
    let albumNotesHTML = '';
    albumNotes.forEach(albumNotesItem => {
      // Each item in the array only has one key, so just get [0]:
      const itemKey = Object.keys(albumNotesItem)[0];
      const itemValue = albumNotesItem[itemKey];
      switch(itemKey) {
        case 'p':
        case 'q':
          albumNotesHTML += `<${itemKey} class="font_size_body music-card__album-notes_${itemKey}">${itemValue}</${itemKey}>`;
          break;
        case 'ul':
          // If the key is 'ul', even more logic is required to parse the 'li' items it will contain and build all of those tags -- enough that it probably needs to be abstracted yet again into another method all its own.
          break;
      }
    });
    return albumNotesHTML;
  },
  buildAlbumCard: (album, artist) => {
    // Before building the HTML for the Album Card itself, build the dynamic HTML that it may or may not contain:
    const albumNotesHTML = window.globalControl.musicPageBuilder.buildAlbumNotes(album.notes[projectTitle]);
    const albumTracksHTML = window.globalControl.musicPageBuilder.buildTrackNotes(album.notes[projectTitle].tracks); // I want to pass in the 'tracks' array, but have a feeling this is not quite the right syntax. Also, I think we'll need to filter for just the tracks pertaining to this project first...

    return `<div class="music-card_album">
      <figure class="music-card__album-artwork_figure">
        <img class="music-card__album-artwork_img" src="../../assets/img/music/${artist.id}/${album.title.id}.jpg" alt="${artist.name}: ${album.title.ui} album cover">
      </figure>
      <div class="music-card__album-text">
        <h3 class="music-card__album-title">${album.title.ui}</h3>
        <a class="button_primary font_size_body" data-link="external" href="${album.saleLink}" target="_blank">View on Amazon</a>
        ${albumNotesHTML}
        <div class="music-card__track-container">
          ${albumTracksHTML}
        </div>
      </div>`;
  },
  filterAlbums: (artist) => {
    let albumCardsHTML = '';
    const artistAlbums = artist.albums;
    artistAlbums.forEach(album => {
      if (projectTitle in album.notes) {
        albumCardsHTML += window.globalControl.musicPageBuilder.buildAlbumCard(album, artist.artist);
      }
    });
    return albumCardsHTML;
  },
  buildArtistCard: (applicableArtists) => {
    console.log('applicableArtists:', applicableArtists);
    applicableArtists.forEach(artist => {
      //console.log('artist.notes[projectTitle]:', artist.notes[projectTitle]);
      // Before building the HTML for the Artist Card itself, build the dynamic HTML that it may or may not contain:
      const albumCardsHTML = window.globalControl.musicPageBuilder.filterAlbums(artist);
      const artistNotesHTML = window.globalControl.musicPageBuilder.buildArtistNotes(artist.notes[projectTitle]);

      // *Now* build the HTML for the actual Artist Card, inserting each applicable element:
      const artistCard = document.createElement('div');
      artistCard.classList.add('music-card_artist');
      artistCard.innerHTML = `
        <div class="content__center content__center_700">
          <h2 class="font_size_2 music-card__artist-name">${artist.ui}</h2>
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