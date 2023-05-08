import {gameBoard} from '../src/javascript/gameBoard'
import {ship} from '../src/javascript/ship'
import {player} from '../src/javascript/player'



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
})

describe('GameBoard placement', () => {
    const player1 = ship(4,0,false, 'vertical');
    const board1 = gameBoard(player1, [2,0]);


    test('Placement vertical ship',() => {
        expect(board1.board).toStrictEqual([['o', 'o', 'o', 'o'],['o', 'o', 'o', 'o'],[1, 'o', 'o', 'o'],[1, 'o', 'o', 'o']])
    })
    test('An appropriate placing of vertical ship', () => {
        expect(board1.getTooBig()).toBe(true)
    })

    const player2 = ship(2,0,false, 'horizontal');
    const board2 = gameBoard(player2, [2,0]);
    test('Placement horizontal ship',() => {
        expect(board2.board).toStrictEqual([['o', 'o', 'o', 'o'],['o', 'o', 'o', 'o'],[1, 1, 'o', 'o'],['o', 'o', 'o', 'o']])
    })
    test('inappropriate placing of horizontal ship', () => {
        expect(board2.getTooBig()).toBe(false)
    })
})

describe('GameBoard receiving attack for the first time', () => {
    const player2 = ship(2,0,false, 'horizontal');
    const board2 = gameBoard(player2, [2,0]);
    
    board2.receiveAttack(2,3)
    test('Adding coordinates to history', () => {
        expect(board2.history).toStrictEqual([2,3])
    })
    test('Miss',() => {
        expect(board2.board).toStrictEqual([['o', 'o', 'o', 'o'],['o', 'o', 'o', 'o'],[1, 1, 'o', 'x'],['o', 'o', 'o', 'o']])
    })
})

describe('GameBoard receiving attack for the multiple time', () => {
    const player2 = ship(2,0,false, 'horizontal');
    const board2 = gameBoard(player2, [2,0]);
    
    board2.receiveAttack(2,3)
    board2.receiveAttack(2,1)
    board2.receiveAttack(2,0)
    test('Hit!',() => {
        expect(board2.board).toStrictEqual([['o', 'o', 'o', 'o'],['o', 'o', 'o', 'o'],['x', 'x', 'o', 'x'],['o', 'o', 'o', 'o']])
        expect(player2.numOfHits).toBe(2);
    })
    test('Is ship sunk?', () => {
        expect(player2.sunk).toBe(true)
    })
})

