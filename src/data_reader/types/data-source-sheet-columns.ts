import { DatasourceName } from '../references/datasource-names';

type ColumnIndex = number;
type ColumnName = string;

export type DataSourceSheetColumns = {
  [key in keyof typeof DatasourceName]: {
    [key: ColumnName]: ColumnIndex;
  };
};
