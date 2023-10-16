import {dataSourceSheetColumns} from '../references/data-source-sheet-columns';

export class Fact {
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
    this.factoryId = data[dataSourceSheetColumns.FACT.Factory_ID];
    this.operId = data[dataSourceSheetColumns.FACT.Oper_ID];
    this.operName = data[dataSourceSheetColumns.FACT.Oper_Name];
    this.stockId = data[dataSourceSheetColumns.FACT.Stock_ID];
    this.stockName = data[dataSourceSheetColumns.FACT.Stock_Name];
    this.semifinishedId = data[dataSourceSheetColumns.FACT.Semifinished_ID];
    this.semifinishedName = data[dataSourceSheetColumns.FACT.Semifinished_name];
    this.markdownId = data[dataSourceSheetColumns.FACT.Markdown_ID];
    this.markdownName = data[dataSourceSheetColumns.FACT.Markdown_name];
  }
}
