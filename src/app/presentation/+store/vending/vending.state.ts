import {
  IVendingInventory,
  IVendingOptions,
  IVendingProductRows,
} from 'src/app/domain/interfaces/vending/vending.interfaces';

export class VendingState {
  constructor(
    public inventory?: IVendingInventory,
    public productRows?: IVendingProductRows,
    public deposit?: number,
    public vendingOptions?: IVendingOptions
  ) {
    this.deposit = 0;
    this.vendingOptions = {
      acceptedDenominations: [0.5, 1, 2, 5],
      maxItemsPerRow: 3,
      maxInventoryProductCellLoad: 15,
    };
  }
}
