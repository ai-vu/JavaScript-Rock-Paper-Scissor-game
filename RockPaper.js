
const startGame = () => {
    const playButton = document.querySelector('.intro button');
    const introScreen = document.querySelector('.intro');
    const match = document.querySelector('.match');
    playButton.addEventListener('click', () => {
        introScreen.classList.add('fadeOut');
        console.log('player click');
        match.classList.add('fadeIn');
    });
    // when click play again button, game reset
    const playGameAgain = document.querySelector('.result button');
    playGameAgain.addEventListener('click', () => {
        //show score
        document.querySelector('.score').classList.remove('fadeOut');

        match.classList.add('fadeIn');
        console.log('player plays again');

        hidePlayAgainButton();
        pScores = 0;
        cScores = 0;
        scoreHistory = [];
        updateScore();

        const winner = document.querySelector('.winner');
        winner.textContent = 'Choose an option';
        const playerHand = document.querySelector('.playerHand');
        const computerHand =  document.querySelector('.computerHand');
        playerHand.src = `http://users.metropolia.fi/~giangv/JS%202/rock.png`;
        computerHand.src = `http://users.metropolia.fi/~giangv/JS%202/rock.png`;
    });
};
startGame();

const playMatch = () => {
    const playerOptions = document.querySelectorAll('.options button');
    const computerOptions = ['rock','paper','scissors'];

    const playerHand = document.querySelector('.playerHand');
    const computerHand =  document.querySelector('.computerHand');

    const hands = document.querySelectorAll('.hands img');
    for (const hand of hands) {
        hand.addEventListener('animationend', () => {
            hand.style.animation = '';
        });   
    };
    // loop for options
    for (const option of playerOptions) {
        option.addEventListener('click', () => {
            // disable buttons
            let rockButton = document.getElementById('rock');
            rockButton.disabled = true;
            rockButton.classList.add('disableButton');
            let paperButton = document.getElementById('paper');
            paperButton.disabled = true;
            paperButton.classList.add('disableButton');
            let scissorsButton = document.getElementById('scissors');
            scissorsButton.disabled = true;
            scissorsButton.classList.add('disableButton');
            
            const computerNumber = Math.floor(Math.random() * 3);
            const computerChoice = computerOptions[computerNumber]; 
            console.log('computer choice', computerChoice);
            
            setTimeout(() => {
                compareHands(option.textContent, computerChoice);
                playerHand.src = `http://users.metropolia.fi/~giangv/JS%202/${option.textContent}.png`;
                computerHand.src = `http://users.metropolia.fi/~giangv/JS%202/${computerChoice}.png`;
            }, 2000);

            // always rock when shaking
            playerHand.src = `http://users.metropolia.fi/~giangv/JS%202/rock.png`;
            computerHand.src = `http://users.metropolia.fi/~giangv/JS%202/rock.png`;
            playerHand.style.animation = 'shakePlayer 2s ease';
            computerHand.style.animation = 'shakeComputer 2s ease';
        });      
    };
};
playMatch();

// record scores
let pScores = 0;
let cScores = 0;

const updateScore = () => {
    const playerScore = document.querySelector('.playerScore p');
    const computerScore = document.querySelector('.computerScore p');
    playerScore.textContent = pScores;
    computerScore.textContent = cScores;
    gameResult();
    
};

// comparing choices
const compareHands = (playerChoice, computerChoice) => {
    // enable buttons
    let rockButton = document.getElementById('rock');
    rockButton.disabled = false;
    rockButton.classList.remove('disableButton');
    let paperButton = document.getElementById('paper');
    paperButton.disabled = false;
    paperButton.classList.remove('disableButton');
    let scissorsButton = document.getElementById('scissors');
    scissorsButton.disabled = false;
    scissorsButton.classList.remove('disableButton');

    const winner = document.querySelector('.winner');
    if (playerChoice === computerChoice) {
        winner.textContent = 'It is a tie.';
        updateHistory('t');
        return;
    };
    if (playerChoice === 'rock') {
        if (computerChoice === 'scissors') {
            winner.textContent = 'Player wins.';
            pScores++;
            updateHistory('p');
            updateScore();
            return;
        }
        else {
            winner.textContent = 'Computer wins.';
            cScores++;
            updateHistory('c');
            updateScore();
            return;
        };
    };
    if (playerChoice === 'paper') {
        if (computerChoice === 'scissors') {
            winner.textContent = 'Computer wins.';
            cScores++;
            updateHistory('c');
            updateScore();
            return;
        }
        else {
            winner.textContent = 'Player wins.';
            pScores++;
            updateHistory('p');
            updateScore();
            return;
        };
    };
    if (playerChoice === 'scissors') {
        if (computerChoice === 'paper') {
            winner.textContent = 'Player wins.';
            pScores++;
            updateHistory('p');
            updateScore();
            return;
        }
        else {
            winner.textContent = 'Computer wins.';
            cScores++;
            updateHistory('c');
            updateScore();
            return;
        };
    };
};

// Winner of the match (10 wins or 3 wins in a row)
const winLimit = 10;
const winSequence = 3;
const gameResult = () => {
    const finalResult = document.querySelector('.resultText');
    console.log(scoreHistory.length);
    if (pScores === winLimit || (scoreHistory.length >= winSequence && scoreHistory[0] == 'p')) {
        finalResult.textContent = 'Player wins the game';
        showPlayAgainButton();
    };
    if (cScores === winLimit || (scoreHistory.length >= winSequence && scoreHistory[0] == 'c')) {
        finalResult.textContent = 'Computer wins the game';
        showPlayAgainButton();
    };
    // score screen
    const scoreInfo = document.querySelector('.scoreText');
    scoreInfo.textContent = 'Player scores: ' + pScores + '.' + ' Computer scores: ' + cScores;
};


// show match and hide Play again button
const hidePlayAgainButton = () => {
    const finalResult = document.querySelector('.result');
    finalResult.classList.remove('fadeIn');
    finalResult.classList.add('fadeOut');   
};
// hide match then show Play again button
const showPlayAgainButton = () => {
    const finalResult = document.querySelector('.result');
    const matchContainer = document.querySelector('.match');
    matchContainer.classList.remove('fadeIn');
    matchContainer.classList.add('fadeOut');
    finalResult.classList.remove('fadeOut');
    finalResult.classList.add('fadeIn');
    // hide score match
    document.querySelector('.score').classList.add('fadeOut');
};
hidePlayAgainButton();

//score history (3 wins in a row)
let scoreHistory = [];
function updateHistory(matchResult) {
    if (matchResult === 't') {
        scoreHistory = [];
        return;
    }
    if (scoreHistory.length > 0) {
        if (scoreHistory[0] !== matchResult) {
            scoreHistory = [];
        }
    }
    scoreHistory.push(matchResult);
    console.log(scoreHistory);
};
