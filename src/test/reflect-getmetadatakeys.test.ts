import { Reflect } from '..'

describe('Reflect.getMetadataKeys', () => {
  it('KeysInvalidTarget', () => {
    // 1. If Type(target) is not Object, throw a TypeError exception.
    expect(() => Reflect.getMetadataKeys(undefined, undefined)).toThrow(
      TypeError
    )
  })

  it('KeysWithoutTargetKeyWhenNotDefined', () => {
    let obj = {}
    let result = Reflect.getMetadataKeys(obj, undefined)
    expect(result).toEqual([])
  })

  it('KeysWithoutTargetKeyWhenDefined', () => {
    let obj = {}
    Reflect.defineMetadata('key', 'value', obj, undefined)
    let result = Reflect.getMetadataKeys(obj, undefined)
    expect(result).toEqual(['key'])
  })

  it('KeysWithoutTargetKeyWhenDefinedOnPrototype', () => {
    let prototype = {}
    let obj = Object.create(prototype)
    Reflect.defineMetadata('key', 'value', prototype, undefined)
    let result = Reflect.getMetadataKeys(obj, undefined)
    expect(result).toEqual(['key'])
  })

  it('KeysOrderWithoutTargetKey', () => {
    let obj = {}
    Reflect.defineMetadata('key1', 'value', obj, undefined)
    Reflect.defineMetadata('key0', 'value', obj, undefined)
    let result = Reflect.getMetadataKeys(obj, undefined)
    expect(result).toEqual(['key1', 'key0'])
  })

  it('KeysOrderAfterRedefineWithoutTargetKey', () => {
    let obj = {}
    Reflect.defineMetadata('key1', 'value', obj, undefined)
    Reflect.defineMetadata('key0', 'value', obj, undefined)
    Reflect.defineMetadata('key1', 'value', obj, undefined)
    let result = Reflect.getMetadataKeys(obj, undefined)
    expect(result).toEqual(['key1', 'key0'])
  })

  it('KeysOrderWithoutTargetKeyWhenDefinedOnPrototype', () => {
    let prototype = {}
    Reflect.defineMetadata('key2', 'value', prototype, undefined)
    let obj = Object.create(prototype)
    Reflect.defineMetadata('key1', 'value', obj, undefined)
    Reflect.defineMetadata('key0', 'value', obj, undefined)
    let result = Reflect.getMetadataKeys(obj, undefined)
    expect(result).toEqual(['key1', 'key0', 'key2'])
  })

  it('KeysWithTargetKeyWhenNotDefined', () => {
    let obj = {}
    let result = Reflect.getMetadataKeys(obj, 'name')
    expect(result).toEqual([])
  })

  it('KeysWithTargetKeyWhenDefined', () => {
    let obj = {}
    Reflect.defineMetadata('key', 'value', obj, 'name')
    let result = Reflect.getMetadataKeys(obj, 'name')
    expect(result).toEqual(['key'])
  })

  it('KeysWithTargetKeyWhenDefinedOnPrototype', () => {
    let prototype = {}
    let obj = Object.create(prototype)
    Reflect.defineMetadata('key', 'value', prototype, 'name')
    let result = Reflect.getMetadataKeys(obj, 'name')
    expect(result).toEqual(['key'])
  })

  it('KeysOrderAfterRedefineWithTargetKey', () => {
    let obj = {}
    Reflect.defineMetadata('key1', 'value', obj, 'name')
    Reflect.defineMetadata('key0', 'value', obj, 'name')
    Reflect.defineMetadata('key1', 'value', obj, 'name')
    let result = Reflect.getMetadataKeys(obj, 'name')
    expect(result).toEqual(['key1', 'key0'])
  })

  it('KeysOrderWithTargetKeyWhenDefinedOnPrototype', () => {
    let prototype = {}
    Reflect.defineMetadata('key2', 'value', prototype, 'name')
    let obj = Object.create(prototype)
    Reflect.defineMetadata('key1', 'value', obj, 'name')
    Reflect.defineMetadata('key0', 'value', obj, 'name')
    let result = Reflect.getMetadataKeys(obj, 'name')
    expect(result).toEqual(['key1', 'key0', 'key2'])
  })
})
