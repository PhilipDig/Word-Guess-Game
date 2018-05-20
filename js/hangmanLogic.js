// Note this file depends on the script randomWordGenerator.js being loaded first
// in order to provide it's getRandomWord function

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
 }

const GUESSES = 10
const WIN_STRING = 'Rounds won: '
const LOSE_STRING = 'Rounds lost: '
const GUESS_STRING = 'Letters guessed: '
const REMAINING_STRING = 'Guesses remaining: '

let wins  = 0;
let loses = 0;

let lettersGuessed = ''
let guessesRemaining = GUESSES
let mysteryWord = getRandomWord()
let displayedMysteryString = ''
let expectedResult = ''
let originalMysteryWord = ''

function newWord() {
    lettersGuessed = '';
    guessesRemaining = GUESSES;
    mysteryWord = getRandomWord();
    originalMysteryWord = mysteryWord;
    displayedMysteryString = '';
    displayedMysteryString = displayedMysteryString.padStart(mysteryWord.length,'_');
    expectedResult = '';
    expectedResult = expectedResult.padStart(mysteryWord.length,'!');
    updateGuessDisplayed();
    updateGuessRemainingDisplayed();
    updateLetterGuessedDisplayed();
}

let lettersGuessedView = document.getElementById('guessedLetters')
let wordGuessedView = document.getElementById('guessedWord')
let guessesRemainingView = document.getElementById('guessesRemaining')
let winsView = document.getElementById('totalWins')
let losesView = document.getElementById('totalLoses')

function checkGuessedLetter(letter) {
    if (mysteryWord.includes(letter)) {
        updateGuessedWord(letter);
    } else {
        let upperCaseLetter = letter.toUpperCase()
        if(!displayedMysteryString.includes(upperCaseLetter)) {

            if(!lettersGuessed.includes(upperCaseLetter)) {
                guessesRemaining--;
                
                if(guessesRemaining < 1) {
                    updateGameLost();
                } else {
                    lettersGuessed = lettersGuessed.concat(letter.toUpperCase()+' ');
                    updateLetterGuessedDisplayed();
                    updateGuessRemainingDisplayed();
                }
            }
        }
    }
}

function updateGuessedWord(letter) {
    
    // TODO check if this recursion is chill
    function updateAnyMatches() {
        // Keep iteratering through finding and displaying letter in the guessed word
        let matchIndex = mysteryWord.indexOf(letter);
        
        if(matchIndex !== -1) {
            displayedMysteryString = displayedMysteryString.replaceAt(matchIndex, letter.toUpperCase());
            // By replacing mysteryWord with special characters !,
            // I can do this recursive check and know when done matching when
            // the entire mystery word is !
            mysteryWord = mysteryWord.replaceAt(matchIndex, '!');
            updateAnyMatches();
        } else {
            updateGuessDisplayed();
            checkIfWon();
        }
    }
    
    updateAnyMatches();
}

function checkIfWon() {

    if (mysteryWord == expectedResult) {
        updateGameWon();
    }
}

function updateGameLost() {
    loses++;
    losesView.textContent = LOSE_STRING + loses;
    alert('You lost this round :(\nThe mystery word was '+originalMysteryWord+
          '\nPress ok to play again!');
    newWord();
}

function updateGameWon() {
    wins++;
    winsView.textContent = WIN_STRING + wins;
    alert('You won this round :)\nThe mystery word was '+originalMysteryWord+
    '\nPress ok to play again!');
    newWord();
}

function updateGuessDisplayed() {
    wordGuessedView.textContent = displayedMysteryString
}

function updateGuessRemainingDisplayed() {
    guessesRemainingView.textContent = REMAINING_STRING + guessesRemaining;
}

function updateLetterGuessedDisplayed() {
    lettersGuessedView.textContent = GUESS_STRING + lettersGuessed;
}

document.onkeyup = function(event) {
    checkGuessedLetter(event.key.toLowerCase())
}

// Start the game with a new mystery word!
newWord();
