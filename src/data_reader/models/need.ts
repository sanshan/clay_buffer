import { NeedsSheetColumns } from '../references/needs-sheet-columns';

export class Need {
  name: string;
  vendorCode: string;
  specification: string;
  count: number;
  minDate: Date;
  deadline: Date;

  constructor(data: any[]) {
    this.name = data[NeedsSheetColumns['Внутреннее название']];
    this.vendorCode = data[NeedsSheetColumns['Артикул']];
    this.specification = data[NeedsSheetColumns['Характеристика']];
    this.count = data[NeedsSheetColumns['Количество']];
    this.minDate = data[NeedsSheetColumns['Мин ДАТА']];
    this.deadline = data[NeedsSheetColumns['Не позднее']];
  }
}
