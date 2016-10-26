/**
 *  Creation of a new account
 */

makeCorsRequest();
// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest() {
  // This is a sample server that supports CORS.
  var url = 'https://biketrack-api.herokuapp.com/api/users/login';

  var xhr = createCORSRequest('POST', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }
  var user = {
		    username: "mytestn1",
		    password: "mytestn1"
		};
  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;

    alert('Response from CORS request to ' + url);
  };

  xhr.onerror = function() {
    alert('Error making the request.');
  };

  xhr.send(user);
}
