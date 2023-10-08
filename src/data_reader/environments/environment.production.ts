import { Environments } from './_environment.interface';
import { DatasourceName } from '../references/datasource-names';

export const environment: Environments = {
  need: {
    sheetName: DatasourceName.NEED,
    cell: {
      row: 2,
      column: 1,
      numColumns: 6,
    },
  },

  fact: {
    sheetName: DatasourceName.FACT,
    cell: {
      row: 3,
      column: 1,
      numColumns: 14,
    },
  },

  operations: {
    sheetName: DatasourceName.OPERATIONS,
    cell: {
      row: 2,
      column: 1,
      numColumns: 23,
    },
  },

  routs: {
    sheetName: DatasourceName.ROUTS,
    cell: {
      row: 3,
      column: 1,
      numColumns: 14,
    },
  },
} as const;
