let currIndex = 0;
let Profile_List = ['https://www.linkedin.com/in/pratham02/',
'https://www.linkedin.com/in/arnab-ray-choudhury-03535b267/',
'https://www.linkedin.com/in/gss117/'];


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openNextProfile" && currIndex < Profile_List.length) {
      const url = Profile_List[currIndex++];
      chrome.tabs.create({ url, active: false });
    }
    if ( currIndex === Profile_List.length )currIndex=0;
  });


  
