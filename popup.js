const btn = document.querySelector('.btn');

const open_profile = document.querySelector('.btn-open-profile');
const import_data = document.querySelector('.btn-import-data');
const add_profile = document.querySelector('.btn-add-profile');



async function getCurrentTab(){
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    if (tab.url.startsWith('https://www.linkedin.com/')){
                document.querySelector('.disclaimer').style.display = "none";
                document.querySelector('.btn').style.display = "flex";
    // const name = document.querySelector('.text-heading-xlarge inline t-24 v-align-middle break-words');
    // console.log(name);
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
    });
      open_profile.addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: "openNextProfile" });
        
      });
      import_data.addEventListener('click', async()=>{
        let urlToScrape = tab.url;
        console.log(urlToScrape);
        
        try {
          const response = await fetch('http://localhost:3000/scrape', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
            },
              body: JSON.stringify({ url: urlToScrape })
          });
          if (response.ok) {
            const data = await response.json();
            console.log("Data scraped:", data);
            
        } else {
            console.error("Failed to scrape data:", response.statusText);
        }
    } catch (error) {
        console.error("Error scraping data:", error);
    }
});
}}
getCurrentTab();


