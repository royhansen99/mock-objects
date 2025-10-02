# mock-objects: A javascript/typescript library for mocking objects

This library includes full typings for projects that use typescript.
An object/entity is immutable, so making any changes will return a new object/entity.

Built on top of `object-recipes` by simply re-exporting functions/types, in addition to providing some local utility functions.  
Detailed usage can be found in the [object-recipes repository](https://github.com/royhansen99/object-recipes).

Since this library doesn't really provide much in terms of api/utilities, it's main value proposition is the documentation itself.  
Hopefully this can inspire you to structure your mock-data.

### Installation

`npm i mock-objects`  
`yarn add mock-objects`  
`bun add mock-objects`

### Usage

```typescript
import { entity, Recipe, Shape } from 'mock-objects';

// Initialize the entity
const person = entity({
  name: '',
  age: 0,
  address: { street: '', zip: 0, country: '' },
  ...50_more_properties,
});

// Retrieve the plain object
person.get();

// Or retrieve a deep-clone of the plain object
person.getClone();

// To infer the type of the underlying object.
type PersonObject = Shape<typeof person>;

// Define a recipe for updating address. 
const addressRecipe = (
  street: string, zip: number, country: string
): Recipe<typeof person> => (entity) => entity.set(
  { address: { street, zip, country } }
);

// Use the recipe to udate address.
const recipeUpdate = person.recipe(
  addressRecipe('Teststreet 1', 1000, 'Norway')
);

// A mock-address recipe that re-uses the above recipe.
const testAddressRecipe = (): Recipe<typeof person> => (entity) =>
  entity.recipe(addressRecipe('Teststreet 1', 1000, 'Norway')); 

// Another mock-recipe that sets name/age.
const testNameAndAgeRecipe = (): Recipe<typeof person> => (entity) =>
  entity.set({ name: 'John Doe', age: 20 }); 

// A mock-recipe that utilizes the two recipes above.
const testPersonRecipe = (): Recipe<typeof person> => (entity) => 
  entity.recipe(testAddressRecipe()).recipe(testNameAndAgeRecipe());

const testResult = person.recipe(testPersonRecipe()) // Finally we run all the recipes
.get(); // and retrieve the resulting object 

// The idea is that you can create lots of different entity-objects with recipes, and
// then utilize these in for example mock-apis to provide test data.
// By using recipes you can easily simulate CRUD-operations.
// 
// You could also pass entity-objects directly to react-components, after applying the
// appropriate recipes.
```

### Utils

Here are some util-functions provided by mock-objects itself, to generate random values.

```typescript
import { randomNumber, randomHash, randomUuid, hash } from 'mock-objects';

// Generate a random number between 1-9999
// If you want a bigger/smaller range you can input your desired max-value as an argument. 
randomNumber();

// Generate a random hash with a length of 35 chars, using an insecure 32-bit algorithm.
randomHash();

// Generate a random Uuid v4. 
randomUuid();

// Generate a hash from your string, using an insecure 32-bit algorithm. 
// Hash length will always be 7 chars.
hash('some string to hash');
```
