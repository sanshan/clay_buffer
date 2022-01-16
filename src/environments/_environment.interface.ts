import { DatasourceSheetName } from '../enums/datasource-sheet-name';

export interface IEnvironment {
  // Product source
  products: {
    sheetName: DatasourceSheetName.PRODUCTS;
    cell: {
      row: number;
      column: number;
      numColumns: number;
    };
  };

  // Need source
  need: {
    sheetName: DatasourceSheetName.NEED;
    cell: {
      row: number;
      column: number;
      numColumns: number;
    };
  };

  // Fact source
  fact: {
    sheetName: DatasourceSheetName.FACT;
    cell: {
      row: number;
      column: number;
      numColumns: number;
    };
  };

  // Today source
  today: {
    sheetName: DatasourceSheetName.DASH_board;
    cell: string;
  };

  // Days source
  days: {
    sheetName: DatasourceSheetName.DASH_board;
    cell: string;
  };

  dashBoard: {
    sheetName: DatasourceSheetName.DASH_board;
  };
}
