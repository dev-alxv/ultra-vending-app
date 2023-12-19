import { Injectable } from '@angular/core';

import { IVendingStoreInteractAction } from 'src/app/domain/interfaces/store/vending/interact.actions';
import {
  IVendingInventory,
  IVendingProductCell,
  IVendingProductRows,
  IVendingPurchaseData,
} from 'src/app/domain/interfaces/vending/vending.interfaces';
import { Store } from '../base/base.store';
import { VendingState } from './vending.state';

@Injectable({
  providedIn: 'root',
})
export class VendingStore extends Store<VendingState> {
  constructor() {
    super(new VendingState());
  }

  private initInventory(inventory: IVendingInventory): void {
    this.setState({
      ...this.state,
      inventory,
    });
  }

  private loadAllRows(rows: IVendingProductRows): void {
    this.setState({
      ...this.state,
      productRows: rows,
    });
  }

  private loadRow(rowNumber: number, products: IVendingProductCell[]): void {
    const row: string = 'row' + rowNumber;

    this.setState({
      ...this.state,
      productRows: {
        ...this.state.productRows,
        [row]: products,
      },
    });
  }

  private deposit(value: number) {
    this.setState({
      ...this.state,
      deposit: value,
    });
  }

  private returnDeposit() {
    this.setState({
      ...this.state,
      deposit: 0,
    });
  }

  private purchase(data: IVendingPurchaseData): void {
    const row: string = 'row' + data.rowNumber;

    const productCellRow: IVendingProductCell[] = this.state.productRows[
      row
    ].map((cell: IVendingProductCell) => {
      let updatedCell: IVendingProductCell;

      if (cell.id === data.productCellId) {
        updatedCell = {
          ...cell,
          quantity: cell.quantity - 1,
        };
      }

      return updatedCell ? updatedCell : cell;
    });

    this.setState({
      ...this.state,
      deposit: 0,
      productRows: {
        ...this.state.productRows,
        [row]: [...productCellRow],
      },
    });
  }

  /**
   *
   * @param data : { action }
   */
  public dispatchAction(data: IVendingStoreInteractAction): void {
    switch (data.action) {
      case 'INIT_VENDING_INVENTORY':
        this.initInventory(data.inventory);
        break;

      case 'LOAD_ALL_PRODUCT_ROWS':
        this.loadAllRows(data.productRows);
        break;

      case 'LOAD_PRODUCT_ROW':
        this.loadRow(data.productRowNumber, data.productRow);
        break;

      case 'MAKE_DEPOSIT':
        this.deposit(data.makeDeposit);
        break;

      case 'RETURN_DEPOSIT':
        this.returnDeposit();
        break;

      case 'PURCHASE_ITEM':
        this.purchase(data.purchase);
        break;
    }
  }
}
