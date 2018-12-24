
var cards = ['fa-diamond','fa-diamond',
'fa-paper-plane-o','fa-paper-plane-o',
'fa-anchor','fa-anchor',
'fa-bolt','fa-bolt',
'fa-cube','fa-cube',
'fa-leaf','fa-leaf',
'fa-bicycle','fa-bicycle',
'fa-bomb','fa-bomb'
];
 
function generateCard(card){
 return `<li class="card" data-card='${card}'><i class="fa ${card}"></i></li>`; 
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function initGame(){
    var deck = document.querySelector('.deck');
    var cardHTML= shuffle(cards).map(function(card){
        return generateCard(card);
    });
    deck.innerHTML = cardHTML.join('');
}

initGame();
//window.onload = initGame(); 
var allCards = document.querySelectorAll('.card');
var openCards = [];
var numberMoves = 0;
var moveSpan= document.querySelector('.moves');
//var matchedCards = 0; 
var matchedCards = document.getElementsByClassName("match");
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
var timer=0;
var timerclo= document.querySelector('.timerClock');
var timeMin = 60;
var counter = 0; 
//var startGameagain = document.querySelector('.restart');

var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timerClock"); 
var interval; 
function startTimer(){
    interval = setInterval(function(){
         timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++; 
            second=0; 
        } 
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
} 
function calcMoves(){
    numberMoves += 1;
    moveSpan.innerText= numberMoves;
    //startTimer();
}

function calcMatchedCards(){
     matchedCards += 1;
    return matchedCards;
}
span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
 function winningGame(){
    var totalmatched = calcMatchedCards();
    if (totalmatched == 8 ) {
        modal.style.display = "block";
    }

 }
 //startGameagain
 //startGameagain.addEventListener('click',function(e){
    function startGameagain(){
    
    //playAgain();
    //setGametime();
    counter=0;
    timerclo.innerText ="";
    moveSpan.innerText="";
    timer=0;
    numberMoves=0;
    matchedCards=0;
    initGame(); 


 }
 //});
// function playAgain(){
    
// }

// function setGametime() {
//     timer = setTimeout(function(){ alert("Game over") }, 60000);    
// }
// function currentTime(){
//    counter ++;
//     timerclo.innerText = (timeMin - counter) + "s";
//   }
//setInterval(currentTime,60000);
// $('#myModal').on('shown.bs.modal', function () {
//   $('#myInput').trigger('focus')
// });
allCards.forEach(function (card) {
    card.addEventListener('click', function (e) {
        //currentTime();

       
        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){
            openCards.push(card);
            card.classList.add('open', 'show');
                //console.log('card is opened ', openCards.length);
                startTimer();
            if (openCards.length == 2) {
                    // var card1 = openCards[0];
                    // var card2 = openCards[1];
                    // console.log(card1);
                    // console.log(card2);
                    calcMoves();
                if (openCards[0].dataset.card == openCards[1].dataset.card){
                    //console.log('This is match!');  
                    calcMatchedCards();
                        openCards[0].classList.add('match'); 
                        openCards[0].classList.remove('open');
                        openCards[0].classList.remove('show');
                        openCards[1].classList.add('match');
                        openCards[1].classList.remove('open');
                        openCards[1].classList.remove('show');                        
                        openCards=[];
   
                }else{
                    setTimeout(function () {
                        openCards.forEach(function (card) {
                            card.classList.remove('open', 'show');
                        });
                        openCards=[];
                    },1000);
                }
            }
            
        }

    });
});





