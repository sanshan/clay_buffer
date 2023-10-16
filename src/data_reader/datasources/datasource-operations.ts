import {
  AbstractDataSource,
  SheetRange,
} from '../types/data-source';
import {environment} from '../environments/environment';

export class DataSourceOperations extends AbstractDataSource<SheetRange> {
  name = 'OPERATIONS' as const;

  cells(): SheetRange {
    const lastRow = this.sheet.getLastRow();
    const {row, numColumns, column} = environment.operations.cell;

    return {
      row,
      numRows: lastRow - 1,
      column,
      numColumns,
    };
  }
}
