import {dataSourceSheetColumns} from '../references/data-source-sheet-columns';

export class Requirement {
  productId: string;
  productName: string;
  markdownId: string;
  markdownName: string;
  qty: string;
  statusBuffer: string;

  constructor(data: string[]) {
    this.productId = data[dataSourceSheetColumns.REQUIREMENT.CRM_Product_ID];
    this.productName =
      data[dataSourceSheetColumns.REQUIREMENT.CRM_Product_name];
    this.markdownId = data[dataSourceSheetColumns.REQUIREMENT.Markdown_ID];
    this.markdownName = data[dataSourceSheetColumns.REQUIREMENT.Markdown_Name];
    this.qty = data[dataSourceSheetColumns.REQUIREMENT.Qty];
    this.statusBuffer = data[dataSourceSheetColumns.REQUIREMENT.STATUS_Buffer];
  }
}
