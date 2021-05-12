/**
 * From LiveTL
 */
chrome.runtime.onMessage.addListener((request, sender, callback) => {
  switch (request.type) {
    case 'get_war': {
      callback(chrome.runtime.getURL(request.url));
      break;
    } case 'message': {
      try {
        console.debug('Broadcasting message', request.data);
        chrome.tabs.query({}, (tabs) => {
          tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, request.data);
          });
        });
      } catch (e) { }
      break;
    } case 'window': {
      (window.browser || window.chrome).windows.create({
        url: request.url,
        type: 'popup',
        height: 300,
        width: 600
      });
    }
    // can't break here, callback breaks
  }
});

function stripHeaders(headers) {
  return headers.filter(header => {
    let headerName = header.name.toLowerCase();
    return !(headerName === 'content-security-policy'
      || headerName === 'x-frame-options');
  })
}

chrome.webRequest.onHeadersReceived.addListener(
  details => {
    return {
      responseHeaders: stripHeaders(details.responseHeaders)
    };
  }, {
  urls: [
    "<all_urls>"
  ]
}, ["blocking", "responseHeaders"]);
