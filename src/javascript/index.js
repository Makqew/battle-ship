import {gameBoard} from './gameBoard'
import {ship} from './ship'
import {player} from './player'


//CREATING THE GAMEBOARD DYNAMICALLY
// let cell = document.createElement('div');
// cell.classList.add('cell');

// let row = document.createElement('div');
// row.classList.add('row');

// let column = document.createElement('div');
// column.classList.add('column');

// for(let i = 0; i < 4; i++){
//     for(let j = 0; j < 4; j++){
//         row.appendChild(cell)
//     }
//     column.appendChild(row)
// }

// let main = document.querySelector('#player1');
// main.appendChild(column)

// let nameOfPlayer = prompt('give a name');
// alert(nameOfPlayer);

let i = 0; //orede
let ship1 = ship(3,0,false, 'vertical');
let ship2 = ship(3,0,false, 'horizontal');

// let player1 = player(nameOfPlayer,ship1,1)

let playerBoard = document.getElementById('player');
let playerBoardRow = playerBoard.getElementsByClassName('row');


let computerBoard = document.getElementById('computer');
let computerBoardRow = computerBoard.getElementsByClassName('row');

function gameStart(x, y){
    let firstPlayerBoard = gameBoard(ship1, [y, x]);// placing it in database
    let secondPlayerBoard = gameBoard(ship2, [1,0]);// placing it in manually
    console.log("Y:" + y + ", " + "X:"+ x)
    console.log(firstPlayerBoard.board)
    console.log(secondPlayerBoard.board)

    // removing events from playerBoard cells
    for(let row of playerBoardRow){
        let divArr = row.getElementsByClassName('cell');
        for(let item of divArr){
            item.onmouseover = null;
            item.onmouseout = null;
        }
    }
    for(let row of computerBoardRow){
        let divArr = row.getElementsByClassName('cell');
        for(let item of divArr){
            item.onmouseover = oneCellOver(Array.from(divArr));
            item.onmouseout = oneCellOut(Array.from(divArr));
            item.onclick = oneCellFill(Array.from(divArr), secondPlayerBoard);
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

function oneCellFill(cellElement, playerVal){ // THERE IS THE PROBLEM
    return function(event){
        let positionX = cellElement.indexOf(event.currentTarget);
        let positionY = this.parentNode.getElementsByClassName('char')[0].innerHTML-1;
        
        if(playerVal.board[positionX][positionY] == 1){
            console.log("hit");
            cellElement[positionX].innerHTML = "X";
            // ship1.hit();
            playerVal.receiveAttack(positionX, positionY);

        } else{
            console.log("miss")
            cellElement[positionX].innerHTML = "•";

        }
        cellElement[positionX].style.backgroundColor = "red";
        
        // starting the game
        do{
            if(i%2 === 0 ){
                console.log('First')
            } else{
                console.log('Second')
            }

        }while(ship1.sunk == true || ship2.sunk == true || i == 16);
        i++;
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
        let counterY = positionY


        // console.log(cellElement.length - positionY >= ship1.numOfCells)
        // console.log(firstPlayerBoard)
        console.log(ship1)

        if(ship1.direction == 'horizontal'){
            if(cellElement.length - positionX >= ship1.numOfCells){// checking if the ship is fit into the board BY X
                for(let i = 0; i < ship1.numOfCells; i++){
                    cellElement[counterX].style.backgroundColor = "red";
                    counterX += 1;
                }
                gameStart(positionX, positionY);
            }
        } else {
            if(cellElement.length - positionY >= ship1.numOfCells){// checking if the ship is fit into the board BY Y
                counterX += 1; // since the count starts from 0 but we need to choose first element
                for(let j = 0; j < ship1.numOfCells; j++){
                    rowElement[counterY].children[counterX].style.backgroundColor = "red";// First we choose the row then the cell in that row
                    counterY += 1;
                }
                gameStart(positionX, positionY);
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



// 1. Расставление по очереди
// 2. Выбор ячейки для поподания
// 3. Проверка на поподание
// 4. Изменение вида ячйек
// 5. Конец игры при уничтожении