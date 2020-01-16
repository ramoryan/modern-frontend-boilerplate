/* globals DocumentFragment */

// https://reactjs.org/docs/jsx-in-depth.html
// https://reactjs.org/docs/dom-elements.html#html-attributes

type TChild = (string | number | HTMLElement | DocumentFragment | null | undefined)
type TChildren = TChild[]

const FRAGMENT = 'fragment'

function createFragmentFrom (children): DocumentFragment {
  const fragment = document.createDocumentFragment()

  function processDOMNodes (child): void {
    if (
      child instanceof HTMLElement ||
      child instanceof DocumentFragment
    ) {
      fragment.appendChild(child)
    }
    else if (typeof child === 'string' || typeof child === 'number') {
      const c = typeof child === 'number' ? `${ child }` : child
      const textnode = document.createTextNode(c)
      fragment.appendChild(textnode)
    }
    else if (Array.isArray(child)) {
      child.forEach(processDOMNodes)
    }
    else if (child === false || child === null) {
      // { false && <Elem /> } VAGY { x ? <Elem /> : false }
      // { null && <Elem /> } VAGY  { x ? <Elem /> : null }
    }
    else if (__DEV__) {
      console.error('[JSX-RENDER]', child, 'nem appendelhető!')
    }
  }

  children.forEach(processDOMNodes)

  return fragment
}

interface IDangerous {
  __html: string
}

interface IProps {
  [propName: string]: any
  style: object
  className: string
  dangerouslySetInnerHTML: IDangerous
  onClick (e: Event): void
}

function createElements (tagName: string, props: IProps, children: TChildren): HTMLElement {
  const element = document.createElement(tagName)

  if (children.length) {
    const fragment = createFragmentFrom(children)
    element.appendChild(fragment)
  }

  Object.keys(props || {}).forEach((prop) => {
    const value = props[prop]

    if (prop === 'style') {
      if (typeof value === 'object' && !Array.isArray(value)) {
        // <element style={ { prop: value } } />
        Object.assign(element.style, value)
      }
      else if (__DEV__) {
        console.error('[JSX-RENDER] style csak object lehet! Kapott adatok:', element, prop, value)
      }
    }
    else if (prop === 'className') {
      // <div className={ [ styles.a, styles.b ] } />
      // <div class="a b">
      if (Array.isArray(value)) {
        element.setAttribute('class', value.join(' '))
      }
      else {
        element.setAttribute('class', value)
      }
    }
    else if (prop === 'dangerouslySetInnerHTML') {
      // eslint-disable-next-line no-underscore-dangle
      element.innerHTML = (value as IDangerous).__html
    }
    else if (prop === 'onClick') {
      element.addEventListener('click', value)
    }
    else if (prop === 'onDblClick') {
      element.addEventListener('dblclick', value)
    }
    else if (prop === 'onChange') {
      element.addEventListener('change', value)
    }
    else if (prop === 'onLoad') {
      element.addEventListener('load', value)
    }
    else if (prop === 'htmlFor') {
      element.setAttribute('for', value)
    }
    else if (prop === 'spellCheck') {
      element.setAttribute('spellcheck', value)
    }
    else if (prop !== 'children') {
      // minden mást sima attribútumként kezelünk
      element.setAttribute(prop, value)
    }
  })

  return element
}

// TODO: ideiglenesen `d` betű, amíg a tankerpluszos `dom`-ot ki nem írtjuk
export default function d (element: string | Function, props: IProps, ...children): HTMLElement | DocumentFragment {
  if (typeof element === 'string') { // ez maradjon így, ne 'is' -t használj!
    return createElements(element, props, children)
  }

  const newProps = Object.assign({}, props, { children })
  const result = element(newProps)

  if (result === FRAGMENT) {
    return createFragmentFrom(children)
  }

  return result
}

export const Fragment = (): string => (FRAGMENT)
