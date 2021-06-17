let turn = true;
let move = 0;

// Factory function
const Player = (mark) => {
	let _name = "";
	let _score = 0;
	let wonStatus = false;

	const setName = (n) => (_name = n);
	const getName = () => _name;
	const setScore = () => _score++;
	const getScore = () => _score;

	return { getName, setName, getScore, setScore, mark, wonStatus };
};

// Create Players object
let p1 = Player("x");
let p2 = Player("o");
p1.setName("Player 1");
p2.setName("Player 2");

const GameBoard = (() => {
	let board = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];

	let gridBoard = document.getElementById("grid-container");

	// Render the array to grid
	const renderBoard = (turnCheckAndMark) => {
		for (let i = 0; i < board.length; i++) {
			for (let j = 0; j < board[i].length; j++) {
				let cell = document.createElement("div");
				cell.innerText = board[i][j];
				cell.addEventListener(
					"click",
					turnCheckAndMark.bind(this, cell, i, j)
				);
				gridBoard.appendChild(cell).className = "grid-item";
			}
		}
	};

	return { board, renderBoard };
})();

const GameController = ((arr, mark1, mark2) => {
	const turnCheckAndMark = (cell, index1, index2) => {
		if (turn === true && cell.innerText === "") {
			cell.innerText = mark1;
			cell.style.color = "red";
			arr[index1][index2] = mark1;
			checkWon();
			winnerFound();
			++move;
			turn = false;
		} else if (turn === false && cell.innerText === "") {
			cell.innerText = mark2;
			cell.style.color = "blue";
			arr[index1][index2] = mark2;
			checkWon();
			winnerFound();
			++move;
			turn = true;
		} else if (cell.innerText === "x" || cell.innerText === "o") {
			alert("This box is already selected! Pick another box!");
		}
	};

	GameBoard.renderBoard(turnCheckAndMark);

	// Check for winner
	const checkWon = () => {
		// Check for X
		if (arr[0][0] === "x" && arr[0][1] === "x" && arr[0][2] === "x") {
			p1.wonStatus = true;
		} else if (
			arr[1][0] === "x" &&
			arr[1][1] === "x" &&
			arr[1][2] === "x"
		) {
			p1.wonStatus = true;
		} else if (
			arr[2][0] === "x" &&
			arr[2][1] === "x" &&
			arr[2][2] === "x"
		) {
			p1.wonStatus = true;
		} else if (
			arr[0][0] === "x" &&
			arr[1][0] === "x" &&
			arr[2][0] === "x"
		) {
			p1.wonStatus = true;
		} else if (
			arr[0][1] === "x" &&
			arr[1][1] === "x" &&
			arr[2][1] === "x"
		) {
			p1.wonStatus = true;
		} else if (
			arr[0][2] === "x" &&
			arr[1][2] === "x" &&
			arr[2][2] === "x"
		) {
			p1.wonStatus = true;
		} else if (
			arr[0][2] === "x" &&
			arr[1][1] === "x" &&
			arr[2][0] === "x"
		) {
			p1.wonStatus = true;
		} else if (
			arr[0][0] === "x" &&
			arr[1][1] === "x" &&
			arr[2][2] === "x"
		) {
			p1.wonStatus = true;
		}

		// Check for O
		if (arr[0][0] === "o" && arr[0][1] === "o" && arr[0][2] === "o") {
			p2.wonStatus = true;
		} else if (
			arr[1][0] === "o" &&
			arr[1][1] === "o" &&
			arr[1][2] === "o"
		) {
			p2.wonStatus = true;
		} else if (
			arr[2][0] === "o" &&
			arr[2][1] === "o" &&
			arr[2][2] === "o"
		) {
			p2.wonStatus = true;
		} else if (
			arr[0][0] === "o" &&
			arr[1][0] === "o" &&
			arr[2][0] === "o"
		) {
			p2.wonStatus = true;
		} else if (
			arr[0][1] === "o" &&
			arr[1][1] === "o" &&
			arr[2][1] === "o"
		) {
			p2.wonStatus = true;
		} else if (
			arr[0][2] === "o" &&
			arr[1][2] === "o" &&
			arr[2][2] === "o"
		) {
			p2.wonStatus = true;
		} else if (
			arr[0][2] === "o" &&
			arr[1][1] === "o" &&
			arr[2][0] === "o"
		) {
			p2.wonStatus = true;
		} else if (
			arr[0][0] === "o" &&
			arr[1][1] === "o" &&
			arr[2][2] === "o"
		) {
			p2.wonStatus = true;
		}
	};

	const winnerFound = () => {
		if (p1.wonStatus === true) {
			alert(`${p1.getName()} is the winner!`);
		} else if (p2.wonStatus === true) {
			alert(`${p2.getName()} is the winner!`);
		} else if (
			move === 8 &&
			p1.wonStatus === false &&
			p2.wonStatus === false
		) {
			alert("Tie!");
		}
	};

	let gridItems = document.getElementsByClassName("grid-item");
	let restartButton = document.getElementById("restart-button");

	restartButton.onclick = () => {
		[...gridItems].forEach((e) => e.parentNode.removeChild(e));
		for (let i = 0; i < arr.length; i++) {
			for (let j = 0; j < arr[i].length; j++) {
				arr[i][j] = "";
			}
		}
		move = 0;
		p1.wonStatus = false;
		p2.wonStatus = false;
		GameBoard.renderBoard(GameController.turnCheckAndMark);
	};
	return { turnCheckAndMark };
})(GameBoard.board, p1.mark, p2.mark);
