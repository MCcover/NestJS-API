export interface IModify<Entity> {
    modify(entity: Entity): Promise<Entity>;
}