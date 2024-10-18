# mock-objects: A javascript/typescript library for mocking objects

This library includes full typings for projects that use typescript.
An object/entity is immutable, so making any changes will return a new object/entity.

### Installation

`npm install git+https://github.com/royhansen99/mock-objects`

### Usage

```typescript
import { entity, Recipe } from 'mock-objects'

// Define the object structure.
// This original object will be deep-copied and will remain untouched
// despite any changes you make to the entity.
const personShape = {
  name: '',
  age: 0,
  address: { street: '', zip: 0, country: '' }
}

const person = entity(personShape)

// Retrieve the plain object

person.get()

// Initialize a new entity based on the object we defined above,
// and update multiple fields at the same time
// Argument is type-safe and will give errors if invalid.

const update = person.set({ name: 'John Doe', age: 20 }).get() 

// You can nest multiple operations in a row before calling get()
person.set({ name: 'John Doe' }).set({ age: 20 }).get()

// Update a single field in a nested path.
// Both path and value are type-safe and will give errors if invalid.

const nestedUpdate = person.setPath('address.street', 'Teststreet 1').get()

// Using a recipe

const addressRecipe = (
  street: string, zip: number, country: string
): Recipe<typeof person> => (entity) => entity.set(
  { address: { street, zip, country } }
)

const recipeUpdate = person.recipe(
  addressRecipe('Teststreet 1', 1000, 'Norway')
)

// With these basic tools you can keep expanding by using recipes inside
// recipes, this is where the real power lies

const testAddressRecipe = (): Recipe<typeof person> => (entity) =>
  entity.recipe(addressRecipe('Teststreet 1', 1000, 'Norway')) 

const testNameAndAgeRecipe = (): Recipe<typeof person> => (entity) =>
  entity.set({ name: 'John Doe', age: 20 }) 

const testPersonRecipe = (): Recipe<typeof person> => (entity) => 
  entity.recipe(testAddressRecipe()).recipe(testNameAndAgeRecipe())

const testResult = person.recipe(testPersonRecipe()) // Finally we run all the recipes
    .get() // and retrieve the resulting object 

// You can also nest set() and recipe() operations 

person.set({ name: 'John Doe' }).set({ age: 20 })
  .recipe(testAddressRecipe()).get()

// Using recipes from a "parent-entity" onto a "child-entity" that inherited/extended the base-entity. 
// (It is unfortunately not 100% seamless, because it was too messy to generically type
// function-recipes, therefore we must assert the child-entity into the parent-entity before the recipe,
// and then back again to the child-entity before we return the result)

const employee = entity({
  ...personShape,
  jobTitle: '',
  salary: 0
}) 

const updateAddress = (
  (employee as typeof person).recipe(testAddressRecipe())
) as typeof employee

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
