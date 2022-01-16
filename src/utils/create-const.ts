import { TConstants } from '../types/constants';
import { ProductDataSource } from '../classes/datasource-product';
import { arrayFromSheetRange } from './array-from-sheet-range';
import { Product } from '../models/product';
import { NeedDataSource } from '../classes/datasource-need';
import { Need } from '../models/need';
import { Fact } from '../models/fact';
import { FactDataSource } from '../classes/datasource-fact';
import { TodayDataSource } from '../classes/datasource-today';
import { DaysDataSource } from '../classes/datasource-days';
import { environment as env } from '../environments/environment';

export const createConstants = (
  ss: GoogleAppsScript.Spreadsheet.Spreadsheet
): TConstants | null => {
  const { datasource: productDS, errors: productErrors } = new ProductDataSource(ss).init();
  const { datasource: needDS, errors: needErrors } = new NeedDataSource(ss).init();
  const { datasource: factDS, errors: factErrors } = new FactDataSource(ss).init();
  const { datasource: todayDS, errors: todayErrors } = new TodayDataSource(ss).init();
  const { datasource: daysDS, errors: daysErrors } = new DaysDataSource(ss).init();

  if (productErrors || needErrors || factErrors || todayErrors || daysErrors) {
    [
      ...(productErrors || []),
      ...(needErrors || []),
      ...(factErrors || []),
      ...(todayErrors || []),
      ...(daysErrors || []),
    ].forEach((errorText) => {
      Logger.log(errorText);
    });

    return null;
  }

  return {
    products: arrayFromSheetRange(productDS.sheet, productDS.cell).map((row) => new Product(row)),
    today: todayDS.sheet.getRange(todayDS.cell).getValue(),
    days: daysDS.sheet.getRange(daysDS.cell).getValue(),
    need: arrayFromSheetRange(needDS.sheet, needDS.cell).map((row) => new Need(row)),
    fact: arrayFromSheetRange(factDS.sheet, factDS.cell).map((row) => new Fact(row)),
    dashBoard: ss.getSheetByName(env.dashBoard.sheetName),
  };
};
