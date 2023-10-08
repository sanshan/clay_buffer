import { DatasourceName } from '../references/datasource-names';

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
  cells: T;
}

export type DataSourceCell = DataSource<SheetCell>;

export type DataSourceRange = DataSource<SheetRange>;

export type DataSources = DataSourceCell | DataSourceRange;

export const isDataSourceCell = (datasource: DataSources): datasource is DataSourceCell => {
  return typeof datasource.cells === 'string';
};

export const isDataSourceRange = (datasource: DataSources): datasource is DataSourceRange => {
  return typeof datasource.cells === 'object';
};

export abstract class AbstractDataSource<T extends SheetCell | SheetRange>
  implements DataSource<T>
{
  abstract name: keyof typeof DatasourceName;

  sheet: GoogleAppsScript.Spreadsheet.Sheet | null;

  cells: T;

  abstract factory(
    ss: GoogleAppsScript.Spreadsheet.Spreadsheet
  ): T extends SheetRange ? DataSourceRange : DataSourceCell | null;

  constructor(private readonly ss: GoogleAppsScript.Spreadsheet.Spreadsheet) {}

  validator(ss: GoogleAppsScript.Spreadsheet.Spreadsheet): string[] | null {
    const errors: string[] = [];

    this.sheet = ss.getSheetByName(this.name);
    if (!this.sheet) {
      errors.push(`Sheet with name "${this.name}" is not found`);
      return errors;
    }

    const lastRow = this.sheet.getLastRow();
    if (!lastRow) {
      errors.push(`Last row for sheet with name "${this.name}" is not found`);
      return errors;
    }

    return null;
  }

  init(): {
    datasource: T extends SheetRange ? DataSourceRange : DataSourceCell | null;
    errors: string[] | null;
  } {
    const errors = this.validator(this.ss);

    return {
      datasource: errors ? null : this.factory(this.ss),
      errors,
    };
  }
}
