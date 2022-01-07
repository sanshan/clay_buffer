import { TSheetRange } from '../types/sheet-range';

export const arrayFromSheetRange = (
  ss: GoogleAppsScript.Spreadsheet.Sheet,
  range: TSheetRange
): any[][] => {
  return ss.getRange(range.row, range.column, range.numRows, range.numColumns).getValues();
};
