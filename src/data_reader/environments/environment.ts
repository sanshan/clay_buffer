import {Environments} from './_environment.interface';
import {DatasourceName} from '../references/datasource-names';

export const environment: Environments = {
  need: {
    sheetName: DatasourceName.REQUIREMENT,
    cell: {
      row: 5,
      column: 1,
      numColumns: 6,
    },
  },

  fact: {
    sheetName: DatasourceName.FACT,
    cell: {
      row: 5,
      column: 1,
      numColumns: 9,
    },
  },

  operations: {
    sheetName: DatasourceName.OPERATIONS,
    cell: {
      row: 5,
      column: 1,
      numColumns: 10,
    },
  },

  routs: {
    sheetName: DatasourceName.ROUTS,
    cell: {
      row: 5,
      column: 1,
      numColumns: 11,
    },
  },
};
