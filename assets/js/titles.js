console.log('titles.js loaded.');

const titles = {
  'camp-paradise': {},
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
      short: '',
      full: [],
    },
    testimonials: [
      {
        author: {
          firstName: 'Jon',
          lastName: 'F.',
        },
        citeLink: 'https://www.amazon.com/gp/customer-reviews/R3UW2XCEKRMIP5/ref=cm_cr_dp_d_rvw_ttl?ie=UTF8&ASIN=B003AKZBII',
        platform: 'Amazon',
        text: ['An earnest and profound book about a young man&rsquo;s coming of age.  The level of detail and insight is uncanny; at times, it&rsquo;s almost like reading pages torn from a person&rsquo;s diary.',],
      },
      {
        author: {
          firstName: 'Todd',
          lastName: 'L.',
        },
        citeLink: 'https://www.amazon.com/gp/customer-reviews/R2HCMP57Z1DDBU/ref=cm_cr_dp_d_rvw_ttl?ie=UTF8&ASIN=B003AKZBII',
        platform: 'Amazon',
        text: ['This compelling and moving read should appeal to both those who are coming of age and &mdash; probably even more so &mdash; to those brave enough to journey back to such a time.  Highly recommend it.',],
      },
      {
        author: {
          firstName: 'Andrew',
          lastName: 'E.',
        },
        citeLink: 'https://www.amazon.com/gp/customer-reviews/R319N4S31D67Q2/ref=cm_cr_dp_d_rvw_ttl?ie=UTF8&ASIN=B003AKZBII',
        platform: 'Amazon',
        text: ['Prepare for a moving, sometimes funny, sometimes painful, and always authentic journey through the emotional journey of early adulthood.',],
      },
    ],
  },
  'cultivation-series': [],
  'epic-series': [],
  'operation-paintball': {},
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

window.globalControl.titlePageBuilder = {
  synopsis: () => {

  },
  artwork: () => {
    console.log('window.globalControl.titlePageBuilder.artwork() invoked.');
    const titleDetails = document.querySelector('.title-details');
    const figure = document.createElement('figure');
    figure.classList.add('front-cover', 'animated-3', 'fadeInUp');
    figure.innerHTML = `<img src="../../assets/images/titles/the-druggist/front-1563x2400.jpg" alt="The Druggist">`;
    titleDetails.appendChild(figure);
  },
  init: () => {
    console.log('window.globalControl.titlePageBuilder.init() invoked.');
    if (window.digitalData?.page?.category === 'specific-title') {
      // Before triggering titlePageBuilder, next step should probably be to populate the data layer accordingly.  BUT FIRST, GET DIGITALDATABUILDER WORKING.
      // Once data layer is populated, begin building the DOM:
      window.globalControl.titlePageBuilder.artwork();
    }
  },
}

window.globalControl.titlePageBuilder.init();