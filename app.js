
var cards = ['fa-diamond','fa-diamond',
'fa-paper-plane-o','fa-paper-plane-o',
'fa-anchor','fa-anchor',
'fa-bolt','fa-bolt',
'fa-cube','fa-cube',
'fa-leaf','fa-leaf',
'fa-bicycle','fa-bicycle',
'fa-bomb','fa-bomb'
];
 
// var symbols = ['fa-diamond','fa-paper-plane-o',
// 'fa-anchor','fa-bolt',
// 'fa-cube','fa-leaf',
// 'fa-bicycle','fa-bomb'];
//  var cards = symbols.concat(symbols);

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
function initGame(){

   // console.trace("Test my code check the issue");
    var deck = document.querySelector('.deck');
    var cardHTML= shuffle(cards).map(function(card){
        return generateCard(card);
    });
    deck.innerHTML = cardHTML.join('');
}

initGame();
var allCards = document.querySelectorAll('.card');
var openCards = [];
var numberMoves = 0;
const moveSpan= document.querySelector('.moves');
let matchedCards = document.getElementsByClassName("match");
const modal = document.getElementById('myModal');
const span = document.getElementsByClassName("close")[0];
// const timer=0;
const timerclo= document.querySelector('.timerClock');
const timeMin = 60;
let counter = 0; 
//var startGameagain = document.querySelector('.restart');

var second = 0, minute = 0; hour = 0;
const timer = document.querySelector(".timerClock"); 
var interval; 
function startTimer(){
    interval = setInterval(function(){
         timer.innerHTML = minute+" mins "+second+" secs ";
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
    moveSpan.innerText= numberMoves +" Moves ";
   //var stars= document.getElementsByClassName("stars");
   var ul= document.getElementById("star");
   var li = ul.getElementsByTagName("li");

    if (numberMoves > 10){
        for( s= 0; s< 3; s++){
            if(s > 1){
                li[s].style.visibility = "collapse";
            }
        }
    }
}

function calcMatchedCards(){
     matchedCards += 1;
    return matchedCards;
}
// span.onclick = function() {
//     modal.style.display = "none";
// }

// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }
 function winningGame(){
    var totalmatched = calcMatchedCards();
    if (totalmatched == 8 ) {
        modal.style.display = "block";
    }

 }
function startGameagain(){

    counter=0;
    timerclo.innerText ="";
    moveSpan.innerText="";
   // timer.innerHTML =""
    numberMoves=0;
    matchedCards=0;
    var timer = document.querySelector(".timerClock");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
    initGame(); 

 }
var firstClick = false;

allCards.forEach(function (card) {
    card.addEventListener('click', function (e) {
        console.log("clicked");

    if (!firstClick) {
        startTimer();
        firstClick = true;
        //console.trace();

    }
        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){
            openCards.push(card);
            card.classList.add('open', 'show');
                
            if (openCards.length == 2) {
                    calcMoves();
                if (openCards[0].dataset.card == openCards[1].dataset.card){
                    calcMatchedCards();
                        openCards[0].classList.add('match'); 
                        //openCards[0].classList.remove('open');
                        //openCards[0].classList.remove('show');
                          openCards[0].classList.remove('show','open');
                        openCards[1].classList.add('match');
                        //openCards[1].classList.remove('open');
                        //openCards[1].classList.remove('show');
                        openCards[1].classList.remove('show','open');

                        // openCards[0].classList.remove('open', 'show ', 'match');
                        // openCards[1].classList.remove('open', 'show', 'match');
                        
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





