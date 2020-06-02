type ClassNames = {
  [className: string]: boolean
}

export function filterClassNames(classnames: ClassNames) {
  return Object.keys(classnames)
    .filter(key => classnames[key])
    .join(' ')
}
