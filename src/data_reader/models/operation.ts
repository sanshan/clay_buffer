import {dataSourceSheetColumns} from '../references/data-source-sheet-columns';

export class Operation {
  factoryId: string;
  operId: string;
  operName: string;
  stockId: string;
  stockName: string;
  semifinishedId: string;
  semifinishedName: string;
  markdownId: string;
  markdownName: string;

  constructor(data: string[]) {
    this.factoryId = data[dataSourceSheetColumns.OPERATIONS.Factory_ID];
    this.operId = data[dataSourceSheetColumns.OPERATIONS.Oper_ID];
    this.operName = data[dataSourceSheetColumns.OPERATIONS.Oper_Name];
    this.stockId = data[dataSourceSheetColumns.OPERATIONS.Stock_ID];
    this.stockName = data[dataSourceSheetColumns.OPERATIONS.Stock_Name];
    this.semifinishedId =
      data[dataSourceSheetColumns.OPERATIONS.Semifinished_ID];
    this.semifinishedName =
      data[dataSourceSheetColumns.OPERATIONS.Semifinished_name];
    this.markdownId = data[dataSourceSheetColumns.OPERATIONS.Markdown_ID];
    this.markdownName = data[dataSourceSheetColumns.OPERATIONS.Markdown_name];
  }
}
