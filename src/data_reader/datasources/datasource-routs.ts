import {
  AbstractDataSource,
  SheetRange,
} from '../types/data-source';
import {environment} from '../environments/environment';

export class DataSourceRouts extends AbstractDataSource<SheetRange> {
  name = 'ROUTS' as const;

  cells(): SheetRange {
    const lastRow = this.sheet.getLastRow();
    const {row, numColumns, column} = environment.routs.cell;

    return {
      row,
      numRows: lastRow - 1,
      column,
      numColumns,
    };
  }
}
