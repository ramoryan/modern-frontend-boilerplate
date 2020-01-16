export default function log (...params): void {
  if (__DEV__) {
    console.log(...params)
  }
}
