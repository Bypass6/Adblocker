// adblock-counter.js

// Initialize the adsBlockedCount if it's not already defined
let adsBlockedCount = 0;

// Listen to the onBeforeRequest event
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        // Check if the request should be blocked (add your filter logic here)
        if (shouldBlockRequest(details.url)) {
            adsBlockedCount++;
            // You can optionally log the blocked request or perform other actions
            console.log('Blocked ad:', details.url);
        }
    },
    { urls: defaultFilters }, // Use your ad blocking filters here
    ["blocking"]
);

// Function to determine whether to block a request
function shouldBlockRequest(url) {
    // Implement your logic here to determine if the request should be blocked
    // You can use your ad blocking filters or add custom logic
    return defaultFilters.some(filter => url.includes(filter));
}

// Send the updated count to your popup or options page
function sendAdsBlockedCount() {
    chrome.runtime.sendMessage({ adsBlockedCount });
}

// Listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'getAdsBlockedCount') {
        sendAdsBlockedCount();
    }
});
