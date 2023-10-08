import { DatasourceName } from '../references/datasource-names';

export interface Environments {
  // need sheet
  need: {
    sheetName: DatasourceName.NEED;
    cell: {
      row: number;
      column: number;
      numColumns: number;
    };
  };

  // fact sheet
  fact: {
    sheetName: DatasourceName.FACT;
    cell: {
      row: number;
      column: number;
      numColumns: number;
    };
  };

  // operations sheet
  operations: {
    sheetName: DatasourceName.OPERATIONS;
    cell: {
      row: number;
      column: number;
      numColumns: number;
    };
  };

  // routs sheet
  routs: {
    sheetName: DatasourceName.ROUTS;
    cell: {
      row: number;
      column: number;
      numColumns: number;
    };
  };
}
