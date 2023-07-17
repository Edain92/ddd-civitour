export interface Repository<T> {
  exists(t: T): Promise<boolean>;
  findById(id: string): Promise<T>;
  save(t: T): Promise<T>;
}
