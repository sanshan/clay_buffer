import { AbstractDataSource, DataSourceRange, SheetRange } from '../types/data-source';
import { environment } from '../environments/environment';

export class DataSourceNeed extends AbstractDataSource<SheetRange> {
  name = 'NEED' as const;

  factory(ss: GoogleAppsScript.Spreadsheet.Spreadsheet): DataSourceRange | null {
    const sheet = ss.getSheetByName(this.name);
    const lastRow = sheet.getLastRow();
    const { row, numColumns, column } = environment.need.cell;

    return {
      name: this.name,
      sheet: this.sheet,
      cells: {
        row,
        numRows: lastRow - 1,
        column,
        numColumns,
      },
    };
  }
}
