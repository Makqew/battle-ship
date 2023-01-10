import {gameBoard} from './gameBoard'
import {ship} from './ship'
import {player} from './player'

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
let ship1 = ship(3,0,false, 'horizontal')
// let player1 = player(nameOfPlayer,ship1,1)

let playerBoard = document.getElementById('player');
let boardRow = playerBoard.getElementsByClassName('row');

const borderOver = (cellElement, rowElement) => {
    return function (event){
        let positionX = cellElement.indexOf(event.currentTarget);
        let positionY = this.parentNode.getElementsByClassName('char')[0].innerHTML-1;// getting position by div with class "char"
        if(ship1.direction == 'horizontal'){
            if(cellElement.length - positionX >= ship1.numOfCells){
                for(let i = 0; i < ship1.numOfCells; i++){
                    cellElement[positionX].style.border = "1px solid red";
                    positionX += 1;
                }
            }
            
        } else {
            if(cellElement.length - positionY >= ship1.numOfCells){// checking if the ship is fit into the board
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

function borderOut(cellElement, rowElement){
    return function (event){
        let positionX = cellElement.indexOf(event.currentTarget);
        let positionY = this.parentNode.getElementsByClassName('char')[0].innerHTML-1;// getting position by div with class "char"

        if(ship1.direction == 'horizontal'){
            if(cellElement.length - positionX >= ship1.numOfCells){// checking if the ship is fit into the board
                for(let i = 0; i < ship1.numOfCells; i++){
                    cellElement[positionX].style.border = "1px solid white";
                    positionX += 1;
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

for(let row of boardRow){
    let cells = row.getElementsByClassName('cell');
    for(let elem of cells){
        let cellsArr = Array.from(cells);

        elem.onmouseover = borderOver(cellsArr, boardRow);
        elem.onmouseout = borderOut(cellsArr, boardRow);
        elem.onclick = fillBorder(cellsArr, boardRow);
    }
}

function fillBorder(cellElement, rowElement){
    return function(event){
        let positionX = cellElement.indexOf(event.currentTarget);
        let positionY = this.parentNode.getElementsByClassName('char')[0].innerHTML-1;// getting position by div with class "char"

        let positionAxis = positionX;
        // console.log(cellElement.length - positionY >= ship1.numOfCells)
        let firstPlayerBoard = gameBoard(ship1, [positionY,positionX]);// placing it in database
        // console.log(firstPlayerBoard.board)

        if(ship1.direction == 'horizontal'){
            positionAxis = positionX;
            if(cellElement.length - positionX >= ship1.numOfCells){// checking if the ship is fit into the board
                for(let i = 0; i < ship1.numOfCells; i++){
                    cellElement[positionX].style.backgroundColor = "red";
                    positionX += 1;
                }
                // removing events from cells
                for(let row of boardRow){
                    let divArr = row.getElementsByClassName('cell');
                    for(let item of divArr){
                        item.onclick = null
                        item.onmouseover = null
                        item.onmouseout = null
                    }
                }
            }
            
        } else {
            positionAxis = positionY;
            if(cellElement.length - positionY >= ship1.numOfCells){// checking if the ship is fit into the board
                positionX += 1; // since the count starts from 0 but we need to choose first element
                for(let j = 0; j < ship1.numOfCells; j++){
                    rowElement[positionY].children[positionX].style.backgroundColor = "red";// First we choose the row then the cell in that row
                    positionY += 1;
                }

                // removing events from cells
                for(let row of boardRow){
                    let divArr = row.getElementsByClassName('cell');
                    for(let item of divArr){
                        item.onclick = null
                        item.onmouseover = null
                        item.onmouseout = null
                    }
                }
            }
            
            
        }

    }
}

