import { SheetName } from '../references/sheet-name';

export type SheetRange = {
  row: number;
  column: number;
  numRows: number;
  numColumns: number;
};

export type SheetCell = string;

export interface DataSource<T extends SheetCell | SheetRange> {
  sheetName: SheetName;
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
  abstract sheetName: SheetName;

  sheet: GoogleAppsScript.Spreadsheet.Sheet | null;

  cells: T;

  abstract factory(
    ss: GoogleAppsScript.Spreadsheet.Spreadsheet
  ): T extends SheetRange ? DataSourceRange : DataSourceCell | null;

  abstract validator(ss: GoogleAppsScript.Spreadsheet.Spreadsheet): string[] | null;

  constructor(private readonly ss: GoogleAppsScript.Spreadsheet.Spreadsheet) {}

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
