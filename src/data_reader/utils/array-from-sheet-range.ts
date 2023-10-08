import { SheetRange } from '../types/data-source';

export const arrayFromSheetRange = (
  ss: GoogleAppsScript.Spreadsheet.Sheet,
  range: SheetRange
): string[][] => {
  return ss.getRange(range.row, range.column, range.numRows, range.numColumns).getValues();
};
