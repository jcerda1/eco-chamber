const sampleEvents = [
  {
    uri: 'sample1',
    title: "House Speaker Paul Ryan Will Not Seek Re-Election",
    summary: "House Speaker Paul Ryan will announce Wednesday that he will not run for re-election in 2018, a source familiar with the speaker's decision tells NPR. Ryan will not step down before then. There have been rumors for some time that Ryan could retire. He already passed a signature piece of legislation on taxes, something he's been focused on since he began his public career.Congress is not expected to get much, if anything, else done this year. Ryan's tenure has been something of an uneasy one" ,
    date: "2018-04-11"
  },
  {
    uri: 'sample2',
    title: "Pope Apologizes For 'Serious Mistakes' In Handling Of Chile's Sex Abuse Scandal",
    summary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    date: "2018-04-11"
  }, 
  {
    uri: 'sample3',
    title: "House Speaker Paul Ryan Will Not Seek Re-Election",
    summary: "House Speaker Paul Ryan will announce Wednesday that he will not run for re-election in 2018, a source familiar with the speaker's decision tells NPR. Ryan will not step down before then. There have been rumors for some time that Ryan could retire. He already passed a signature piece of legislation on taxes, something he's been focused on since he began his public career.Congress is not expected to get much, if anything, else done this year. Ryan's tenure has been something of an uneasy one" ,
    date: "2018-04-11"
  },
  {
    uri: 'sample4',
    title: "House Speaker Paul Ryan Will Not Seek Re-Election",
    summary: "House Speaker Paul Ryan will announce Wednesday that he will not run for re-election in 2018, a source familiar with the speaker's decision tells NPR. Ryan will not step down before then. There have been rumors for some time that Ryan could retire. He already passed a signature piece of legislation on taxes, something he's been focused on since he began his public career.Congress is not expected to get much, if anything, else done this year. Ryan's tenure has been something of an uneasy one" ,
    date: "2018-04-11"
  },
  {
    uri: 'sample5',
    title: "House Speaker Paul Ryan Will Not Seek Re-Election",
    summary: "House Speaker Paul Ryan will announce Wednesday that he will not run for re-election in 2018, a source familiar with the speaker's decision tells NPR. Ryan will not step down before then. There have been rumors for some time that Ryan could retire. He already passed a signature piece of legislation on taxes, something he's been focused on since he began his public career.Congress is not expected to get much, if anything, else done this year. Ryan's tenure has been something of an uneasy one" ,
    date: "2018-04-11"
  },
  {
    uri: 'sample6',
    title: "House Speaker Paul Ryan Will Not Seek Re-Election",
    summary: "House Speaker Paul Ryan will announce Wednesday that he will not run for re-election in 2018, a source familiar with the speaker's decision tells NPR. Ryan will not step down before then. There have been rumors for some time that Ryan could retire. He already passed a signature piece of legislation on taxes, something he's been focused on since he began his public career.Congress is not expected to get much, if anything, else done this year. Ryan's tenure has been something of an uneasy one" ,
    date: "2018-04-11"
  },
  {
    uri: 'sample7',
    title: "House Speaker Paul Ryan Will Not Seek Re-Election",
    summary: "House Speaker Paul Ryan will announce Wednesday that he will not run for re-election in 2018, a source familiar with the speaker's decision tells NPR. Ryan will not step down before then. There have been rumors for some time that Ryan could retire. He already passed a signature piece of legislation on taxes, something he's been focused on since he began his public career.Congress is not expected to get much, if anything, else done this year. Ryan's tenure has been something of an uneasy one" ,
    date: "2018-04-11"
  },
  {
    uri: 'sample8',
    title: "House Speaker Paul Ryan Will Not Seek Re-Election",
    summary: "House Speaker Paul Ryan will announce Wednesday that he will not run for re-election in 2018, a source familiar with the speaker's decision tells NPR. Ryan will not step down before then. There have been rumors for some time that Ryan could retire. He already passed a signature piece of legislation on taxes, something he's been focused on since he began his public career.Congress is not expected to get much, if anything, else done this year. Ryan's tenure has been something of an uneasy one" ,
    date: "2018-04-11"
  },
  {
    uri: 'sample9',
    title: "House Speaker Paul Ryan Will Not Seek Re-Election",
    summary: "House Speaker Paul Ryan will announce Wednesday that he will not run for re-election in 2018, a source familiar with the speaker's decision tells NPR. Ryan will not step down before then. There have been rumors for some time that Ryan could retire. He already passed a signature piece of legislation on taxes, something he's been focused on since he began his public career.Congress is not expected to get much, if anything, else done this year. Ryan's tenure has been something of an uneasy one" ,
    date: "2018-04-11"
  },
  {
    uri: 'sample1',
    category: 'World',
    title: "House Speaker Paul Ryan Will Not Seek Re-Election",
    summary: "House Speaker Paul Ryan will announce Wednesday that he will not run for re-election in 2018, a source familiar with the speaker's decision tells NPR. Ryan will not step down before then. There have been rumors for some time that Ryan could retire. He already passed a signature piece of legislation on taxes, something he's been focused on since he began his public career.Congress is not expected to get much, if anything, else done this year. Ryan's tenure has been something of an uneasy one" ,
    titleSource: "NPR",
    date: "2018-04-11"
  },
  {
    uri: 'sample1',
    category: 'World',
    title: "House Speaker Paul Ryan Will Not Seek Re-Election",
    summary: "House Speaker Paul Ryan will announce Wednesday that he will not run for re-election in 2018, a source familiar with the speaker's decision tells NPR. Ryan will not step down before then. There have been rumors for some time that Ryan could retire. He already passed a signature piece of legislation on taxes, something he's been focused on since he began his public career.Congress is not expected to get much, if anything, else done this year. Ryan's tenure has been something of an uneasy one" ,
    titleSource: "NPR",
    date: "2018-04-11"
  },
  {
    uri: 'sample1',
    category: 'World',
    title: "House Speaker Paul Ryan Will Not Seek Re-Election",
    summary: "House Speaker Paul Ryan will announce Wednesday that he will not run for re-election in 2018, a source familiar with the speaker's decision tells NPR. Ryan will not step down before then. There have been rumors for some time that Ryan could retire. He already passed a signature piece of legislation on taxes, something he's been focused on since he began his public career.Congress is not expected to get much, if anything, else done this year. Ryan's tenure has been something of an uneasy one" ,
    titleSource: "NPR",
    date: "2018-04-11"
  },
  {
    uri: 'sample1',
    category: 'World',
    title: "House Speaker Paul Ryan Will Not Seek Re-Election",
    summary: "House Speaker Paul Ryan will announce Wednesday that he will not run for re-election in 2018, a source familiar with the speaker's decision tells NPR. Ryan will not step down before then. There have been rumors for some time that Ryan could retire. He already passed a signature piece of legislation on taxes, something he's been focused on since he began his public career.Congress is not expected to get much, if anything, else done this year. Ryan's tenure has been something of an uneasy one" ,
    titleSource: "NPR",
    date: "2018-04-11"
  },
  {
    uri: 'sample1',
    category: 'World',
    title: "House Speaker Paul Ryan Will Not Seek Re-Election",
    summary: "House Speaker Paul Ryan will announce Wednesday that he will not run for re-election in 2018, a source familiar with the speaker's decision tells NPR. Ryan will not step down before then. There have been rumors for some time that Ryan could retire. He already passed a signature piece of legislation on taxes, something he's been focused on since he began his public career.Congress is not expected to get much, if anything, else done this year. Ryan's tenure has been something of an uneasy one" ,
    titleSource: "NPR",
    date: "2018-04-11"
  },
  {
    uri: 'sample1',
    category: 'World',
    title: "House Speaker Paul Ryan Will Not Seek Re-Election",
    summary: "House Speaker Paul Ryan will announce Wednesday that he will not run for re-election in 2018, a source familiar with the speaker's decision tells NPR. Ryan will not step down before then. There have been rumors for some time that Ryan could retire. He already passed a signature piece of legislation on taxes, something he's been focused on since he began his public career.Congress is not expected to get much, if anything, else done this year. Ryan's tenure has been something of an uneasy one" ,
    titleSource: "NPR",
    date: "2018-04-11"
  },
  {
    uri: 'sample1',
    category: 'World',
    title: "House Speaker Paul Ryan Will Not Seek Re-Election",
    summary: "House Speaker Paul Ryan will announce Wednesday that he will not run for re-election in 2018, a source familiar with the speaker's decision tells NPR. Ryan will not step down before then. There have been rumors for some time that Ryan could retire. He already passed a signature piece of legislation on taxes, something he's been focused on since he began his public career.Congress is not expected to get much, if anything, else done this year. Ryan's tenure has been something of an uneasy one" ,
    titleSource: "NPR",
    date: "2018-04-11"
  },
  {
    uri: 'sample1',
    category: 'World',
    title: "House Speaker Paul Ryan Will Not Seek Re-Election",
    summary: "House Speaker Paul Ryan will announce Wednesday that he will not run for re-election in 2018, a source familiar with the speaker's decision tells NPR. Ryan will not step down before then. There have been rumors for some time that Ryan could retire. He already passed a signature piece of legislation on taxes, something he's been focused on since he began his public career.Congress is not expected to get much, if anything, else done this year. Ryan's tenure has been something of an uneasy one" ,
    titleSource: "NPR",
    date: "2018-04-11"
  },
  {
    uri: 'sample1',
    category: 'World',
    title: "House Speaker Paul Ryan Will Not Seek Re-Election",
    summary: "House Speaker Paul Ryan will announce Wednesday that he will not run for re-election in 2018, a source familiar with the speaker's decision tells NPR. Ryan will not step down before then. There have been rumors for some time that Ryan could retire. He already passed a signature piece of legislation on taxes, something he's been focused on since he began his public career.Congress is not expected to get much, if anything, else done this year. Ryan's tenure has been something of an uneasy one" ,
    titleSource: "NPR",
    date: "2018-04-11"
  },
  {
    uri: 'sample1',
    category: 'World',
    title: "House Speaker Paul Ryan Will Not Seek Re-Election",
    summary: "House Speaker Paul Ryan will announce Wednesday that he will not run for re-election in 2018, a source familiar with the speaker's decision tells NPR. Ryan will not step down before then. There have been rumors for some time that Ryan could retire. He already passed a signature piece of legislation on taxes, something he's been focused on since he began his public career.Congress is not expected to get much, if anything, else done this year. Ryan's tenure has been something of an uneasy one" ,
    titleSource: "NPR",
    date: "2018-04-11"
  },
  {
    uri: 'sample1',
    category: 'World',
    title: "House Speaker Paul Ryan Will Not Seek Re-Election",
    summary: "House Speaker Paul Ryan will announce Wednesday that he will not run for re-election in 2018, a source familiar with the speaker's decision tells NPR. Ryan will not step down before then. There have been rumors for some time that Ryan could retire. He already passed a signature piece of legislation on taxes, something he's been focused on since he began his public career.Congress is not expected to get much, if anything, else done this year. Ryan's tenure has been something of an uneasy one" ,
    titleSource: "NPR",
    date: "2018-04-11"
  },
  {
    uri: 'sample1',
    category: 'World',
    title: "House Speaker Paul Ryan Will Not Seek Re-Election",
    summary: "House Speaker Paul Ryan will announce Wednesday that he will not run for re-election in 2018, a source familiar with the speaker's decision tells NPR. Ryan will not step down before then. There have been rumors for some time that Ryan could retire. He already passed a signature piece of legislation on taxes, something he's been focused on since he began his public career.Congress is not expected to get much, if anything, else done this year. Ryan's tenure has been something of an uneasy one" ,
    titleSource: "NPR",
    date: "2018-04-11"
  },
  {
    uri: 'sample1',
    category: 'World',
    title: "House Speaker Paul Ryan Will Not Seek Re-Election",
    summary: "House Speaker Paul Ryan will announce Wednesday that he will not run for re-election in 2018, a source familiar with the speaker's decision tells NPR. Ryan will not step down before then. There have been rumors for some time that Ryan could retire. He already passed a signature piece of legislation on taxes, something he's been focused on since he began his public career.Congress is not expected to get much, if anything, else done this year. Ryan's tenure has been something of an uneasy one" ,
    titleSource: "NPR",
    date: "2018-04-11"
  },
  {
    uri: 'sample1',
    category: 'World',
    title: "House Speaker Paul Ryan Will Not Seek Re-Election",
    summary: "House Speaker Paul Ryan will announce Wednesday that he will not run for re-election in 2018, a source familiar with the speaker's decision tells NPR. Ryan will not step down before then. There have been rumors for some time that Ryan could retire. He already passed a signature piece of legislation on taxes, something he's been focused on since he began his public career.Congress is not expected to get much, if anything, else done this year. Ryan's tenure has been something of an uneasy one" ,
    titleSource: "NPR",
    date: "2018-04-11"
  },
  {
    uri: 'sample1',
    category: 'World',
    title: "House Speaker Paul Ryan Will Not Seek Re-Election",
    summary: "House Speaker Paul Ryan will announce Wednesday that he will not run for re-election in 2018, a source familiar with the speaker's decision tells NPR. Ryan will not step down before then. There have been rumors for some time that Ryan could retire. He already passed a signature piece of legislation on taxes, something he's been focused on since he began his public career.Congress is not expected to get much, if anything, else done this year. Ryan's tenure has been something of an uneasy one" ,
    titleSource: "NPR",
    date: "2018-04-11"
  }
];

