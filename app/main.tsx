import styles from './main.css'

import './customElements'

const root = document.querySelector('#root') as HTMLElement

root.appendChild(
  <div className={ styles.test }>Ez egy teszt!</div>
)
