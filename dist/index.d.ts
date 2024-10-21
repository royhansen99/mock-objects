import { Path } from 'object-standard-path';
import { PathValue } from 'object-standard-path';

declare type Entity = {
    [key: string]: any;
};

export declare function entity<T extends Entity>(entity: T): EntityClass<T>;

export declare class EntityClass<T extends Entity> {
    private entity;
    constructor(entity: T);
    set(changes: Partial<T>): EntityClass<T>;
    setPath<P extends Path<T, ''>>(path: P, value: PathValue<T, P>): EntityClass<T>;
    recipe(recipeCallback: Recipe<T>): EntityClass<T>;
    get(): T;
}

export declare function hash(str: string): string;

export declare const randomHash: () => string;

export declare const randomNumber: (max?: number) => number;

export declare const randomUuid: () => string;

export declare type Recipe<T extends Entity> = (entity: EntityClass<T>) => EntityClass<T>;

export declare type Shape<T extends EntityClass<Entity>> = ReturnType<T['get']>;

export { }