const sampleSources = [
  {
    title: 'Breitbart',
    uri: 'breitbart.com',
    bias: -3
  },
  {
    titleSource: 'Fox',
    uri: 'foxnews.com',
    bias: -2
  },
  {
    titleSource: 'Hill',
    uri: 'thehill.com',
    bias: -1
  },
  {
    titleSource: 'NYTimes',
    uri: 'nytimes.com',
    bias: 0
  },
  {
    titleSource: 'Vox',
    uri: 'vox.com',
    bias: 1
  },
  {
    titleSource: 'MSNBC',
    uri: 'msnbc.com',
    bias: 2
  },
  {
    titleSource: 'Huffington',
    uri: 'huffingtonpost.com',
    bias: 3
  } 
];



const sampleArticles = [
  {
    // sourceId: 1,
    // eventId: 1,
    uri: "sampleUri1",
    date: "2018-04-11",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/5a/HuffPost.svg",
    title:"Speaker Paul Ryan Retires: ‘This Year Will Be My Last as a Member of the House’",
    description:"House Speaker Paul Ryan revealed at a press conference that he will retire at the end of the congressional term, saying that this “year will be my last as a member of the House.”",
    body: "BODY WILL GO HERE",
    url: "http://www.breitbart.com/big-government/2018/04/11/speaker-paul-ryan-retires-year-will-last-member-house"
  },
  {
    // sourceId: 2,
    // eventId: 1,
    uri: "sampleUri2",
    date: "2018-04-11",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/62/MSNBC_2015_logo.svg",
    title:"House Speaker Paul Ryan will not run for re-election",
    description:"House Speaker Paul Ryan, R-Wis., announced Wednesday that he is not seeking re-election in November -- a move that ends a nearly two decade career in Congress and comes as the GOP girds for a tough fight to keep control of the House this year.",
    body: "BODY WILL GO HERE",
    url: "http://www.foxnews.com/politics/2018/04/11/house-speaker-paul-ryan-wont-run-for-re-election-ap-reports.html"
  },
  {
    // sourceId: 3,
    // eventId: 1,
    uri: "sampleUri3",
    date: "2018-04-11",
    img: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Vox_logo.svg",
    title:"Ryan to retire as Speaker in January",
    description:"Speaker Paul Ryan (R-Wis.) is retiring at the end of this Congress, ending his speakership a little more than three years after it began and as the GOP faces a possible loss of its majority this fall.",
    body: "BODY WILL GO HERE",
    url: "http://thehill.com/homenews/house/382610-ryan-announces-he-wont-seek-reelection"
  },
  {
    // id: 4,
    // sourceId: 4,
    // eventId: 1,
    uri: "sampleUri4",
    date: "2018-04-11",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/58/NewYorkTimes.svg",
    title:"Ryan Found Himself on the Margins as G.O.P. Embraces Trump",
    description:"Mr. Ryan said Wednesday that he would not seek re-election, ending a brief stint atop the House and signaling the peril that the Republican majority faces in the midterm elections",
    body: "BODY WILL GO HERE",
    url: "https://www.nytimes.com/2018/04/11/us/politics/paul-ryan-speaker.html"
  },
  {
    // id: 5,
    // sourceId: 5,
    // eventId: 1,
    uri: "sampleUri5",
    date: "2018-04-11",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/93/The_Hill_logo.jpeg",
    title:"Paul Ryan announces he won’t run for reelection",
    description: "Paul Ryan announced he would not run for reelection after House Republicans’ weekly gathering on Wednesday, confirming months of speculation that his time in Washington was coming to an end. He will still serve the rest of his term.",
    body: "BODY WILL GO HERE",
    url: "https://www.vox.com/policy-and-politics/2018/4/11/17225202/paul-ryan-out-retirement-announcement"
  },
  {
    // id: 6,
    // sourceId: 6,
    // eventId: 1,
    uri: "sampleUri6",
    date: "2018-04-11",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/67/Fox_News_Channel_logo.svg",
    title:"House Speaker Paul Ryan to exit stage right",
    description: "There’s been an enormous number of House Republican retirement announcements in recent months, but some are more notable than others.",
    body: "BODY WILL GO HERE",
    url: "http://www.msnbc.com/rachel-maddow-show/house-speaker-paul-ryan-exit-stage-right"   
  },
  {
    // id: 7,
    // sourceId: 7,
    // eventId: 1,
    uri: "sampleUri7",
    date: "2018-04-11",
    img: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Breitbart_News.svg",
    title:"Paul Ryan Says He Won’t Seek Re-Election",
    description: "House Speaker Paul Ryan (R-Wis.) told colleagues Wednesday morning that he will not seek re-election this year and will retire from the House in January, capping off months of rumors that he was mulling stepping down from his leadership post.",
    body: "BODY WILL GO HERE",
    url: "https://www.huffingtonpost.com/entry/paul-ryan-reelection_us_5a328e40e4b07ff75b00d34a"   
  }
];


