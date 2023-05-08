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
let ship1 = ship(3,0,false, 'vertical');
let ship2 = ship(3,0,false, 'vertical');

// let player1 = player(nameOfPlayer,ship1,1)

let playerBoard = document.getElementById('player');
let boardRow = playerBoard.getElementsByClassName('row');

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

//placing the ship
function fillBorder(cellElement, rowElement){
    return function(event){
        console.log("cellElement:")
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
                gameStart();
            }
        } else {
            if(cellElement.length - positionY >= ship1.numOfCells){// checking if the ship is fit into the board BY Y
                counterX += 1; // since the count starts from 0 but we need to choose first element
                for(let j = 0; j < ship1.numOfCells; j++){
                    rowElement[counterY].children[counterX].style.backgroundColor = "red";// First we choose the row then the cell in that row
                    counterY += 1;
                }
                gameStart();
            }
            
            
        }

        function gameStart(){
            
            // removing events from cells
            for(let row of boardRow){
                let divArr = row.getElementsByClassName('cell');
                for(let item of divArr){
                    // item.onclick = oneCellBorder(divArr);
                    item.onmouseover = null;
                    item.onmouseout = null;
                }
            }
            // DONT NEED THAT???
            // function oneCellBorder(cellElement){
            //     return function(event){
            //         console.log(cellElement)
            //         let positionX = cellElement.indexOf(event.currentTarget);

            //         cellElement[positionX].style.border = "1px solid red";//need to attach it to second board
            //     }
            // }

            let firstPlayerBoard = gameBoard(ship1, [positionY,positionX]);// placing it in database
            let secondPlayerBoard = gameBoard(ship2, [0,0]);// placing it in manually
            console.log("X:"+ positionX + ", " + "Y:" + positionY)
            console.log(firstPlayerBoard.board)
            console.log(secondPlayerBoard.board)


            // starting the game
            let i = 0;
            do{
                if(i%2 === 0 ){
                    console.log('First')
                } else{
                    console.log('Second')
                    ship1.hit();
                }
                i++;
            }while(ship1.sunk == false)
        }

    }
}

// setting events on each cell
for(let row of boardRow){
    let cells = row.getElementsByClassName('cell'); //get every cell from every row
    for(let elem of cells){
        let cellsArr = Array.from(cells);

        elem.onmouseover = borderOver(cellsArr, boardRow);
        elem.onmouseout = borderOut(cellsArr, boardRow);
        elem.onclick = fillBorder(cellsArr, boardRow);
    }
}



// 1. Расставление по очереди
// 2. Выбор ячейки для поподания
// 3. Проверка на поподание
// 4. Изменение вида ячйек
// 5. Конец игры при уничтожении