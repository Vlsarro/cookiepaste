document.addEventListener('DOMContentLoaded', function() {
	var firstDomain = document.getElementById('first-domain'),
		secondDomain = document.getElementById('second-domain'),
		replaceButton = document.getElementById('replace-btn'),
		cookieKey = document.getElementById('cookie-key'),
		resultDiv = document.getElementById('result');

	function infoDiv(div, text) {
		div.textContent = text;
		div.style.display = 'block';
	}

	replaceButton.addEventListener('click', function(e) {
		e.preventDefault();
		browser.cookies.get({url: firstDomain.value, name: cookieKey.value}).then(function (cookie) {
			var resultText;
			browser.cookies.set({url: secondDomain.value, name: cookieKey.value, value: cookie.value}).then(function (cookie) {
				resultText = 'Cookie ' + cookie.name + ' of ' + secondDomain.value  + ' has been replaced with ' + cookie.value;
				infoDiv(resultDiv, resultText);
			}).fail(function (err) {
				resultText = 'Error. Cookie value hasn\'t been set';
				infoDiv(resultDiv, resultText);
			});
		}).fail(function (err) {
			console.error('No cookie for you');
		});
	}, false)

});
