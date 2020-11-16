const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


// show loading

function ShowLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loadding
function stopLoadingSpinner() {
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get quote From API

async function getQuote(){
    ShowLoadingSpinner();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
   const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

   try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
//  If author is blank, add 'unknown
        if(data.quoteAuthor === ''){
            authorText.innerText = 'Unknwn'
        }else{
             authorText.innerText = data.quoteAuthor;
        }
// reduce font-size for long quote  
        if(data.quoteText.length > 50){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote')
        }    
        quoteText.innerText = data.quoteText;
        // stop loading
        stopLoadingSpinner()
   }catch(error){
       getQuote();
        console.log('whoops, no quote', error);
   }
}


function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    // open to a new window
    window.open(twitterUrl, '_blank');

}

// Event Listeners

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote)

// on load
getQuote();