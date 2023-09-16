import {gameBoard} from './gameBoard'
import {ship} from './ship'
import {player} from './player'

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
console.log(getRandomInt(3))

let i = 0; //order
let ship1 = ship(3,0,false, 'vertical');
let ship2 = ship(3,0,false, 'horizontal');


let playerBoard = document.getElementById('player');
let playerBoardRow = playerBoard.getElementsByClassName('row');


let computerBoard = document.getElementById('computer');
let computerBoardRows = computerBoard.getElementsByClassName('row');
console.log(computerBoardRows);


let firstPlayerBoard = [];
let secondPlayerBoard = [];

function order(){
    // starting the game
    if(ship1.sunk == false && ship2.sunk == false){
        if(i%2 === 0 ){
            console.log('First')
            // placing events on the first board
            for(let row of playerBoardRow){
                let rowArr = row.getElementsByClassName('cell');
                for(let cellItem of rowArr){
                    cellItem.onmouseover = oneCellOver(Array.from(rowArr));
                    cellItem.onmouseout = oneCellOut(Array.from(rowArr));
                    cellItem.onclick = oneCellFill(Array.from(rowArr), firstPlayerBoard);
                }
            }
            //removing events from the second board
            for(let row of computerBoardRows){
                let rowArr = row.getElementsByClassName('cell');
                for(let cellItem of rowArr){
                    cellItem.onmouseover = null;
                    cellItem.onmouseout = null;
                    cellItem.onclick = null;
                }
            }
            i++;
            
        } else{
            console.log('Second')
            
            // placing events on the second board
            // for(let row of computerBoardRows){
            //     let rowArr = row.getElementsByClassName('cell');
            //     for(let cellItem of rowArr){
            //         cellItem.onmouseover = oneCellOver(Array.from(rowArr));
            //         cellItem.onmouseout = oneCellOut(Array.from(rowArr));
            //         cellItem.onclick = oneCellFill(Array.from(rowArr), secondPlayerBoard);
            //     }
            // }
            // //removing events from the first board
            // for(let row of playerBoardRow){
            //     let rowArr = row.getElementsByClassName('cell');
            //     for(let cellItem of rowArr){
            //         cellItem.onmouseover = null;
            //         cellItem.onmouseout = null;
            //         cellItem.onclick = null;
            //     }
            // }
            let randomRow = Math.random() * 4;
            let randomRowInt = Math.floor(randomRow);
            let randomCell = Math.random() * 4;
            let randomCellInt = Math.floor(randomCell);

            let randomRowCells = computerBoardRows[randomRowInt].getElementsByClassName('cell');
            let randomCellsArr = Array.from(randomRowCells);


            randomCellsArr[randomCellInt].style.color = "red";
            // need recursion until you meet that criteria
            if(randomCellsArr[randomCellInt].innerHTML != "X" && randomCellsArr[randomCellInt].innerHTML != "•"){
                // If computer has hit or miss
                if(secondPlayerBoard.board[randomRowInt][randomCellInt] == 1){
                    console.log("hit");
                    randomCellsArr[randomCellInt].innerHTML = "X";
        
                    secondPlayerBoard.receiveAttack(randomRowInt, randomCellInt);
                    console.log(secondPlayerBoard.board);
                } else{
                    console.log("miss")
                    randomCellsArr[randomCellInt].innerHTML = "•";
                }
                // console.log(randomArr[randomCellInt]);
                i++;
            }
            
            
        }        
    }else{
        //removing events from the first board
        for(let row of playerBoardRow){
            let rowArr = row.getElementsByClassName('cell');
            for(let cellItem of rowArr){
                cellItem.onmouseover = null;
                cellItem.onmouseout = null;
                cellItem.onclick = null;
            }
        }

        //removing events from the second board
        for(let row of computerBoardRows){
            let rowArr = row.getElementsByClassName('cell');
            for(let cellItem of rowArr){
                cellItem.onmouseover = null;
                cellItem.onmouseout = null;
                cellItem.onclick = null;
            }
        }
    }
}

//after game starts
//to border over one cell
function oneCellOver(cellElement){
    return function(event){
        let positionX = cellElement.indexOf(event.currentTarget);
        cellElement[positionX].style.border = "1px solid red";//need to attach it to second board
    }
}

function oneCellOut(cellElement){
    return function(event){
        let positionX = cellElement.indexOf(event.currentTarget);
        cellElement[positionX].style.border = "1px solid white";//need to attach it to second board
    }
}

function oneCellFill(cellElement, playerVal){
    return function(event){
        let positionX = cellElement.indexOf(event.currentTarget);
        let positionY = this.parentNode.getElementsByClassName('char')[0].innerHTML-1;
        
        //checking if the cell have been already choosen
        if(cellElement[positionX].innerHTML != "X" && cellElement[positionX].innerHTML != "•"){
            //checking on hit or miss
            if(playerVal.board[positionY][positionX] == 1){
                console.log("hit");
                cellElement[positionX].innerHTML = "X";
    
                playerVal.receiveAttack(positionX, positionY);
                console.log(playerVal.board);
            } else{
                console.log("miss")
                cellElement[positionX].innerHTML = "•";
    
            }
            cellElement[positionX].style.border = "1px solid red";
            cellElement[positionX].style.color = "red";
    
            // console.log("X:"+ positionX);
            // console.log("Y:" + positionY);
            // console.log(cellElement);
            // console.log("this is: " + this.parentNode.getElementsByClassName('char')[0].innerHTML-1);
    
            if(ship1.sunk == true){
                alert('Player2 is the winner');
            }else if(ship2.sunk == true){
                alert('Player1 is the winner');
            }
            
            order();
        }
        else{
            alert("cell already have been chosen");
        }
    }
}

