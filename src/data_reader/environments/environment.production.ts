import { Environments } from './_environment.interface';
import { SheetName } from '../references/sheet-name';

export const environment: Environments = {
  operations: {
    sheetName: SheetName.OPERATIONS,
    cell: {
      row: 2,
      column: 1,
      numColumns: 23,
    },
  },

  need: {
    sheetName: SheetName.NEED,
    cell: {
      row: 2,
      column: 1,
      numColumns: 6,
    },
  },

  fact: {
    sheetName: SheetName.FACT,
    cell: {
      row: 3,
      column: 1,
      numColumns: 14,
    },
  },

  routs: {
    sheetName: SheetName.ROUTS,
    cell: {
      row: 3,
      column: 1,
      numColumns: 14,
    },
  },
};
