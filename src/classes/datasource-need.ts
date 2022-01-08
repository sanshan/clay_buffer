import { AbstractDataSource } from '../abstracts/abstract-datasource';
import { IDataSourceRange } from '../interfaces/datasource-range';
import { environment as env } from '../environments/environment';

export class NeedDataSource extends AbstractDataSource<IDataSourceRange> {
  sheetName = env.need.sheetName;

  factory(ss: GoogleAppsScript.Spreadsheet.Spreadsheet): IDataSourceRange | null {
    const sheet = ss.getSheetByName(this.sheetName);
    const lastRow = sheet.getLastRow();
    const { row, numColumns, column } = env.need.cell;

    return {
      sheetName: this.sheetName,
      sheet: this.sheet,
      cell: {
        row,
        numRows: lastRow - 1,
        column,
        numColumns,
      },
    };
  }

  validator(ss: GoogleAppsScript.Spreadsheet.Spreadsheet): string[] | null {
    const errors: string[] = [];

    this.sheet = ss.getSheetByName(this.sheetName);
    if (!this.sheet) {
      errors.push(`Sheet with name "${this.sheetName}" is not found`);
      return errors;
    }

    const lastRow = this.sheet.getLastRow();
    if (!lastRow) {
      errors.push(`Last row for sheet with name "${this.sheetName}" is not found`);
      return errors;
    }

    return null;
  }
}
