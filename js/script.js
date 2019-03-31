// Initialize variables for the Quote Machine
var quotes = [];
var quote = "";
var movie = "";
// Random number select quote and movie from quotes, modify HTML
function showQuote() {
  var randomNum = Math.floor(Math.random() * quotes.length);

  quote = quotes[randomNum].quote;
  movie = quotes[randomNum].movie;

  $('#text').text(quotes[randomNum].quote);
  $('#movie').text(quotes[randomNum].movie);
}
// Share quote on twitter
function shareTwitter() {
  window.open('https://twitter.com/intent/tweet?text=' +
    encodeURIComponent(quote + ' Arnold Schwarzenegger in...' + movie));
}

function processData(data) {
  // Delete inappropriate quotes
  delete data[38];
  delete data[61];
  delete data[35];

  quotes = data;

  showQuote();
}
// Get Arnold Quotes
function getQuotes() {
  $.ajax({
    type: 'GET',
    url: 'https://gist.githubusercontent.com/spences10/ceee092f6fed36559036c94682b7a5f7/raw/7a27570759834ee454ee380ca42ebd47dc55e932/arnold_quotes.json',
    data: { get_param: 'value'},
    dataType: 'json',
    success: processData
  });
}

$(document).ready(function() {
  // Display random quotes
  $("#getQuote").on("click", showQuote);

  // Tweet Quote
  $("#twitter").on("click", shareTwitter);

  getQuotes();
});
