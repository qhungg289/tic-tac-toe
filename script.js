let turn = true;

// Factory function
const Player = (mark) => {
	let _name = "";
	let _score = 0;

	const setName = (n) => (_name = n);
	const getName = () => _name;
	const setScore = () => _score++;
	const getScore = () => _score;

	return { getName, setName, getScore, setScore, mark };
};

// Create Players object
let p1 = Player("x");

let p2 = Player("o");

// Game board
const GameBoard = (() => {
	let board = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];
	return { board };
})();

const GameController = ((arr, mark1, mark2) => {
	let gridBoard = document.getElementById("grid-container");

	const turnCheck = (cell) => {
		if (turn === true && cell.innerText === "") {
			cell.innerText = mark1;
			turn = false;
		} else if (turn === false && cell.innerText === "") {
			cell.innerText = mark2;
			turn = true;
		} else {
			alert("This box is already selected! Pick another box!");
		}
	};

	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr[i].length; j++) {
			let cell = document.createElement("div");
			cell.innerText = arr[i][j];
			cell.dataset.index = `[${i}][${j}]`;
			cell.addEventListener("click", turnCheck.bind(this, cell));
			gridBoard.appendChild(cell).className = "grid-item";
		}
	}

	return { gridBoard };
})(GameBoard.board, p1.mark, p2.mark);
