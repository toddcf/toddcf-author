// All album/song notes are in arrays so that if there are multiple paragraphs, each one can be built as a separate <p> tag.
const musicData = [
  {
    artist: '12 Rounds',
    albums: [
      {
        title: 'Pleasant Smell [Single]',
        notes: {
          'the-druggist': [],
        },
        saleLink: 'https://amzn.to/43Dd5TP',
        tracks: [
          {
            trackNumber: 3,
            title: 'Pleasant Smell (Rethought by Clint Mansell &amp; Keith Hillebrandt)',
            notes: {
              'the-druggist': [],
            },
          },
        ],
      },
    ],
  },
  {
    artist: '16volt',
    albums: [
      {
        title: 'Wisdom',
        notes: {
          'the-druggist': ['16volt&rsquo;s debut album, and probably my favorite.'],
        },
        saleLink: 'https://amzn.to/3Q8vMf2',
        tracks: [
          {
            trackNumber: 1,
            title: 'Motorskill',
            notes: {
              'the-druggist': [],
            },
          },
          {
            trackNumber: 3,
            title: 'Head of Stone',
            notes: {
              'the-druggist': ['This song was my introduction to 16volt.  I heard it on a local music show on KNRK back in high school when I was living in Portland, and ran out and bought the album.'],
            },
          },
          {
            trackNumber: 4,
            title: 'Filthy Love of Fire',
            notes: {
              'the-druggist': [],
            },
          },
          {
            trackNumber: 6,
            title: 'Will',
            notes: {
              'the-druggist': [],
            },
          },
          {
            trackNumber: 7,
            title: 'Dreams of Light',
            notes: {
              'the-druggist': [],
            },
          },
          {
            trackNumber: 8,
            title: 'Downtime (Part One)',
            notes: {
              'the-druggist': ['This is my favorite track on the album!'],
            },
          },
        ],
      },
      {
        title: 'Letdowncrush',
        notes: {
          'the-druggist': [],
        },
        saleLink: 'https://amzn.to/3O35I2e',
        tracks: [
          {
            trackNumber: 6,
            title: 'Crush',
            notes: {
              'the-druggist': [],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Army of Anyone',
    albums: [
      {
        title: 'Army of Anyone',
        notes: {
          'catch-up-to-myself': ['Richard Patrick from Filter, plus members of Stone Temple Pilots. More on Filter later&nbsp;.&nbsp;.&nbsp;.'],
        },
        saleLink: 'https://amzn.to/3ru33qJ',
        tracks: [
          {
            trackNumber: 4,
            title: 'A Better Place',
            notes: {
              'catch-up-to-myself': ['Contains the amazing lyric, &ldquo;I wish you&rsquo;d come in, but the place is blown apart.&rdquo;'],
            },
          },
          {
            trackNumber: 11,
            title: 'This Wasn&rsquo;t Supposed to Happen',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      }
    ],
  },
  {
    artist: 'Björk',
    albums: [
      {
        title: 'Post',
        notes: {
          'the-druggist': [],
        },
        saleLink: 'https://amzn.to/3Y7oMAT',
        tracks: [
          {
            trackNumber: 1,
            title: 'Army of Me',
            notes: {
              'the-druggist': [],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'The Catherine Wheel',
    albums: [
      {
        title: 'Ferment',
        notes: {
          'catch-up-to-myself': ['These tracks from The Catherine Wheel&rsquo;s first album are positively magical.']
        },
        saleLink: 'https://amzn.to/44Om1qu',
        tracks: [
          {
            trackNumber: 1,
            title: 'Texture',
            notes: {
              'catch-up-to-myself': ['A very romantic, summery sound.'],
            },
          },
          {
            trackNumber: 2,
            title: 'I Want to Touch You',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 3,
            title: 'Black Metallic',
            notes: {
              'catch-up-to-myself': ['I&rsquo;ve heard it described as an &ldquo;android love song,&rdquo; a love song about a car (not a bad guess considering lead singer Rob Dickenson is obsessed with cars and now runs an after-market Porsche customization shop in Southern California), and a song about loving a woman who is growing more and more distant (Rob himself supposedly mentioned this one in an interview).  Whatever it&rsquo;s about lyrically, musically it is one of the dreamiest and most romantic songs I&rsquo;ve ever heard.'],
            },
          },
          {
            trackNumber: 8,
            title: 'Flower to Hide',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
      {
        title: 'Chrome',
        notes: {
          'catch-up-to-myself': ['This is the album I had in mind when Lem put his earbuds in and went running on the beach, listening to the new album his friends just recorded.',],
        },
        saleLink: 'https://amzn.to/3DjSKYW',
        tracks: [
          {
            trackNumber: 1,
            title: 'Kill Rhythm',
            notes: {
              'catch-up-to-myself': ['In fact, this is the opening track I had in mind for that moment. From the novel: &ldquo;The opening riffs of the album exploded into an expanse of sound as I hit the beach running, bringing back a small piece of my mushroom high. The amount of detail in each song was astounding.&rdquo;'],
            },
          },
          {
            trackNumber: 2,
            title: 'I Confess',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 3,
            title: 'Crank',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 4,
            title: 'Broken Head',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 5,
            title: 'Pain',
            notes: {
              'catch-up-to-myself': ['This is sort of crazy, but I originally thought the lyrics were, &ldquo;Before the Summer Faire, I already knew.&rdquo; That one line bloomed in my mind and actually inspired the entire Summer Faire sequence in <cite>Catch Up To Myself</cite>. Only years later did I learn that the actual lyrics are something else, but I like my original misinterpretation.'],
            },
          },
          {
            trackNumber: 6,
            title: 'Strange Fruit',
            notes: {
              'catch-up-to-myself': ['Has that summer feeling of freedom.'],
            },
          },
          {
            notes: {
              'catch-up-to-myself': [],
            },
            title: 'Chrome',
            trackNumber: 7,
          },
          {
            trackNumber: 8,
            title: 'The Nude',
            notes: {
              'catch-up-to-myself': ['Lem&rsquo;s feelings for Monica. I assume Rob is singing about a statue or a painting of a nude that moved him to tears, but for me personally, it evokes the dichotomy of seeing someone else naked &mdash; at what you would think is their most vulnerable &mdash; and yet you are the one who gets your heart broken.'],
            },
          },
          {
            trackNumber: 10,
            title: 'Fripp',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 11,
            title: 'Half Life',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
      {
        title: 'Happy Days',
        notes: {
          'catch-up-to-myself': ['This album was actually my introduction to The Catherine Wheel when it first came out.'],
        },
        saleLink: 'https://amzn.to/4788pIH',
        tracks: [
          {
            trackNumber: 4,
            title: 'Heal',
            notes: {
              'catch-up-to-myself': ['I actually didn&rsquo;t like this track much at first, but once I&rsquo;d gone through the period of my life that inspired <cite>Catch Up To Myself</cite>, I really connected with it.'],
            },
          },
          {
            trackNumber: 8,
            title: 'Eat My Dust You Insensitive Fuck',
            notes: {
              'catch-up-to-myself': ['Contrary to the aggressive title, this is actually the most peaceful track on the album.  I keep waiting for it to explode, and it never does.  Love it.'],
            },
          },
          {
            trackNumber: 9,
            title: 'Shocking',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 10,
            title: 'Love Tips Up',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 11,
            title: 'Judy Staring at the Sun',
            notes: {
              'catch-up-to-myself': ['This upbeat-sounding song is actually about the depravity of heroin addiction. But let&rsquo;s not think about that, shall we? It sounds more like a summertime song to me.'],
            },
          },
          {
            trackNumber: 13,
            title: 'Fizzy Love',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 14,
            title: 'Kill My Soul',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
      {
        title: 'Like Cats and Dogs',
        notes: {
          'catch-up-to-myself': ['This is not an official album; rather it is a compilation of B-sides, covers, and alternative versions of previously-released material.'],
        },
        saleLink: 'https://amzn.to/43ttFFv',
        tracks: [
          {
            trackNumber: 1,
            title: 'Heal 2',
            notes: {
              'catch-up-to-myself': ['Just when I&rsquo;d learned to love the original version of &ldquo;Heal,&rdquo; I discovered this alternative version, which sounds the same until it takes a different turn at the end. I found this jarring at first, but then it, too, grew on me, and now I&rsquo;d be hard-pressed to say which version I prefer.'],
            },
          },
          {
            trackNumber: 2,
            title: 'Wish You Were Here',
            notes: {
              'catch-up-to-myself': ['Amazing Pink Floyd cover.  Brings tears to Lem&rsquo;s eyes after the breakup.'],
            },
          },
          {
            trackNumber: 7,
            title: 'Backwards Guitar',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 8,
            title: 'Tongue Twisted',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 10,
            title: 'High Heels',
            notes: {
              'catch-up-to-myself': ['I love the line, &ldquo;I&rsquo;m a bad decision maker.&rdquo;  This is how Lem felt for most of the book.'],
            },
          },
        ],
      },
      {
        title: 'Adam &amp; Eve',
        notes: {
          'catch-up-to-myself': ['I had this album in mind for Lem&rsquo;s drive out to the summer beach house.'],
        },
        saleLink: 'https://amzn.to/3DispdJ',
        tracks: [
          {
            trackNumber: 1,
            title: 'Intro',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 2,
            title: 'Future Boy',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 3,
            title: 'Delicious',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 4,
            title: 'Broken Nose',
            notes: {
              'catch-up-to-myself': ['An amazing song about dropping all your emotional baggage and bad habits and moving forward in life, which is exactly the tipping point Lem is on the brink of during his drive to the beach house.',],
            },
          },
          {
            trackNumber: 6,
            title: 'Ma Solituda',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 10,
            title: 'Goodbye',
            notes: {
              'catch-up-to-myself': ['This one&rsquo;s a heartbreaker.',],
            },
          },
          {
            trackNumber: 11,
            title: 'For Dreaming',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 12,
            title: 'Outro',
            notes: {
              'catch-up-to-myself': ['Another heartbreaker.',],
            },
          },
        ],
      },
      {
        title: 'Wishville',
        notes: {
          'catch-up-to-myself': ['The Catherine Wheel&rsquo;s final album.'],
        },
        saleLink: 'https://amzn.to/3Q4iK2a',
        tracks: [
          {
            trackNumber: 1,
            title: 'Sparks are Gonna Fly',
            notes: {
              'catch-up-to-myself': ['That amazing, energetic feeling of new love! In fact, if you can find the <a href="https://amzn.to/3rv89CX" target="_blank">radio edit</a>, I think that version&rsquo;s even punchier.'],
            },
          },
          {
            trackNumber: 3,
            title: 'Lifeline',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 9,
            title: 'Crème Caramel',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'The Crystal Method',
    albums: [
      {
        title: 'Community Service',
        notes: {
          'the-druggist': ['The first three tracks on this DJ mix by The Crystal Method are outstanding.'],
        },
        saleLink: 'https://amzn.to/46XeTK0',
        tracks: [
          {
            trackNumber: 1,
            artist: 'ILS',
            title: 'No Soul (PMT Remix)',
            notes: {
              'the-druggist': ['A surprisingly downtempo and ominous way to open a rather mainstream album.'],
            },
          },
          {
            trackNumber: 2,
            artist: 'Evil Nine',
            title: 'Cake Hole',
            notes: {
              'the-druggist': ['The mix picks up momentum with this second track. I love the sample: &ldquo;Every facet, every department of your mind is to be programmed by you. And unless you assume your rightful responsibility and begin to program your own mind, the world will program it for you.&rdquo; Very true, and very Tony Robbins. (In fact, it&lsquo;s from Buddhist practitioner Jack Kornfield.) But it somehow sounds nefarious when distorted and set to this music.']
            },
          },
          {
            trackNumber: 3,
            artist: 'Stir Fry',
            title: 'Breakin on the Streets (False Prophet Remix)',
            notes: {
              'the-druggist': ['Daaaamn! Now we are in another dimension!'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'The Cure',
    albums: [
      {
        title: 'The Head on the Door',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3OkXcwL',
        tracks: [
          {
            trackNumber: 8,
            title: 'A Night Like This',
            notes: {
              'catch-up-to-myself': ['I had this song in mind for Lem&rsquo;s graduation ceremony, when he sees his first college girlfriend again.']
            },
          },
        ],
      },
      {
        title: 'Galore [The Singles 1987 - 1997]',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/459bbLZ',
        tracks: [
          {
            trackNumber: 5,
            title: 'Lullaby',
            notes: {
              'catch-up-to-myself': ['Seductive.'],
            },
          },
          {
            trackNumber: 16,
            title: 'Strange Attraction',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
      {
        title: 'Bloodflowers',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3XZqLah',
        tracks: [
          {
            trackNumber: 1,
            title: 'Out of This World',
            notes: {
              'catch-up-to-myself': [],
            }
          },
          {
            trackNumber: 2,
            title: 'Watching Me Fall',
            notes: {
              'catch-up-to-myself': [],
            }
          },
          {
            trackNumber: 4,
            title: 'Maybe Someday',
            notes: {
              'catch-up-to-myself': [],
            }
          },
          {
            trackNumber: 5,
            title: 'The Last Day of Summer',
            notes: {
              'catch-up-to-myself': [],
            }
          },
          {
            trackNumber: 7,
            title: 'The Loudest Sound',
            notes: {
              'catch-up-to-myself': ['The most heartwrenching &mdash; and my absolute favorite &mdash; track on the album.'],
            }
          },
        ],
      },
    ],
  },
  {
    artist: 'Custom',
    albums: [
      {
        title: 'Fast',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/450eC7D',
        tracks: [
          {
            trackNumber: 2,
            title: 'Hey Mister',
            notes: {
              'catch-up-to-myself': ['This is the kind of debauchery Lem wishes he were capable of.'],
            },
          },
          {
            trackNumber: 4,
            title: 'Like You',
            notes: {
              'catch-up-to-myself': ['And this is how he often feels instead.'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Dave Navarro',
    albums: [
      {
        title: 'Trust No One',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3DDqCAl',
        tracks: [
          {
            trackNumber: 1,
            title: 'Rexall',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 2,
            title: 'Hungry',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 3,
            title: 'Sunny Day',
            notes: {
              'catch-up-to-myself': ['Depression, summarized perfectly: &ldquo;Such a sunny day outside .&nbsp;.&nbsp;. freezing deep inside.&rdquo;'],
            },
          },
          {
            trackNumber: 4,
            title: 'Mourning Son',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 10,
            title: 'Slow Motion Sickness',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Dave Ralph',
    albums: [
      {
        title: 'Tranceport 2',
        notes: {
          'catch-up-to-myself': ['This is an excellent DJ mix by Dave Ralph. One track in particular really fit with <cite>Catch Up To Myself</cite>.'],
        },
        saleLink: 'https://amzn.to/3Olmjja',
        tracks: [
          {
            disc: 2,
            trackNumber: 7,
            title: 'Resistance D &ldquo;Feel So High&rdquo;',
            notes: {
              'catch-up-to-myself': ['The moment when things are going well and Lem is looking out at the campus from his third-floor apartment window at night.'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Deep Dish',
    albums: [
      {
        title: 'George is On',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3rH7gHu',
        tracks: [
          {
            disc: 1,
            trackNumber: 12,
            title: 'In Love with a Friend',
            notes: {
              'catch-up-to-myself': ['I was blown away by this track. I have never before or since heard a song that so perfectly captures the feeling of being in love with a friend and being simultaneously afraid to tell her and unable to hold it in any longer.'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Dousk',
    albums: [
      {
        title: 'Wrist Slap / Estrange [Single]',
        notes: {
          'the-druggist': ['Dark, lush, progressive house vibes from Greece.'],
        },
        saleLink: 'https://www.beatport.com/release/wristslap/27376',
        tracks: [
          {
            trackNumber: 1,
            title: 'Estrange (Original Version)',
            notes: {
              'the-druggist': ['This is the first (and best) version of &ldquo;Estrange&rdquo; that I heard, and my introduction to Dousk.  It was on Hernan Cattaneo&rsquo;s DJ mix compilation, <a href="https://amzn.to/44WD35O" target="_blank"><cite>Renaissance: The Master Series, Volume 2</cite></a>, and from there I tracked down a lot more of his works.'],
            },
          },
          {
            trackNumber: 2,
            title: 'Estrange (Breaks Version)',
            notes: {
              'the-druggist': ['This is my second favorite version of &ldquo;Estrange&rdquo; &mdash; but it&rsquo;s hard to pick just one with this song, because both versions are so good.'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Eve 6',
    albums: [
      {
        title: 'It&lsquo;s All in Your Head',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3K6aFGi',
        tracks: [
          {
            trackNumber: 2,
            title: 'Think Twice',
            notes: {
              'catch-up-to-myself': ['One of the greatest songs about jealousy and impotent rage ever written.'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Filter',
    albums: [
      {
        title: 'Title of Record',
        notes: {
          'catch-up-to-myself': ['Musically and lyrically, this album is perfect for <cite>Catch Up To Myself</cite>.  In real life, it&rsquo;s helped me through not one, not two, but <em>three</em> breakups.'],
        },
        saleLink: 'https://amzn.to/43G0YoN',
        tracks: [
          {
            trackNumber: 1,
            title: 'Sand',
            notes: {
              'catch-up-to-myself': ['An unsettling intro for the album.'],
            },
          },
          {
            trackNumber: 2,
            title: 'Welcome to the Fold',
            notes: {
              'catch-up-to-myself': ['The pure release of anger &mdash; and tripping on mushrooms, which Lem does at one point in the story.  &ldquo;Mama give me my medicine that makes me feel like a tall tree&nbsp;.&nbsp;.&nbsp;.&rdquo;'],
            },
          },
          {
            trackNumber: 3,
            title: 'Captain Bligh',
            notes: {
              'catch-up-to-myself': ['&ldquo;And the time has come, to undo the world I&lsquo;ve done&nbsp;.&nbsp;.&nbsp;.&rdquo;'],
            },
          },
          {
            trackNumber: 4,
            title: 'It&rsquo;s Gonna Kill Me',
            notes: {
              'catch-up-to-myself': ['&ldquo;She&rsquo;s my favorite piece of plastic held to my ear.&rdquo; Richard Patrick has said that those lyrics represent him walking the streets at night, fighting on the phone with his cheating girlfriend.'],
            },
          },
          {
            trackNumber: 5,
            title: 'The Best Things',
            notes: {
              'catch-up-to-myself': ['For me, this song captures the feeling that even when you&rsquo;re experiencing the highest highs of your life, in the back of your mind, you know they aren&rsquo;t going to last forever.'],
            },
          },
          {
            trackNumber: 6,
            title: 'Take a Picture',
            notes: {
              'catch-up-to-myself': ['Everyone probably knows this song &mdash; it was one of Filter&rsquo;s biggest hits &mdash; but beyond that, it is such a perfect <cite>Catch Up To Myself</cite> song.'],
            },
          },
          {
            trackNumber: 7,
            title: 'Skinny',
            notes: {
              'catch-up-to-myself': ['When Lem is coming down from his mushroom voyage and is sadly saying goodbye to all the girls he just made peace with in his mind.'],
            },
          },
          {
            trackNumber: 10,
            title: 'I&rsquo;m Not the Only One',
            notes: {
              'catch-up-to-myself': ['More cheating catharsis for Richard Patrick &mdash; and lovesick catharsis for the rest of us. Perfectly captures the feeling of not being treated with respect by the one you love.'],
            },
          },
          {
            trackNumber: 11,
            title: 'Miss Blue',
            notes: {
              'catch-up-to-myself': ['This is how the end of a relationship feels. A truer question has never been asked: &ldquo;When do you think I&rsquo;ll be okay?&rdquo;'],
            },
          },
        ],
      },
      {
        title: 'The Amalgamut',
        notes: {
          'catch-up-to-myself': [`After the success of <a href="https://amzn.to/43G0YoN" target="_blank"><cite>Title of Record</cite></a>, Richard Patrick bought a new pickup truck and took a road trip across the United States, just experiencing firsthand everything the country has to offer. He drew the conclusion that we are all just an amalgamation of different cultures and personalities, and the title of the next Filter album was born.`],
        },
        saleLink: 'https://amzn.to/44SWV9T',
        tracks: [
          {
            trackNumber: 3,
            title: 'Where Do We Go From Here',
            notes: {
              'catch-up-to-myself': [`Written near the end of the <a href="https://amzn.to/43G0YoN" target="_blank"><cite>Title of Record</cite></a> sessions, this is my favorite track on the album, and fits perfectly with the vibe of <cite>Catch Up To Myself</cite>.`],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Fiona Apple',
    albums: [
      {
        title: 'Tidal',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3K8F6LW',
        tracks: [
          {
            trackNumber: 3,
            title: 'Shadowboxer',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Hooverphonic',
    albums: [
      {
        title: 'The Magnificent Tree',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3rAnnXn',
        tracks: [
          {
            trackNumber: 4,
            title: 'Jackie Cane',
            notes: {
              'catch-up-to-myself': ['Monica&rsquo;s theme.'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Hybrid',
    albums: [
      {
        title: 'Wider Angle',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3pPQ3LK',
        tracks: [
          {
            disc: 1,
            trackNumber: 9,
            title: 'High Life',
            notes: {
              'catch-up-to-myself': ['In my mind, this song always represented how lonely it is at the top. Which is how Lem usually feels when he&rsquo;s staring out his third-floor apartment window at night, alone. It&rsquo;s actually about something else, but my initial interpretation feels like more of a gut punch to me.'],
            },
          },
        ],
      },
      {
        title: 'Morning Sci-Fi',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3DlMos6',
        tracks: [
          {
            trackNumber: 2,
            title: 'True to Form',
            notes: {
              'catch-up-to-myself': ['The feeling of being held back all the time, unable to achieve your true potential.'],
            },
          },
          {
            trackNumber: 5,
            title: 'I&rsquo;m Still Awake',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 11,
            title: 'Out of the Dark',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
      {
        title: 'I Choose Noise',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/43JUzcA',
        tracks: [
          {
            trackNumber: 9,
            title: 'Until Tomorrow',
            notes: {
              'catch-up-to-myself': ['Featuring whistful vocals by Quivver, this track perfectly captures the moment when Lem discovers Monica&rsquo;s panties under the bed and stares out the window at sunset, lost in thought.'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Johnny Cash',
    albums: [
      {
        title: 'American IV: The Man Comes Around',
        notes: {
          'the-druggist': [],
        },
        saleLink: 'https://amzn.to/43GeUPC',
        tracks: [
          {
            trackNumber: 2,
            title: 'Hurt',
            notes: {
              'the-druggist': ['Johnny Cash covering Nine Inch Nails?? A very different take on a very dark song.'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Keane',
    albums: [
      {
        title: 'Hopes and Fears',
        notes: {
          'catch-up-to-myself': ['The album title alone is perfect for <cite>Catch Up To Myself</cite>.'],
        },
        saleLink: 'https://amzn.to/3NXEhXw',
        tracks: [
          {
            trackNumber: 11,
            title: 'Untitled 1',
            notes: {
              'catch-up-to-myself': ['Perfectly captures the feeling of discovering that someone you thought was warm is actually cold inside.'],
            },
          },
        ],
      },
      {
        title: 'Under the Iron Sea',
        notes: {
          'catch-up-to-myself': [
            'Song for song, musically and lyrically, this album is a great companion to <cite>Catch Up To Myself</cite>.',
            'Now, the ultimate <cite>Catch Up To Myself</cite> album is Filter&rsquo;s <cite>Title of Record</cite>.  But whereas that album is an explosion of the anger, aggression, and aggrievement that swirl through a chaotic relationship, Keane&rsquo;s <cite>Under the Iron Sea</cite> captures the feelings that come afterward, when all of that angst burns off: loneliness, self-reflection, and new beginnings. Sometimes it feels good to just let it wash over you.'],
        },
        saleLink: 'https://amzn.to/44wwiaW',
        tracks: [
          {
            trackNumber: 1,
            title: 'Atlantic',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 2,
            title: 'Is it Any Wonder',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 3,
            title: 'Nothing in My Way',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 5,
            title: 'A Bad Dream',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 1,
            title: 'The Iron Sea',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 9,
            title: 'Crystal Ball',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 1,
            title: 'Broken Toy',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
      {
        title: 'Perfect Symmetry',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3Q6YxIQ',
        tracks: [
          {
            trackNumber: 1,
            title: 'Spiralling',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 6,
            title: 'You Don&rsquo;t See Me',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 7,
            title: 'Again &amp; Again',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 8,
            title: 'Playing Along',
            notes: {
              'catch-up-to-myself': ['My favorite track on the album. About getting away from it all, and drowning out the noise of the world with good music.'],
            },
          },
        ],
      },
      {
        title: 'Night Train',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/44TZVTf',
        tracks: [
          {
            trackNumber: 4,
            title: 'Clear Skies',
            notes: {
              'catch-up-to-myself': ['To me, this song evokes the feeling of looking out at all the other people in the world and being simultaneously thankful to be better off than some, and optimistic that you can become as good as those who are doing better than you.'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Mad-Tek',
    albums: [
      {
        title: 'Midnight Oil [Single]',
        notes: {
          'the-druggist': [],
        },
        saleLink: '',
        tracks: [
          {
            trackNumber: 1,
            title: 'Glycemic',
            notes: {
              'the-druggist': [],
            },
          },
          {
            trackNumber: 2,
            title: 'Terra',
            notes: {
              'the-druggist': [],
            },
          },
          {
            trackNumber: 3,
            title: 'When the Wheels Fall Off',
            notes: {
              'the-druggist': [],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Massive Attack',
    albums: [
      {
        title: 'Mezzanine',
        notes: {
          'the-druggist': [`This album was my official introduction to Massive Attack, and I bought it after hearing the song &ldquo;Teardrop&rdquo; in the music store. Sure, I had heard a few tracks of theirs here and there prior to this, but <a href="https://amzn.to/3Dur1EV" target="_blank"><cite>Mezzanine</cite></a> took their game to a whole new level, and I still think it&rsquo;s their best album to this day (out of a catalog of very, very good albums). They&rsquo;re now one of my longtime favorite bands.`],
        },
        saleLink: 'https://amzn.to/3Dur1EV',
        tracks: [
          {
            trackNumber: 1,
            title: 'Angel',
            notes: {
              'the-druggist': ['You&rsquo;ve probably all heard this song.  It was used in a million movies and trailers.  But even if it&rsquo;s familiar, it&rsquo;s still a great, dark, lying-in-wait song that fits <cite>The Druggist</cite> perfectly.'],
            },
          },
          {
            trackNumber: 2,
            title: 'Risingson',
            notes: {
              'the-druggist': ['More dark greatness from Massive Attack.  I once had this track playing in the car while my dad was sleeping, and he later told me it sounded like a nightmare, with dark, creepy voices coming in and out from all angles.  I agree.  Which is why I love it.'],
            },
          },
          {
            trackNumber: 4,
            title: 'Inertia Creeps',
            notes: {
              'the-druggist': [],
            },
          },
          {
            trackNumber: 7,
            title: 'Man Next Door',
            notes: {
              'the-druggist': ['These ominous lyrics and music ooze dread.  For years, I had no idea this was a cover of a lighthearted reggae song.  Massive Attack reached in and pulled out its darkened core.'],
            },
          },
          {
            trackNumber: 10,
            title: 'Group Four',
            notes: {
              'the-druggist': ['This track didn&rsquo;t stand out to me originally &mdash; until the climax kicked in.  Plus, I love the lyrics, &ldquo;I train myself in martial arts, as advertised.  I reinforce my softened parts.&rdquo;'],
            },
          },
        ],
      },
      {
        title: 'Singles 90/98',
        notes: {
          'the-druggist': [],
        },
        saleLink: 'https://amzn.to/453AZsv',
        tracks: [
          {
            disc: 9,
            trackNumber: 5,
            title: 'Euro Zero Zero',
            notes: {
              'the-druggist': ['Part lullaby, part nightmare.  One of Massive Attack&rsquo;s greatest B-sides ever &mdash; a reworking of a track (&ldquo;<a href="https://amzn.to/3rL8jq4" target="_blank">Eurochild</a>&rdquo;) they did back when Tricky was in the band.  &ldquo;I walk in a bar, immediately, I sense danger. You look at me, girl, as if I was a, a total stranger.&rdquo;'],
            },
          },
        ],
      },
      {
        title: '100th Window',
        notes: {
          'the-druggist': [],
        },
        saleLink: 'https://amzn.to/3O7KLTF',
        tracks: [
          {
            trackNumber: 4,
            title: 'Special Cases',
            notes: {
              'the-druggist': [],
            },
          },
          {
            trackNumber: 5,
            title: 'Butterfly Caught',
            notes: {
              'the-druggist': [],
            },
          },
          {
            trackNumber: 7,
            title: 'Small Time Shot Away',
            notes: {
              'the-druggist': [],
            },
          },
          {
            trackNumber: 9,
            title: 'Antistar',
            notes: {
              'the-druggist': ['A mindblowing culmination for this album.'],
            },
          },
        ],
      },
      {
        title: 'Collected',
        notes: {
          'the-druggist': [],
        },
        saleLink: 'https://amzn.to/47ht9Oa',
        tracks: [
          {
            trackNumber: 22,
            title: 'I Against I (feat. Mos Def)',
            notes: {
              'the-druggist': ['A seriously ominous song.  Makes me nervous.  And perfect lyrics, given what Eric is up to in <cite>The Druggist</cite>.'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Nada Surf',
    albums: [
      {
        title: 'High/Low',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3pTa1Fp',
        tracks: [
          {
            trackNumber: 3,
            title: 'Popular',
            notes: {
              'catch-up-to-myself': ['Nada Surf&rsquo;s breakout hit. The teenage guide to popularity.'],
            },
          },
        ],
      },
      {
        title: 'Let Go',
        notes: {
          'catch-up-to-myself': ['A total departure from the alternative rock anthem &ldquo;Popular,&rdquo; Nada Surf went introspective and emotive.  I heard a couple of these tracks on the radio for months before even realizing it was the same band.'],
        },
        saleLink: 'https://amzn.to/44t6xs5',
        tracks: [
          {
            trackNumber: 3,
            title: 'Inside of Love',
            notes: {
              'catch-up-to-myself': ['What it feels like when everyone but you has accomplished the insurmountable feat of getting into a relationship.'],
            },
          },
          {
            trackNumber: 6,
            title: 'Hi-Speed Soul',
            notes: {
              'catch-up-to-myself': ['I was going to quote one of the lines here, but then I realized I couldn&rsquo;t pick just one. The entire song relates to <cite>Catch Up To Myself</cite>.'],
            },
          },
          {
            trackNumber: 7,
            title: 'Killian&rsquo;s Red',
            notes: {
              'catch-up-to-myself': ['Haunting.'],
            },
          },
          {
            trackNumber: 8,
            title: 'The Way You Wear Your Head',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
      {
        title: 'The Weight is a Gift',
        notes: {
          'catch-up-to-myself': ['Such a great album title, and so true. You would never choose to go through the bad times on purpose, but once you&rsquo;ve made it out the other side, you&rsquo;re glad you did. You&rsquo;re better for it.'],
        },
        saleLink: 'https://amzn.to/43BeGJU',
        tracks: [
          {
            trackNumber: 1,
            title: 'Concrete Bed',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 3,
            title: 'Always Love',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
      {
        title: 'The Stars Are Indifferent to Astronomy',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3Q9QXxk',
        tracks: [
          {
            trackNumber: 1,
            title: 'Clear Eye Clouded Mind',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 3,
            title: 'When I Was Young',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 10,
            title: 'The Future',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'New Order',
    albums: [
      {
        title: 'Get Ready',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3Q27uTU',
        tracks: [
          {
            trackNumber: 1,
            title: 'Crystal',
            notes: {
              'catch-up-to-myself': ['Probably my absolute favorite New Order song. Captures the cold tinge of the autumn air as a relationship between Lem and Monica becomes more and more inevitable.'],
            },
          },
          {
            trackNumber: 4,
            title: 'Vicious Streak',
            notes: {
              'catch-up-to-myself': ['&ldquo;You&rsquo;ve got a vicious streak for someone so young.&rdquo;'],
            },
          },
          {
            trackNumber: 8,
            title: 'Someone Like You',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
      {
        title: 'Waiting for the Sirens&rsquo; Call',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/44TY0OO',
        tracks: [
          {
            trackNumber: 1,
            title: 'Who&rsquo;s Joe?',
            notes: {
              'catch-up-to-myself': ['In some ways, these lyrics could be describing Lem.'],
            },
          },
          {
            trackNumber: 2,
            title: 'Hey Now What You Doing',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 3,
            title: 'Waiting for the Siren&rsquo;s Call',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 8,
            title: 'Jetstream',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
    ],
    
  },
  {
    artist: 'Nine Inch Nails',
    albums: [
      {
        title: 'The Downward Spiral [Deluxe Edition]',
        notes: {
          'the-druggist': [],
        },
        saleLink: 'https://amzn.to/3Y1KyWS',
        tracks: [
          {
            disc: 1,
            trackNumber: 10,
            title: 'A Warm Place',
            notes: {
              'the-druggist': ['An eerie organ track&nbsp;.&nbsp;.&nbsp;.'],
            },
          },
          {
            disc: 1,
            trackNumber: 11,
            title: 'Eraser',
            notes: {
              'the-druggist': ['.&nbsp;.&nbsp;.&nbsp;followed by this monster.'],
            },
          },
          {
            disc: 2,
            trackNumber: 5,
            title: 'Dead Souls',
            notes: {
              'the-druggist': ['Joy Division cover. Originally appeared on <a href="https://amzn.to/44Xpov0" target="_blank"><cite>The Crow [Soundtrack]</cite></a>. Such great lyrics. You don&rsquo;t usually hear rock songs talk about being contacted by dead conquistadors.'],
            },
          },
        ],
      },
      {
        title: 'The Fragile',
        notes: {
          'catch-up-to-myself': ['It&rsquo;s actually hard to pinpoint specific songs from this two-disc album that relate to <cite>Catch Up To Myself</cite>. They actually work best as a cohesive whole. In fact, some songs that I don&rsquo;t care for on their own actually sound good to me when I&rsquo;m listening to the album straight through &mdash; something I did quite often while writing this novel.']
        },
        saleLink: 'https://amzn.to/3Y0B8e9',
        tracks: [
          {
            disc: 1,
            trackNumber: 4,
            title: 'The Wretched',
            notes: {
              'catch-up-to-myself': ['Okay, okay, I&rsquo;ll call out one track in particular. The lyrics in this one are just too perfect for Lem. All about learning what it feels like to not get what you wanted. And feeling like God is specifically holding you down.'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Pole Folder',
    albums: [
      {
        title: 'Zero Gold',
        notes: {
          'the-druggist': ['More dark, lush, progressive house sounds, this time from Brussels.'],
        },
        saleLink: 'https://amzn.to/3Y9L3xX',
        tracks: [
          {
            trackNumber: 3,
            title: 'Salvation on Slavery Sins',
            notes: {
              'the-druggist': ['Like Dousk, I first heard Pole Folder on Hernan Cattaneo&rsquo;s DJ mix compilation, <a href="https://amzn.to/44FfjDm" target="_blank"><cite>Renaissance: The Master Series, Volume 2</cite></a>.  This entire album is incredible, but this track in particular fit <cite>The Druggist</cite> to a T.'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Pole Folder &amp; CP',
    albums: [
      {
        title: 'Dust [Disc 3]',
        notes: {
          'the-druggist': [],
        },
        saleLink: 'https://www.beatport.com/track/dust-fretwell-dub/98496',
        tracks: [
          {
            trackNumber: 1,
            title: 'Dust (Fretwell Dub)',
            notes: {
              'the-druggist': ['Haunting.  Like walking through a dark tunnel and watching the headlamp of an oncoming train grow closer and closer.'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Prodigy',
    albums: [
      {
        title: 'The Fat of the Land',
        notes: {
          'the-druggist': [],
        },
        saleLink: 'https://amzn.to/3O99qqX',
        tracks: [
          {
            trackNumber: 7,
            title: 'Narayan',
            notes: {
              'the-druggist': ['The opening in particular sounds like the theme from a Halloween movie.'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Quivver',
    albums: [
      {
        title: 'Transport 5',
        notes: {
          'the-druggist': ['This entire DJ mix is a dark, driving masterpiece. It&rsquo;s time to leave this planet. Where we&rsquo;re going, I don&rsquo;t even know how to describe.'],
        },
        saleLink: 'https://amzn.to/3Qgsmaa',
        tracks: [
          {
            trackNumber: 9,
            artist: 'Gardner &amp; Thomas',
            title: 'Propaganda',
            notes: {
              'the-druggist': ['Track 9 is the climax of the entire mix, and is the reason I was so excited to buy it in the first place.  (Aside from being a fan of the first four installments of the Tranceport/Transport series.)'],
            },
          },
          {
            trackNumber: 13,
            artist: 'John Creamer &amp; Stephane K',
            title: 'I Love You (feat. Oliver Twisted) (Hybrid Mix)',
            notes: {
              'the-druggist': ['And of course, I can&rsquo;t forget the closing track, a close second place for best in the mix.  Dark, stalker vibes.'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Rob Dickinson',
    albums: [
      {
        title: 'Fresh Wine for the Horses',
        notes: {
          'catch-up-to-myself': ['The Catherine Wheel disbanded in 2000, but in 2005, lead singer Rob Dickinson reemerged with this amazing solo album. Perfect timing and perfect vibes for when I was writing <cite>Catch Up To Myself</cite>. I listened to this album for a very long time, especially while I was working on Lem&rsquo;s healing phase. And, as always with Dickinson&rsquo;s projects, the album features amazing art design.'],
        },
        saleLink: 'https://amzn.to/3rCGnES',
        tracks: [
          {
            trackNumber: 1,
            title: 'My Name is Love',
            notes: {
              'catch-up-to-myself': ['A perfect album-opening, radio-friendly track to announce Dickinson&rsquo;s return. And it speaks to Lem&rsquo;s emotional state, as well.'],
            },
          },
          {
            trackNumber: 6,
            title: 'Handsome',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 7,
            title: 'Bathe Away',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 8,
            title: 'The Storm',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 9,
            title: 'Bad Beauty',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 10,
            title: 'Don&rsquo;t Change',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 11,
            title: 'Towering and Flowering',
            notes: {
              'catch-up-to-myself': ['No spoilers here, but the ending track of this album is actually perfect for the last scene in the novel. The &ldquo;end credit&rdquo; music, if you will. &ldquo;For so long, my mind was like a woe maker&rsquo;s song. My mood was drained of dreams. From now on, my mind&rsquo;s alive and leading me on. My mood has changed; my mood has an altitude.&rdquo;'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Sasha',
    albums: [
      {
        title: 'Involver',
        notes: {
          'catch-up-to-myself': ['More than just a DJ mix, Sasha pulled the components of each song apart and fit them back together in his own way. I listened to this a lot while writing <cite>Catch Up To Myself</cite>.'],
        },
        saleLink: 'https://amzn.to/3DrnMhs',
        tracks: [
          {
            trackNumber: 1,
            artist: 'Grand National',
            title: 'Talk Amongst Yourselves',
            notes: {
              'catch-up-to-myself': ['The first track is my favorite. Blew me away from the start with its hi-tech yet moody vibe. Love the lyrics, too. &ldquo;So talk amongst yourselves while I try to figure it out&nbsp;.&nbsp;.&nbsp;. I&rsquo;ll let you know in my time&nbsp;.&nbsp;.&nbsp; And there&rsquo;s nothing to do till I put myself up to it&nbsp;.&nbsp;.&nbsp;.&rdquo;'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Si Begg',
    albums: [
      {
        title: 'UFO [Soundtrack] (Remixes, Part Two)',
        notes: {
          'the-druggist': ['Never seen this movie.  I&rsquo;m guessing it&rsquo;s a rom-com.  I just came across one of the tracks because I was trying to track down Kawatin&rsquo;s catalog of work.'],
        },
        saleLink: 'https://amzn.to/3KfIDs0',
        tracks: [
          {
            trackNumber: 11,
            title: 'Mothership (Kawatin Remix)',
            notes: {
              'the-druggist': ['I actually used this as track 1 of the playlist I listened to while writing <cite>The Druggist</cite>.  Such a great opener.'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Sounds From the Ground',
    albums: [
      {
        title: 'The Maze',
        notes: {
          'the-druggist': ['Every once in a while, this normally chill duo puts out a dark track.'],
        },
        saleLink: 'https://amzn.to/3KcgDFJ',
        tracks: [
          {
            trackNumber: 6,
            title: 'This Land',
            notes: {
              'the-druggist': [],
            },
          },
        ],
      },
      {
        title: 'Ready Steady Slow',
        notes: {
          'the-druggist': ['For a beatless summer chillout album, this one had a couple of unsettling tracks on it.'],
        },
        saleLink: 'https://amzn.to/44Dl7xc',
        tracks: [
          {
            trackNumber: 10,
            title: 'The Long Curve',
            notes: {
              'the-druggist': ['I listened to this track over and over when I was writing the sequence where Eric his hiding in a tree, monitoring the entire neighborhood.'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Space Manoeuvres',
    albums: [
      {
        title: 'Debris [EP]',
        notes: {
          'the-druggist': ['Space Manoeuvres is one of the aforementioned Quivver&rsquo;s other monikers.'],
        },
        saleLink: 'https://www.beatport.com/release/debris-ep/190882',
        tracks: [
          {
            trackNumber: 3,
            title: 'Part Three (Breaks Mix)',
            notes: {
              'the-druggist': ['It doesn&rsquo;t get any better than this.  Dark, driving breaks with a creepy Kiefer Sutherland voiceover from <cite>Dark City</cite>.'],
            },
          },
        ],
      },
      {
        title: 'Oid',
        notes: {
          'the-druggist': [],
        },
        saleLink: 'https://www.beatport.com/release/oid/26384',
        tracks: [
          {
            trackNumber: 6,
            title: 'Pentexplorer',
            notes: {
              'the-druggist': ['Quivver is the master of the dark spoken word sample.'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Sugar Ray',
    albums: [
      {
        title: '14:59',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3O41CXx',
        tracks: [
          {
            trackNumber: 3,
            title: 'Falls Apart',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 6,
            title: 'Someday',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Team Sleep',
    albums: [
      {
        title: 'Team Sleep',
        notes: {
          'the-druggist': ['Team Sleep features Chino Moreno of Deftones on vocals.'],
        },
        saleLink: 'https://amzn.to/3rOVGuh',
        tracks: [
          {
            trackNumber: 1,
            title: 'Ataraxia',
            notes: {
              'the-druggist': [],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Thursday',
    albums: [
      {
        title: 'Full Collapse',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3K93rBq',
        tracks: [
          {
            trackNumber: 1,
            title: 'A0001',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 1,
            title: 'Understanding in a Car Crash',
            notes: {
              'catch-up-to-myself': ['Amazing, explosive energy and angst. Described by one reviewer as sounding like &ldquo;a young and angry Robert Smith of The Cure.&rdquo;'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Tricky',
    albums: [
      {
        title: 'Pre-Millennium Tension',
        notes: {
          'the-druggist': [],
        },
        saleLink: 'https://amzn.to/475Tezx',
        tracks: [
          {
            trackNumber: 2,
            title: 'Christiansands',
            notes: {
              'insulation': ['By the way, if you like <cite>Insulation</cite>, Tricky&rsquo;s autobiography, <a href="https://amzn.to/3OyDHku" target="_blank"><cite>Hell is Round the Corner</cite></a>, will be right up your alley.'],
              'the-druggist': ['I found this song far too restrained when it first came out.  It always felt ready to explode, yet it never did.  But now I love its tense, creepy vibe.  It&rsquo;s all tension, no release.'],
            },
          },
        ],
      },
      {
        title: 'Vulnerable',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3q8piCc',
        tracks: [
          {
            trackNumber: 8,
            title: 'Hollow',
            notes: {
              'catch-up-to-myself': ['Such a gut punch.  Really captures the hollow, empty feeling of a disintegrated relationship.'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Ulrich Schnauss',
    albums: [
      {
        title: 'A Strangely Isolated Place',
        notes: {
          'catch-up-to-myself': ['Equally blissed-out and forlorn, but beautiful either way, this my favorite of Ulrich Schnauss&rsquo;s albums.'],
        },
        saleLink: 'https://amzn.to/46XdinJ',
        tracks: [
          {
            trackNumber: 3,
            title: 'A Letter from Home',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 4,
            title: 'Monday - Paracetamol',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 5,
            title: 'Clear Day',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 6,
            title: 'Blumenthal',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 7,
            title: 'In All the Wrong Places',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 8,
            title: 'A Strangely Isolated Place',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Various Artists',
    albums: [
      {
        title: 'The Matrix Reloaded: The Album',
        notes: {
          'the-druggist': [],
        },
        saleLink: 'https://amzn.to/479C57W',
        tracks: [
          {
            disc: 1,
            trackNumber: 6,
            artist: 'Team Sleep',
            title: 'The Passportal',
            notes: {
              'the-druggist': ['Team Sleep features Chino Moreno of Deftones on vocals &mdash; although this happens to be an instrumental track.  And an unsettling one at that.']
            },
          },
        ],
      },
      {
        title: 'Mortal Kombat (1995) [Soundtrack]',
        notes: {
          'the-druggist': ['This movie had a surprisingly kick-ass soundtrack.'],
        },
        saleLink: 'https://amzn.to/3qbJnYb',
        tracks: [
          {
            trackNumber: 4,
            artist: 'Psykosonik',
            title: 'Unlearn (Josh Wink&rsquo;s Live Mix)',
            notes: {
              'the-druggist': ['I don&rsquo;t know why, but this song has always made me picture jack-o&rsquo;-lanterns flickering eerily in the Halloween dusk.  Perfect for a Halloween short story like <cite>The Druggist</cite>.'],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'The Verve',
    albums: [
      {
        title: 'Forth',
        notes: {
          'catch-up-to-myself': ['The cover art says it all for these two songs.'],
        },
        saleLink: 'https://amzn.to/3Y4P6f5',
        tracks: [
          {
            trackNumber: 1,
            title: 'Sit and Wonder',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 2,
            title: 'Love is Noise',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
    ],
  },
  {
    artist: 'Way Out West',
    albums: [
      {
        title: 'Intensify',
        notes: {
          'catch-up-to-myself': [],
        },
        saleLink: 'https://amzn.to/3OqF2tJ',
        tracks: [
          {
            trackNumber: 1,
            title: 'The Fall',
            notes: {
              'catch-up-to-myself': ['&ldquo;But I miss you most of all, my darling, when autumn leaves start to fall.&rdquo;'],
            },
          },
          {
            trackNumber: 2,
            title: 'Activity',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 3,
            title: 'Call Me',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 4,
            title: 'Hypnotise',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 8,
            title: 'Mindcircus',
            notes: {
              'catch-up-to-myself': ['This one is particularly applicable to <cite>Catch Up To Myself</cite>.'],
            },
          },
        ],
      },
      {
        title: 'Don&rsquo;t Look Now',
        notes: {
          'catch-up-to-myself': ['I actually didn&rsquo;t like the first two tracks on this album much, so the first time I put it in, I got worried that wasn&rsquo;t going to like the whole thing.  But then the rest of it was magical.', 'Bonus: I don&rsquo;t know how easy it is to find today, but some versions of this album came with a Bonus Mix CD, and those tracks are magical, too!'],
        },
        saleLink: 'https://amzn.to/3Q4ty0d',
        tracks: [
          {
            trackNumber: 3,
            title: 'Everyday',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 4,
            title: 'Apollo',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 5,
            title: 'Chasing Rainbows',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 6,
            title: 'Fear',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 7,
            title: 'Coming Home',
            notes: {
              'catch-up-to-myself': [],
            },
          },
          {
            trackNumber: 8,
            title: 'Just Like a Man',
            notes: {
              'catch-up-to-myself': ['Perfectly captures the feeling of being helpless under another person&rsquo;s spell, for better or worse.'],
            },
          },
          {
            trackNumber: 10,
            title: 'Northern Lights',
            notes: {
              'catch-up-to-myself': ['This one is particularly magical. A collaboration with Ulrich Schnauss.'],
            },
          },
          {
            trackNumber: 11,
            title: 'Melt',
            notes: {
              'catch-up-to-myself': ['The sample at the end is poignant: &ldquo;In the autumn, before the winter, comes man&rsquo;s last mad surge of youth.&rdquo; (From the 1946 film, <cite>Two Sisters From Boston</cite>.)'],
            },
          },
          {
            trackNumber: 12,
            title: 'Absinthe Dreams',
            notes: {
              'catch-up-to-myself': [],
            },
          },
        ],
      },
    ],
  },
];


// ONCE DATA LAYER IS REVISED, REFACTOR THE REST OF THIS LOGIC TO REFERENCE SOMETHING OTHER THAN PAGE LEVELS, WHICH MAY CONTINUE TO CHANGE:
// Select the container where the music elements will be appended:
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
