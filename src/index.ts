import { Path, PathValue, pathSetImmutable } from 'object-standard-path'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Entity = { [key: string]: any }

export type Recipe<T extends EntityClass> = (entity: T) => T

class EntityClass<T extends Entity = object> {
  private entity: T

  constructor(entity: T) {
    this.entity = deepClone(entity)
  }

  set(changes: Partial<T>) {
    const clone = deepClone(this.entity)

    for (const key of Object.keys(changes) as (keyof typeof changes)[])
      clone[key as keyof typeof clone] = changes[
        key
      ] as (typeof clone)[keyof typeof clone]

    return new EntityClass(clone)
  }

  setPath<P extends Path<T, ''>>(path: P, value: PathValue<T, P>) {
    return new EntityClass(pathSetImmutable(this.entity, path, value))
  }

  recipe(recipeCallback: Recipe<EntityClass<T>>) {
    return recipeCallback(this)
  }

  get() {
    return deepClone(this.entity)
  }
}

export function entity<T extends Entity>(entity: T) {
  return new EntityClass<T>(entity)
}

function deepClone<T>(source: T): T {
  if (source === null || typeof source !== 'object') return source

  const clone: unknown = Array.isArray(source) ? [] : {}

  for (const key in source)
    if (Object.prototype.hasOwnProperty.call(source, key))
      (clone as T)[key] = deepClone(source[key])

  return clone as T
}
