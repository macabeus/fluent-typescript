const fromEntries = <T extends Array<[string, T[0][1]]>>(iterable: T) =>
  [...iterable].reduce((obj, [key, val]) => {
    obj[key] = val
    return obj
  }, {} as { [key in string]: T[0][1] })

const chunk = <T extends Array<unknown>>(array: T, size: number): T[] =>
  Array
    .apply(0, { length: Math.ceil(array.length / size) })
    .map((_: unknown, index: number) => array.slice(index * size, (index + 1) * size))

export { fromEntries, chunk }
