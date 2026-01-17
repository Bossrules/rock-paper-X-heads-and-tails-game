let scores = JSON.parse(localStorage.getItem('scores')) || {
  Wins : 0,
  Losses : 0,
  Ties : 0
}
let randomNumber = Math.random();
let result = '';
const jsScore = document.querySelector('.js-score');
const jsResult = document.querySelector('.js-result');
const jsMoves = document.querySelector('.js-moves');


/*if(scores === null){scores = {
  Wins : 0,
  Losses : 0,
  Ties : 0
}
  
}
*/
let isAutoplaying = false;
let intervalId;

const autoplay = () =>{
  if(!isAutoplaying){
    intervalId = setInterval(() => {
      const playerMove = pickBotmove();
      playGame(playerMove);
    }, 1000);
    isAutoplaying = true;
    jsAutoplay.innerText = 'STOP PLAYING'

  } else {
    clearInterval(intervalId);
    isAutoplaying = false;
    jsAutoplay.innerText = 'AUTO PLAY'
  }
  
}

const jsRock = document.querySelector('.js-rock');
jsRock.addEventListener('click',() => {
  playGame('rock');
});

const jsPaper = document.querySelector('.js-paper');
jsPaper.addEventListener('click',() => {
  playGame('paper');
});

const jsScissors = document.querySelector('.js-scissors');
jsScissors.addEventListener('click',() => {
  playGame('scissors');
});

const jsReset = document.querySelector('.js-reset');
jsReset.addEventListener('click',() => {
  confirm();
});

const jsAutoplay = document.querySelector('.js-autoplay');
jsAutoplay.addEventListener('click',() => {
  autoplay();
});

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('rock');
  }else if(event.key === 'p'){
    playGame('paper');
  }else if(event.key === 's'){
    playGame('scissors');
  }
  else if (event.key === ' ') {
    confirm();
  }
  else if (event.key === 'a'){
    autoplay();
  }
});

function pickBotmove() {
  let botMove = '';
  if (randomNumber >= 0 && randomNumber <= 1/3){
      botMove = 'rock';
    } else if (randomNumber > 1/3 && randomNumber <= 2/3){
      botMove ='paper';
    } else {
      botMove = 'scissors';
    }
    return botMove;
}

function playGame(playerMove){
  if(playerMove === 'rock'){
    randomNumber = Math.random();
    botMove = pickBotmove();

if (botMove === 'rock'){
  result = 'Tie!'
} else if (botMove === 'paper'){
  result = 'You lose!'
} else {
  result = 'You win!'
}
  }else if(playerMove === 'paper'){
    randomNumber = Math.random();
    botMove = pickBotmove();

    if (botMove === 'rock'){
        result = 'You win!'
      } else if (botMove === 'paper'){
        result = 'Tie!'
      } else {
        result = 'You lose!'
      }
  }else {
    randomNumber = Math.random();
    botMove = pickBotmove();

    if (botMove === 'rock'){
        result = 'You lose!'
      } else if (botMove === 'paper'){
        result = 'You win!'
      } else {
        result = 'Tie!'
      }
  }

  if(result === 'You win!'){
    scores.Wins++
  }else if(result === 'You lose!'){
    scores.Losses+=1
  }else if(result === 'Tie!'){
    scores.Ties+=1
  }

  localStorage.setItem('scores', JSON.stringify(scores));

  jsResult.innerText = result;
  jsMoves.innerHTML = `You: <img class="imgResult" src="RPSimages/${playerMove}-emoji.png">  <img class="imgResult" src="RPSimages/${botMove}-emoji.png"> :Bot`


  updateScoreElem();
}
function updateScoreElem(){
  jsScore.innerText = `Wins:${scores.Wins} Losses:${scores.Losses} Tie:${scores.Ties}`;
}

const jsConfirm = document.querySelector('.js-confirmation')
function confirm(){
  jsConfirm.innerHTML = `<p>Are you sure you want to reset the score?
  <button onclick = "
    reset();
  ">Yes</button>
  <button onclick = "
  jsConfirm.innerHTML = '';
  ">No</button>
</p>`
}

function reset(){
    scores.Wins = 0,
    scores.Losses = 0,
    scores.Ties = 0;
    localStorage.removeItem('scores');
    updateScoreElem();
    jsConfirm.innerHTML = '';
}