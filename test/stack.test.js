import {ship} from '../src/javascript/index'

describe('Ship', () => {
    const white = ship(14, 12, false)
    test('Hitting the ship', () => {
        white.hit()
        expect(white.numOfHits).toBe(13)
    })
    test('Sunk or not', () => {
        white.hit()
        expect(white.sunk).toBe(true)
    })
})