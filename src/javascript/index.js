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
for(let row of boardRow){
    let cells = row.getElementsByClassName('cell');
    for(let elem of cells){
        elem.addEventListener('mouseover', (event) => {
            // event.currentTarget.style.backgroundColor = "red"
            // console.log(Array.from(boardRow).indexOf(event.currentTarget.parentNode)) // position of row
            // console.log(Array.from(cells).indexOf(event.currentTarget)) // position of column
            let currentPosition = Array.from(cells).indexOf(event.currentTarget);
            let cellsArr = Array.from(cells);
            for(let i = 0; i < ship1.numOfCells; i++){
                cellsArr[currentPosition].style.backgroundColor = "red";
                currentPosition += 1;
            }
        })
        elem.addEventListener('mouseout', (event) => {
            let currentPosition = Array.from(cells).indexOf(event.currentTarget);
            let cellsArr = Array.from(cells);
            for(let i = 0; i < ship1.numOfCells; i++){
                cellsArr[currentPosition].style.backgroundColor = "black";
                currentPosition += 1;
            }
            
        })
    }
}
