// audio declarations and sources
// winning audio, match card audio and backgoround audio; respectively.

const audio = document.createElement('audio');
const clip = document.createElement('audio');
const sound = document.createElement('audio');

document.body.appendChild(audio);
document.body.appendChild(clip);
document.body.appendChild(sound);

const audioSrc = document.createElement('source');
const clipSrc = document.createElement('source');
const soundSrc = document.createElement('source');

audio.appendChild(audioSrc);
clip.appendChild(clipSrc);
sound.appendChild(soundSrc);

audioSrc.src = 'video-game-win.mp3';
clipSrc.src = 'woo-hoo.mp3';
soundSrc.src = 'video-game-background.mp3';

// selectors and global variables

const cards = document.querySelectorAll('.card');
const deck = document.querySelector('.deck')
const openCards = [];
const moves = document.querySelector('.moves');
const restart = document.querySelector('.restart');
const stars = document.querySelectorAll('.fa.fa-star');
let numOfMoves = 0;

/*
 * removed each card from the list of cards from the document
 */

for(const card of cards){
    card.classList.add('hide');
    deck.removeChild(card);
};

/*
 * Display the cards on the page
 *   - converted the cards to an array for shuffling it.
 *   - shuffled the list of cards using "shuffle" function below
 *   - looped through each card html.
 *   - added each card's HTML to the document
 */

for(const card of shuffle(Array.from(cards))){
    deck.appendChild(card);
};
// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };

    return array;
};

// on-click funtion
// opens and shows the card when clicked upon
// adds two cards at a time to an empty array
// runs the matchCard function on these two cards in this empty array
// NOTE:- event listener does not work again on the cards until two cards in an array are matched. 

function flip(e){
    sound.play();
    sound.loop = true;
    if (e.target.classList.contains('hide') && !e.target.classList.contains('match') && !e.target.classList.contains('done')){
        e.target.classList.add('show');
        e.target.classList.add('open');
        e.target.classList.add('done');
        openCards.push(e.target);

        if (openCards.length >= 2 && openCards[0] != openCards[1]){
            numOfMoves++;
            moves.textContent = numOfMoves;

            if (numOfMoves > 16){
                stars[0].classList.add('rollOut');
                setTimeout(function(){
                    stars[0].classList.remove('fa-star');
                    stars[0].classList.remove('rollOut');
                }, 500);
            };
            
            if (numOfMoves > 20){
                stars[1].classList.add('rollOut');
                setTimeout(function(){
                    stars[1].classList.remove('fa-star');
                    stars[1].classList.remove('rollOut');
                }, 500);
            };

            if (numOfMoves > 24){
                stars[2].classList.add('rollOut');
                setTimeout(function(){
                    stars[2].classList.remove('fa-star');
                    stars[2].classList.remove('rollOut');
                }, 500);
            };

            for (const cards of openCards){
                cards.classList.remove('done');
            };
            
            deck.removeEventListener('click', flip);

            matchCard()
        };
    };
};

// matchCard function
// compares two cards which are clicked upon and added in the array.
// if Matches: add match class to the cards
// if does not matches: hide the cards by removing show and open
// NOTE:- cards are removed from the array i.e. element(cards) in the array are removed after comparing to make space for other cards clicked.
// after a small gap the cards are hide and event listener is added again.

function matchCard(){
    if (openCards[0].children[0].classList[1] === openCards[1].children[0].classList[1]){
        openCards[0].classList.add('match');
        openCards[1].classList.add('match');
        openCards[0].classList.add('tada');
        openCards[1].classList.add('tada');
        clip.play();
        openCards.pop();
        openCards.pop();
        deck.addEventListener('click',flip);
        win();
    } else {
        setTimeout(function(){
            openCards[0].classList.remove('open');
            openCards[0].classList.remove('show');
            openCards[1].classList.remove('open');
            openCards[1].classList.remove('show');
            openCards.pop();
            openCards.pop();
            deck.addEventListener('click', flip);
        }, 600);
    };
};

// win function
// starts when all the cards are matched

function win(){
    const matchCards = document.querySelectorAll('.match');
    if (matchCards.length >= 16){
        audio.play();
        audio.loop = true;
        swal(
            'HURRAY!!',
            'YOU WON THE GAME',
            'success'
            );
    };
};

// event listener added on cards

deck.addEventListener('click', flip);

// event listener added on the restart button

restart.addEventListener('click', restartGame);

// function:- removes all the classes added after running the code.
// adds all the stars icon
// reset number of moves
// re-shuffle the cards

function restartGame(){
    for(const card of cards){
        card.classList.remove('done');
        card.classList.remove('show');
        card.classList.remove('open');
        card.classList.remove('match');
        card.classList.remove('tada');
    };
    stars[0].classList.add('fa-star');
    stars[1].classList.add('fa-star');
    stars[2].classList.add('fa-star');
    moves.textContent = 0;
    numOfMoves = 0;
    sound.pause();
    sound.currentTime = 0;
    audio.pause();
    audio.currentTime = 0;
    openCards.pop();
    openCards.pop();
    for(const card of cards){
        deck.removeChild(card);
    };
    for(const card of shuffle(Array.from(cards))){
        deck.appendChild(card);
    };
};

// the whole js explained.
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