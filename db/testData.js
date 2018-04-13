const articles = [
  {
    id: 1,
    sourceId: 1,
    eventId: 1,
    published: "2018-04-11",
    title:"Speaker Paul Ryan Retires: ‘This Year Will Be My Last as a Member of the House’",
    description:"House Speaker Paul Ryan revealed at a press conference that he will retire at the end of the congressional term, saying that this “year will be my last as a member of the House.”",
    body: "BODY WILL GO HERE",
    url: "http://www.breitbart.com/big-government/2018/04/11/speaker-paul-ryan-retires-year-will-last-member-house"
  },
  {
    id: 2,
    sourceId: 2,
    eventId: 1,
    published: "2018-04-11",
    title:"House Speaker Paul Ryan will not run for re-election",
    description:"House Speaker Paul Ryan, R-Wis., announced Wednesday that he is not seeking re-election in November -- a move that ends a nearly two decade career in Congress and comes as the GOP girds for a tough fight to keep control of the House this year.",
    body: "BODY WILL GO HERE",
    url: "http://www.foxnews.com/politics/2018/04/11/house-speaker-paul-ryan-wont-run-for-re-election-ap-reports.html"
  },
  {
    id: 3,
    sourceId: 3,
    eventId: 1,
    published: "2018-04-11",
    title:"Ryan to retire as Speaker in January",
    description:"Speaker Paul Ryan (R-Wis.) is retiring at the end of this Congress, ending his speakership a little more than three years after it began and as the GOP faces a possible loss of its majority this fall.",
    body: "BODY WILL GO HERE",
    url: "http://thehill.com/homenews/house/382610-ryan-announces-he-wont-seek-reelection"
  },
  {
    id: 4,
    sourceId: 4,
    eventId: 1,
    published: "2018-04-11",
    title:"Ryan Found Himself on the Margins as G.O.P. Embraces Trump",
    description:"Mr. Ryan said Wednesday that he would not seek re-election, ending a brief stint atop the House and signaling the peril that the Republican majority faces in the midterm elections",
    body: "BODY WILL GO HERE",
    url: "https://www.nytimes.com/2018/04/11/us/politics/paul-ryan-speaker.html"
  },
  {
    id: 5,
    sourceId: 5,
    eventId: 1,
    published: "2018-04-11",
    title:"Paul Ryan announces he won’t run for reelection",
    description: "Paul Ryan announced he would not run for reelection after House Republicans’ weekly gathering on Wednesday, confirming months of speculation that his time in Washington was coming to an end. He will still serve the rest of his term.",
    body: "BODY WILL GO HERE",
    url: "https://www.vox.com/policy-and-politics/2018/4/11/17225202/paul-ryan-out-retirement-announcement"
  },
  {
    id: 6,
    sourceId: 6,
    eventId: 1,
    published: "2018-04-11",
    title:"House Speaker Paul Ryan to exit stage right",
    description: "There’s been an enormous number of House Republican retirement announcements in recent months, but some are more notable than others.",
    body: "BODY WILL GO HERE",
    url: "http://www.msnbc.com/rachel-maddow-show/house-speaker-paul-ryan-exit-stage-right"   
  },
  {
    id: 7,
    sourceId: 7,
    eventId: 1,
    published: "2018-04-11",
    title:"Paul Ryan Says He Won’t Seek Re-Election",
    description: "House Speaker Paul Ryan (R-Wis.) told colleagues Wednesday morning that he will not seek re-election this year and will retire from the House in January, capping off months of rumors that he was mulling stepping down from his leadership post.",
    body: "BODY WILL GO HERE",
    url: "https://www.huffingtonpost.com/entry/paul-ryan-reelection_us_5a328e40e4b07ff75b00d34a"   
  }
];

const events = [
  {
    id: 1,
    category: 'Society',
    title: "House Speaker Paul Ryan Will Not Seek Re-Election",
    description: "House Speaker Paul Ryan will announce Wednesday that he will not run for re-election in 2018, a source familiar with the speaker's decision tells NPR. Ryan will not step down before then. There have been rumors for some time that Ryan could retire. He already passed a signature piece of legislation on taxes, something he's been focused on since he began his public career.Congress is not expected to get much, if anything, else done this year. Ryan's tenure has been something of an uneasy one" ,
    titleSource: "NPR",
    date: "2018-04-11"
  },
];

const sources = [
  {
    id: 1,
    name: 'Breitbart',
    url: 'breitbart.com',
    bias: -3
  },
  {
    id: 2,
    name: 'Fox',
    url: 'foxnews.com',
    bias: -2
  },
  {
    id: 3,
    name: 'Hill',
    url: 'thehill.com',
    bias: -1
  },
  {
    id: 4,
    name: 'NYTimes',
    url: 'nytimes.com',
    bias: 0
  },
  {
    id: 5,
    name: 'Vox',
    url: 'vox.com',
    bias: 1
  },
   {
    id: 6,
    name: 'MSNBC',
    url: 'msnbc.com',
    bias: 2
  },
  {
    id: 7,
    name: 'Huffington',
    url: 'huffingtonpost.com',
    bias: 3
  } 
];