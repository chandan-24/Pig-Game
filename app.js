/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game.

*/

var scores, roundScore, activePlayer, gamePlaying;

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = 1;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('name-0').textContent = 'PLAYER 1';
    document.getElementById('name-1').textContent = 'PLAYER 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');    
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

init();


// dice = Math.floor(Math.random() * 6) + 1;    //math.round()=> generates numbers between 0 and 1
                                             //math.floor()=> returns floor value of a flooting point number

// document.querySelector('#current-'+ activePlayer).textContent = dice;      
// with textContent we can only send text to the html page.

//document.querySelector('#current-'+ activePlayer).innerHTML =  '<em>' + dice + '</em>';
// innerHtml can also send html to the document

// css can also be manipulated using javascript



// callback function : a function that has been passed to another function as an argument and it will bbe called by that function.
/*
function btn(){
    //do something
}
document.querySelector('.btn-roll').addEventListener('click',btn);
*/


// anonymous functon : a function that doesn't have a name, and it cannot be reused
document.querySelector('.btn-roll').addEventListener('click', function(){
    
    if(gamePlaying){
        // 1.random number
        var dice = Math.floor(Math.random() * 6) + 1; 

        // 2.display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3. update the round number if its not 1

        if(dice !== 1){
            //Add score
            roundScore += dice;
            document.querySelector('#current-'+ activePlayer).textContent = roundScore;
        }
        else{
            //Next player;
            nextPlayer();
        }
    }
    
    
});


document.querySelector('.btn-hold').addEventListener('click', function(){
    
    if(gamePlaying){
        // add Current score to global score
        scores[activePlayer]+=roundScore;
        // update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        // Check if player won the game
        if(scores[activePlayer] >= 30){
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying=0;
        }
        else{
            //next player
            nextPlayer();
        }
    }
    
});


function nextPlayer()
{
    activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
    roundScore = 0;
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
        // classlist can be manipulated using add, remove, toggle, etc.

    document.querySelector('.dice').style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click', init);

