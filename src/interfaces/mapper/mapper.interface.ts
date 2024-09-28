export interface IMapper<D, P> {
    toDomain(persistance: P): D;
}