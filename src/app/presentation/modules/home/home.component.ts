import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { IVendingProductCell } from 'src/app/domain/interfaces/vending/vending.interfaces';
import { Beverage } from 'src/app/domain/models/Beverage/beverage.model';
import { Dessert } from 'src/app/domain/models/Desert/dessert.model';
import { isDefined } from 'src/app/utils/utils';
import { VendingService } from '../../+store/+services/vending/vending.service';
import { VendingState } from '../../+store/vending/vending.state';
import { VendingStore } from '../../+store/vending/vending.store';

@Component({
  selector: 'ultra-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public vendingStoreStateStream$: Observable<VendingState>;

  public currentMachineMessage: string;
  public currentDepositValue: number;
  public machineDepositedValue: number;
  public selectedProduct: Dessert | Beverage;
  public selectedProductCell: IVendingProductCell;
  public selectedCardElementRef: HTMLElement;

  constructor(
    private vendingStore: VendingStore,
    private vendingService: VendingService
  ) {
    this.vendingService.init();
  }

  public ngOnInit(): void {
    this.observeVendingStoreState();

    this.currentMachineMessage = 'Hello, Please select a product';
    this.currentDepositValue = null;
    this.machineDepositedValue = this.vendingStore.state.deposit;
  }

  private observeVendingStoreState(): void {
    this.vendingStoreStateStream$ = this.vendingStore.stateStream$;
  }

  public selectProduct(
    elRef: HTMLElement,
    cell: IVendingProductCell,
    product: Dessert | Beverage
  ): void {
    this.selectedCardElementRef = elRef;
    this.selectedCardElementRef.classList.add('selected');
    this.selectedProductCell = cell;
    this.selectedProduct = product;
    this.currentMachineMessage = product.name + '\n' + product.price + '€';
  }

  public clearSelection(): void {
    this.clearSelectedCellProduct();
    this.currentMachineMessage = 'Hello, Please select a product';
  }

  public deposit(): void {
    const denominationPass: boolean =
      !!this.vendingStore.state.vendingOptions.acceptedDenominations.find(
        (value: number) => value === this.currentDepositValue
      );

    if (denominationPass) {
      this.vendingService.makeDeposit(this.currentDepositValue);
      this.currentMachineMessage =
        'Your deposit of ' + this.currentDepositValue + '€ accepted';
      this.currentDepositValue = null;
    } else if (
      isDefined(this.currentDepositValue) &&
      this.currentDepositValue !== 0
    ) {
      this.currentMachineMessage = 'We do not accept this denomination';
      this.currentDepositValue = null;
    }
  }

  public cancel(): void {
    this.currentMachineMessage =
      `Here, take your deposit of ` +
      this.vendingStore.state.deposit +
      '€ back';
    this.vendingService.returnDeposit();
  }

  public purchase(): void {
    const isDepositEnough: boolean =
      this.vendingStore.state.deposit >= this.selectedProduct.price;

    if (isDepositEnough && this.selectedProductCell.quantity > 0) {
      const changeLeft: number =
        this.vendingStore.state.deposit - this.selectedProduct.price;

      this.currentMachineMessage =
        changeLeft !== 0
          ? 'ENJOY! \n And here, take your change of ' + changeLeft + '€ back'
          : 'ENJOY!';

      this.vendingService.purchase(
        this.selectedProductCell.id,
        this.selectedProductCell.row
      );
      this.clearSelectedCellProduct();
    } else if (isDepositEnough && this.selectedProductCell.quantity === 0) {
      this.currentMachineMessage = 'Sorry, no more left from this Goodie!';
    } else {
      this.currentMachineMessage =
        'Sorry, your deposit is not enough to purchase this Goodie!';
    }
  }

  private clearSelectedCellProduct(): void {
    this.selectedProduct = undefined;
    this.selectedCardElementRef.classList.remove('selected');
  }
}
