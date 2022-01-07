import { TConstants } from '../types/constants';
import { createConstants } from '../utils/create-const';
import { Informer } from '../classes/informer';

// // Устанавливает значения для строки нового массива (info - информация об изделии, n - накопительная вероятность, left - потребность, right - система ФАКТ)
// function setRowData(info, n, left, right) {
//
//   // Объект нового массива CRM
//   const crmRow = {
//     'oper': '',
//     'name': '',
//     'number': 0,
//     'operId': 0,
//     'productionId': '1',
//     'color': '',
//     'decription': '',
//     'oven': '',
//     'repaint': '',
//     'uc': '',
//     'time': '',
//     'probability': 0,
//     'probabilityN': 0,
//     'buffer': 0,
//     'pfl2': 0,
//     'technology': 0,
//     'oven_value': 0,
//     'assembly_time': 0,
//     'drying_time': 0,
//     'nansenaForm': 0,
//     'krasnForm': 0,
//     'itogoForm': 0,
//     'podglaz': '',
//     'podglazFact': '',
//     'path': '',
//     'formJurnalName': '',
//     'reColor': '',
//     'correction': ''
//   };
//
//   crmRow.pfl2 = info[3];
//   crmRow.technology = info[4];
//   crmRow.oven_value = info[5];
//   crmRow.assembly_time = info[6];
//   crmRow.drying_time = info[7];
//   crmRow.nansenaForm = info[8];
//   crmRow.krasnForm = info[9];
//   crmRow.itogoForm = info[10];
//   crmRow.podglaz = info[13];
//   crmRow.path = info[16];
//   crmRow.formJurnalName = info[18];
//   crmRow.reColor = info[19];
//   crmRow.correction = info[20];
//
//
//   if (Array.isArray(right)) {
//
//     var probability = (right[3] > 15) ? 1 : info[2];
//
//     crmRow.oper = right[0];
//     crmRow.name = right[1];
//     crmRow.number = right[2];
//     crmRow.operId = right[3];
//     crmRow.productionId = right[4];
//     crmRow.color = right[5];
//     crmRow.decription = right[6];
//     crmRow.oven = right[7];
//     crmRow.repaint = right[8];
//     crmRow.uc = right[9];
//     crmRow.time = right[10];
//     crmRow.probability = Math.ceil((probability) * 10000) / 10000;
//     crmRow.probabilityN = Math.ceil((n + crmRow.probability) * 10000) / 10000;
//     crmRow.buffer = left[4];
//     crmRow.podglazFact = right[20];
//     crmRow.nansenaForm = 0;
//     crmRow.krasnForm = 0;
//     crmRow.itogoForm = 0;
//   } else if (typeof right === 'undefined') {
//
//     //ЕСЛИ ЕСТЬ группа, то не создавать записи "ЗАЛИВКА", отправлять в новый массив c ключём = ID группы
//     if ((String(info[14])).length != 0) {
//       return [left[0], left[1], 1, left[3], left[4]];
//     }
//
//     var probability = info[2];
//
//     crmRow.oper = 'ЗАЛИВКА';
//     crmRow.name = info[1];
//     crmRow.number = '';
//     crmRow.operId = 1;
//     crmRow.productionId = '';
//     crmRow.color = '';
//     crmRow.decription = '';
//     crmRow.oven = '';
//     crmRow.repaint = '';
//     crmRow.uc = '';
//     crmRow.time = '';
//     crmRow.probability = Math.ceil((probability) * 10000) / 10000;
//     crmRow.probabilityN = Math.ceil((n + crmRow.probability) * 10000) / 10000;
//     crmRow.buffer = left[4];
//     crmRow.nansenaForm = info[8];
//     crmRow.krasnForm = info[9];
//     crmRow.itogoForm = info[10];
//   }
//
//   return crmRow;
// }
//
// function convertToArray(array) {
//   var outputRows = [];
//   var headings = ['oper', 'name', 'number', 'operId', 'productionId', 'color', 'decription', 'oven', 'repaint', 'uc', 'time', 'probability', 'probabilityN', 'buffer', 'pfl2', 'technology', 'oven_value', 'assembly_time', 'drying_time', 'podglaz', 'podglazFact', 'path', 'nansenaForm', 'krasnForm', 'itogoForm', 'formJurnalName', 'reColor', 'correction'];
//   array.forEach(function (obj) {
//     if (Array.isArray(obj)) {
//       outputRows.push(obj);
//     } else {
//       outputRows.push(headings.map(function (heading) {
//         return obj[heading];
//       }));
//     }
//   });
//
//   return outputRows;
// }
//
// function insertMass(a, b, c, d, data) {
//   var ss = SpreadsheetApp.getActiveSpreadsheet();
//   var sheet = ss.getSheetByName('Буффер');
//   return sheet.getRange(a, b, c, d).setValues(data);
// }

