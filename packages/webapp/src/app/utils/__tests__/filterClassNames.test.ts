import { filterClassNames } from '../filterClassNames'

describe('filterClassNames', () => {
  test('should return string', () => {
    const classnames = filterClassNames({
      Test: true,
      Function: true,
    })

    expect(typeof classnames).toBe('string')
  })

  test('should filter class which value to be false', () => {
    let classnames = filterClassNames({
      Test: true,
      Function: false,
    })
    expect(classnames).toBe('Test')

    classnames = filterClassNames({
      Test: false,
      Function: true,
    })
    expect(classnames).toBe('Function')

    classnames = filterClassNames({
      Test: true,
      Function: true,
    })
    expect(classnames).toBe('Test Function')

    classnames = filterClassNames({
      Test: false,
      Function: false,
    })
    expect(classnames).toBe('')
  })

  test('should accept array', () => {
    let classnames = filterClassNames(['Test', 'Function'])
    expect(classnames).toBe('Test Function')

    classnames = filterClassNames(['', 'Function'])
    expect(classnames).toBe('Function')

    classnames = filterClassNames(['Test', null])
    expect(classnames).toBe('Test')
  })

  test('should throw error classnames is not an object', () => {
    function error(param: any) {
      return () => filterClassNames(param)
    }

    expect(error(null)).toThrowError()
    expect(error('class')).toThrowError()
  })
})
