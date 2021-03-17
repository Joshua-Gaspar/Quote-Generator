const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const quoteAuthor = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")
const loader = document.getElementById("loader");


let apiQuote = [];

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden =true;
}

function removeLoadingSpinner(){
    quoteContainer.hidden = false;
    loader.hidden = true;


}

async function getQuotesFromAPI() {
    showLoadingSpinner();
    const apiUrl = "https://type.fit/api/quotes"

    try {

        const response = await fetch(apiUrl);
        apiQuote = await response.json();

        newQuote();
    } catch (error) {
        //catch Error Here
        alert(error)

        apiQuote = localQuotes;
        console.log(apiQuote)
    }
}

function newQuote() {
    showLoadingSpinner();
    //Pick a random quote from api quote array
    const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];
    console.log(quote);



    //check if Author Field is blank
    if (quote.author === null) {
        quote.author = "unknown"
    } else {
        quoteAuthor.textContent = quote.author
    }

    //Check Quote lenght to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }   

    quoteText.textContent = quote.text;

    removeLoadingSpinner();

}


function tweetQuote(){
    const twitterUrl= `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;

    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)


getQuotesFromAPI();
