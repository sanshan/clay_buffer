import { DatasourceSheetName } from '../enums/datasource-sheet-name';
import { TSheetRange } from '../types/sheet-range';

export interface IDataSource {
  sheet: DatasourceSheetName;
  cell?: string | TSheetRange;
}
