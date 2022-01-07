import { IDataSource } from './datasource';
import { TSheetRange } from '../types/sheet-range';

export interface IDataSourceRange extends IDataSource {
  cell: TSheetRange;
}
