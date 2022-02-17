/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2, 3],
  [3, 4, 5, 6],
  [7, 8, 9, 10], 
  [10, 11, 12, 13], 
  [14, 15, 16, 17], 
  [17, 18, 19, 20], 
  [21, 22, 23, 24], 
  [24, 25, 26, 27], 
  [28, 29, 30, 31], 
  [31, 32, 33, 34], 
  [35, 36, 37, 38], 
  [38, 39, 40, 41], 
  [0, 7, 14, 21], 
  [1, 8, 15, 22], 
  [2, 9, 16, 23], 
  [3, 10, 17, 24], 
  [4, 11, 18, 25], 
  [5, 12, 19, 26], 
  [6, 13, 20, 27], 
  [14, 21, 28, 35], 
  [15, 22, 29, 36], 
  [16, 23, 30, 37], 
  [17, 24, 31, 38], 
  [18, 25, 32, 39], 
  [19, 26, 33, 40], 
  [20, 27, 34, 41], 
  [14, 22, 30, 38], 
  [15, 23, 31, 39], 
  [16, 24, 32, 40], 
  [17, 25, 33, 41], 
  [17, 23, 29, 35], 
  [18, 24, 30, 36], 
  [19, 25, 31, 37], 
  [20, 26, 32, 38], 
  [10, 16, 22, 28], 
  [11, 17, 23, 29], 
  [12, 18, 24, 30], 
  [13, 19, 25, 31], 
  [7, 15, 23, 31], 
  [8, 16, 24, 32], 
  [9, 17, 25, 33], 
  [10, 18, 26, 34], 
  [0, 8, 16, 24], 
  [1, 9, 17, 25], 
  [2, 10, 18, 26], 
  [3, 11, 19, 27], 
  [3, 9, 15, 21], 
  [4, 10, 16, 22], 
  [5, 11, 17, 23], 
  [6, 12, 18, 24], 
  [36, 37, 38, 39], 
  [37, 38, 39, 40], 
  [29, 30, 31, 32], 
  [30, 31, 32, 33], 
  [22, 23, 24, 25], 
  [23, 24, 25, 26], 
  [15, 16, 17, 18], 
  [16, 17, 18, 19], 
  [8, 9, 10, 11], 
  [9, 10, 11, 12], 
  [1, 2, 3, 4], 
  [2, 3, 4, 5], 
  [7, 14, 21, 28], 
  [8, 15, 22, 29], 
  [9, 16, 23, 30], 
  [10, 17, 24, 31], 
  [11, 18, 25, 32], 
  [12, 19, 26, 33], 
  [13, 20, 27, 34],
]



/*---------------------------- Variables (state) ----------------------------*/

const playerRed = 1
const computerPlayer = -1
let winner, turn, circleArray

/*------------------------ Cached Element References ------------------------*/
const gameBoard = document.querySelectorAll(".circle")
const message = document.getElementById("message")
const detonatorFile = document.querySelector('#detonator')
const detonator = new Audio('/audio/Detonator.mp3')
const detonatorOpenerFile = document.querySelector('#detonatorOpener')
const detonatorOpener = new Audio('/audio/DetonatorOpener.mp3')
const muteBtn = document.getElementById('muteBtn')

let countDownRefresh = document.getElementById('countdown')
let timeLeft = 30

// const explosionFile = document.querySelector('#bomb')
// const explosion = new Audio('/audio/Explosion.mp3')

// detonatorFile.addEventListener('click', (evt) => {
//   console.log('IT WORKS')
//   console.log(evt.target)
  
// })

// window.addEventListener('load', (evt) => {
//   console.log('Bombs primed')
//   detonatorOpenerFile.volume = .1
//   detonatorOpenerFile.play()
// })

detonatorOpenerFile.addEventListener('load', (evt) => {
  console.log('Bombs rigged')
  console.log(evt.target)
  
  // detonator.pause()
})



