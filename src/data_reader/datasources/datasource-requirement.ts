import {
  AbstractDataSource,
  SheetRange,
} from '../types/data-source';
import {environment} from '../environments/environment';

export class DatasourceRequirement extends AbstractDataSource<SheetRange> {
  name = 'REQUIREMENT' as const;

  cells(): SheetRange {
    const lastRow = this.sheet.getLastRow();
    Logger.log('lastRow');
    Logger.log(lastRow);
    const {row, numColumns, column} = environment.need.cell;

    return {
      row,
      numRows: lastRow - row + 1,
      column,
      numColumns,
    };
  }
}
