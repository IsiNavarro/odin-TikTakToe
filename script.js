const boardContainer = document.getElementById('boardContainer');

function Cell(){
    let value = "-";
    let available = true;

    const setValue = (selection) => {
        if (available) {
            value = selection;
            available = false;
        }
    }
    const getValue = () => value;
    
    const getAvailable = () => available;

    return {
        getValue,
        setValue,
        getAvailable
    }
}

function Board() {
    const rows = 3;
    const columns = 3;

    let board = {};

    for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= columns; j++) {
            board[`${i}_${j}`] = Cell();
        } 
    }

    return board
}


function GameController(playerOneName = "Player1", playerTwoName = "Player2") {
    const board = Board();

    const players = [{
        name: playerOneName,
        selection: "X"
    },
    {
        name: playerTwoName,
        selection: "O"
    }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    
    // Only needed when playing on console for display
    const printBoard = () => {
        let i = 0;
        let string = '';
        Object.keys(board).forEach(key => {
            if (i === 3 || i === 6) {
                console.log(string);
                string = '';
            }
            string = string + board[key].getValue();
            i++;
        });
        console.log(string)
    }
    const getActivePlayer = () => activePlayer;
    const printNewRound = () => {
        printBoard();
        console.log(`${getActivePlayer().name}'s turn`)
    }
    const playRound = (cell) => {  // cell has to be a string i.e: '1_1'
        board[cell].setValue(getActivePlayer().selection);
        
        switchPlayerTurn();
        printNewRound();
    }

    //Print first round
    printNewRound();

    return {
        playRound,
        getActivePlayer
    }
}
const game = GameController();


