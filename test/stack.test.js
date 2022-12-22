import {gameBoard, ship} from '../src/javascript/index'

describe('Ship', () => {
    const white = ship(4, 2, false, 'vertical')
    test('Hitting the ship', () => {
        white.hit()
        expect(white.numOfHits).toBe(3)
    })
    test('Sunk or not', () => {
        white.hit()
        expect(white.sunk).toBe(true)
    })
    test('Placement', () => {
        expect(white.shipData).toStrictEqual([[1],[1],[1],[1]])
    })
})

describe('GameBoard', () => {
    const black = ship(4,0,false, 'vertical');
    const board1 = gameBoard(black);
    test('placement',() => {
        expect(board1.board).toStrictEqual([['x', 'x', 'x', 'x'],['x', 'x', 'x', 'x'],[1, 'x', 'x', 'x'],[1, 'x', 'x', 'x']])
    })
    test('inapropriate placing', () => {
        expect(board1.getTooBig()).toBe(true)
    })
})