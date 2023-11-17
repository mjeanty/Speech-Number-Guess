const msgEl = document.getElementById('msg')
const randomNum = getRandomNumber()



console.log('Number:', randomNum)

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

let recognition = new window.SpeechRecognition()

// start recognition and game
recognition.start()


//capture speak
function onSpeak(e){
    const msg = e.results[0][0].transcript
   
    writeMessage(msg)
    checkNumber(msg)
}

// writing message
function writeMessage(msg){
    msgEl.innerHTML =`
     <div> You Said:</div>
     <span class="box"> ${msg}</span>
    ` 
}




//check msg against number
function checkNumber(msg){
    let num;

    // Convert number words to digits for numbers from zero to ten
    const wordsToNumbers = {
        zero: 0,
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
        ten: 10
    };
    
    // Check if the spoken word is a number word, convert it to a number
    if (wordsToNumbers.hasOwnProperty(msg.trim().toLowerCase())) {
        num = wordsToNumbers[msg.trim().toLowerCase()];
    } else {
        num = parseInt(msg);
    }
    
    if (Number.isNaN(num)) {
        msgEl.innerHTML += '<div>That is not a valid number</div>';
        return;
    }
    

    if (num > 100 || num < 1) {
        msgEl.innerHTML += '<div> Number must be between 1 and 100 </div>'
        return
    }

    //check the number
if(num === randomNum){
    document.body.innerHTML =`
      <h2> Congrats! You have guessed the number!<br><br>
      It was ${num}</h2>
      <button class="play-again" id="play-again"> Play Again </button>
    `
} else if (num > randomNum){
    msgEl.innerHTML += '<div>Go Lower </div>'
} else {
    msgEl.innerHTML += '<div>Go Higher </div>'
}    


}


//generate random numbbe
function getRandomNumber (){
    return Math.floor(Math.random() * 100) + 1
}

/// speak result
recognition.addEventListener('result', onSpeak)


//end speech recogg service

recognition.addEventListener('end', () => recognition.start())

document.body.addEventListener('click', e => {
    if(e.target.id == 'play-again') {
        window.location.reload()
    }
})