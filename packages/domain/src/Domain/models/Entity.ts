function mapToPlainObject(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = obj[key]
    if (acc[key] instanceof Entity) acc[key] = acc[key].toJSON()
    if (acc[key] instanceof Object) acc[key] = mapToPlainObject(acc[key])
    return acc
  }, <any>(Array.isArray(obj) ? [] : {}))
}

function readonlyObject(obj = {}) {
  const handler = {
    set() {
      throw Error('You cant modify a readonly object')
    },
    get(obj, prop) {
      const el = obj[prop]
      if (el instanceof Object) return readonlyObject(el)
      return el
    },
  }
  return new Proxy(obj, handler)
}

export abstract class Entity<T> {
  private __properties: string[]

  constructor(obj: T) {
    if (!obj) {
      throw Error('Cannot initialize an Entity as null')
    }
    const keys = Object.keys(obj || {})
    keys.forEach((key) => {
      this[key] = obj[key]
    })
    Object.defineProperty(this, '__properties', {
      value: keys,
      writable: false,
      enumerable: false,
      configurable: false,
    })
  }

  toJSON(readonly = true): T {
    const obj = mapToPlainObject(
      this.__properties.reduce((obj, key) => {
        obj[key] = this[key]
        return obj
      }, <T>{})
    )
    return readonly ? readonlyObject(obj) : obj
  }
}
