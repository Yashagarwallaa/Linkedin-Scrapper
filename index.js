const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const userModel = require('./models/LinkedinUser');

const puppeteer = require('puppeteer');
const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const User = userModel(sequelize); 


async function scrapeUrl(url) {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({headless:true});
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(url);
 
  
  const  name= await page.$$eval("h1.top-card-layout__title.leading-open",(elements)=>
    elements.map((element)=>element.innerText));

    const full_name = name[0];
    const  follower= await page.$$eval(".not-first-middot",(elements)=>
    elements.map((element)=>element.innerText));
    const  abouts= await page.$$eval(".core-section-container",(elements)=>
    elements.map((element)=>element.innerText));
    const  bios= await page.$$eval("h2.top-card-layout__headline",(elements)=>
    elements.map((element)=>element.innerText));
    const follower_connection = follower[1];
    const location_user = follower[0];
    const locationi = location_user.slice(0,-13);
    const about_line = abouts[0];
    const bioline = bios[0]
    console.log(full_name , follower_connection,locationi, about_line, bioline);
  await browser.close();
  return {accountName: full_name, follower_connectionCount: follower_connection, about: about_line, bio:bioline,
    location:locationi}
};



app.listen(3000,()=>{
    console.log("Server running at port 3000");
})

app.get('/',async(req,res)=>{
  res.send("Welcome to my extension");
})

app.post('/scrape', async (req, res) => {
  try {
      // Scrape data from the URL
      let url = req.body.url;
      console.log(url);
      const scrapedData = await scrapeUrl(url);

      // Process and save scraped data (code omitted for brevity)
      if(scrapedData){
        console.log(scrapedData);
       
        const newUser = await User.create({
          accountName : scrapedData.accountName,
          follower_connectionCount : scrapedData.follower_connectionCount,
          about : scrapedData.about,
          bio : scrapedData.bio,
          location: scrapedData.location
        });
      res.status(200).json({ success: true, data: scrapedData });
      }
      else {
        res.status(404).json({ success: false,error:"No scrapped data"});
      }
  } catch (error) {
      console.error("Error scraping data:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.post('/add',async(req,res)=>{
    try {
        const form = document.querySelector('.linkedinform');
        const { accountName, bio, followerCount, connectionCount, about, location } = req.body.value;
    
        // Create a new LinkedIn account record
        const User = await userModel.create({
          accountName: accountName,
          bio:bio,
          followerCount:followerCount,
          connectionCount:connectionCount,
          about: about,
          location:location
        });
    
        res.status(200).send.json(User);
      } catch (error) {
        console.error('Error creating LinkedIn account:', error);
        res.status(500).json({ error: 'Internal server error' });
      }

})