const sampleCategories = [
  {
    name: 'Business',
  },
  {
    name: 'Arts',
  },
  {
    name: 'Computers',
  },
  {
    name: 'Games',
  },
  {
    name: 'Health',
  },
  {
    name: 'Home',
  },
  {
    name: 'Recreation',
  },
  {
    name: 'Reference',
  },
  {
    name: 'Science',
  },
  {
    name: 'Shopping',
  },
  {
    name: 'Society',
  },
  {
    name: 'Sports',
  },
]

const sampleSubcategories = [
  {
    uri: 'dmoz/Business',
  },
  {
    uri: 'dmoz/Arts',
  },
  {
    uri: 'dmoz/Computers',
  },
  {
    uri: 'dmoz/Games',
  },
  {
    uri: 'dmoz/Health',
  },
  {
    uri: 'dmoz/Home',
  },
  {
    uri: 'dmoz/Recreation',
  },
  {
    uri: 'dmoz/Reference',
  },
  {
    uri: 'dmoz/Science',
  },
  {
    uri: 'dmoz/Shopping',
  },
  {
    uri: 'dmoz/Society',
  },
  {
    uri: 'dmoz/Sports',
  },
]

module.exports = {
  sampleEvents,
  sampleSources,
  sampleArticles,
  sampleCategories,
  sampleSubcategories,
}
