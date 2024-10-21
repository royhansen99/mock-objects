# mock-objects: A javascript/typescript library for mocking objects

This library includes full typings for projects that use typescript.
An object/entity is immutable, so making any changes will return a new object/entity.

### Installation

`npm install git+https://github.com/royhansen99/mock-objects`  
`yarn add mock-objects@https://github.com/royhansen99/mock-objects`

### Usage

```typescript
import { entity, Recipe, Shape } from 'mock-objects'

// Initialize the entity

const person = entity({
  name: '',
  age: 0,
  address: { street: '', zip: 0, country: '' }
})

// Retrieve the plain object

person.get()

// Initialize a new entity based on the object we defined above,
// and update multiple fields at the same time
// Argument is type-safe and will give errors if invalid.

const update = person.set({ name: 'John Doe', age: 20 }).get() 

// You can chain multiple operations in a row before calling get()
person.set({ name: 'John Doe' }).set({ age: 20 }).get()

// Update a single field in a nested path.
// Both path and value are type-safe and will give errors if invalid.

const nestedUpdate = person.setPath('address.street', 'Teststreet 1').get()

// Using a recipe

const addressRecipe = (
  street: string, zip: number, country: string
): Recipe<Shape<typeof person>> => (entity) => entity.set(
  { address: { street, zip, country } }
)

const recipeUpdate = person.recipe(
  addressRecipe('Teststreet 1', 1000, 'Norway')
)

// With these basic tools you can keep expanding by using recipes inside
// recipes, this is where the real power lies

const testAddressRecipe = (): Recipe<Shape<typeof person>> => (entity) =>
  entity.recipe(addressRecipe('Teststreet 1', 1000, 'Norway')) 

const testNameAndAgeRecipe = (): Recipe<Shape<typeof person>> => (entity) =>
  entity.set({ name: 'John Doe', age: 20 }) 

const testPersonRecipe = (): Recipe<Shape<typeof person>> => (entity) => 
  entity.recipe(testAddressRecipe()).recipe(testNameAndAgeRecipe())

const testResult = person.recipe(testPersonRecipe()) // Finally we run all the recipes
    .get() // and retrieve the resulting object 

// You can also chain set() and recipe() operations 

person.set({ name: 'John Doe' }).set({ age: 20 })
  .recipe(testAddressRecipe()).get()

// Using recipes from a "parent-entity" onto a "child-entity" that inherited/extended the base-entity. 
// In order to achieve this the recipe-function must be made generic.
// We need to do some assertions inside the generic function, in order for set/setPath arguments
// to be type-safe.

const genericTestAddressRecipe = <T extends Shape<typeof person>>(): Recipe<T> => (entity) =>
  (
    (entity as typeof person)
      .set({
        address: { street: 'Teststreet 1', zip: 1000, country: 'Norway' }
      })
  ) as typeof entity 

const genericStreetRecipe = <T extends Shape<typeof person>>(): Recipe<T> => (entity) =>
  (
    (entity as typeof person)
      .setPath('address.street', 'Teststreet 1')
  ) as typeof entity 

const employee = entity({
  ...person.get(),
  jobTitle: '',
  salary: 0
}) 

const updateAddress = employee.recipe(genericTestAddressRecipe())

const updateStreet = employee.recipe(genericStreetRecipe())

// That's it!
// You now have the power to create bigger entities with associated recipes.
//
// You can even create sub-entities with their own sub-recipes, and then you
// call get() on the sub-entity and set() it back into the parent entity.
```

### Utils

There are also some random util-functions included that you may use to generate random values.

```typescript
import { randomNumber, randomHash, randomUuid, hash } from 'mock-objects'

// Generate a random number between 1-9999
// If you want a bigger/smaller range you can input your desired max-value as an argument. 
randomNumber()

// Generate a random hash with a length of 35 chars, using an insecure 32-bit algorithm.
randomHash()

// Generate a random Uuid v4. 
randomUuid()

// Generate a hash from your string, using an insecure 32-bit algorithm. 
// Hash length will always be 7 chars.
hash('some string to hash')
```
