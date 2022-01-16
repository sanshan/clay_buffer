import { AbstractDataSource } from '../abstracts/abstract-datasource';
import { environment as env } from '../environments/environment';
import { IDataSourceColumn } from '../interfaces/datasource-column';

export class DaysDataSource extends AbstractDataSource<IDataSourceColumn> {
  sheetName = env.days.sheetName;

  factory(ss: GoogleAppsScript.Spreadsheet.Spreadsheet): IDataSourceColumn | null {
    const { cell } = env.days;

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

    const cell = this.sheet.getRange(env.days.cell);
    if (!cell) {
      errors.push(`Range with name "${env.days.cell}" on sheet "${this.sheetName}" is not found`);
      return errors;
    }

    if (!Number.isInteger(+cell.getValue())) {
      errors.push(
        `Range with name "${env.days.cell}" on sheet "${this.sheetName}" is not a valid INTEGER value`
      );
      return errors;
    }

    return null;
  }
}
