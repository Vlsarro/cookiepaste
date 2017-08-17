function save_options() {

  var firstDomain = document.getElementById('first-domain').value,
    secondDomain = document.getElementById('second-domain').value,
    cookieKey = document.getElementById('cookie-key').value,
    status = document.getElementById('status');

  browser.storage.sync.set({
    firstDomain: firstDomain,
    secondDomain: secondDomain,
    cookieKey: cookieKey
  }).then(function() {
    status.textContent = 'Options saved';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  }).catch(function (error) {
    status.textContent = 'Options saving error';
    setTimeout(function() {
      status.textContent = '';
    }, 750)
  });
}

function restore_options() {

  browser.storage.sync.get({
    firstDomain: '',
    secondDomain: '',
    cookieKey: ''
  }).then(function(items) {
    document.getElementById('first-domain').value = items.firstDomain;
    document.getElementById('second-domain').value = items.secondDomain;
    document.getElementById('cookie-key').value = items.cookieKey;
  }).catch(function() {
    console.error('Couldn\'t set options');
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);