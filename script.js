let turn = true;
let move = 0;

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

	const renderBoard = (turnCheckAndMark) => {
		for (let i = 0; i < board.length; i++) {
			for (let j = 0; j < board[i].length; j++) {
				let cell = document.createElement("button");
				cell.innerText = board[i][j];
				cell.addEventListener(
					"click",
					turnCheckAndMark.bind(this, cell, i, j)
				);
				cell.className = "grid-item";
				cell.type = "button";
				gridBoard.appendChild(cell);
			}
		}
	};

	return { board, renderBoard };
})();

const GameController = ((arr, mark1, mark2) => {
	let resultBox = document.getElementById("result");
	let resultMessage = document.getElementById("result-message");
	let newMatchButton = document.getElementById("new-match-button");
	let restartButton = document.getElementById("restart-button");
	let gridItems = document.getElementsByClassName("grid-item");

	let p1Score = document.getElementById("player1-score");
	let p1Name = document.getElementById("player1-name");
	let p1NameEditBtn = document.getElementById("change-name-1");
	let p1NameEditModal = document.getElementById("change-name-1-modal");
	let p1NameField = document.getElementById("name-field-1");
	let p1NameSubmit = document.getElementById("submit-1");
	let p1NameContainer = document.getElementById("name-container-1");

	let p2Score = document.getElementById("player2-score");
	let p2Name = document.getElementById("player2-name");
	let p2NameEditBtn = document.getElementById("change-name-2");
	let p2NameEditModal = document.getElementById("change-name-2-modal");
	let p2NameField = document.getElementById("name-field-2");
	let p2NameSubmit = document.getElementById("submit-2");
	let p2NameContainer = document.getElementById("name-container-2");

	p1Name.innerText = p1.getName();
	p2Name.innerText = p2.getName();
	p1Score.innerText = p1.getScore();
	p2Score.innerText = p2.getScore();

	window.onclick = (event) => {
		if (
			event.target == p1NameEditModal ||
			event.target == p2NameEditModal
		) {
			p1NameEditModal.style.display = "none";
			p2NameEditModal.style.display = "none";
		}
	};

	p1NameSubmit.onclick = () => {
		if (document.getElementById("name-field-1").value == "") {
			alert("Don't leave this empty!");
		} else {
			p1.setName(`${document.getElementById("name-field-1").value}`);
			p1Name.innerText = p1.getName();
			document.getElementById("name-field-1").value = null;
			p1NameEditModal.style.display = "none";
		}
	};

	p2NameSubmit.onclick = () => {
		if (document.getElementById("name-field-2").value == "") {
			alert("Don't leave this empty!");
		} else {
			p2.setName(`${document.getElementById("name-field-2").value}`);
			p2Name.innerText = p2.getName();
			document.getElementById("name-field-2").value = null;
			p2NameEditModal.style.display = "none";
		}
	};

	p1NameField.addEventListener("keyup", (field) => {
		if (field.key === "Enter") {
			p1NameSubmit.click();
		}
	});

	p2NameField.addEventListener("keyup", (field) => {
		if (field.key === "Enter") {
			p2NameSubmit.click();
		}
	});

	newMatchButton.onclick = () => {
		[...gridItems].forEach((e) => e.parentNode.removeChild(e));
		for (let i = 0; i < arr.length; i++) {
			for (let j = 0; j < arr[i].length; j++) {
				arr[i][j] = "";
			}
		}
		move = 0;
		p1.wonStatus = false;
		p2.wonStatus = false;
		resultBox.style.display = "none";
		GameBoard.renderBoard(GameController.turnCheckAndMark);
	};

	p1NameEditBtn.onclick = () => {
		p1NameEditModal.style.display = "block";
	};

	p2NameEditBtn.onclick = () => {
		p2NameEditModal.style.display = "block";
	};

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

	const turnCheckAndMark = (cell, index1, index2) => {
		if (turn === true && cell.innerHTML === "") {
			cell.innerHTML = `<i class="fas fa-times"></i>`;
			cell.style.color = "red";
			arr[index1][index2] = mark1;
			checkWon();
			winnerFound();
			turnIndicator();
			++move;
			turn = false;
			cell.disabled = true;
		} else if (turn === false && cell.innerHTML === "") {
			cell.innerHTML = `<i class="far fa-circle"></i>`;
			cell.style.color = "blue";
			arr[index1][index2] = mark2;
			checkWon();
			winnerFound();
			turnIndicator();
			++move;
			turn = true;
			cell.disabled = true;
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
			resultBox.style.display = "block";
			resultMessage.innerText = `${p1.getName()} is the winner 🎉!`;
			p1.setScore();
			p1Score.innerText = p1.getScore();
		} else if (p2.wonStatus === true) {
			resultBox.style.display = "block";
			resultMessage.innerText = `${p2.getName()} is the winner 🎉!`;
			p2.setScore();
			p2Score.innerText = p2.getScore();
		} else if (
			move === 8 &&
			p1.wonStatus === false &&
			p2.wonStatus === false
		) {
			resultBox.style.display = "block";
			resultMessage.innerText = "Tie!";
		}
	};

	const turnIndicator = () => {
		if (turn === false) {
			p1NameContainer.style.borderBottom = "4px red solid";
			p2NameContainer.style.borderBottom = "none";
		} else {
			p1NameContainer.style.borderBottom = "none";
			p2NameContainer.style.borderBottom = "4px blue solid";
		}
	};

	return { turnCheckAndMark };
})(GameBoard.board, p1.mark, p2.mark);
