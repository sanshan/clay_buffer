import { FactSheetColumns } from '../enums/fact-sheet-columns';

export class Fact {
  taskName: string;
  productName: string;
  number: number;
  color: string;
  description: string;
  oven: string;
  reColor: 0 | 1;
  markdown: string;
  timeInWork: number;
  underglaze: string;
  underglazeId: number;
  productionId: number;
  operationId: number;
  exportDate: Date;

  constructor(data: any[]) {
    this.taskName = data[FactSheetColumns['Наименование задачи (формы)']];
    this.productName = data[FactSheetColumns['Наименование изделия']];
    this.number = data[FactSheetColumns['Номер']];
    this.color = data[FactSheetColumns['Цвет']];
    this.description = data[FactSheetColumns['Описание УХО']];
    this.oven = data[FactSheetColumns['Печь']];
    this.reColor = data[FactSheetColumns['Проверка на перекрас']];
    this.markdown = data[FactSheetColumns['Уценка']];
    this.timeInWork = data[FactSheetColumns['Время в работе (в часах)']];
    this.underglaze = data[FactSheetColumns['Подглазурка']];
    this.underglazeId = data[FactSheetColumns['Подглазурка ID']];
    this.productionId = data[FactSheetColumns['ID Производства']];
    this.operationId = data[FactSheetColumns['ID Операции']];
    this.exportDate = data[FactSheetColumns['Дата, время ВЫГРУЗКИ']];
  }
}
