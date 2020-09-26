function loadSentiment(url) {

  var params = {
    url: encodeURI(url),
    apikey: '8db419e40f6edb29532e48b14b9e6223d7052880',
    outputMode: 'json'
  }

  var url = 'http://access.alchemyapi.com/calls/url/URLGetTextSentiment';
  $.getJSON(url, params, function(data) {
    console.log(data);
    $('#sentiment').html(data.docSentiment.type+': '+data.docSentiment.score);
  });
}

function getUrl(cb) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;
    console.log(tab);
    cb(url);
  });
}

$(document).ready(function() {
  getUrl(loadSentiment)
});