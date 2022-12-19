console.log('hi');
export const ship = (length, numOfHits, sunk) => {
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
    return {length, get numOfHits(){return numOfHits}, get sunk(){return sunk}, hit}
}
const black = ship(4,0,false)
// black.hit();
// black.hit();

// console.log(black)