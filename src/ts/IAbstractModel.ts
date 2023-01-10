export interface AbstractModel {
  findMany(params: any): Promise<any>;
}
