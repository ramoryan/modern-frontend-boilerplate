/* eslint-disable no-underscore-dangle */
/* globals Element, DocumentFragment */

// EZ KELL a customElements-hez!
require('./node_modules/mutationobserver-shim/dist/mutationobserver.min.js')
require('./node_modules/document-register-element/build/document-register-element.node.js')

// Ezzel oldjuk meg, hogy appendeléskor a gyermeknek ha van connectedCallback-je, akkor az meghívódjon
Element.prototype.__connected = false

function mockAppend (base) {
  const append = base.prototype.appendChild
  base.prototype.appendChild = function () {
    append.apply(this, arguments)

    const el = arguments[0]
    if (el instanceof HTMLElement && typeof el.connectedCallback === 'function' && !el.__connected) {
      el.connectedCallback()
      el.__connected = true
    }
  }
}

mockAppend(Element)
mockAppend(DocumentFragment)

const remove = Element.prototype.removeChild
Element.prototype.removeChild = function () {
  remove.apply(this, arguments)

  const el = arguments[0]
  if (el instanceof HTMLElement && typeof el.disconnectedCallback === 'function') {
    el.disconnectedCallback()
  }
}

jest.mock('@webcomponents/custom-elements', function () {})
jest.mock('@webcomponents/custom-elements/src/native-shim.js', function () {})

// HTMLMediaElement
// https://github.com/jsdom/jsdom/issues/2155
window.HTMLMediaElement.prototype.load = () => { /* do nothing */ }
window.HTMLMediaElement.prototype.play = () => { /* do nothing */ }
window.HTMLMediaElement.prototype.pause = () => { /* do nothing */ }
window.HTMLMediaElement.prototype.addTextTrack = () => { /* do nothing */ }

// https://stackoverflow.com/questions/39830580/jest-test-fails-typeerror-window-matchmedia-is-not-a-function
// https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
window.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }
})

// https://jestjs.io/docs/en/timer-mocks
jest.useFakeTimers()

require('require-context/register')

window.log   = require('./app/log').default

window.Fragment = require('./app/jsx-render').Fragment
window.d = require('./app/jsx-render').default
