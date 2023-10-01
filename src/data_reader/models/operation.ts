import { ProductsSheetColumns } from '../references/products-sheet-columns';

export class Operation {
  public nameCRM: string;
  public nameFACT: string;
  public probability: number;
  public checkPFL: boolean;
  public priority: number;
  public capacity: number;
  public costs: number;
  public dryingTime: number;
  public workshop1Forms: number;
  public workshop2Forms: number;
  public totalForms: number;
  public underglazeId: number;
  public underglazeImage: string;
  public underglazeGroupId: number;
  public underglazeGroupName: string;
  public pathId: number;
  public pathName: string;
  public repainting: number;
  public correction: number;
  public glazurId: number;
  public glazurColor: string;
  public glazurGroupId: number;
  public glazurGroupName: string;

  constructor(data: any[]) {
    this.nameCRM = data[ProductsSheetColumns['Наименование в CRM  / 1C(Внутреннее Название)']];
    this.nameFACT = data[ProductsSheetColumns['Наименование (Balance, Система ФАКТ)']];
    this.probability = data[ProductsSheetColumns['ВЕРОЯТНОСТЬ ВЫХОДА']];
    this.checkPFL = data[ProductsSheetColumns['Проверка на ПФЛ-2']];
    this.priority = data[ProductsSheetColumns['Приоритет по технологии']];
    this.capacity = data[ProductsSheetColumns['Объем изделий (л.) (Утильный)']];
    this.costs = data[ProductsSheetColumns['Трудозатраты (мин.) (Сборка)']];
    this.dryingTime = data[ProductsSheetColumns['Время сушки (ч.)']];
    this.workshop1Forms = data[ProductsSheetColumns['ДОСТУПНО ФОРМ ЦЕХ №1']];
    this.workshop2Forms = data[ProductsSheetColumns['ДОСТУПНО ФОРМ ЦЕХ №2']];
    this.totalForms = data[ProductsSheetColumns['Итого Форм']];
    this.underglazeId = data[ProductsSheetColumns['Подглазурка ID']];
    this.underglazeImage = data[ProductsSheetColumns['Подглазурка РИСУНОК']];
    this.underglazeGroupId = data[ProductsSheetColumns['ГРУППА Подглазурка № (ID)']];
    this.underglazeGroupName = data[ProductsSheetColumns['ГРУППА Подглазурка Название']];
    this.pathId = data[ProductsSheetColumns['Путь изделия ID']];
    this.pathName = data[ProductsSheetColumns['Путь изделия НАИМЕНОВАНИЕ']];
    this.repainting = data[ProductsSheetColumns['Перекрас %']];
    this.correction = data[ProductsSheetColumns['Коррекция (счистка гравера) %']];
    this.glazurId = data[ProductsSheetColumns['Глузуровка ID']];
    this.glazurColor = data[ProductsSheetColumns['Цвет Глазури']];
    this.glazurGroupId = data[ProductsSheetColumns['ГРУППА Глузуровка № (ID)']];
    this.glazurGroupName = data[ProductsSheetColumns['ГРУППА Глузуровка Название']];
  }
}
