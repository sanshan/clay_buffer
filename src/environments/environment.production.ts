import { IEnvironment } from './_environment.interface';
import { DatasourceSheetName } from '../enums/datasource-sheet-name';

export const environment: IEnvironment = {
  products: {
    sheetName: DatasourceSheetName.PRODUCTS,
    cell: {
      row: 2,
      column: 1,
      numColumns: 23,
    },
  },

  need: {
    sheetName: DatasourceSheetName.NEED,
    cell: {
      row: 2,
      column: 1,
      numColumns: 6,
    },
  },

  fact: {
    sheetName: DatasourceSheetName.FACT,
    cell: {
      row: 3,
      column: 1,
      numColumns: 14,
    },
  },
};
