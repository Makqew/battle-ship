export const ship = (numOfCells, numOfHits, sunk, direction) => {
    const hit = () => {
        numOfHits += 1
        isSunk()
    }
    const isSunk = () => {
        if(numOfHits >= numOfCells){
            sunk = true;
        } else {
            sunk = false;
        }
    }
    return {numOfCells, get numOfHits(){return numOfHits}, get sunk(){return sunk}, direction, hit}
}