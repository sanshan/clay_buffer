import { DatasourceName } from '../enums/datasource-name';
import { DatasourceSheetName } from '../enums/datasource-sheet-name';

export const dataSourceFactory = <T>(ss: GoogleAppsScript.Spreadsheet.Spreadsheet, name: DatasourceName): T | null => {
  let sheet: GoogleAppsScript.Spreadsheet.Sheet | null;
  let lastRow: number;

  switch (name) {
    case DatasourceName.productsNames:
      sheet = ss.getSheetByName(DatasourceSheetName.PRODUCTS);
      if (!sheet) {
        Logger.log(`Sheet with name "${DatasourceSheetName.PRODUCTS}" is not found`);
        return null;
      }

      lastRow = sheet.getLastRow();
      if (!lastRow) {
        Logger.log(`Last row for sheet with name "${DatasourceSheetName.PRODUCTS}" is not found`);
        return null;
      }

      return {
        sheet: DatasourceSheetName.PRODUCTS,
        cell: {
          row: 2,
          column: 1,
          numRows: lastRow - 1,
          numColumns: 21,
        },
      } as unknown as T;

    case DatasourceName.date:
      sheet = ss.getSheetByName(DatasourceSheetName.DASH_board);
      if (!sheet) {
        Logger.log(`Sheet with name "${DatasourceSheetName.DASH_board}" is not found`);
        return null;
      }

      return {
        sheet: DatasourceSheetName.DASH_board,
        cell: 'C4',
      } as unknown as T;

    case DatasourceName.days:
      sheet = ss.getSheetByName(DatasourceSheetName.DASH_board);
      if (!sheet) {
        Logger.log(`Sheet with name "${DatasourceSheetName.DASH_board}" is not found`);
        return null;
      }
      return {
        sheet: DatasourceSheetName.DASH_board,
        cell: 'C7',
      } as unknown as T;

    case DatasourceName.dashBoard:
      sheet = ss.getSheetByName(DatasourceSheetName.DASH_board);
      if (!sheet) {
        Logger.log(`Sheet with name "${DatasourceSheetName.DASH_board}" is not found`);
        return null;
      }

      return {
        sheet: DatasourceSheetName.DASH_board
      } as unknown as T;

    case DatasourceName.NEED:
      sheet = ss.getSheetByName(DatasourceSheetName.NEED);
      if (!sheet) {
        Logger.log(`Sheet with name "${DatasourceSheetName.NEED}" is not found`);
        return null;
      }

      lastRow = sheet.getLastRow();
      if (!lastRow) {
        Logger.log(`Last row for sheet with name "${DatasourceSheetName.NEED}" is not found`);
        return null;
      }

      return {
        sheet: DatasourceSheetName.NEED,
        cell: {
          row: 2,
          column: 1,
          numRows: lastRow - 1,
          numColumns: 10,
        },
      } as unknown as T;

    case DatasourceName.FACT:
      sheet = ss.getSheetByName(DatasourceSheetName.FACT);
      if (!sheet) {
        Logger.log(`Sheet with name "${DatasourceSheetName.FACT}" is not found`);
        return null;
      }

      lastRow = sheet.getLastRow();
      if (!lastRow) {
        Logger.log(`Last row for sheet with name "${DatasourceSheetName.FACT}" is not found`);
        return null;
      }

      return {
        sheet: DatasourceSheetName.FACT,
        cell: {
          row: 3,
          column: 1,
          numRows: lastRow - 2,
          numColumns: 13,
        },
      } as unknown as T;

    default:
      return null;
  }
};
