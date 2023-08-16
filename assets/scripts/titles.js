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
        saleLink: 'https://amzn.to/3saCirE',
      },
      paperback: {
        live: false,
        saleLink: '',
      },
    },
    genres: [
      'Coming of Age',
      'Relationships',
      'Heartbreak',
      'Young Love',
      'College',
      'Social Anxiety',
      'Depression',
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
  'the-druggist': {
    title: 'The Druggist',
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
      'Horror',
      'Halloween',
    ],
    media: 'short-story',
    synopsis: {
      logline: '',
      short: [
        'It&rsquo;s been five years since Eric&rsquo;s young daughter was drugged and kidnapped by a man who stalks his victims only on Halloween. Since then he&rsquo;s made it his life&rsquo;s mission to do what the police can&rsquo;t seem to do &mdash; capture this predator (and maybe torture him).',
        'But he&rsquo;ll have to be careful, because the worst thing that could happen would be if the druggist somehow got the upper hand and drugged Eric, sending him into an otherworld of nightmarish hallucinations.',
        'Dark and disturbing, <a href="https://amzn.to/3KE6mCx" target="_blank">The Druggist</a> will infect your psyche and stay with you long after you&rsquo;re done reading.',
      ],
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
}

window.global.titlePageBuilder = {
  synopsis: () => {

  },
  artwork: () => {
    console.log('window.global.titlePageBuilder.artwork() invoked.');
    const titleDetails = document.querySelector('.title-details');
    const figure = document.createElement('figure');
    figure.classList.add('front-cover', 'animated-3', 'fadeInUp');
    figure.innerHTML = `<a href="https://amzn.to/3KE6mCx" target="_blank"><img src="../../assets/images/titles/the-druggist/the-druggist-front-1563x2400.jpg" alt="The Druggist"></a>`;
    titleDetails.appendChild(figure);
  },
  init: () => {
    console.log('window.global.titlePageBuilder.init() invoked.');
    if (window.digitalData?.page?.category === 'specific-title') {
      // Before triggering titlePageBuilder, next step should probably be to populate the data layer accordingly.  BUT FIRST, GET DIGITALDATABUILDER WORKING.
      // Once data layer is populated, begin building the DOM:
      window.global.titlePageBuilder.artwork();
    }
  },
}

window.global.titlePageBuilder.init();