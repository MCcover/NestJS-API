export interface IFindById<Entity> {

    getById(id: number): Promise<Entity>;

}