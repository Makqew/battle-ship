import {gameBoard} from './gameBoard'
import {ship} from './ship'
import {player} from './player'

let ship1 = ship(3,0,false, 'vertical');
let ship2 = ship(3,0,false, 'horizontal');


let playerBoard = document.getElementById('player');
let playerBoardRows = playerBoard.getElementsByClassName('row');


let computerBoard = document.getElementById('computer');
let computerBoardRows = computerBoard.getElementsByClassName('row');


let firstPlayerBoard = [];
let secondPlayerBoard = [];

function endGame(){
    if(ship1.sunk == true){
        alert('Computer is the winner');
    }else if(ship2.sunk == true){
        alert('Player1 is the winner');
    }

    //removing events from the first board
    for(let row of playerBoardRows){
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

function hitOrMiss(){
    if(firstPlayerBoard.board[randomY][randomX] == 1){
        console.log("hit");
        rowCellsArr[randomX].innerHTML = "X";

        firstPlayerBoard.receiveAttack(randomX, randomY); // к одному виду привести места X и Y


        if(ship1.sunk == true || ship2.sunk == true){
            endGame();
        }
    }else{
        console.log("miss")
        return rowCellsArr[randomX].innerHTML = "•";
    }
}


function computerPlayer(randomY, randomX){
    let rowCells = playerBoardRows[randomY].getElementsByClassName('cell');
    let rowCellsArr = Array.from(rowCells);


    rowCellsArr[randomX].style.color = "red";// send to CSS


    // recursion until computer finds empty cell
    if(rowCellsArr[randomX].innerHTML == ""){
        // If computer has hit or miss
        if(firstPlayerBoard.board[randomY][randomX] == 1){
            console.log("hit");
            rowCellsArr[randomX].innerHTML = "X";

            firstPlayerBoard.receiveAttack(randomX, randomY); // к одному виду привести места X и Y


            if(ship1.sunk == true || ship2.sunk == true){
                endGame();
            }
        }else{
            console.log("miss")
            return rowCellsArr[randomX].innerHTML = "•";
        }
    }else{
        let randomRow = Math.random() * 4;
        let randomRowInt = Math.floor(randomRow);
        let randomCell = Math.random() * 4;
        let randomCellInt = Math.floor(randomCell);

        return computerPlayer(randomRowInt,randomCellInt);
    }
}


//after game starts
//to border over one cell
function cellOver(cellElement){
    return function(event){
        let positionX = cellElement.indexOf(event.currentTarget);
        cellElement[positionX].style.border = "1px solid red";
    }
}

function cellOut(cellElement){
    return function(event){
        let positionX = cellElement.indexOf(event.currentTarget);
        cellElement[positionX].style.border = "1px solid white";
    }
}

function cellFill(cellElement, playerVal){
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
                // console.log(playerVal.board);
            } else{
                console.log("miss")
                cellElement[positionX].innerHTML = "•";
            }

            cellElement[positionX].style.border = "1px solid red";
            cellElement[positionX].style.color = "red"; //send to CSS
            
            
            if(ship1.sunk == false && ship2.sunk == false){
                computerPlayer(1,1);     
            }else{endGame()} 
        }
        else{
            alert("cell already have been chosen");
        }
    }
}

//before game starts
//to show the cell placement prototype
const shipOver = (cellElement, rowElement) => {
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

//to make the cell default after "shipOver" function
function shipOut(cellElement, rowElement){
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
function placeShip(cellElement, rowElement){
    return function(event){
        let positionX = cellElement.indexOf(event.currentTarget);
        let positionY = this.parentNode.getElementsByClassName('char')[0].innerHTML-1;// getting position by div with class "char"

        // need this 2 vars to not to change the initial positions
        let counterX = positionX;
        let counterY = positionY;


        if(ship1.direction == 'horizontal'){
            if(cellElement.length - positionX >= ship1.numOfCells){// checking if the ship is fit into the board BY X
                for(let i = 0; i < ship1.numOfCells; i++){
                    cellElement[counterX].style.backgroundColor = "#fbadad";
                    counterX += 1;
                }
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


                // removing initial events from playerBoard cells
                for(let row of playerBoardRows){
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
                        cellItem.onmouseover = cellOver(Array.from(rowArr));
                        cellItem.onmouseout = cellOut(Array.from(rowArr));
                        cellItem.onclick = cellFill(Array.from(rowArr), secondPlayerBoard);
                    }
                }
            }   
        }
    }
}

// setting events on each cell for ship Placement
for(let row of playerBoardRows){
    let cells = row.getElementsByClassName('cell'); //get every cell from every row
    for(let elem of cells){
        let cellsArr = Array.from(cells);

        elem.onmouseover = shipOver(cellsArr, playerBoardRows);
        elem.onmouseout = shipOut(cellsArr, playerBoardRows);
        elem.onclick = placeShip(cellsArr, playerBoardRows);
    }
}



// 1. Расставление по очереди +
// 2. Выбор ячейки для поподания +
// 3. Проверка на поподание +
// 4. Изменение вида ячйек +
// 5. Конец игры при уничтожении+

// 1. Очередность+
// 2. Нужно понять как менять очередность динамически и при клике на ячейку, 
// сейчас проблема в том что ты вызываешь поочередность только один раз. +
// нужно вызывать ее при срабатывании функции cellFill+

// неправильно сравнение x и • на первой доске +

// make random cell selection +

// к одному виду привести места X и Y
// Ошибка: защитывает проигрышь только после клика
//сделать историю