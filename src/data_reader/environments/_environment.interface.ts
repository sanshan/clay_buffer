import { SheetName } from '../references/sheet-name';

export interface Environments {
  // operations sheet
  operations: {
    sheetName: SheetName.OPERATIONS;
    cell: {
      row: number;
      column: number;
      numColumns: number;
    };
  };

  // need sheet
  need: {
    sheetName: SheetName.NEED;
    cell: {
      row: number;
      column: number;
      numColumns: number;
    };
  };

  // fact sheet
  fact: {
    sheetName: SheetName.FACT;
    cell: {
      row: number;
      column: number;
      numColumns: number;
    };
  };

  // routs sheet
  routs: {
    sheetName: SheetName.ROUTS;
    cell: {
      row: number;
      column: number;
      numColumns: number;
    };
  };
}
