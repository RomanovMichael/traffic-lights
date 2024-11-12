export const debounce = (func, ms) => {
  let t

  return function () {
    clearTimeout(t)
    t = setTimeout(() => func.apply(this, arguments), ms)
  }
}
