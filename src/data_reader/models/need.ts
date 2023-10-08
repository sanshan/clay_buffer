import { dataSourceSheetColumns } from '../references/data-source-sheet-columns';

export class Need {
  productId: string;
  productName: string;
  markdownId: string;
  markdownName: string;
  qty: string;
  statusBuffer: string;

  constructor(data: string[]) {
    this.productId = data[dataSourceSheetColumns.NEED.CRM_Product_ID];
    this.productName = data[dataSourceSheetColumns.NEED.CRM_Product_name];
    this.markdownId = data[dataSourceSheetColumns.NEED.Markdown_ID];
    this.markdownName = data[dataSourceSheetColumns.NEED.Markdown_Name];
    this.qty = data[dataSourceSheetColumns.NEED.Qty];
    this.statusBuffer = data[dataSourceSheetColumns.NEED.STATUS_Buffer];
  }
}
