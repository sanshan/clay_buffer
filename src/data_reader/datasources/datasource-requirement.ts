import {
  AbstractDataSource,
  SheetRange,
} from '../types/data-source';
import {environment} from '../environments/environment';

export class DatasourceRequirement extends AbstractDataSource<SheetRange> {
  name = 'REQUIREMENT' as const;

  cells(): SheetRange {
    const lastRow = this.sheet.getLastRow();
    const {row, numColumns, column} = environment.need.cell;

    return {
      row,
      numRows: lastRow - 1,
      column,
      numColumns,
    };
  }
}
