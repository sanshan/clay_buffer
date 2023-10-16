import {SheetRange} from '../types/data-source';

export const arrayFromSheetRange = (
  ss: GoogleAppsScript.Spreadsheet.Sheet,
  range: SheetRange
): string[][] => {
  const test = ss
    .getRange(range.row, range.column, range.numRows, range.numColumns)
    .getValues();

  Logger.log(range.row);
  Logger.log(range.numRows);
  Logger.log(test);

  return test;
};
