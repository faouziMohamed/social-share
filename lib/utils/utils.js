import { golfyNumber } from '.';

// create function who generate random english long text
export function generateLongEnglishText(size) {
  const sentences = [
    'The team members were hard to tell apart since they all wore their hair in a ponytail.',
    'The bread dough reminded her of Santa Clause’s belly.',
    'She had a difficult time owning up to her own crazy self.',
    'His mind was blown that there was nothing in space except space itself.',
    '100 years old is such a young age if you happen to be a bristlecone pine.',
    'At that moment he wasn’t listening to music, he was living an experience.',
    'My dentist tells me that chewing bricks is very bad for your teeth.',
    'She looked at the masterpiece hanging in the museum but all she could think is that her five-year-old could do better.',
    'To the surprise of everyone, the Rapture happened yesterday but it didn’t quite go as expected.',
    'So long and thanks for the fish.',
    'With a single flip of the coin, his life changed forever.',
    'It’s not often you find a soggy banana on the street.',
    'Flash photography is best used in full sunlight.',
    'There was no ice cream in the freezer, nor did they have money to go to the store.',
    'They called out her name time and again, but were met with nothing but',
    'We have young kids who often walk into our room at night for various reasons including clowns in the closet.',
    'He wondered if she would appreciate his toenail collection.',
    'He shaved the peach to prove a point.',
    'I don’t respect anybody who can’t tell the difference between Pepsi and Coke.',
    'They did nothing as the raccoon attacked the lady’s bag of food.',
    'The swirled lollipop had issues with the pop rock candy.',
    'She was too busy always talking about what she wanted to do to actually do any of it.',
    'The tattered work gloves speak of the many hours of hard labor he endured throughout his life.',
    'Garlic ice-cream was her favorite.',
    'The rain pelted the windshield as the darkness engulfed us.',
    'The clouds formed beautiful animals in the sky that eventually created a tornado to wreak havoc.',
    'They got there early, and they got really good seats.',
    'Had he known what was going to happen, he would have never stepped into the shower.',
    'A glittering gem is not enough.',
  ];

  return sentences
    .sort(() => 0.5 - Math.random())
    .slice(0, size)
    .join(' ');
}

export function generateRandomTitle() {
  const titles = [
    'How To Quit HELP In 5 Days',
    'The Ugly Truth About HELP',
    'What Make HELP Don’t Want You To Know',
    'Have You Heard? HELP Is Your Best Bet To Grow',
    '3 Ways To Master HELP Without Breaking A Sweat',
    'What Is HELP and How Does It Work?',
    'Picture Your HELP On Top. Read This And Make It So',
    'Death, HELP And Taxes',
    'What Zombies Can Teach You About HELP',
    '10 Ways To Immediately Start Selling HELP',
    'Clear And Unbiased Facts About HELP (Without All the Hype)',
    'How To Handle Every HELP Challenge With Ease Using These Tips',
    'Can You Really Find HELP (on the Web)?',
    'How To Get (A) Fabulous HELP On A Tight Budget',
    'Master (Your) HELP in 5 Minutes A Day',
    '15 Tips For HELP Success',
    '5 Actionable Tips on HELP And Twitter.',
    'How To Start A Business With HELP',
    'What Can You Do To Save Your HELP From Destruction By Social Media?',
    'Remarkable Website - HELP Will Help You Get There',
    'The Untold Secret To HELP In Less Than Ten Minutes',
    'The Secrets To HELP',
    'Fascinating HELP Tactics That Can Help Your Business Grow',
    'How To Improve At HELP In 60 Minutes',
    'Fast-Track Your HELP',
    'Fall In Love With HELP',
    'What Your Customers Really Think About Your HELP?',
    'Here Is A Quick Cure For HELP',
    'Top 10 Tips With HELP',
    'HELP And Love Have 4 Things In Common',
    'Want A Thriving Business? Focus On HELP!',
    'Stop Wasting Time And Start HELP',
    'Get Better HELP Results By Following 3 Simple Steps',
    '5 Ways To Get Through To Your HELP',
    '4 Ways You Can Grow Your Creativity Using HELP',
    'How To Make Your Product Stand Out With HELP',
  ];

  return titles
    .sort(() => 0.5 - Math.random())
    .slice(0, 1)
    .join(' ');
}

export function someGithubRepositorie() {
  const repoList = [
    {
      urlAltText: 'Apache Spark',
      url: 'https://github.com/kubernetes/kubernetes',
    },
    {
      urlAltText: 'Microsoft Visual Studio Code',
      url: 'https://github.com/Microsoft/vscode',
    },
    {
      urlAltText: 'NixOS Package Collection',
      url: 'https://github.com/NixOS/nixpkgs',
    },
    {
      urlAltText: 'Rust',
      url: '',
    },
    {
      urlAltText: 'Firehol IP Lists',
      url: 'https://github.com/firehol/blocklist-ipsets',
    },
    {
      urlAltText: 'Red Hat OpenShift',
      url: 'https://github.com/openshift/origin',
    },
    {
      urlAltText: 'Microsoft Azure Documentation',
      url: 'https://github.com/MicrosoftDocs/azure-docs',
    },
    {
      urlAltText: 'Saltstack',
      url: 'https://www.saltstack.com/',
    },
    {
      urlAltText: 'Symfony, a PHP framework',
      url: 'https://github.com/symfony/symfony',
    },
    {
      urlAltText: 'Liferay, an enterprise web platform',
      url: 'https://github.com/brianchandotcom/liferay-portal',
    },
    {
      urlAltText: 'PyTorch',
      url: 'https://github.com/pytorch/pytorch',
    },
    {
      urlAltText: 'Personal cloud software (ownCloud)',
      url: ' https://github.com/owncloud/core',
    },
  ];

  return repoList[Math.floor(Math.random() * repoList.length)];
}

export function readUserPosts({ size = 100 }) {
  const posts = Array.from(Array(size).keys()).map(() => ({
    stats: {
      shares: golfyNumber(Math.floor(Math.random() * (Math.random() * 40097))),
      likes: golfyNumber(Math.floor(Math.random() * (Math.random() * 40097))),
      dislikes: golfyNumber(
        Math.floor(Math.random() * (Math.random() * 40097)),
      ),
      comments: golfyNumber(
        Math.floor(Math.random() * (Math.random() * 40097)),
      ),
    },
    body: {
      title: generateRandomTitle(),
      text: generateLongEnglishText(Math.floor(Math.random() * 10)),
      ...someGithubRepositorie(),
    },
  }));

  return posts;
}

export function generateDate() {
  const now = new Date();
  const year = 2021;
  const month = now.getMonth() - Math.floor(Math.random() * now.getMonth());
  const day = Math.floor(Math.random() * 28) + 1;
  const hour = Math.floor(Math.random() * 24);
  const minute = Math.floor(Math.random() * 60);
  const second = Math.floor(Math.random() * 60);
  const date = new Date(year, month, day, hour, minute, second);
  return date;
}

export function randomName() {
  const names = [
    'Faouzi',
    'Mohamed',

    'Abdellah',
    'Abdou',
    'Marc',
    'Fiona',
    'Samir',
    'Brian',
    'Sebastien',
    'Souleymane',
    'Chila',
    'Nabil',
    'Nabila',
    'Halim',
    'Faouzi Mohamed',
    'Maria',
    'Sophie',
    'Léa',
    'Léna',
  ];
  return names[Math.floor(Math.random() * names.length)];
}
