import { Injectable } from '@angular/core';
import { delay } from 'rxjs';
import * as uuid from 'uuid';

import { VendingRepoService } from 'src/app/data/repo-services/vending/vending-repo.service';
import {
  IVendingInventory,
  IVendingProductCell,
  IVendingProductRows,
  IVendingPurchaseData,
} from 'src/app/domain/interfaces/vending/vending.interfaces';
import { Beverage } from 'src/app/domain/models/Beverage/beverage.model';
import { Dessert } from 'src/app/domain/models/Desert/dessert.model';
import { shuffleArray } from 'src/app/utils/utils';
import { VendingStore } from '../../vending/vending.store';

@Injectable({
  providedIn: 'root',
})
export class VendingService {
  private serviceInitialized = false;

  constructor(
    private vendingStore: VendingStore,
    private vendingManager: VendingRepoService
  ) {}

  public init(): void {
    if (!this.serviceInitialized) {
      this.serviceInitialized = true;

      this.getVendingInventory();
    }
  }

  private getVendingInventory(): void {
    this.vendingManager
      .listProducts()
      .pipe(delay(2000)) // For some loading effect
      .subscribe({
        next: (response: IVendingInventory) => {
          this.vendingStore.dispatchAction({
            action: 'INIT_VENDING_INVENTORY',
            inventory: response,
          });

          this.loadVendingRows(true);
        },
        error: (err: any) => alert('Error ' + this.constructor.name),
      });
  }

  public loadVendingRows(autoLoad: boolean): void {
    const productsPerRow: number =
      this.vendingStore.state.vendingOptions.maxItemsPerRow;
    const inventoryDesserts: Dessert[] = shuffleArray(
      this.vendingStore.state.inventory.desserts
    );
    const inventoryBeverages: Beverage[] = shuffleArray(
      this.vendingStore.state.inventory.beverages
    );

    let rows: IVendingProductRows;

    if (autoLoad) {
      rows = {
        row1: this.createProductRow(inventoryDesserts, productsPerRow, 1),
        row2: this.createProductRow(inventoryDesserts, productsPerRow, 2),
        row3: this.createProductRow(inventoryBeverages, productsPerRow, 3),
        row4: this.createProductRow(inventoryBeverages, productsPerRow, 4),
      };
    }

    this.vendingStore.dispatchAction({
      action: 'LOAD_ALL_PRODUCT_ROWS',
      productRows: rows,
    });
  }

  public makeDeposit(value: number): void {
    const depositValue: number =
      this.vendingStore.state.deposit !== 0
        ? this.vendingStore.state.deposit + value
        : value;

    this.vendingStore.dispatchAction({
      action: 'MAKE_DEPOSIT',
      makeDeposit: depositValue,
    });
  }

  public returnDeposit(): void {
    this.vendingStore.dispatchAction({
      action: 'RETURN_DEPOSIT',
    });
  }

  public purchase(productCellId: string, row: number): void {
    const purchaseAction: IVendingPurchaseData = {
      productCellId,
      rowNumber: row,
    };

    this.vendingStore.dispatchAction({
      action: 'PURCHASE_ITEM',
      purchase: purchaseAction,
    });
  }

  private createProductCell(
    product: Dessert | Beverage,
    row: number
  ): IVendingProductCell {
    const cell: IVendingProductCell = {
      id: uuid.v4(),
      product,
      row,
      quantity:
        this.vendingStore.state.vendingOptions.maxInventoryProductCellLoad,
    };

    return cell;
  }

  private createProductRow(
    inventory: Dessert[] | Beverage[],
    perRow: number,
    row: number
  ): IVendingProductCell[] {
    return inventory
      .splice(0, perRow)
      .map((item: Dessert | Beverage) => this.createProductCell(item, row));
  }
}
