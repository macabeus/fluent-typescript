const fromEntries = <T extends Array<[string, T[0][1]]>>(iterable: T) =>
  [...iterable].reduce((obj, [key, val]) => {
    obj[key] = val
    return obj
  }, {} as { [key in string]: T[0][1] })

export { fromEntries }
