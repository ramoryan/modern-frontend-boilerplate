// Azért van külön fájlban, mert lehet, hogy idővel cserélünk polyfill-t, vagy más beállítások is kellenek.
// A @common/common -ban is behúzzuk, de más-más helyeken egyedileg is lehet, hogy importálva van.
// Közvetlenül a node_modules-ból NE importálj customElements polyfill-t!

import '@webcomponents/custom-elements'
import '@webcomponents/custom-elements/src/native-shim.js' // mert ES5-re buildelünk, de ezt meg kéne vizsgálni
