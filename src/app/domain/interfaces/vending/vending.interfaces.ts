import { Beverage } from '../../models/Beverage/beverage.model';
import { Dessert } from '../../models/Desert/dessert.model';

export interface IVendingInventory {
  beverages: Beverage[];
  desserts: Dessert[];
}

export interface IVendingProductRows {
  row1: IVendingProductCell[];
  row2: IVendingProductCell[];
  row3: IVendingProductCell[];
  row4: IVendingProductCell[];
}

export interface IVendingProductCell {
  id?: string;
  product: Beverage | Dessert;
  row: number;
  type?: 'beverage' | 'dessert';
  quantity: number;
}

export interface IVendingOptions {
  readonly acceptedDenominations: number[];
  readonly maxItemsPerRow: number;
  readonly maxInventoryProductCellLoad: number;
}

export interface IVendingPurchaseData {
  productCellId: string;
  rowNumber: number;
}
