Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

function getRandomWord() {

    return randomWordArray.randomElement()
}

// Got the following array of words from:
// https://raw.githubusercontent.com/words/an-array-of-english-words/master/words.json