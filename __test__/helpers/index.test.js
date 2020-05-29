import { randomNumber } from '../../helpers/'

jest.mock('axios')
describe('helpers:randomNumber', () => {
  it('must return a number less or equal than 5', async () => {
    const response = randomNumber(5)
    expect(response <= 5).toBeTruthy()
  })

  it('must be greater than 0', async () => {
    const response = randomNumber(0)
    expect(response > 0).toBeTruthy()
  })
})
