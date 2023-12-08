export interface Repository<X extends { id: unknown }> {
  getAll(): Promise<X[]>;
  create(_newItem: Omit<X, 'id'>): Promise<X>;
}