// explosionFile.addEventListener('click', (evt) => {
//   console.log('bomb works')
//   console.log(evt.target)
//   explosion.volume = .1
//   explosion.play()
// })




/*----------------------------- Event Listeners -----------------------------*/
gameBoard.forEach(function(circle){
  circle.addEventListener("click", handleClick)
});


/*-------------------------------- Functions --------------------------------*/



function handleClick(event) {
  let circleIndex = parseInt(event.target.id);
  const correctIdx = checkPlacement(circleIndex);

  if (circleArray[correctIdx] === null && winner === null){
  circleArray[correctIdx] = turn;
  
  turn = turn * -1
  numOfTurns += 1
  const turnMsg = turn === 1? 'Red' : 'White'
  message.textContent = `Turn: ${turnMsg}`
  
  render();
  getWinner();

  
    } 
    detonator.play()
    detonator.volume = .1
    detonatorOpenerFile.volume = .1
    detonatorOpenerFile.play()
}
init()



  // if(firstClick) {
    //   firstClick = false;

    // }

// resetBtn.addEventListener('click', (evt) => {
//   console.log('RESET')
  
//   //Need a thing here that resets the chips

// })



function init() {
  circleArray = [
null, null, null, null, null, null, null,
null, null, null, null, null, null, null,
null, null, null, null, null, null, null,
null, null, null, null, null, null, null,
null, null, null, null, null, null, null,
null, null, null, null, null, null, null,
]

  turn = 1
  winner = null;
  numOfTurns = 0 

  
  
  render()

  
  let timer = setInterval(function(){
    countDownRefresh.textContent = timeLeft + ` s to refresh`
    timeLeft -= 1
    console.log(timeLeft)
    if (timeLeft < 0) {
      countDownRefresh.textContent = 'RIP'
      // explosion.start(500) FIND A CONFETTI ALTERNATIVE
      //the countdown then resets the pieces
      //the countdown then cues an explosion mp3
      clearInterval(timer)
      }
    },1000)
    
}


function checkPlacement(idx) {
  console.log('sanity')
  for (let i = idx + 35; i <= 41 && i >= 0; i -=7){
    if (circleArray[i] === null){
      console.log(i)
      return i;
    }
  }
}




const redBomb = '../assets/RedBomb.png'
const whiteBomb = '../assets/WhiteBomb.png'

function render() {

  for (let i = 0; i < circleArray.length; i++){
  // console.log(squares[i])
    if (circleArray[i] === 1){
    gameBoard[i].style.backgroundColor = 'Red'
    // const token=document.createElement('img')
    // token.src=redBomb
    // gameBoard[i].appendChild(token)

    } else if 
    (circleArray[i] === -1) {
    gameBoard[i].style.backgroundColor = 'White'
    // const token=document.createElement('img')
    // token.src=whiteBomb
    // gameBoard[i].appendChild(token)

    } else {
      // gameBoard[i].textContent = ""
    }
  }
  
}

muteBtn.addEventListener('click', (evt) => {
  console.log('mute')
  detonator.pause()
})


function getWinner(){
  for(let i = 0; i < winningCombos.length; i++){ 
  console.log(circleArray)
      const a = winningCombos[i][0]
      const b = winningCombos[i][1]
      const c = winningCombos[i][2]
      const d = winningCombos[i][3]

      
        if (circleArray[a] + circleArray[b] + circleArray[c] + circleArray[d] === 4){
            console.log('Red wins')
          message.textContent = 'Red wins';
            winner = 'Red'
          } else if (circleArray[a] + circleArray[b] + circleArray[c] + circleArray[d] === -4){
            console.log('White wins')
          message.textContent = 'White wins';
            winner = 'White'
          }
          
          if(numOfTurns === 42 && winner === null){
        console.log('Tie')
        message.textContent = 'Tie';
        }
        
  }  
  
}

//Refreshes page after 20 seconds, so hurry up and win bitch
setTimeout(function(){
  window.location.reload(1);
}, 31000)
console.log(setTimeout)