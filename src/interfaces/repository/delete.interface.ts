export interface IDelete<Entity> {
    delete(entity: Entity): Promise<Entity>;
}