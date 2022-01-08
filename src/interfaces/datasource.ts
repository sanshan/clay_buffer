import { DatasourceSheetName } from '../enums/datasource-sheet-name';
import { TSheetRange } from '../types/sheet-range';

export interface IDataSource {
  sheetName: DatasourceSheetName;
  sheet: GoogleAppsScript.Spreadsheet.Sheet | null;
  cell?: string | TSheetRange;
}
