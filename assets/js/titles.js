console.log('titles.js loaded.');

// Add all title info to data layer:
digitalData.titles = {
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
          lastName: 'Frechette',
        },
        citeLink: 'https://amzn.to/4a393aT',
        platform: 'Amazon',
        text: ['An earnest and profound book about a young man&rsquo;s coming of age.  The level of detail and insight is uncanny; at times, it&rsquo;s almost like reading pages torn from a person&rsquo;s diary.',],
      },
      {
        author: {
          firstName: 'Todd',
          lastName: 'Luoto',
        },
        citeLink: 'https://amzn.to/4a4aIgr',
        platform: 'Amazon',
        text: ['This compelling and moving read should appeal to both those who are coming of age and &mdash; probably even more so &mdash; to those brave enough to journey back to such a time.  Highly recommend it.',],
      },
      {
        author: {
          firstName: 'Andrew',
          lastName: 'Eastwick',
        },
        citeLink: 'https://amzn.to/48NvgZq',
        platform: 'Amazon',
        text: ['Prepare for a moving, sometimes funny, sometimes painful, and always authentic journey through the emotional journey of early adulthood.',],
      },
      {
        author: {
          firstName: 'Mike',
          lastName: 'Croak',
        },
        platform: 'Email',
        text: ['I love this book! It&rsquo;s very introspective, and .&nbsp;.&nbsp;. inner thoughts and action.',],
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
  testimonials: (testimonialsArr) => {
    const testimonialsFlexbox = document.querySelector('.testimonials-flexbox');
    if (!!testimonialsFlexbox) {
      if (Array.isArray(testimonialsArr)) {
        testimonialsArr.forEach((testimonial, i) => {
          // First create the quote:
          const testimonialParagraphs = testimonial.text;
          let testimonialQuote = '';
          if (Array.isArray(testimonialParagraphs)) {
            testimonialParagraphs.forEach(testimonialParagraph => {
              testimonialQuote += `<p class="body_p font_size_body">&ldquo;${testimonialParagraph}${(i === testimonialParagraphs.length + 1) ? '&rdquo;' : ''}</p>`;
            });
          }

          // Then create the attribution:
          let testimonialAttribution;
          if (!!testimonial.citeLink) {
            testimonialAttribution = `<a class="testimonials-card__attribution-link" href="${testimonial.citeLink}" target="_blank"' : ''}>${testimonial.platform}</a>`;
          } else {
            testimonialAttribution = testimonial.platform;
          }
          
          // Then create the card:
          const testimonialsFlexboxItem = document.createElement('div');
          testimonialsFlexboxItem.classList.add('testimonials-flexbox__item');
          testimonialsFlexboxItem.innerHTML = `<div class="testimonials-card testimonials-card_${i+1}"><blockquote class="testimonials-card__quote" cite="${testimonial.citeLink}">${testimonialQuote}</blockquote><p class="body_p font_size_body testimonials-card__attribution">&ndash;&nbsp;via ${testimonialAttribution}</p></div>`;
          
          // Then append the card:
          testimonialsFlexbox.appendChild(testimonialsFlexboxItem);




          // <div class="testimonials-flexbox__item">
					// 	<div class="testimonials-card testimonials-card_1">
					// 		<blockquote class="testimonials-card__quote" cite="https://www.amazon.com/gp/customer-reviews/R3UW2XCEKRMIP5/ref=cm_cr_dp_d_rvw_ttl?ie=UTF8&ASIN=B003AKZBII">
					// 			<p class="body_p font_size_body">&ldquo;An earnest and profound book about a young man&rsquo;s coming of age. The level of detail and insight is uncanny; at times, it&rsquo;s almost like reading pages torn from a person&rsquo;s diary.&rdquo;</p>
					// 		</blockquote>
					// 		<p class="body_p font_size_body testimonials-card__attribution">&ndash;&nbsp;via <a class="testimonials-card__attribution-link" href="https://www.amazon.com/gp/customer-reviews/R3UW2XCEKRMIP5/ref=cm_cr_dp_d_rvw_ttl?ie=UTF8&ASIN=B003AKZBII" target="_blank">Amazon</a></p>
					// 	</div>
					// </div>




          // {
          //   author: {
          //     firstName: 'Jon',
          //     lastName: 'F.',
          //   },
          //   citeLink: 'https://www.amazon.com/gp/customer-reviews/R3UW2XCEKRMIP5/ref=cm_cr_dp_d_rvw_ttl?ie=UTF8&ASIN=B003AKZBII',
          //   platform: 'Amazon',
          //   text: ['An earnest and profound book about a young man&rsquo;s coming of age.  The level of detail and insight is uncanny; at times, it&rsquo;s almost like reading pages torn from a person&rsquo;s diary.',],
          // },
        });
      } else {
        console.warn('testimonialsArr was not an array.');
      }
    } else {
      console.warn('No Testimonials Flexbox found on page.');
    }
  },
  synopsis: () => {

  },
  artwork: () => {
    console.log('window.globalControl.titlePageBuilder.artwork() invoked.');
    const titleDetails = document.querySelector('.title-details');
    const figure = document.createElement('figure');
    // figure.classList.add('front-cover', 'animated-3', 'fadeInUp');
    // figure.innerHTML = `<img src="../../assets/img/titles/the-druggist/front-1563x2400.jpg" alt="The Druggist">`; // REFACTOR TO USE TAGBUILDER -- AND UPDATE TAGBUILDER TO HANDLE IMG TAGS.
    titleDetails.appendChild(figure);
  },
  init: () => {
    console.log('window.globalControl.titlePageBuilder.init() invoked.');
    if (window.digitalData?.page?.category === 'specific-title') {
      // window.globalControl.titlePageBuilder.artwork(); // HARDCODED IN DOM FOR NOW.
      window.globalControl.titlePageBuilder.testimonials(window.digitalData.titles[window.digitalData.page.level2].testimonials); // Note that this is still only flat logic for standalone projects. Series will require additional logic.
    }
  },
}

window.globalControl.titlePageBuilder.init();

// Waypoints for project testimonials:
$('.testimonials-card_1').waypoint( function( direction ) {
  $('.testimonials-card_1').addClass('testimonials-card_fade-in');
}, {
  offset: '75%',
});

$('.testimonials-card_2').waypoint( function( direction ) {
  $('.testimonials-card_2').addClass('testimonials-card_fade-in');
}, {
  offset: '75%',
});

$('.testimonials-card_3').waypoint( function( direction ) {
  $('.testimonials-card_3').addClass('testimonials-card_fade-in');
}, {
  offset: '75%',
});