function main(): void {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  if (!ss) {
    return;
  }

  const constants: TConstants | null = createConstants(ss);

  if (!constants) {
    return;
  }

  const info = new Informer(constants.dashBoard);

  // Начало работы скрипта (дата)
  info.display('C10', new Date);

//   // =============== Формируем общий массив потребности из CRM и общий массв с изделиями в производстве из систему ФАКТ =============================
//
//   // Массив, элементами которого являются массивы отсортированных изделий из CRM
//   const crmOrderedProducts = [];
//   // Массив, элементами которого являются массивы отсортированных изделий из ФАКТ
//   const factOrderedProducts = [];
//   // Массив с нераспределёнными полуфабрикатами
//   let semiFinishedProducts = [];
//
//   // Распределяем и сортируем изделия. Если изделия нет в потребности или выгрузке, то будет пустой элемент(массив).
//   // В конечном итоге мы должны получить одинаковые по длине массивы crmOrderedProducts и factOrderedProducts
//   constants.productsNames.forEach(function (row, index) {
//     // Изделие
//     info.display('B' + (13 + index), row[0]);
//     // Индекс изделия
//     info.display('C' + (13 + index), index);
//
//     let sum = 0;
//     crmOrderedProducts.push(constants.arrayCRM
//       .filter(function (crmItem) {
//         return crmItem[0].toUpperCase() === row[0].toUpperCase();
//       })
//       .sort(function (a, b) {
//         return a[9] - b[9];
//       })
//       .map(function (r, index, arr) {
//         sum += r[1];
//         return [
//           r[0],
//           r[9],
//           r[1],
//           sum,
//           (((r[9] - constants.today) / 86400000) / constants.days)
//         ];
//       })
//     );
//
//     // Потребность кол-во
//     info.display('D' + (13 + index), (crmOrderedProducts[index][crmOrderedProducts[index].length - 1]) ? crmOrderedProducts[index][crmOrderedProducts[index].length - 1][3] : 0);
//
//
//     factOrderedProducts.push(constants.arrayFACT
//       .filter(function (factItem) {
//         if (String(row[14]).length != 0) {
//           return factItem[3].toUpperCase() === row[1].toUpperCase() && factItem[9] === '' && factItem[12] === row[12];   // Выбираю по НАЗВАНИЮ, отсутствию уценки, одинаковому ID подглазурки
//         }
//
//         if (String(row[14]).length === 0) {
//           return factItem[3].toUpperCase() === row[1].toUpperCase() && factItem[9] === '';
//         }
//
//       })
//       .sort(function (aa, bb) {
//         return bb[1] - aa[1];        // (ААА) изменил сортировку на от Я до А
//       })
//       .map(function (r) {
//         return [
//           r[2],
//           r[3],
//           r[4],
//           r[1],
//           r[0],
//           r[5],
//           r[6],
//           r[7],
//           r[8],
//           r[9],
//           r[10],
//           row[2],
//           row[3],
//           row[4],
//           row[5],
//           row[6],
//           row[7],
//           row[8],
//           row[9],
//           row[10],
//           r[11],
//           row[16]
//         ];
//       })
//     );
//     // Наполняем массив Полуфабрикатов без параметров "ПОДГЛАЗУРКА" для items у которых
//
//     // ФАКТ кол-во
//     info.display('E' + (13 + index), factOrderedProducts[index].length);
//
//     info.display('F' + (13 + index), row[1]);
//
//   });
//
//   // ======================= Окончание формирования массивов ==================================
//
//
//   // ============== Расставляю буффер из потребности в изделия в производстве =====================
//
//
//   // Выбираем изделие по индексу из таблицы с наименованиями изделий (ИЗДЕЛИЯ)
//   //var productIndex = 42  // <= !!!ВОТ СЮДА НАДО ПРИСВОИТЬ ИНТЕКС ИЗДЕЛИЯ!!!
//
//   // Новый массив ФАКТ
//   var newFact = [];
//
//   // // info.log('Начинаю работу')
//
//   for (i = 0; i < constants.productsNames.length; i++) {
//
//     // // info.log('Беру изделие: '+constants.productsNames[i][0])
//
//     let productArray = [];
//     // Накопительная вероятность
//     let probabilityN = 0;
//     let iterator = 0;
//     const semiFinishedProductsIterator = 0;
//     const semiFinishedProductsArray = [];
//
//     productIndex = i;
//     const groupId = constants.productsNames[productIndex][14];
//
//     // // info.log('Группа изделия: '+groupId)
//
//     if (crmOrderedProducts[productIndex].length > 0) {
//
//       crmOrderedProducts[productIndex].forEach(function (row, index) {
//         // // info.log('Потребность : '+row[0])
//         // // info.log('Количество изделий : '+row[2])
//         do {
//           //возвращается либо строка для конечного массива, либо строка для semiFinishedProducts
//
//           let returnedRow;
//
//           if (typeof factOrderedProducts[productIndex][iterator] === 'undefined') {
//             // // info.log('В системе ФАКТ не найдено соответствующее изделие')
//             returnedRow = setRowData(constants.productsNames[productIndex], probabilityN, row);
//           }
//
//           if (typeof factOrderedProducts[productIndex][iterator] !== 'undefined') {
//             // // info.log('В системе ФАКТ найдено соответствующее изделие')
//             returnedRow = setRowData(constants.productsNames[productIndex], probabilityN, row, factOrderedProducts[productIndex][iterator]);
//           }
//
//           if (Array.isArray(returnedRow)) {
//             // // info.log('Изделие ' + returnedRow[0] + ' отправлено в дополнительный массив для поиска полуфабриката')
//             semiFinishedProductsArray[semiFinishedProductsIterator] = returnedRow;
//
//             probabilityN += semiFinishedProductsArray[semiFinishedProductsIterator][2];
//             semiFinishedProductsArray[semiFinishedProductsIterator][3] = 0;
//             semiFinishedProductsIterator++;
//           } else if (typeof returnedRow === 'object') {
//             // // info.log('Изделие ' + returnedRow.name + ' отправлено в финальный массив')
//             productArray[iterator] = returnedRow;
//             probabilityN += productArray[iterator].probability;
//             iterator++;
//           }
//
//         }
//         while (row[3] > probabilityN);
//
//       });
//
//       if ((String(groupId)).length != 0) {
//         if (!Array.isArray(semiFinishedProducts[groupId])) {
//           // // info.log('В массиве для поиска полуфабрикатов, в группе  ' + groupId + ' нет элементов, записываем ' + semiFinishedProductsArray[0][0])
//           semiFinishedProducts[groupId] = semiFinishedProductsArray;
//         } else {
//           // // info.log('В массиве для поиска полуфабрикатов, в группе  ' + groupId + ' есть элементы, добавляем '.semiFinishedProductsArray[0][0])
//           semiFinishedProducts[groupId] = semiFinishedProducts[groupId].concat(semiFinishedProductsArray);
//         }
//       }
//
//       // Если после расстановки буффера потребности из CRM в системе факт(в производстве) остались лишние изделия, то добавляем их в конец со статусом буффера 1000%
//       if (Array.isArray(factOrderedProducts[productIndex][iterator])) {
//         // // info.log('После расстановки буффера в ФАКТ остались изделия для потребности '+factOrderedProducts[productIndex][iterator][1])
//         productArray = productArray
//           .concat(
//             factOrderedProducts[productIndex]
//               .slice(iterator)
//               .map(function (r) {
//                 return [r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10], constants.productsNames[productIndex][2], 0, 10, r[12], r[13], r[14], r[15], r[16], constants.productsNames[productIndex][13], r[20], constants.productsNames[productIndex][16], 0, 0, 0, constants.productsNames[productIndex][18], constants.productsNames[productIndex][19], constants.productsNames[productIndex][20]];
//               })
//           );
//       }
//
//       newFact = newFact.concat(productArray);
//
//     } else {
//       // // info.log('Нет потребности для изделия')
//       // Если потребности для изделия нет, но в ФАКТЕ оно есть, то добавляем их в конец со статусом буффера 1000%
//       if (Array.isArray(factOrderedProducts[productIndex][iterator])) {
//         // // info.log('После расстановки буффера в ФАКТ остались не нужное изделие '+factOrderedProducts[productIndex][iterator][1])
//         productArray = productArray
//           .concat(
//             factOrderedProducts[productIndex]
//               .slice(iterator)
//               .map(function (r) {
//                 return [r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10], constants.productsNames[productIndex][2], 0, 10, r[12], r[13], r[14], r[15], r[16], constants.productsNames[productIndex][13], r[20], constants.productsNames[productIndex][16], 0, 0, 0, constants.productsNames[productIndex][18], constants.productsNames[productIndex][19], constants.productsNames[productIndex][20]];
//               })
//           );
//
//       }
//
//       newFact = newFact.concat(productArray);
//     }
//
//   }
//
//   // ================================ Окончание расстановки буффера для производства =================================================
//
//   // ================================ Расставляем буффер для полуфабрикатов без подглазурки ==========================================
//
//   const temp = [];
//   semiFinishedProducts.forEach(function (group, index) {
//     temp[index] = [];
//     temp[index][0] = group;
//   });
//   semiFinishedProducts = temp;
//
//
//   semiFinishedProducts.map(function (groups, groupId) {
//     const sum = 0;
//     // // info.log('Сортирую группу ' + groupId)
//     groups[0] = groups[0]
//       .sort(function (a, b) {
//         return a[4] - b[4];
//       })
//       .map(function (r) {
//         sum += r[2];
//         return [
//           r[0],
//           r[1],
//           r[2],
//           sum,
//           r[4]
//         ];
//       });
//
//
//     temp = constants.productsNames.filter(function (row) {
//       return row[14] === groupId;
//     });
//
//     const productName = temp[0][1];
//     // // info.log('Беру изделие ' + productName)
//
//     // // info.log('Начинаю искать')
//     const tail = constants.arrayFACT.filter(function (row) {
//       return row[3].toUpperCase() === productName.toUpperCase() && row[12] === '' && row[9] === '';
//     })
//       .sort(function (aa, bb) {
//         return bb[1] - aa[1];        // Сортируем выбранные из ФАКТ полуфабрикаты
//       })
//       .map(function (r) {
//         return [r[2], r[3], r[4], r[1], r[0], r[5], r[6], r[7], r[8], r[9], r[10], temp[0][2], temp[0][3], temp[0][4], temp[0][5], temp[0][6], temp[0][7], temp[0][8], temp[0][9], temp[0][10], r[11], temp[0][16]];
//       });
//     // // info.log('Для группы найдено ' + tail.length + ' полуфабрикатов без подглазурки')
//     groups[1] = tail;
//
//     groups[2] = temp.map(function (r) {
//       return [r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10], r[11], r[12], r[13], '', r[15], r[16], '', r[18], r[19], r[20]];
//     });
//
//     return groups;
//
//   });
//
//
//   const iteratorRight = 0;
//   semiFinishedProducts.forEach(function (group, groupId) {
//     iterator = 0;
//     probabilityN = 0;
//     productArray = [];
//     // // info.log('Беру группу ' + groupId)
//     group[0].forEach(function (product) {
//       // // info.log('Есть потребность ' + product)
//       const inf = group[2].filter(function (row) {
//         return row[0].toUpperCase() === product[0].toUpperCase();
//       });
//       // // info.log('Эта потребность для изделия ' + inf[0][1])
//
//       do {
//         if (typeof group[1][iterator] === 'undefined') {
//           // // info.log('В системе ФАКТ не найдено полуфабриката для этого изделия отправляем на ЗАЛИВКУ')
//           returnedRow = setRowData(inf[0], probabilityN, product);
//         }
//
//         if (typeof group[1][iterator] !== 'undefined') {
//           // // info.log('В системе ФАКТ найден полуфабрикат ' + group[1][iterator])
//           returnedRow = setRowData(inf[0], probabilityN, product, group[1][iterator]);
//         }
//
//         productArray[iterator] = returnedRow;
//         probabilityN += productArray[iterator].probability;
//         iterator++;
//         iteratorRight++;
//       }
//       while (product[3] > probabilityN);
//
//     });
//
//     if (typeof group[1][iterator] !== 'undefined') {
//
//       // info.log('В системе ФАКТ остался нераспределённый полуфабрикат')
//
//       const inf = group[2].filter(function (row) {
//         return row[1].toUpperCase() === group[1][iterator][1].toUpperCase();
//       });
//
//
//       productArray = productArray
//         .concat(
//           group[1]
//             .slice(iterator)
//             .map(function (r) {
//               return [
//                 r[0],
//                 r[1],
//                 r[2],
//                 r[3],
//                 r[4],
//                 r[5],
//                 r[6],
//                 r[7],
//                 r[8],
//                 r[9],
//                 r[10],
//                 inf[0][2],
//                 0,
//                 10,
//                 r[12],
//                 r[13],
//                 r[14],
//                 r[15],
//                 r[16],
//                 inf[0][13],
//                 '',
//                 inf[0][16],
//                 0,
//                 0,
//                 0,
//                 inf[0][18],
//                 inf[0][19],
//                 inf[0][20]
//               ];
//             })
//         );
//     }
//
//     newFact = newFact.concat(productArray);
//   });
//
//
//   // =========================================================================================================================
//
//   // ================================ Заполнение таблиц ======================================================================
//
//   // Очищаем лист
//   const sheet = ss.getSheetByName('Буффер');
//   const lastRow = sheet.getLastRow();
//   sheet.getRange(5, 2, lastRow, 36).clearContent();
//
//   // Заполняем правую таблицу
//   insertMass(5, 9, newFact.length, 28, convertToArray(newFact));
//   // Заполняем левую таблицу
//
//   const newCrm = Array.prototype.concat.apply([], crmOrderedProducts);
//   // Если есть потребность
//
// //if(crmOrderedProducts[productIndex].length > 0)
//   ss.getSheetByName('Буффер').getRange(5, 2, newCrm.length, 5).setValues(newCrm);
//
//   // =============================== Окончание заполнения таблиц ==============================================================
//
//   // Начало работы скрипта
//   info.display('D10', new Date);

}
