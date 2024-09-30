const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://game8.co/games/Genshin-Impact/archives/311411#hl_2';

axios.get(url, { responseType: 'text' })
  .then(response => {
    const $ = cheerio.load(response.data);
    const cards = [];
    
    // Iterate through each h3 header that matches the pattern "All (nation) Viewpoint Details"
    $('h3.a-header--3').each((_, header) => {
      const headerText = $(header).text().trim();
      const match = headerText.match(/^All (.+) Viewpoint Details$/);

      if (match) {
        const nation = match[1].trim();
        console.log(`Nation: ${nation}`);
        const table = $(header).next('table.a-table');

        // Check if the table exists
        if (!table.length) {
          console.log(`No table found for nation: ${nation}`);
          return;
        }

        // Iterate through each row in the table to get viewpoint details
        table.find('tr').each((index, row) => {
          if (index === 0) return; // Skip the header row

          const viewpointName = $(row).find('td b.a-bold').text().trim();
          const description = $(row).find('td:nth-child(2)').text().trim();
          
          // Debugging: Log the extracted viewpointName
          console.log(`Extracted Viewpoint Name: ${viewpointName}`);

          // Print the HTML structure of the entire row
          const rowHtml = $(row).html();
          console.log(`Row HTML: ${rowHtml}`);

          // Extract the image URL from the data-image-url attribute
          let imgUrl = $(row).find('td:nth-child(2) div.imageLink').attr('data-image-url');

          console.log(`Viewpoint: ${viewpointName}, Description: ${description}, Image URL: ${imgUrl}`);

          if (viewpointName && description && imgUrl) {
            cards.push({
              question: `Viewpoint: ${viewpointName}\nDescription: ${description}`,
              answer: nation,
              image: imgUrl
            });
          }
        });
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