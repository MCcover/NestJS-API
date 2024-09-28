export interface IFindAll<Entity> {
    getAll(page: number, countPerPage: number): Promise<Entity[]>;
}