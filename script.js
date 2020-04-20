const X_CLASS = 'x'
const OH_CLASS = 'oh'
const WINS = [
    [2, 5, 8],[0, 4, 8],
    [0, 1, 2],[2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
]
const cellElems = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winMsgElem = document.getElementById('winMsg')
const restartBtn = document.getElementById('restartBtn')
const winMsgTextElem = document.querySelector('[data-winning-message-text]')
let ohTurn

startGame()

restartBtn.addEventListener('click', startGame)

function startGame() {
    ohTurn = false
    cellElems.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(OH_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setHoverClass()
    winMsgElem.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currClass = ohTurn ? OH_CLASS : X_CLASS
    setCurrClass(cell, currClass)
    
    if (checkWin(currClass)) {
       endGame(false)
    }
    else if (isDraw()) {
        endGame(true)
    }
    else {
        switchTurns()
        setHoverClass()
    }
}

function endGame(draw) {
    if (draw) {
        winMsgTextElem.innerText = "JAFNTEFLI"
    } else {
        winMsgTextElem.innerText = `${ohTurn ? "O" : "X"} VANN`
    }
    winMsgElem.classList.add('show')
}

function isDraw() {
    return [...cellElems].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(OH_CLASS)
    })
}

function setCurrClass(cell, currClass) {
    cell.classList.add(currClass)
}

function switchTurns() {
    ohTurn = !ohTurn
}

function setHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(OH_CLASS)
    if (ohTurn) {
        board.classList.add(OH_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currClass) {
    return WINS.some(combination => {
        return combination.every(index => {
            return cellElems[index].classList.contains(currClass)
        })
    })
}