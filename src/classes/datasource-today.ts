import { AbstractDataSource } from '../abstracts/abstract-datasource';
import { environment as env } from '../environments/environment';
import { IDataSourceColumn } from '../interfaces/datasource-column';

export class TodayDataSource extends AbstractDataSource<IDataSourceColumn> {
  sheetName = env.today.sheetName;

  factory(ss: GoogleAppsScript.Spreadsheet.Spreadsheet): IDataSourceColumn | null {
    const { cell } = env.today;

    return {
      sheetName: this.sheetName,
      sheet: this.sheet,
      cell,
    };
  }

  validator(ss: GoogleAppsScript.Spreadsheet.Spreadsheet): string[] | null {
    const errors: string[] = [];

    this.sheet = ss.getSheetByName(this.sheetName);

    if (!this.sheet) {
      errors.push(`Sheet with name "${this.sheetName}" is not found`);
      return errors;
    }

    const cell = this.sheet.getRange(env.today.cell);
    if (!cell) {
      errors.push(`Range with name "${env.today.cell}" on sheet "${this.sheetName}" is not found`);
      return errors;
    }

    const isValidDate = Date.parse(cell.getValue());
    if (isNaN(isValidDate)) {
      errors.push(
        `Range with name "${env.today.cell}" on sheet "${this.sheetName}" is not a valid date format`
      );
      return errors;
    }

    return null;
  }
}
