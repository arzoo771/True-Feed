var submitBtn = document.getElementById('submitBtn');
var truthInput = document.getElementById('truthInput');
var nameInput = document.getElementById('nameInput');
var message = document.getElementById('message');
var truthFeed = document.getElementById('truthFeed');

var today = new Date().toISOString().split('T')[0];

var saved = JSON.parse(localStorage.getItem('truth')) || {};

if (saved.date === today) {
  truthInput.disabled = true;
  nameInput.disabled = true;
  submitBtn.disabled = true;
  message.textContent = "You've already shared your truth today.";
  addTruthToFeed(saved, true);
}

submitBtn.addEventListener('click', function () {
  var truth = truthInput.value.trim();
  var name = nameInput.value.trim();

  if (!truth) {
    message.textContent = "Please write your truth.";
    return;
  }

  var truthObj = {
    text: truth,
    name: name || "Anonymous",
    date: today
  };

  localStorage.setItem('truth', JSON.stringify(truthObj));

  addTruthToFeed(truthObj, true);

  truthInput.disabled = true;
  nameInput.disabled = true;
  submitBtn.disabled = true;
  message.textContent = "Thank you for sharing your truth.";
});

function addTruthToFeed(truth, isTop) {
  var div = document.createElement('div');
  div.className = 'truthCard';
  div.innerHTML = '<p>' + truth.text + '</p>' +
                  '<div class="name">— ' + truth.name + '</div>';

  if (isTop) {
    truthFeed.insertBefore(div, truthFeed.firstChild);
  } else {
    truthFeed.appendChild(div);
  }
}

var sampleTruths = [
  "I pretend to be okay more than I should.",
  "I miss someone I shouldn't.",
  "I fear success more than failure.",
  "Sometimes, I don't recognize myself.",
  "I once cried in a meeting and blamed allergies.",
  "I'm scared of being forgotten.",
  "I compare myself constantly.",
  "I lied on my resume and got the job.",
  "I'm better than I allow myself to believe."
];

function loadFakeFeed(count) {
  for (var i = 0; i < count; i++) {
    var text = sampleTruths[Math.floor(Math.random() * sampleTruths.length)];
    var name = Math.random() < 0.5 ? "Anonymous" : "User" + Math.floor(Math.random() * 1000);
    addTruthToFeed({ text: text, name: name }, false);
  }
}

loadFakeFeed(10);

window.addEventListener('scroll', function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadFakeFeed(5);
  }
});
