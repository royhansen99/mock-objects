import { Path } from 'object-standard-path';
import { PathValue } from 'object-standard-path';

declare type Entity = {
    [key: string]: any;
};

export declare function entity<T extends Entity>(entity: T): EntityClass<T>;

declare class EntityClass<T extends Entity> {
    private entity;
    constructor(entity: T);
    set(changes: Partial<T>): EntityClass<T>;
    setPath<P extends Path<T, ''>>(path: P, value: PathValue<T, P>): EntityClass<T>;
    recipe(recipeCallback: Recipe<typeof EntityClass>): this;
    get(): T;
}

export declare type Recipe<T extends EntityClass<Entity>> = (entity: T) => T;

export { }
