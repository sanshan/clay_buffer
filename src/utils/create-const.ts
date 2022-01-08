import { TConstants } from '../types/constants';
import { ProductDataSource } from '../classes/datasource-product';
import { arrayFromSheetRange } from './array-from-sheet-range';
import { Product } from '../models/product';
import { NeedDataSource } from '../classes/datasource-need';
import { Need } from '../models/need';
import { Fact } from '../models/fact';
import { FactDataSource } from '../classes/datasource-fact';

export const createConstants = (
  ss: GoogleAppsScript.Spreadsheet.Spreadsheet
): TConstants | null => {
  const { datasource: productDS, errors: productErrors } = new ProductDataSource(ss).init();
  const { datasource: needDS, errors: needErrors } = new NeedDataSource(ss).init();
  const { datasource: factDS, errors: factErrors } = new FactDataSource(ss).init();

  if (productErrors || needErrors || factErrors) {
    [...(productErrors || []), ...(needErrors || []), ...(factErrors || [])].forEach(
      (errorText) => {
        Logger.log(errorText);
      }
    );

    return null;
  }

  return {
    products: arrayFromSheetRange(productDS.sheet, productDS.cell).map((row) => new Product(row)),
    today: null,
    days: null,
    need: arrayFromSheetRange(needDS.sheet, needDS.cell).map((row) => new Need(row)),
    fact: arrayFromSheetRange(factDS.sheet, factDS.cell).map((row) => new Fact(row)),
    dashBoard: null
  };

  // ToDo(lihih)
  //   return {
  //     today: dateSheet.getRange(date.cell).getValue(),
  //     days: daysSheet.getRange(days.cell).getValue(),
  //     dashBoard: dashBoardSheet,
  //   };
  // }
};
