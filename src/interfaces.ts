export interface IListRequest {
  listName: string;
  data: Array<Idata>;
}

export interface Idata {
  name: string;
  quantity: string;
}

export interface Ilist extends IListRequest {
  id: number;
}

export type IPurchaseListRequiredKeys = "listName" | "data";

export type IdataRequiredKeys = "name" | "quantity";
