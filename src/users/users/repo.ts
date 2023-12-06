export interface Repository<X extends { id: unknown }> {
  getAll(): Promise<X[]>;
  // GetById(_id: X['id']): Promise<X>;
  create(_newItem: Omit<X, 'id'>): Promise<X>;
  // Update(_id: X['id'], _updatedItem: Partial<X>): Promise<X>;
  // delete(_id: X['id']): Promise<void>;
  // search({ key, value }: { key: keyof X; value: unknown }): Promise<X[]>;
}
