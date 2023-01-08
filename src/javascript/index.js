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
let ship1 = ship(3,0,false, 'vertical')
// let player1 = player(nameOfPlayer,ship1,1)

let firstPlayerBoard = gameBoard(ship1, [3,0])
let playerBoard = document.getElementById('player');
let boardRow = playerBoard.getElementsByClassName('row');

const borderOver = (cellElement) => {
    return function (event){
        let currentPosition = cellElement.indexOf(event.currentTarget);
        for(let i = 0; i < ship1.numOfCells; i++){
            cellElement[currentPosition].style.border = "1px solid red";
            currentPosition += 1;
        }
    }   
}

function borderOut(cellElement){
    return function (event){
        let currentPosition = cellElement.indexOf(event.currentTarget);
        for(let i = 0; i < ship1.numOfCells; i++){
            cellElement[currentPosition].style.border = "1px solid white";
            currentPosition += 1;
        }
    }   
}


for(let row of boardRow){
    let cells = row.getElementsByClassName('cell');
    for(let elem of cells){
        let cellsArr = Array.from(cells);


        elem.addEventListener('mouseout', borderOut(cellsArr));
        elem.onmouseover = borderOver(cellsArr);
        elem.ononmouseout = borderOut(cellsArr);

        elem.onclick = fillBorder(cellsArr, borderOver(cellsArr));
    }
}

function fillBorder(cells, element){
    return function(event){
        let currentPosition = cells.indexOf(event.currentTarget);
        for(let i = 0; i < ship1.numOfCells; i++){
            cells[currentPosition].style.backgroundColor = "red";
            currentPosition += 1;
        }
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

