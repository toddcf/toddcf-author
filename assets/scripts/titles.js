console.log('titles.js loaded.');

const titles = {
  'catch-up-to-myself': {
    title: 'Catch Up To Myself',
    category: 'fiction',
    format: {
      hardcover: {
        live: false,
        saleLink: '',
      },
      kindle: {
        live: true,
        saleLink: '',
      },
      paperback: {
        live: false,
        saleLink: '',
      },
    },
    genres: [
      'Coming of Age',
      'Relationships',
    ],
    media: 'novel',
    synopsis: {
      logline: '',
      short: ``,
      full: ``,
    },
    testimonials: [
      {
        author: '',
        link: '',
        platform: '',
        text: ``,
      },
    ],
  },
  'cultivation-series': [],
  'epic-series': [],
  'sobriquet-series': [
    {
      'sobriquet-the-forging-of-a-special-liaison': {
        title: 'Sobriquet: The Forging of a Special Liaison',
        category: 'fiction',
        format: {
          hardcover: {
            live: false,
            saleLink: '',
          },
          kindle: {
            live: false,
            saleLink: '',
          },
          paperback: {
            live: false,
            saleLink: '',
          },
        },
        genres: [
          'Action',
          'Relationships',
          'Self-Improvement',
        ],
        media: 'novel',
        synopsis: {
          logline: '',
          short: ``,
          full: ``,
        },
        testimonials: [
          {
            author: '',
            link: '',
            platform: '',
            text: ``,
          },
        ],
      },
    },
    {
      'sobriquet-red-team': {},
    },
  ],
}

if (!!window.global && typeof window.global.titleBuilder === 'function') {
  window.global.titleBuilder();
}