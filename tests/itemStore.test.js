import { setActivePinia, createPinia } from 'pinia'
import { useItemStore } from '../src/stores/itemStore'

describe('itemStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('勝者にスコアが加算されること', () => {
    const store = useItemStore()

    store.results = [
      { id: 1, name: 'A', score: 0 },
      { id: 2, name: 'B', score: 0 },
    ]
    store.currentPair = [store.results[0], store.results[1]]

    store.registerWin(1)

    expect(store.results[0].score).toBe(1)
    expect(store.results[1].score).toBe(0)
    expect(store.matchCount).toBe(1)
  })

  it('引き分けで両者に0.5加算されること', () => {
    const store = useItemStore()

    store.results = [
      { id: 1, name: 'A', score: 0 },
      { id: 2, name: 'B', score: 0 },
    ]
    store.currentPair = [store.results[0], store.results[1]]

    store.registerWin(null)

    expect(store.results[0].score).toBe(0.5)
    expect(store.results[1].score).toBe(0.5)
    expect(store.matchCount).toBe(1)
  })
})
