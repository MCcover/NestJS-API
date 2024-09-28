import { IFindAll } from "./find_all.interface";
import { IFindById } from "./find_by_id.interface";

export interface IFind<Entity> extends IFindById<Entity>, IFindAll<Entity> {
}