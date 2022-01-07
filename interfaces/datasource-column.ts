import { IDataSource } from './datasource';

export interface IDataSourceColumn extends IDataSource {
  cell: string;
}
