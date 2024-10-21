import { Path, PathValue, pathSetImmutable } from 'object-standard-path'
import { deepClone } from './utils'
export { randomNumber, randomHash, randomUuid, hash } from './utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Entity = { [key: string]: any }

export type Recipe<T extends Entity> = (
  entity: EntityClass<T>
) => EntityClass<T>

export type Shape<T extends EntityClass<Entity>> = ReturnType<T['get']>

export class EntityClass<T extends Entity> {
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

  recipe(recipeCallback: Recipe<T>) {
    return recipeCallback(this)
  }

  get() {
    return deepClone(this.entity)
  }
}

export function entity<T extends Entity>(entity: T) {
  return new EntityClass<T>(entity)
}
