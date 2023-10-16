import {arrayFromSheetRange} from './utils/array-from-sheet-range';
import {Operation} from './models/operation';
import {Requirement} from './models/requirement';
import {Fact} from './models/fact';
import {Level} from './models/level';
import {DataSourceOperations} from './datasources/datasource-operations';
import {DatasourceRequirement} from './datasources/datasource-requirement';
import {DataSourceFact} from './datasources/datasource-fact';
import {DataSourceRouts} from './datasources/datasource-routs';

export const createDataSources = (
  ss: GoogleAppsScript.Spreadsheet.Spreadsheet
): {
  requirements: Requirement[];
  fact: Fact[];
  operations: Operation[];
  routs: Level[];
} | null => {
  const {datasource: needDS, errors: needErrors} = new DatasourceRequirement(
    ss
  ).init();
  const {datasource: factDS, errors: factErrors} = new DataSourceFact(
    ss
  ).init();
  const {datasource: operationsDS, errors: operationsErrors} =
    new DataSourceOperations(ss).init();
  const {datasource: routsDS, errors: routsErrors} = new DataSourceRouts(
    ss
  ).init();

  if (needErrors || factErrors || operationsErrors || routsErrors) {
    [
      ...(needErrors || []),
      ...(factErrors || []),
      ...(operationsErrors || []),
      ...(routsErrors || []),
    ].forEach(errorText => {
      Logger.log(errorText);
    });

    return null;
  }

  return {
    requirements: arrayFromSheetRange(needDS!.sheet, needDS!.cells()).map(
      row => new Requirement(row)
    ),
    fact: arrayFromSheetRange(factDS!.sheet, factDS!.cells()).map(
      row => new Fact(row)
    ),
    operations: arrayFromSheetRange(operationsDS!.sheet, operationsDS!.cells()).map(
      row => new Operation(row)
    ),
    routs: arrayFromSheetRange(routsDS!.sheet, routsDS!.cells()).map(
      row => new Level(row)
    ),
  };
};
