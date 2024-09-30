const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://genshin-impact.fandom.com/wiki/Viewpoint/Gallery';

axios.get(url, { responseType: 'text' })
  .then(response => {
    const $ = cheerio.load(response.data);
    const cards = [];
    
    // Select images and their corresponding viewpoint names and regions
    $('div.wikia-gallery-item').each((_, element) => {
      let imgUrl = $(element).find('img.thumbimage').attr('data-src') || $(element).find('img.thumbimage').attr('src');
      const viewpointName = $(element).find('div.lightbox-caption a').text().trim();
      const regionName = $(element).closest('div.wikia-gallery').prevAll('h2').first().find('.mw-headline').text().trim();

      // Convert relative URL to absolute URL if necessary
      if (imgUrl && !imgUrl.startsWith('http')) {
        imgUrl = new URL(imgUrl, url).href;
      }

      if (imgUrl !== undefined && viewpointName !== '' && regionName !== '') {
        cards.push({ question: `Where is '${viewpointName}' located in?`, answer: regionName, image: imgUrl });
      }
    });

    // console.log(cards);
    // Save the data to a JSON file
    fs.writeFileSync('cards.json', JSON.stringify(cards, null, 2));
    console.log('Data saved to cards.json');
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
  // run node scripts/scrape.cjs in terminal