let result = '';
      let guess = '';
      let score = JSON.parse(localStorage.getItem('score')) || {
        Wins: 0,
        Losses: 0
      };
      /*if (score === null){
        score = {
        Wins: 0,
        Losses: 0
      }
      }*/
      let intervalId1;
      function startInterval(){
        
        intervalId1 = setTimeout(()=>{
        
        document.querySelector('.result-div').innerHTML = ``;
      }, 3000);

      }

      function stopInterval(){
        clearInterval(intervalId1);
      };


      function playGame(myPick){
        stopInterval();
        guess = myPick;
      }
      function showResult(){
        const randomNumber = Math.random();
        if (randomNumber < 0.5) {
        result = 'heads';
      } else {
        result = 'tails';
      }

        if (guess === result) {
        score.Wins += 1;
        console.log(`You win!\nWins:${score.Wins} Losses: ${score.Losses}`);
        document.querySelector('.result-div').innerHTML =`Right guess\nYou win!\nWins:${score.Wins} Losses: ${score.Losses}`;
        startInterval();
        

      } else if (guess !== result){
        score.Losses += 1;
        console.log(`You lose!\nWins:${score.Wins} Losses: ${score.Losses}`);
        document.querySelector('.result-div').innerHTML =`Wrong guess\nYou lose!\nWins:${score.Wins} Losses: ${score.Losses}`;
        startInterval();
        

      } 
      localStorage.setItem('score', JSON.stringify(score));
      }

      document.querySelector('.heads-button').addEventListener('click', ()=>{
        playGame('heads');
        showResult();
      });

      document.querySelector('.tails-button').addEventListener('click', ()=>{
        playGame('tails');
        showResult();
      })

       document.querySelector('.reset-button').addEventListener('click', ()=>{
        stopInterval();
        
        document.querySelector('.result-div').innerHTML =`Are you sure you want to reset score? <button class="choice-button yes">Yes</button> <button class="choice-button no">No</button>`

        document.querySelector('.yes').addEventListener('click',()=>{
          score.Wins = 0;
          score.Losses = 0;
          localStorage.setItem('score', JSON.stringify(score));
          document.querySelector('.result-div').innerHTML =`Wins:${score.Wins} Losses: ${score.Losses}`;
          startInterval();
        });

        document.querySelector('.no').addEventListener('click',()=>{
          document.querySelector('.result-div').innerHTML =`Wins:${score.Wins} Losses: ${score.Losses}`;
          startInterval();
        });

      });

      

      