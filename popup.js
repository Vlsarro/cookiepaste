document.addEventListener('DOMContentLoaded', function() {
	var firstDomain = document.getElementById('first-domain'),
		secondDomain = document.getElementById('second-domain'),
		replaceButton = document.getElementById('replace-btn'),
		cookieKey = document.getElementById('cookie-key'),
		resultDiv = document.getElementById('result');

	replaceButton.addEventListener('click', function(e) {
		e.preventDefault();

		chrome.cookies.get({url: firstDomain.value, name: cookieKey.value}, function(cookie) {
			if (cookie) {
				chrome.cookies.set({url: secondDomain.value, name: cookieKey.value, value: cookie.value}, function (cookie) {
					var resultText;
					if (cookie) {
						resultText = 'Cookie ' + cookie.name + ' of ' + secondDomain.value  + ' has been replaced with ' + cookie.value;
					} else {
						resultText = 'Error. Cookie value hasn\'t been set';
					}
					resultDiv.appendChild(document.createTextNode(resultText));
					resultDiv.style.display = 'block';
				});
			} else {
				console.error('No cookie for you');
			}
		});
	}, false)

});
