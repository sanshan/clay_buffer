export class Informer {
  constructor(private _sheet: GoogleAppsScript.Spreadsheet.Sheet) {
    _sheet.getRange(13, 2, _sheet.getLastRow(), 5).clearContent();
  }

  display(a1Notation: string, data: any): void {
    this._sheet.getRange(a1Notation).setValue(data);
  }

  log(data: any): void {
    this._sheet.getRange('B' + (this._sheet.getLastRow() + 1)).setValue(data);
  };
}
