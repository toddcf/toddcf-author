window.globalControl.musicPageBuilder = {
  buildAlbumCard1: (artistName, album) => {
    // THIS IS THE LEGACY VERSION
    // Only create anchor tags if a link exists:
    const anchorTagOpen = (!!album.saleLink) ? `<a href="${album.saleLink}" target="_blank">` : '';
    const anchorTagClose = (!!album.saleLink) ? '</a>' : '';

    // Attach the Album Card to the page:
    if (!!window.globalControl.musicPageBuilder.musicCardsContainer) {
      window.globalControl.musicPageBuilder.musicCardsContainer.appendChild(albumCard);
    }
  },
  musicCardsContainer: document.querySelector('.music-cards-container'),
  projectTitle: window.digitalData.page.levels[2].id,
  buildTextTags: (arr, noteType) => {
    let tags = '';
    if (arr.length > 0) {
      arr.forEach(arrItem => {
        // Each item in the array only has one key, so just get [0]:
        const itemKey = Object.keys(arrItem)[0];
        const itemValue = arrItem[itemKey];
        switch(itemKey) {
          case 'p':
          case 'q':
            tags += `<${itemKey} class="font_size_body music-card__${noteType}-notes_${itemKey}">${itemValue}</${itemKey}>`;
            break;
          case 'ol':
          case 'ul':
          case 'li':
            // This case is incredibly recursive. It passes the <ol> or <ul> back through the same method, which will pass the li back through the same method, which will finally hit a <p> tag:
            tags += `<${itemKey} class="font_size_body music-card__${itemKey}">${window.globalControl.musicPageBuilder.buildTextTags(itemValue, noteType)}</${itemKey}>`;
            break;
        }
      });
    }
    return tags;
  },
  buildTrackNotes: (track) => {
    // First create the Track Notes HTML that will be inserted into the flexbox:
    const trackNotes = window.globalControl.musicPageBuilder.buildTextTags(track.notes[window.globalControl.musicPageBuilder.projectTitle], 'track');
    
    // Then create the full flexbox and insert any applicable track notes:
    const trackNoteHTML = `<!-- Flexbox Container: Album Track -->
      <div class="music-card__track-container">
        <!-- Flexbox Item: Track Title -->
        <h4 class="font_size_body music-card__track-title">&ldquo;${track.title}&rdquo;</h4>
        <!-- Flexbox Item: Track Notes -->
        <div class="font_size_body music-card__track-notes">
          ${trackNotes}
        </div>
      </div> <!-- Close .music-card__album-track -->`;
      return trackNoteHTML;
  },
  filterTracks: (albumTracks) => {
    let trackNotesHTML = '';
    albumTracks.forEach(track => {
      if (window.globalControl.musicPageBuilder.projectTitle in track.notes) {
        trackNotesHTML += window.globalControl.musicPageBuilder.buildTrackNotes(track);
      }
    });
    return trackNotesHTML;
  },
  buildAlbumCard: (album, artist) => {
    // Before building the HTML for the Album Card itself, build the dynamic HTML that it may or may not contain:
    const albumNotesHTML = window.globalControl.musicPageBuilder.buildTextTags(album.notes[window.globalControl.musicPageBuilder.projectTitle], 'album');
    const albumTracksHTML = window.globalControl.musicPageBuilder.filterTracks(album.tracks);

    return `
      <div class="music-card_album">
        <figure class="music-card__album-artwork_figure">
          <img class="music-card__album-artwork_img" src="../../assets/img/music/${artist.id}/${album.title.id}.jpg" alt="${artist.name}: ${album.title.ui} album cover">
        </figure>
        <div class="music-card__album-text">
          <div class="content__center content__center_700">
            <h3 class="music-card__album-title">${album.title.ui}</h3>
            <a class="button_primary font_size_body" data-link="external" href="${album.saleLink}" target="_blank">View on Amazon</a>
            ${albumNotesHTML}
            <div class="music-card__track-container">
              ${albumTracksHTML}
            </div>
          </div>
        </div>
      </div>`;
  },
  filterAlbums: (artist) => {
    let albumCardsHTML = '';
    const artistAlbums = artist.albums;
    artistAlbums.forEach(album => {
      if (window.globalControl.musicPageBuilder.projectTitle in album.notes) {
        albumCardsHTML += window.globalControl.musicPageBuilder.buildAlbumCard(album, artist.artist);
      }
    });
    return albumCardsHTML;
  },
  buildArtistCard: (artist) => {
    // Before building the HTML for the Artist Card itself, build the dynamic HTML that it may or may not contain:
    const albumCardsHTML = window.globalControl.musicPageBuilder.filterAlbums(artist);
    const artistNotesHTML = window.globalControl.musicPageBuilder.buildTextTags(artist.notes[window.globalControl.musicPageBuilder.projectTitle], 'artist');

    // *Now* build the HTML for the actual Artist Card, inserting each applicable element:
    const artistCard = `
      <div class="content__center content__center_700">
        <h2 class="font_size_2 music-card__artist-name">${artist.artist.ui}</h2>
        ${artistNotesHTML}
      </div>
      ${albumCardsHTML}`;

    return artistCard;
  },
  filterArtists: () => {
    const musicData = window?.digitalData?.music;
    musicData.forEach(musicDataItem => {
      if (window.globalControl.musicPageBuilder.projectTitle in musicDataItem.notes) {
        const artistCard = document.createElement('div');
        artistCard.classList.add('music-card_artist');
        artistCard.innerHTML = window.globalControl.musicPageBuilder.buildArtistCard(musicDataItem);
        window.globalControl.musicPageBuilder.musicCardsContainer.appendChild(artistCard);
      }
    });
  },
  init: () => {
    window.globalControl.musicPageBuilder.filterArtists();
  },
}


if (!!window.globalControl.musicPageBuilder.musicCardsContainer) {
  window.globalControl.musicPageBuilder.init();
}