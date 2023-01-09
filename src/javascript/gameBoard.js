export const gameBoard = (shipPlayer, position) => {
    let board = [['o', 'o', 'o', 'o'],['o', 'o', 'o', 'o'],['o', 'o', 'o', 'o'],['o', 'o', 'o', 'o']];
    let tooBig = false;

    let history = [];
    
    if(shipPlayer.direction == 'vertical'){
        for(let i = 0; i < shipPlayer.numOfCells; i++){
            // нужно чтобы shipPlayer.numOfCells пршелся от 0 до конца
            // нужно проверять каждый селл на то что он ставится на не нулевое место(то есть не после конца массива)
            // проверка начинается с позиции j котрую мы выбираем, тоесть не всегда начинается с 0 

            let j = i + position[0]; // since it is vertical then only change the first value
            let k = position[1];

            if(board[j]?.[k] != null){
            // the operator ?. checks if board[j] is not null(if not it will check the board[j][k], the next level of arr)
            // if it so then it will return undefined or null
                board[j][k] = 1;
            }
            else{
                tooBig = true;
                i = shipPlayer.numOfCells
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
            // the operator ?. checks if board[j] is not null(if not it will check the board[j][k], the next level of arr)
            // if it so the it will return undefined or null
                board[j][k] = 1;
            }
            else{
                tooBig = true;
                i = shipPlayer.numOfCells
            }
        }
    }

    const getTooBig = () => {return tooBig};

    const receiveAttack = (x, y) => {
        let hitted = false;

        // checking if the coordinates was already been hitted
        for(let i = 0; i < history.length; i++){
            if(history[i][0] == x && history[0][1] == y){ hitted = true; }
        }

        // checkin if not hitted before or this is the first time
        if(hitted == false || history.length == 0){
            if(board[x][y] == 1){
                shipPlayer.hit();
            } else{
                console.log('Miss')
            }
            // save used coordinates 
            history.push(x,y);
            board[x][y] = 'x'
        }
        else{
            console.log('Already hitted here, choose another coordinates');
        } 
    }

    return {get board(){return board}, getTooBig, receiveAttack, get history(){ return history}}
}