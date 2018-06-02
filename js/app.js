/*
 * Create a list that holds all of your cards
 */
let cards = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-anchor","fa-leaf","fa-bicycle","fa-diamond","fa-bomb","fa-leaf","fa-bomb","fa-bolt","fa-bicycle","fa-paper-plane-o","fa-cube"];
 lengthCards = cards.length;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
//to count cards with class 'open show'
let openedCards = [];
//to count number matched cards
let flippedCards = 0;
let numberMoves = 0;

//An empty array of cards where shuffled cards are stored.
let shuffledCards = [];
// shuffle the cards array
shuffledCards = shuffle(cards);
//to get card class element
let cardLi = $('li.card');
//to get i tag element
let cardI = cardLi.find('i')
//to add random font awesome icon from shuffled array
for (let i=0; i<cards.length; i++){
  cardI[i].classList.add(shuffledCards[i]);
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Timer
//https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let totalSeconds = 0;
// setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  let valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

let myTime = setInterval(function(){ setTime() }, 1000);
function stopTime() {
    clearInterval(myTime);
}
//to start New Game with click on restart button
function restart() {
  window.location.reload(true);
}
//all cards
let deck = $('.deck');
//card we are going to add event listener to
let cardToFlip = ('.card');

//to add Event Listener while clicking on card
deck.on('click',cardToFlip, function (event) {
//to check if we don't have more then 2 opened but unmatched cards
  if ($(this).attr('class')==='card' && openedCards.length < 2){
// if no cards open yet
    if (openedCards.length===0){
// the cards gets class 'open show'
      $(this).toggleClass('open show');
//put card class into openedCards list
      openedCards.push($(this).find('i').prop('class'));
    }
// If one card is already open and we click the next card
    else if (openedCards.length===1){
      $(this).toggleClass('open show');
      openedCards.push($(this).find('i').prop('class'));
//compare classes of two cards
    if(openedCards[0] == openedCards[1]){
//remove class 'open show' add class 'match'
      $('.card.open.show').toggleClass('match').removeClass('open show');

      numberMoves += 1;
      $('.moves').text(numberMoves);
//Number of flipped cards increased by 2
      flippedCards += 2;
//to be able to compare next two cards we remove previous match from the array
      openedCards= [];

    }
    else {
// To flip back not matching cards
    function flipBack(){
//remove class 'open show' -don't see the pic anymore
      $('.card.open.show').removeClass('open show');
      openedCards = [];
      numberMoves += 1;
      $('.moves').text(numberMoves);
      }
//flipping back with a delay
    setTimeout(flipBack, 400);
    }
  }
//define how to color stars
  if (numberMoves > 12) {
    $('.stars, i').find('#three').css('color','black');
  }
  if (numberMoves > 24) {
    $('.stars, i').find('#two').css('color','black');
  }
// Check to see if all tiles guessed correctly
  if(flippedCards === lengthCards){
//if yes - add values and display modal
//Clone all classes elements and insert them at modal element:
//https://www.w3schools.com/jquery/html_clone.asp
    $('.moves').clone().appendTo($('.modal-element').find('#modal-moves'));
    $('.timer').clone().appendTo($('.modal-element').find('#newtime'));
    $('.stars').clone().appendTo($('.modal-element').find('#modal-stars'));
    $('.modal').css('display','block');
//clear timer
    clearInterval(myTime);
    // stopTime();
  }
}
});
