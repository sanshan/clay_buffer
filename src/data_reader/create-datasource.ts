import { arrayFromSheetRange } from './utils/array-from-sheet-range';
import { Operation } from './models/operation';
import { Need } from './models/need';
import { Fact } from './models/fact';
import { Route } from './models/route';
import { DataSourceOperations } from './datasources/datasource-operations';
import { DataSourceNeed } from './datasources/datasource-need';
import { DataSourceFact } from './datasources/datasource-fact';

export const createDatasources = (
  ss: GoogleAppsScript.Spreadsheet.Spreadsheet
): {
  need: Need[];
  fact: Fact[];
  operations: Operation[];
  routs: Route[];
} | null => {
  const { datasource: productDS, errors: productErrors } = new DataSourceOperations(ss).init();
  const { datasource: needDS, errors: needErrors } = new DataSourceNeed(ss).init();
  const { datasource: factDS, errors: factErrors } = new DataSourceFact(ss).init();

  if (productErrors || needErrors || factErrors) {
    [...(productErrors || []), ...(needErrors || []), ...(factErrors || [])].forEach(
      (errorText) => {
        Logger.log(errorText);
      }
    );

    return null;
  }

  return {
    need: arrayFromSheetRange(needDS.sheet, needDS.cells).map((row) => new Need(row)),
    fact: arrayFromSheetRange(factDS.sheet, factDS.cells).map((row) => new Fact(row)),
    operations: arrayFromSheetRange(productDS.sheet, productDS.cells).map(
      (row) => new Operation(row)
    ),
    routs: arrayFromSheetRange(factDS.sheet, factDS.cells).map((row) => new Route(row)),
  };
};
