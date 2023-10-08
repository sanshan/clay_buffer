import { dataSourceSheetColumns } from '../references/data-source-sheet-columns';

export class Route {
  productCrmId: string;
  productCrmName: string;
  markdownId: string;
  markdownName: string;
  operId: string;
  operName: string;
  semifinishedId: string;
  semifinishedName: string;
  semifinishedMarkdownId: string;
  semifinishedMarkdownName: string;
  csProbability: string;

  constructor(data: any[]) {
    this.productCrmId = data[dataSourceSheetColumns.ROUTS.Product_CRM_ID];
    this.productCrmName = data[dataSourceSheetColumns.ROUTS.Product_CRM_name];
    this.markdownId = data[dataSourceSheetColumns.ROUTS.Markdown_ID];
    this.markdownName = data[dataSourceSheetColumns.ROUTS.Markdown_Name];
    this.operId = data[dataSourceSheetColumns.ROUTS.Oper_ID];
    this.operName = data[dataSourceSheetColumns.ROUTS.Oper_Name];
    this.semifinishedId = data[dataSourceSheetColumns.ROUTS.Semifinished_ID];
    this.semifinishedName = data[dataSourceSheetColumns.ROUTS.Semifinished_name];
    this.semifinishedMarkdownId = data[dataSourceSheetColumns.ROUTS.Semifinished_Markdown_ID];
    this.semifinishedMarkdownName = data[dataSourceSheetColumns.ROUTS.Semifinished_Markdown_Name];
    this.csProbability = data[dataSourceSheetColumns.ROUTS.CS_Probability];
  }
}
