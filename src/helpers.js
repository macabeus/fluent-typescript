const fromEntries = (iterable) =>
  [...iterable].reduce((obj, [key, val]) => {
    obj[key] = val
    return obj
  }, {})

export { fromEntries }
