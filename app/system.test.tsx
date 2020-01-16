describe('Rendszer-szintű tesztek', () => {
  test('tsx', () => {
    const div = <div />
    expect(div instanceof HTMLElement).toBeTruthy()
  })

  test('customElements', () => {
    class MyComponent extends HTMLElement {
      public connectedCallback (): void {
        this.appendChild(<div />)
      }
    }

    customElements.define('my-component', MyComponent)

    const mc = <my-component />

    expect(mc instanceof HTMLElement).toBeTruthy()
    expect(mc instanceof HTMLUnknownElement).not.toBeTruthy() // Ha rossz a polyfill, akkor ezen elhasal.
  })

  test('log', () => {
    expect(typeof log).toBe('function')
  })
})
