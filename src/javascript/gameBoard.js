export const gameBoard = (shipPlayer, position) => {
    let board = [['o', 'o', 'o', 'o'],['o', 'o', 'o', 'o'],['o', 'o', 'o', 'o'],['o', 'o', 'o', 'o']];
    let tooBig = false;

    let history = [];
    
    if(shipPlayer.direction == 'vertical'){
        for(let i = 0; i < shipPlayer.numOfCells; i++){
            // нужно чтобы shipPlayer.numOfCells пршелся от 0 до конца
            // нужно проверять каждый селл на то что он ставится на не нулевое место или не после конца массива
            // проверка начинается с позиции j котрую мы выбираем, тоесть не всегда начинается с 0 

            let j = i + position[0]; // since it is vertical then only change the first value
            let k = position[1];

            if(board[j]?.[k] != null){
            // operator "?." checks if "board[j]"(row) is not null(if not it will check the "board[j][k]" (every cell), the next level of arr)
                board[j][k] = 1; //placing 1
            }
            else{// if it so then it will return undefined or null. OR too big in our case
                tooBig = true;
                i = shipPlayer.numOfCells // goes to the end to stop the loop
            }
        }  
    }else {
        for(let i = 0; i < shipPlayer.numOfCells; i++){
            // нужно чтобы shipPlayer.numOfCells пршелся от 0 до конца
            // нужно проверять каждый селл на то что он ставится не не нулевое место(то есть не после конца массива)
            // проверка начинается с позиции k котрую мы выбираем, тоесть не всегда начинается с 0 

            let j = position[0]; 
            let k = i + position[1]; // since it is horizontal then only change the second value

            if(board[j]?.[k] != null){
            // the operator "?."" checks if "board[j]"(column) is not null(if not it will check the board[j][k], the next level of arr)
                board[j][k] = 1;
            }
            else{// if it so then it will return undefined or null. OR too big in our case
                tooBig = true;
                i = shipPlayer.numOfCells // goes to the end to stop the loop
            }
        }
    }

    const getTooBig = () => {return tooBig};

    const receiveAttack = (x, y) => {
        let hitted = false;

        // checking if the coordinates was already been the ones that hitted
        for(let i = 0; i < history.length; i++){
            if(history[i][0] == x && history[i][1] == y){ hitted = true; }
        }

        // checkin if there was not hitted coordinates before or this is the first time
        if(hitted == false || history.length == 0){
            if(board[y][x] == 1){
                shipPlayer.hit();
            } else{
                console.log('Miss')
            }
            // save used coordinates 
            history.push(y,x);
            board[y][x] = 'x'
        }
        else{
            console.log('Already hitted here, choose another coordinates');
        } 
    }

    return {get board(){return board}, getTooBig, receiveAttack, get history(){ return history}}
}