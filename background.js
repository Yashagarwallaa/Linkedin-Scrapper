let currIndex = 0;
let Profile_List = ['https://www.linkedin.com/in/anurag-debnath-adn/','https://www.linkedin.com/in/arshgoyal/',
'https://www.linkedin.com/in/shreel-bansal-a0a8b81b7/'];


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openNextProfile" && currIndex < Profile_List.length) {
      const url = Profile_List[currIndex++];
      chrome.tabs.create({ url, active: false });
    }
    if ( currIndex === Profile_List.length )currIndex=0;
  });


  
//   chrome.runtime.onMessage.addListener(async function(message, sender, sendResponse) {
//     // Check if the message contains profile data
//     if (message.action === "profileData") {
//         // Access the profile data
//         const profileData = message.data;
        
//         // Save data to PostgreSQL database
//         try {
//             await ProfileData.create({
//                 name: profileData.name,
//                 title: profileData.title,
//                 location: profileData.location
//             });
            
//             console.log("Profile Data saved to PostgreSQL database.");
//         } catch (error) {
//             console.error("Error saving profile data to PostgreSQL database:", error);
//         }
//     }
// });

// let url = Profile_List[currIndex];

// chrome.runtime.onMessage.addListener( async (message, sender, sendResponse) => {
//     if (message.action === "addData" ) {
//          const browser = await puppeteer.launch();
//          const page = await browser.newPage();

//          await page.goto(url);
//          await page.waitForNavigation({waitUntil:"networkidle0"});

//          let bio = await page.evaluate(()=>document.title);
//          console.log(bio);
//          sendResponse(bio);
//          await browser.close();
//     }
// });
