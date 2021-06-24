let turn = true;
let move = 0;
let isBot = false;

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
				cell.addEventListener("click", turnCheckAndMark.bind(this, cell, i, j));
				cell.className = "grid-item";
				cell.type = "button";
				gridBoard.appendChild(cell);
			}
		}
	};

	return { board, renderBoard };
})();

const GameController = ((arr, mark1, mark2) => {
	let overlay = document.getElementById("overlay");
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

	const checkTurnAndMarking = (cell, index1, index2) => {
		if (turn === true && cell.innerHTML === "") {
			cell.innerHTML = `<i class="fas fa-times"></i>`;
			cell.style.color = "var(--player1indicator)";
			cell.style.textShadow = "0 4px var(--textcolor)";
			arr[index1][index2] = mark1;
			checkWonStatus();
			checkForWinner();
			showTurnIndicator();
			++move;
			turn = false;
			cell.disabled = true;
		} else if (turn === false && cell.innerHTML === "") {
			cell.innerHTML = `<i class="far fa-circle"></i>`;
			cell.style.color = "var(--player2indicator)";
			cell.style.textShadow = "0 4px var(--textcolor)";
			arr[index1][index2] = mark2;
			checkWonStatus();
			checkForWinner();
			showTurnIndicator();
			++move;
			turn = true;
			cell.disabled = true;
		}
	};

	const checkWonStatus = () => {
		// Check for X
		if (
			// Horizontal
			(arr[0][0] === "x" && arr[0][1] === "x" && arr[0][2] === "x") ||
			(arr[1][0] === "x" && arr[1][1] === "x" && arr[1][2] === "x") ||
			(arr[2][0] === "x" && arr[2][1] === "x" && arr[2][2] === "x")
		) {
			p1.wonStatus = true;
		} else if (
			// Vertical
			(arr[0][0] === "x" && arr[1][0] === "x" && arr[2][0] === "x") ||
			(arr[0][1] === "x" && arr[1][1] === "x" && arr[2][1] === "x") ||
			(arr[0][2] === "x" && arr[1][2] === "x" && arr[2][2] === "x")
		) {
			p1.wonStatus = true;
		} else if (
			// Diagonal
			(arr[0][2] === "x" && arr[1][1] === "x" && arr[2][0] === "x") ||
			(arr[0][0] === "x" && arr[1][1] === "x" && arr[2][2] === "x")
		) {
			p1.wonStatus = true;
		}

		// Check for O
		if (
			// Horizontal
			(arr[0][0] === "o" && arr[0][1] === "o" && arr[0][2] === "o") ||
			(arr[1][0] === "o" && arr[1][1] === "o" && arr[1][2] === "o") ||
			(arr[2][0] === "o" && arr[2][1] === "o" && arr[2][2] === "o")
		) {
			p2.wonStatus = true;
		} else if (
			// Vertical
			(arr[0][0] === "o" && arr[1][0] === "o" && arr[2][0] === "o") ||
			(arr[0][1] === "o" && arr[1][1] === "o" && arr[2][1] === "o") ||
			(arr[0][2] === "o" && arr[1][2] === "o" && arr[2][2] === "o")
		) {
			p2.wonStatus = true;
		} else if (
			// Diagonal
			(arr[0][2] === "o" && arr[1][1] === "o" && arr[2][0] === "o") ||
			(arr[0][0] === "o" && arr[1][1] === "o" && arr[2][2] === "o")
		) {
			p2.wonStatus = true;
		}
	};

	const checkForWinner = () => {
		if (p1.wonStatus === true) {
			resultBox.classList.add("active");
			overlay.classList.add("active");
			resultMessage.innerText = `${p1.getName()} is the winner 🎉!`;
			p1.setScore();
			p1Score.innerText = p1.getScore();
		} else if (p2.wonStatus === true) {
			resultBox.classList.add("active");
			overlay.classList.add("active");
			resultMessage.innerText = `${p2.getName()} is the winner 🎉!`;
			p2.setScore();
			p2Score.innerText = p2.getScore();
		} else if (move === 8 && p1.wonStatus === false && p2.wonStatus === false) {
			resultBox.classList.add("active");
			overlay.classList.add("active");
			resultMessage.innerText = "Tie!";
		}
	};

	const showTurnIndicator = () => {
		if (turn === false) {
			p1NameContainer.style.borderBottom = "4px var(--player1indicator) solid";
			p1NameContainer.classList.add("active1");
			p2NameContainer.style.borderBottom = "4px transparent solid";
			p2NameContainer.classList.remove("active2");
		} else {
			p1NameContainer.style.borderBottom = "4px transparent solid";
			p1NameContainer.classList.remove("active1");
			p2NameContainer.style.borderBottom = "4px var(--player2indicator) solid";
			p2NameContainer.classList.add("active2");
		}
	};

	const reRenderBoard = () => {
		[...gridItems].forEach((e) => e.parentNode.removeChild(e));
		for (let i = 0; i < arr.length; i++) {
			for (let j = 0; j < arr[i].length; j++) {
				arr[i][j] = "";
			}
		}
		move = 0;
		p1.wonStatus = false;
		p2.wonStatus = false;
		GameBoard.renderBoard(GameController.checkTurnAndMarking);
	};

	window.onclick = (event) => {
		if (event.target == p1NameEditModal || event.target == p2NameEditModal) {
			p1NameEditModal.classList.remove("active");
			p2NameEditModal.classList.remove("active");
			overlay.classList.remove("active");
		}
	};

	p1NameSubmit.onclick = () => {
		if (document.getElementById("name-field-1").value == "") {
			alert("Don't leave this empty!");
		} else {
			p1.setName(`${p1NameField.value}`);
			p1Name.innerText = p1.getName();
			p1NameField.value = null;
			p1NameEditModal.classList.remove("active");
			overlay.classList.remove("active");
		}
	};

	p2NameSubmit.onclick = () => {
		if (document.getElementById("name-field-2").value == "") {
			alert("Don't leave this empty!");
		} else {
			p2.setName(`${p2NameField.value}`);
			p2Name.innerText = p2.getName();
			p2NameField.value = null;
			p2NameEditModal.classList.remove("active");
			overlay.classList.remove("active");
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

	p1NameEditBtn.onclick = () => {
		p1NameEditModal.classList.add("active");
		overlay.classList.add("active");
	};

	p2NameEditBtn.onclick = () => {
		p2NameEditModal.classList.add("active");
		overlay.classList.add("active");
	};

	newMatchButton.onclick = () => {
		reRenderBoard();
		resultBox.classList.remove("active");
		overlay.classList.remove("active");
	};

	restartButton.onclick = () => {
		reRenderBoard();
	};

	GameBoard.renderBoard(checkTurnAndMarking);

	return { checkTurnAndMarking };
})(GameBoard.board, p1.mark, p2.mark);
