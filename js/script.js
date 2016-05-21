var shuffleQuotesList;
var index = 0;
var intervalId;

// Initiates quotes on the page
function initQuotes() {
	shuffleQuotesList = quotes;
	shuffle(shuffleQuotesList);
	printQuote(shuffleQuotesList[index++]);
	intervalId = setInterval(makeQuote, 6000);
	addListenerToLoadQuote();
}

// Displays quotes on the page and takes an object as an argument
function printQuote(randomQuote) {
	var html = '<p class="quote">' + randomQuote.quote + '</p>';
	html += '<p class="source">' + randomQuote.source;
	
	if (randomQuote.hasOwnProperty('citation') && randomQuote.hasOwnProperty('year')) {
		html += '<span class="citation">' + randomQuote.citation + '</span>';
		html += '<span class="year">' + randomQuote.year + '</span> </p>';
	} else if (randomQuote.hasOwnProperty('year')) {
		html += '<span class="year">' + randomQuote.year + '</span> </p>';
	} else if (randomQuote.hasOwnProperty('citation')) {
		html += '<span class="citation">' + randomQuote.citation + '</span>';
	};
	
	html += '<ul class="list-inline">';
	
	for (i=0; i<randomQuote.tags.length; i++) {
		html += '<li>' + randomQuote.tags[i] + '</li>';
	}
	html += '</ul>';

	var quoteDiv = document.getElementById('quote-box');
	quoteDiv.innerHTML = html;
}

// Changes body background color
function backgroundChange () {
	var red = Math.floor(Math.random() * 255);
	var green = Math.floor(Math.random() * 255);
	var blue = Math.floor(Math.random() * 255);

	document.body.style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
}

// Fisher-Yates shuffle 
function shuffle(list) {
	var i, j, t;
	for (i = 1; i < list.length; i++) {
		j = Math.floor(Math.random()*(1+i));  // choose j in [0..i]
		if (j != i) {
	  	t = list[i];                        // swap list[i] and list[j]
	  	list[i] = list[j];
	  	list[j] = t;
		}
	}
}

// Gets next object from shuffled list.
// Function is called from click or timer, because of that it needs to reset timer every time.
// If it gets to the end of a list it will shuffle again
function makeQuote () {	
	clearInterval(intervalId);
	printQuote(shuffleQuotesList[index++]);
	backgroundChange();	
	if (index >= shuffleQuotesList.length) {
		index = 0;
		shuffle(shuffleQuotesList);
	}
	intervalId = setInterval(makeQuote, 6000); 
}

// event listener to respond to clicks on the page
// when user clicks anywhere on the page, the "makeQuote" function is called
function addListenerToLoadQuote() {
	var button = document.getElementById('loadQuote');
	button.addEventListener("click", makeQuote, false);
}






