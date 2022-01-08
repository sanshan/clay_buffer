import { DatasourceSheetName } from '../enums/datasource-sheet-name';

export interface IEnvironment {
  // Product sheet
  products: {
    sheetName: DatasourceSheetName.PRODUCTS;
    cell: {
      row: number;
      column: number;
      numColumns: number;
    };
  };

  // Need sheet
  need: {
    sheetName: DatasourceSheetName.NEED;
    cell: {
      row: number;
      column: number;
      numColumns: number;
    };
  };

  // Fact sheet
  fact: {
    sheetName: DatasourceSheetName.FACT;
    cell: {
      row: number;
      column: number;
      numColumns: number;
    };
  };
}
