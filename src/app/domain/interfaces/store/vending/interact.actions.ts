import {
  IVendingInventory,
  IVendingProductCell,
  IVendingProductRows,
  IVendingPurchaseData,
} from '../../vending/vending.interfaces';

enum InteractActions {
  'INIT_VENDING_INVENTORY',
  'LOAD_ALL_PRODUCT_ROWS',
  'LOAD_PRODUCT_ROW',
  'MAKE_DEPOSIT',
  'RETURN_DEPOSIT',
  'PURCHASE_ITEM',
}

type ActionType = keyof typeof InteractActions;

export interface IVendingStoreInteractAction {
  action: ActionType;
  inventory?: IVendingInventory;
  productRows?: IVendingProductRows;
  productRowNumber?: number;
  productRow?: IVendingProductCell[];
  makeDeposit?: number;
  purchase?: IVendingPurchaseData;
}
