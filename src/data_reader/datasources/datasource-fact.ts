import {
  AbstractDataSource,
  SheetRange,
} from '../types/data-source';
import {environment} from '../environments/environment';

export class DataSourceFact extends AbstractDataSource<SheetRange> {
  name = 'FACT' as const;

  cells(): SheetRange {
    const lastRow = this.sheet.getLastRow();
    const {row, numColumns, column} = environment.fact.cell;

    return {
      row,
      numRows: lastRow - row + 1,
      column,
      numColumns,
    };
  }
}
