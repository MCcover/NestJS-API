export interface IAdd<Entity> {
    add(entity: Entity): Promise<Entity>;
}