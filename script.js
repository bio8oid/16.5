'use strict';
(function () {

    const prefix = "https://cors-anywhere.herokuapp.com/";
    const tweetLink = "https://twitter.com/intent/tweet?text=";
    const quoteUrl = "https://api.quotable.io/random";

    const getQuote = () => {
        fetch(prefix + quoteUrl, { cache: "no-store" })
            .then(res => {
                return res.json();
            })
            .then(createTweet);
    }

    const createTweet = input => {
        const data = input;
        const dataElement = document.createElement('div');
        dataElement.innerHTML = data.content;
        const quoteText = dataElement.innerText.trim();
        const quoteAuthor = data.author;
        const tweetText = "Quote of the day - " + quoteText + "Author: " + quoteAuthor;

        if (!quoteAuthor.length) {
            quoteAuthor = "Unknown author";
        }
        if (tweetText.length > 140) {
            getQuote();
        }
        const tweet = tweetLink + encodeURIComponent(tweetText);
        document.querySelector('.quote').innerText = quoteText;
        document.querySelector('.author').innerText = "Author: " + quoteAuthor;
        document.querySelector('.tweet').setAttribute('href', tweet);

    }
    document.querySelector('.trigger').addEventListener('click', getQuote);
})();