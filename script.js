const displayController = (() => {
    let cellBoxes = document.getElementsByClassName('cell');
    const messageDiv = document.getElementById('message');
    const restartBtn = document.getElementById('restart');

    cellBoxes = Array.from(cellBoxes);

    const updateBoard = () => {
        for (let i = 0; i < cellBoxes.length; i++) {
            cellBoxes[i].textContent = GameController.getBoard().getCellContent(i);
        }
    };
    const setMessage = (str) => {
        messageDiv.textContent = str;
    };

    cellBoxes.forEach((cell) => {
        cell.addEventListener('click', (e) => {
            if (GameController.getIsOver() || e.target.textContent !== "") return;
            GameController.playRound(parseInt(e.target.id));
            updateBoard();
        })
    })

    restartBtn.addEventListener('click', (e) => {
        GameController.reset()
        updateBoard();
        setMessage(`${GameController.getActivePlayer().name}'s turn`);
    })

    const setResultMessage = (winner) => {
        if (winner === "Draw") {
          setMessage("It's a draw!");
        } else {
          setMessage(`${winner} has won!`);
        }
      };

    return {
        setResultMessage,
        setMessage
    }
})();




function Board() {
    const board = [
        '', '', '',
        '', '', '',
        '', '', '',
    ];
    
    const setCellContent = (index, team) => {
        board[index] = team;
    };

    const getCellContent = (index) => {
        return board[index];
    };
    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    return {
        setCellContent,
        getCellContent,
        reset
    }
};


const GameController = ((playerOneName = "Player X", playerTwoName = "Player O") => {
    const board = Board();
    let isOver = false;
    let round = 1;

    const players = [{
        name: playerOneName,
        team: "X"
    },
    {
        name: playerTwoName,
        team: "O"
    }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;
    const getIsOver = () => isOver;
    const getBoard = () => board;

    const playRound = (id) => { 
        board.setCellContent(id ,activePlayer.team);

        if (checkWin(id)) {
            displayController.setResultMessage(activePlayer.name);
            isOver = true;
            return
        }

        if (round === 9) {
            displayController.setResultMessage('Draw');
            isOver = true;
            return
        }
        
        switchPlayerTurn();
        displayController.setMessage(`${activePlayer.name}'s turn`);
        round++;
    };

    const checkWin = (id) => {
        const winConditions = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        let combinations = winConditions.filter((combination) => combination.includes(id));
        let win = combinations.some((possibleCombination) => possibleCombination.every((index) => board.getCellContent(index) === activePlayer.team));
        
        return win
    };

    const reset = () => {
        board.reset();
        isOver = false;
        activePlayer = players[0];
        round = 1;
    };

        //print first round message
        displayController.setMessage(`${activePlayer.name}'s turn`);

    return {
        playRound,
        getActivePlayer,
        getIsOver,
        getBoard,
        reset
    }
})();


