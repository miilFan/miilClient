//// twitter-1.js
//// Generated in 2015-01-12 17:34:42.
function encodeQuery(query) {
  return window.encodeURIComponent(query);
}

function getTweets(keyword, query, dialog) {
  var secretKeys = {
    /* Consumer secret */
    consumerSecret: oauthKeyTwitter.R.consumerSecret,
    /* Access token secret */
    tokenSecret:    oauthKeyTwitter.R.tokenSecret
  };

  var parameters = {
    oauth_signature_method: "HMAC-SHA1",
    /* Consumer key */
    oauth_consumer_key: oauthKeyTwitter.R.oauth_consumer_key,
    /* Access token */
    oauth_token:        oauthKeyTwitter.R.oauth_token,
    count: 42,
    q: query,
  };

  var api_url = "https://api.twitter.com/1.1/search/tweets.json";
  var message = {
    method: "GET",
    action: api_url,
    parameters: parameters
  };

  OAuth.setTimestampAndNonce(message);
  OAuth.SignatureMethod.sign(message, secretKeys);
  var result = OAuth.addToURL(api_url, parameters);

  /* CSP対応 */
  var xhr = new XMLHttpRequest();
  xhr.open('GET', result, true);
  xhr.responseType = 'json';
  xhr.onload = function(e) {
    if(dialog == undefined) dialog = 1;
    getMiilPhotos_twitter.main(e.target.response.statuses, keyword, miil_twitter, dialog);
  }
  xhr.send();
}

