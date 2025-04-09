import { render, screen } from '@testing-library/vue'
import HelloWorld from '@/components/HelloWorld.vue'

test('名前が表示されること', () => {
  render(HelloWorld, { props: { name: 'Taro' } })
  expect(screen.getByText('Hello Taro')).toBeTruthy()
})