//before game starts
//to show the cell placement prototype
const borderOver = (cellElement, rowElement) => {
    return function (event){
        let positionX = cellElement.indexOf(event.currentTarget);
        let positionY = this.parentNode.getElementsByClassName('char')[0].innerHTML-1;// getting position by div with class "char"
        if(ship1.direction == 'horizontal'){
            if(cellElement.length - positionX >= ship1.numOfCells){// checking if the ship is fit into the board BY X
                for(let i = 0; i < ship1.numOfCells; i++){
                    cellElement[positionX].style.border = "1px solid red";
                    positionX += 1;
                }
            }
            
        } else {
            if(cellElement.length - positionY >= ship1.numOfCells){// checking if the ship is fit into the board BY Y
                positionX += 1; // since the count starts from 0 but we need to choose first element
                for(let j = 0; j < ship1.numOfCells; j++){
                    let targetElement = rowElement[positionY].children[positionX]; // First we choose the row then the cell in that row
                    targetElement.style.border = "1px solid red";
                    positionY += 1;
                }
            }
            
        }


    }   
}

//to make the cell default after "borderOver" function
function borderOut(cellElement, rowElement){
    return function (event){
        let positionX = cellElement.indexOf(event.currentTarget);
        let positionY = this.parentNode.getElementsByClassName('char')[0].innerHTML-1;// getting position by div with class "char"

        if(ship1.direction == 'horizontal'){
            if(cellElement.length - positionX >= ship1.numOfCells){// checking if the ship is fit into the board
                for(let i = 0; i < ship1.numOfCells; i++){
                    cellElement[positionX].style.border = "1px solid white";
                    positionX +=  1;
                }
            }
        } else {
            if(cellElement.length - positionY >= ship1.numOfCells){// checking if the ship is fit into the board
                positionX += 1; // since the count starts from 0 but we need to choose first element
                for(let j = 0; j < ship1.numOfCells; j++){
                    let targetElement = rowElement[positionY].children[positionX]; // First we choose the row then the cell in that row
                    targetElement.style.border = "1px solid white";
                    positionY += 1;
                }
            }
            
        }
    }   
}

//placing the ship
function fillBorder(cellElement, rowElement){
    return function(event){
        let positionX = cellElement.indexOf(event.currentTarget);
        let positionY = this.parentNode.getElementsByClassName('char')[0].innerHTML-1;// getting position by div with class "char"

        // need this 2 vars to not to change the initial positions
        let counterX = positionX;
        let counterY = positionY;


        // console.log(cellElement.length - positionY >= ship1.numOfCells)
        // console.log(firstPlayerBoard)
        console.log(ship1)

        if(ship1.direction == 'horizontal'){
            if(cellElement.length - positionX >= ship1.numOfCells){// checking if the ship is fit into the board BY X
                for(let i = 0; i < ship1.numOfCells; i++){
                    cellElement[counterX].style.backgroundColor = "#fbadad";
                    counterX += 1;
                }
                gameStart(positionX, positionY);
            }
        } else {
            if(cellElement.length - positionY >= ship1.numOfCells){// checking if the ship is fit into the board BY Y
                counterX += 1; // since the count starts from 0 but we need to choose first element
                for(let j = 0; j < ship1.numOfCells; j++){
                    rowElement[counterY].children[counterX].style.backgroundColor = "#fbadad";// First we choose the row then the cell in that row
                    counterY += 1;
                }
                // gameStart(positionX, positionY);
                firstPlayerBoard = gameBoard(ship1, [positionY, positionX]);// placing it in database
                secondPlayerBoard = gameBoard(ship2, [1,0]);// placing it in manually
                console.log("Y:" + positionY + ", " + "X:"+ positionX)
                console.log(firstPlayerBoard.board)
                console.log(secondPlayerBoard.board)

                // removing initial events from playerBoard cells
                for(let row of playerBoardRow){
                    let rowArr = row.getElementsByClassName('cell');
                    for(let cellItem of rowArr){
                        cellItem.onmouseover = null;
                        cellItem.onmouseout = null;
                        cellItem.onclick = null;
                    }
                }
                for(let row of computerBoardRows){
                    let rowArr = row.getElementsByClassName('cell');
                    for(let cellItem of rowArr){
                        cellItem.onmouseover = oneCellOver(Array.from(rowArr));
                        cellItem.onmouseout = oneCellOut(Array.from(rowArr));
                        cellItem.onclick = oneCellFill(Array.from(rowArr), secondPlayerBoard);
                    }
                }
            }   
        }
    }
}

// setting events on each cell
for(let row of playerBoardRow){
    let cells = row.getElementsByClassName('cell'); //get every cell from every row
    for(let elem of cells){
        let cellsArr = Array.from(cells);

        elem.onmouseover = borderOver(cellsArr, playerBoardRow);
        elem.onmouseout = borderOut(cellsArr, playerBoardRow);
        elem.onclick = fillBorder(cellsArr, playerBoardRow);
    }
}



// 1. Расставление по очереди +
// 2. Выбор ячейки для поподания +
// 3. Проверка на поподание +
// 4. Изменение вида ячйек +
// 5. Конец игры при уничтожении+

// 1. Очередность+
// 2. Нужно понять как менять очередность динамически и при клике на ячейку, 
// сейчас проблема в том что ты вызываешь поочередность только один раз.
// нужно вызывать ее при срабатывании функции oneCellFill+

// неправильно сравнение x и • на первой доске +

// make random cell selection