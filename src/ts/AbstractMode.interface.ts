export interface AbstractModel {
  findMany(): Promise<[]>;
  create(item: any): Promise<any>;
}
