console.log('hi');
export const ship = (length, numOfHits, sunk, direction) => {
    let shipData = []
    const hit = () => {
        numOfHits += 1
        isSunk()
    }
    const isSunk = () => {
        if(numOfHits >= length){
            console.log('The ship is sunk!!!')
            sunk = true;
        } else {
            console.log('Still alive!')
        }
    }
    if(direction == 'vertical'){
        for(let i = 0; i < length; i++){
            shipData.push([1]);
        }
    } else {
        for(let i = 0; i < length; i++){
            shipData.push(1);
        }
    }
    return {length, get numOfHits(){return numOfHits}, get sunk(){return sunk},get direction(){return direction},shipData, hit}
}
// const black = ship(4,0,false)
// black.hit();
// black.hit();

// console.log(black)

export const gameBoard = (shipPlayer) => {
    let board = [['x', 'x', 'x', 'x'],['x', 'x', 'x', 'x'],['x', 'x', 'x', 'x'],['x', 'x', 'x', 'x']];
    let tooBig = false;
    const shipPlacement = [3,0];
    if(shipPlayer.direction == 'vertical'){
        for(let j = shipPlacement[0]; j < shipPlayer.length; j++){
            if(j < board.length){
                board[j][shipPlacement[1]] = 1;
            }else {
                tooBig = true;
            }    
        } 
    }else {
        for(let k = shipPlacement[1]; k < shipPlayer.length; k++){
            board[shipPlacement[0]][k] = 1;    
        }
    }

    const showBoard = () => {
        console.log(board)
    }

    return {board, get tooBig(){return tooBig}}
}