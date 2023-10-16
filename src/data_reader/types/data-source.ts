import {DatasourceName} from '../references/datasource-names';

export type SheetRange = {
  row: number;
  column: number;
  numRows: number;
  numColumns: number;
};

export type SheetCell = string;

export interface DataSource<T extends SheetCell | SheetRange> {
  name: keyof typeof DatasourceName;
  sheet: GoogleAppsScript.Spreadsheet.Sheet;
  cells(): T;
}

export type DataSourceCell = DataSource<SheetCell>;

export type DataSourceRange = DataSource<SheetRange>;

export abstract class AbstractDataSource<T extends SheetCell | SheetRange>
  implements DataSource<T>
{
  abstract name: keyof typeof DatasourceName;

  sheet!: GoogleAppsScript.Spreadsheet.Sheet;

  abstract cells(): T;

  constructor(private readonly ss: GoogleAppsScript.Spreadsheet.Spreadsheet) {}

  validator(ss: GoogleAppsScript.Spreadsheet.Spreadsheet): string[] | null {
    const errors: string[] = [];

    const sheet = ss.getSheetByName(this.name);
    if (!sheet) {
      errors.push(`Sheet with name "${this.name}" is not found`);
      return errors;
    }
    this.sheet = sheet;

    const lastRow = this.sheet.getLastRow();
    if (!lastRow) {
      errors.push(`Last row for sheet with name "${this.name}" is not found`);
      return errors;
    }

    return null;
  }

  init(): { datasource?: DataSource<T>; errors?: string[]; } {
    const errors = this.validator(this.ss) || [];
    return {
      errors,
      datasource: errors ? undefined : this
    }
  }
}
