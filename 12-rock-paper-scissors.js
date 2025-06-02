let score = JSON.parse(localStorage.getItem('score')) || {wins: 0,losses: 0,ties: 0};

updateScoreElement();

/*if(score === null){
  score={
    wins: 0,
    losses: 0,
    ties: 0
  };
}*/

let isAutoPlaying = false;
let intervalId;

/*const autoPlay = () => {

};*/

function autoPlay() {
  if(!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
  }
  else{
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
  }
}

function resetScore() {
  score.wins=score.losses=score.ties=0;
  localStorage.removeItem('score');
  updateScoreElement();
  document.querySelector('.js-result').innerHTML = '';
  document.querySelector('.js-moves').innerHTML = '';
}

function confirmCheck() {
  const confirmation = document.querySelector('.js-confirmation');
  
  confirmation.innerHTML = `
    Are you sure you want to reset the score?
    <button class="yes js-yes">Yes</button>
    <button class="no js-no">No</button>`;

  document.querySelector('.js-yes').addEventListener('click', () => {
    resetScore();
    confirmation.innerHTML = '';
  });

  document.querySelector('.js-no').addEventListener('click', () => {
    confirmation.innerHTML = '';
  });
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r') playGame('rock');
  else if(event.key === 'p') playGame('paper');
  else if(event.key === 's') playGame('scissors');
  else if(event.key === 'a') autoPlay();
  else if(event.key === 'Backspace') confirmCheck(); 
});

document.querySelector('.js-auto-play-button').addEventListener('click', () => {autoPlay();});

document.querySelector('.js-reset-score-button').addEventListener('click', () => {confirmCheck();});

function playGame(playerMove) {
  let result = '';
  const computerMove = pickComputerMove();

  if(playerMove === 'rock'){
    if(computerMove === 'rock'){
      result = 'Tie';
    }
    else if(computerMove === 'paper'){
      result = 'You lose';
    }
    else{
      result = 'You win';
    }
  }
  else if(playerMove === 'paper'){
    if(computerMove === 'rock'){
      result = 'You win';
    }
    else if(computerMove === 'paper'){
      result = 'Tie';
    }
    else{
      result = 'You lose';
    }
  }
  else{
    if(computerMove === 'rock'){
      result = 'You lose';
    }
    else if(computerMove === 'paper'){
      result = 'You win';
    }
    else{
      result = 'Tie';
    }
  }
  
  if(result === 'You win'){
    score.wins++;
  }
  else if(result === 'You lose'){
    score.losses++;
  }
  else score.ties++;

  localStorage.setItem('score',JSON.stringify(score));

  updateScoreElement();
  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `You <img src="${playerMove}-emoji.png" class="move-icon"> <img src="${computerMove}-emoji.png" class="move-icon"> Computer`;
}

function updateScoreElement(){
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  let computerMove = '';
  const randomNumber = Math.random();

  if(randomNumber>=0 && randomNumber<1/3){
    computerMove = 'rock';
  }
  else if(randomNumber>=1/3 && randomNumber<2/3){
    computerMove = 'paper';
  }
  else{
    computerMove = 'scissors';
  }

  return computerMove;
}