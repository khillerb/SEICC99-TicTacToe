
const cellList = document.querySelectorAll('[celldiv]');
const board = document.getElementById('board');
const circleClass = 'circle';
const winningMessageControl = document.getElementById('winningMessage');
const winningText = document.querySelector('[winning-text]');
const restartButton = document.getElementById('restartButton');
const xPlace = document.getElementById('xAudio');
const circlePlace = document.getElementById('circleAudio')
const restartAudio = document.getElementById('restartAudio')
let turn = 0;
const xClass = 'x';
const winCombo = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,4,8],
	[2,4,6],
	[0,3,6],
	[1,4,7],
	[2,5,8]

]
restartButton.addEventListener('click', startGame)
//click for each cell, on can happen once per game

function onPlay(e) {
	//place mark
	const currentCell = e.target
	const currentClass = (turn % 2 == 0) ? xClass : circleClass
	click(currentCell,currentClass)
	//check win
	if(winCheck(currentClass)) {
		console.log('winner winner chicken dinner!')
		setWinscreen(false)
	} else if (drawCheck()) {
		setWinscreen(true)
	} else {
		swapTurns()
	}
}
function startGame() {
	restartAudio.play()
	turn = 0;
	cellList.forEach(cell => {
	cell.classList.remove(xClass)
	cell.classList.remove(circleClass)
	cell.removeEventListener('click', onPlay)
	cell.addEventListener('click', onPlay, {once: true})})
	setBoard()
	winningMessageControl.classList.remove('show')

}
function click(cell,currentClass) {
	cell.classList.add(currentClass)
	if (currentClass == 'x') {
		xPlace.play()
	} else {
		circlePlace.play()
	}
}
function swapTurns() {
	turn += 1
	setBoard()
}
function setBoard() {

	board.classList.remove(xClass)
	board.classList.remove(circleClass)
	if (turn % 2 == 0) {
		board.classList.add(xClass)
	} 
	if (turn % 2 != 0) {
		board.classList.add(circleClass)
	}
}
const drawCheck = () => {
	return [...cellList].every(cell => {
		return cell.classList.contains(xClass) || cell.classList.contains(circleClass)
	})
};
const winCheck = (currentClass) => {
	return winCombo.some(combination => {
		return combination.every(index => {
			return cellList[index].classList.contains(currentClass)
		})
	})
};
const setWinscreen = (draw) => {
	if (draw) {
		winningText.innerText = "It's a DRAW!"
	} else {
		winningText.innerText = `${(turn % 2 == 0) ? "X's" : "O's" } wins!`
	}
	winningMessageControl.classList.add('show')
};

startGame()









/*Minimum Requirements
Display an empty tic-tac-toe board when the page is initially displayed.
A player can click on the nine cells to make a move.
Every click will alternate between marking an X and O.
Once occupied with an X or O, the cell cannot be played again.
Provide a Reset Game button that will clear the contents of the board.
Getting Started / Hints
Follow the approach as described in the Guide on How to Build a Browser Game.
Create an index.html page.
Create and include in your index.html page, main.css and main.js files.
Start by writing the HTML and CSS that displays a 3x3 grid and the reset game button.
Using id and/or class attributes will help you target elements for styling and wiring up your click event listeners.
Programs, including games, are frequently focused on manipulating data and displaying that data to a user. Decide on the data structures, held in variables, that will maintain the state (data / status) of the game.
Note that the values you use to represent the state of your game, doesn't necessarily have to match what you want to display. For example, just because you want to display X and Os doesn't mean that you have to use those letters in your data structure. You might choose to use 1 to represent player X and -1 to represent player O for example. Then, in your render function you would have the logic to translate data to what you want to display.
Wire up your click event listener(s). Using a single listener with event bubbling is recommended but not required.
Lots of little functions!*/
