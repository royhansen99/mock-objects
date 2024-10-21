import { describe, expect, it } from 'vitest'
import { entity, Recipe, Shape } from './index'

describe('Entity tests', () => {
  it('constructor(): Check for immutability', () => {
    const something = () => ({ a: 1, b: 2 })
    const test = something()

    entity(something).set({ b: 22 })

    // Make sure original input-object is untouched, because of
    // immutability.
    expect(test).toStrictEqual(something())
  })

  it('get(): Check for identical return structure and immutability', () => {
    const something = () => ({ a: 1, b: 'abc', arr: [], obj: {} })
    const ent = entity(something())

    // Get pure object from entity and modify it directly
    ent.get().a = 100

    // Get pure again object and make sure it looks exactly like the
    // original, should not contain changes because of immutability.
    expect(ent.get()).toStrictEqual(something())
  })

  it('set(): Initialize entity, assign values, test immutability', () => {
    const name = 'John Doe'
    const age = 20

    const person = entity({ name: '', age: 0 })
    const update = person.set({ name, age })

    // `person` should remain untouched after the `set` operation,
    // because of immutability.
    expect(person.get()).not.toEqual(expect.objectContaining({ name, age }))

    // `update` should contain the new object with the updated
    // values.
    expect(update.get()).toEqual(expect.objectContaining({ name, age }))
  })

  it('setPath(): Initialize entity, assign values, test immutability', () => {
    const person = entity({
      name: '',
      age: 0,
      address: {
        street: '',
        zip: 0,
        country: '',
      },
    })

    const name = 'John Doe'
    const age = 20
    const country = 'Norway'

    const update = person
      .setPath('name', name)
      .setPath('age', age)
      .setPath('address.country', country)

    // `person` should remain untouched after the `setPath` operations,
    // because of immutability.
    expect(person.get()).not.toEqual(expect.objectContaining({ name, age }))
    expect(person.get().address).not.toEqual(
      expect.objectContaining({ country })
    )

    // `update` should contain the new object with the updated
    // values.
    expect(update.get()).toEqual(expect.objectContaining({ name, age }))
    expect(update.get().address).toEqual(expect.objectContaining({ country }))
  })

  it('recipe(): Use a recipe, test immutability', () => {
    const person = entity({
      name: '',
      age: 0,
      address: {
        street: '',
        zip: 0,
        country: '',
      },
    })

    const setAddress =
      (
        street: string,
        zip: number,
        country: string
      ): Recipe<Shape<typeof person>> =>
      (entity) =>
        entity.set({ address: { street, zip, country } })

    const newAddress = { street: 'Test street 1', zip: 1000, country: 'Norway' }

    const update = person.recipe(
      setAddress(newAddress.street, newAddress.zip, newAddress.country)
    )

    // `person` should remain untouched after the recipe was applied,
    // because of immutability.
    expect(person.get().address).not.toEqual(
      expect.objectContaining(newAddress)
    )

    // `update` should contain the new object with the updated
    // values.
    expect(update.get().address).toEqual(expect.objectContaining(newAddress))
  })

  it('recipe(): Use a nested recipe', () => {
    const person = entity({
      name: '',
      age: 0,
      address: {
        street: '',
        zip: 0,
        country: '',
      },
    })

    const setAddressRecipe =
      (
        street: string,
        zip: number,
        country: string
      ): Recipe<Shape<typeof person>> =>
      (entity) =>
        entity.set({ address: { street, zip, country } })

    const newAddress = { street: 'Test street 1', zip: 1000, country: 'Norway' }

    const nestedRecipe = (): Recipe<Shape<typeof person>> => (entity) =>
      entity.recipe(
        setAddressRecipe(newAddress.street, newAddress.zip, newAddress.country)
      )

    // `update` should contain the new object with the updated values.
    expect(person.recipe(nestedRecipe()).get().address).toEqual(
      expect.objectContaining(newAddress)
    )
  })

  it('recipe(): Use a generic recipe from a different entity', () => {
    const person = entity({
      name: '',
      age: 0,
      address: {
        street: '',
        zip: 0,
        country: '',
      },
    })

    const setAddressRecipe =
      <T extends Shape<typeof person>>(
        street: string,
        zip: number,
        country: string
      ): Recipe<T> =>
      (entity) =>
        (entity as typeof person).set({
          address: { street, zip, country },
        }) as typeof entity

    const personExtended = entity({
      ...person.get(),
      employer: '',
      position: '',
    })

    const newAddress = { street: 'Test street 1', zip: 1000, country: 'Norway' }

    // Check that the recipe is properly applied to the extended entity
    expect(
      personExtended
        .recipe(
          setAddressRecipe(
            newAddress.street,
            newAddress.zip,
            newAddress.country
          )
        )
        .get().address
    ).toEqual(expect.objectContaining(newAddress))
  })
})
