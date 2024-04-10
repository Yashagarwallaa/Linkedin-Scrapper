
// const puppeteer = require('puppeteer');
//   chrome.runtime.onMessage.addListener(async function(message, sender, sendResponse) {
//       if (message.action === "addData") {
   
//           const profileData = await addData(message.profileUrl);
          
        
//           chrome.runtime.sendMessage({ action: "profileData", data: profileData });
//       }
//   });
  
  
//   async function addData(url) {
//       // Launch the browser and open a new blank page
//       const browser = await puppeteer.launch({headless:true});
//       const page = await browser.newPage();
    
//       // Navigate the page to a URL
//       await page.goto(url);
     
      
//       const  name= await page.$$eval("h1.top-card-layout__title.leading-open",(elements)=>
//         elements.map((element)=>element.innerText));
    
//         const full_name = name[0];
//         const  follower= await page.$$eval(".not-first-middot",(elements)=>
//         elements.map((element)=>element.innerText));
//         const  about= await page.$$eval(".core-section-container",(elements)=>
//         elements.map((element)=>element.innerText));
//         const  bio= await page.$$eval("h2.top-card-layout__headline",(elements)=>
//         elements.map((element)=>element.innerText));
//         const follower_connection = follower[1];
//         let location = follower[0];
//         location = location.slice(0,-13);
//         let about_line = about[0];
//         let bioline = bio[0]
//         console.log(name);
//       await browser.close();
//       return { full_name , follower_connection,location, about_line, bioline};
//     };
