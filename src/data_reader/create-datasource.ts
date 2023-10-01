import { DatasourceName } from './references/datasource-name';
import { OperationsDataSource } from './datasources/datasource-operations';
import { NeedDataSource } from './datasources/datasource-need';
import { FactDataSource } from './datasources/datasource-fact';
import { arrayFromSheetRange } from './utils/array-from-sheet-range';
import { Operation } from './models/operation';
import { Need } from './models/need';
import { Fact } from './models/fact';
import { Route } from './models/route';

export const createDatasources = (
  ss: GoogleAppsScript.Spreadsheet.Spreadsheet
): {
  operations: Operation[];
  need: Need[];
  fact: Fact[];
  routs: Route[];
} | null => {
  const { datasource: productDS, errors: productErrors } = new OperationsDataSource(ss).init();
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
    [DatasourceName.OPERATIONS]: arrayFromSheetRange(productDS.sheet, productDS.cells).map(
      (row) => new Operation(row)
    ),
    [DatasourceName.NEED]: arrayFromSheetRange(needDS.sheet, needDS.cells).map(
      (row) => new Need(row)
    ),
    [DatasourceName.FACT]: arrayFromSheetRange(factDS.sheet, factDS.cells).map(
      (row) => new Fact(row)
    ),
    [DatasourceName.ROUTS]: arrayFromSheetRange(factDS.sheet, factDS.cells).map(
      (row) => new Route(row)
    ),
  };
};
