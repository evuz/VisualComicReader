type ClassNames = {
  [className: string]: boolean
}
type ClassNamesArgs = ClassNames | Array<string | null>

export function filterClassNames (classnames: ClassNamesArgs) {
  if (!classnames || typeof classnames !== 'object') {
    throw Error('classnames must be an object')
  }

  if (Array.isArray(classnames)) {
    return classnames
      .reduce(
        (acc, classname) => (classname ? acc.concat(classname) : acc),
        [] as string[]
      )
      .join(' ')
  }

  return Object.keys(classnames)
    .filter((key) => classnames[key])
    .join(' ')
}
