import { IDataSource } from '../interfaces/datasource';
import { DatasourceSheetName } from '../enums/datasource-sheet-name';

export abstract class AbstractDataSource<T extends IDataSource> implements IDataSource {
  abstract sheetName: DatasourceSheetName;

  abstract validator(ss: GoogleAppsScript.Spreadsheet.Spreadsheet): string[] | null;

  abstract factory(ss: GoogleAppsScript.Spreadsheet.Spreadsheet): T | null;

  constructor(private _ss: GoogleAppsScript.Spreadsheet.Spreadsheet) {}

  sheet: GoogleAppsScript.Spreadsheet.Sheet | null;

  init(): { datasource: T; errors: string[] | null } {
    const errors = this.validator(this._ss);

    return {
      datasource: errors ? null : this.factory(this._ss),
      errors,
    };
  }
}
