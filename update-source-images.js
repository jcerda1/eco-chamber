const db = require('./models/index');

const sourcesImages = {
  'huffingtonpost.com': 'https://pbs.twimg.com/profile_images/875366648093577217/DPjc49xK_400x400.jpg',
  'msnbc.com': 'https://pbs.twimg.com/profile_images/988382060443250689/DijesdNB_400x400.jpg',
  'motherjones.com': 'https://pbs.twimg.com/profile_images/876930593338085376/SZPvGXy5_400x400.jpg',
  'nytimes.com': 'https://pbs.twimg.com/profile_images/942784892882112513/qV4xB0I3_400x400.jpg',
  'theguardian.com': 'https://pbs.twimg.com/profile_images/952866338187423744/0hj7a-EH_400x400.jpg',
  'latimes.com': 'https://pbs.twimg.com/profile_images/546329819919560704/XMWy2Z50_400x400.jpeg',
  'thehill.com': 'https://pbs.twimg.com/profile_images/907330975587336193/tw7JPE5v_400x400.jpg',
  'hosted.ap.org': ' https://pbs.twimg.com/profile_images/461964160838803457/8z9FImcv_400x400.png',
  'npr.org': 'https://pbs.twimg.com/profile_images/722199003845304320/s2zwEoao_400x400.jpg',
  'foxnews.com': ' https://pbs.twimg.com/profile_images/918480715158716419/4X8oCbge_400x400.jpg',
  'thefederalist.com': 'https://pbs.twimg.com/profile_images/875400955243581440/za3l71Gt_400x400.jpg',
  'washingtontimesreporter.com': '',
  'breitbart.com': 'https://pbs.twimg.com/profile_images/949270171755077632/dw3M-58z_400x400.jpg',
  'wnd.com': 'https://pbs.twimg.com/profile_images/1426598663/wnd.WND.logo.white_400x400.jpg',
  'theblaze.com': 'https://pbs.twimg.com/profile_images/753288359632527361/9aLk8rD__400x400.jpg'
}

const updateSourceImage = async(sourceUri, image) => {
 
  let updateValues = { image };
  let source = await db.Source.find({where:{uri: sourceUri}});
  
  if (source) {
    source.update(updateValues).then((updated) => {
      console.log(`updated ${updated.dataValues.uri} to have a new image`);
    });
  }
     
}

const updateAllSourceImages = async() => {
  for (const source in sourcesImages) {
    const sourceUri = source;
    const image = sourcesImages[source];

    await updateSourceImage(sourceUri, image); 
  }
  console.log('all sources updated');
}

updateAllSourceImages();