import { IAdd } from "./add.interface";
import { IDelete } from "./delete.interface";
import { IFind } from "./find.interface";
import { IModify } from "./modify.interface";

export interface IBaseRepository<Entity> extends IAdd<Entity>, IModify<Entity>, IDelete<Entity>, IFind<Entity> {
}