export interface PalmTableData {
    data: CellData;
}

export interface CellData {
    [key: string]: CellObject | string;
}

export interface CellObject {
    component: string;
    id?: string;
    text?: string;
    textTwo?: string;
    value?: number;
    valueTwo?: number;
}

export interface ColumnData {
    [key: string]: string;
}
