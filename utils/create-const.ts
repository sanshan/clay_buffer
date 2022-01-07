import { TConstants } from '../types/constants';
import { arrayFromSheetRange } from './array-from-sheet-range';
import { dataSourceFactory } from '../factories/datasource-factory';
import { DatasourceName } from '../enums/datasource-name';
import { IDataSourceColumn } from '../interfaces/datasource-column';
import { IDataSourceRange } from '../interfaces/datasource-range';
import { IDataSource } from '../interfaces/datasource';

export const createConstants = (ss: GoogleAppsScript.Spreadsheet.Spreadsheet): TConstants | null => {
  const productsNames = dataSourceFactory<IDataSourceRange>(ss, DatasourceName.productsNames);
  const date = dataSourceFactory<IDataSourceColumn>(ss, DatasourceName.days);
  const days = dataSourceFactory<IDataSourceColumn>(ss, DatasourceName.days);
  const dashBoard = dataSourceFactory<IDataSource>(ss, DatasourceName.dashBoard);
  const NEED = dataSourceFactory<IDataSourceRange>(ss, DatasourceName.NEED);
  const FACT = dataSourceFactory<IDataSourceRange>(ss, DatasourceName.FACT);

  if (productsNames && date && days && dashBoard && NEED && FACT) {
    const productsNamesSheet = ss.getSheetByName(productsNames.sheet);
    const dateSheet = ss.getSheetByName(date.sheet);
    const daysSheet = ss.getSheetByName(days.sheet);
    const dashBoardSheet = ss.getSheetByName(dashBoard.sheet);
    const NEEDSheet = ss.getSheetByName(NEED.sheet);
    const FACTSheet = ss.getSheetByName(FACT.sheet);

    if (!productsNamesSheet) {
      Logger.log(`The products names sheet is not found`);

      return null;
    }
    if (!dateSheet) {
      Logger.log(`the date sheet is not found`);

      return null;
    }
    if (!daysSheet) {
      Logger.log(`the days sheet is not found`);

      return null;
    }
    if (!dashBoardSheet) {
      Logger.log(`the dashboard sheet is not found`);

      return null;
    }
    if (!NEEDSheet) {
      Logger.log(`the need sheet is not found`);

      return null;
    }
    if (!FACTSheet) {
      Logger.log(`the fact sheet is not found`);

      return null;
    }

    return {
      productsNames: arrayFromSheetRange(productsNamesSheet, productsNames.cell),
      today: dateSheet.getRange(date.cell).getValue(),
      days: daysSheet.getRange(days.cell).getValue(),
      need: arrayFromSheetRange(NEEDSheet, NEED.cell),
      fact: arrayFromSheetRange(FACTSheet, FACT.cell),
      dashBoard: dashBoardSheet
    };
  }

  Logger.log(`Error when creating constants, one of sources is undefined`);
  return null;
};
