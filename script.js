'use strict';
(function(){ 


var prefix = "https://cors-anywhere.herokuapp.com/";
var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

function getQuote() {
    fetch(prefix + quoteUrl, { cache: "no-store" })
        .then(function(res) {
            return res.json();
        })
        .then(createTweet);
}

function createTweet(input) {
    var data = input[0];

    var dataElement = document.createElement('div');
    dataElement.innerHTML = data.content;
    var quoteText = dataElement.innerText.trim();
    var quoteAuthor = data.title;
    var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;
  
    if (!quoteAuthor.length) {
        quoteAuthor = "Unknown author";
    } else {
        var tweet = tweetLink + encodeURIComponent(tweetText);
        document.querySelector('.quote').innerText = quoteText;
        document.querySelector('.author').innerText = "Author: " + quoteAuthor;
        document.querySelector('.tweet').setAttribute('href', tweet);
    }
}

document.addEventListener('DOMContentLoaded', function() {
        getQuote();
        document.querySelector('.trigger').addEventListener('click', function() {
            getQuote();
        });
    });

})(); 
