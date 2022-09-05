const xClass = 'x'
const cClass = 'c'
const cellElements = document.querySelectorAll('[data-cell]')
let circleTurn
const board = document.getElementById('board')
const winningMsg = document.getElementById('winning-message')
const restartBtn = document.getElementById('restarBtn')
const winningTextMessage = document.querySelector('[data-winning-message-text]')
const Winning_Combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
startGame()
restartBtn.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
      cell.classList.remove(xClass)
      cell.classList.remove(cClass)
      cell.removeEventListener('click', handle)
      cell.addEventListener('click', handle, { once: true })
    })
    setBoardHoverClass()
    winningMsg.classList.remove('show')
}

function handle(e){
    const cell = e.target;
    const current_class = circleTurn ? cClass : xClass
    placemark(cell, current_class)
    if(checkWin(current_class)){
        endGame(false)}
    else if(isDraw()){endGame(true)}
    else {
        swapTurn()
        setBoardHoverClass()
    }
}

function endGame(draw){
    if(draw){
        winningTextMessage.innerText = 'DRAW!!'
    }
    else{
        winningTextMessage.innerText = `${circleTurn ? 'Os':'Xs'} WINS!!` 
    }
    winningMsg.classList.add('show')
}
function isDraw(){
    return [...cellElements].every(cell => {return cell.classList.contains(xClass) || cell.classList.contains(cClass)
    })
}

function setBoardHoverClass(){
    board.classList.remove(xClass)
    board.classList.remove(cClass)
    if(circleTurn){
        board.classList.add(cClass)
    }
    else{
        board.classList.add(xClass)
    }
}

function checkWin(current_class) {
    return Winning_Combos.some(combination => {
      return combination.every(index => {
        return cellElements[index].classList.contains(current_class)
      })
    })
  }

function placemark(cell, current_class){
    cell.classList.add(current_class)
}

function swapTurn(){
    circleTurn = !circleTurn
}