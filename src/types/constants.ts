/**
 constants.date - дата
 constants.today - дни буффера
 constants.productsNames - наименования изделий
 constants.arrayCRM - массив с потребностью из CRM
 constants.arrayFACT - массив с потребностью из ФАКТ
 */
export type TConstants = {
  products: any[];
  today: string;
  days: string;
  need: any[];
  fact: any[];
  dashBoard: GoogleAppsScript.Spreadsheet.Sheet;
};
