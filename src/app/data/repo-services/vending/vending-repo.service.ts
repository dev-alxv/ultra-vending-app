import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';

import { IVendingInventory } from 'src/app/domain/interfaces/vending/vending.interfaces';
import { Beverage } from 'src/app/domain/models/Beverage/beverage.model';
import { Dessert } from 'src/app/domain/models/Desert/dessert.model';
import {
  IBeverageDescription,
  IDessertDescription,
} from '../../interfaces/descriptions/api/vending/description';
import { VendingApiService } from '../../providers/api/rapid-api/vending-api.service';

@Injectable({
  providedIn: 'root',
})
export class VendingRepoService {
  constructor(private vendingApi: VendingApiService) {}

  public listProducts(): Observable<IVendingInventory> {
    const beverages$ = this.vendingApi.getBeverages();
    const desserts$ = this.vendingApi.getDesserts();

    return forkJoin<[IBeverageDescription[], IDessertDescription[]]>([
      beverages$,
      desserts$,
    ]).pipe(
      map(([beverages, desserts]) => {
        const inventory: IVendingInventory = {
          beverages: this.createBeverageCollection(beverages),
          desserts: this.createDessertCollection(desserts),
        };

        return inventory;
      })
    );
  }

  private createBeverageCollection(
    collectionDescription: IBeverageDescription[]
  ): Beverage[] {
    return collectionDescription.map((description: IBeverageDescription) =>
      this.createBeverage(description)
    );
  }

  private createDessertCollection(
    collectionDescription: IDessertDescription[]
  ): Dessert[] {
    return collectionDescription.map((description: IDessertDescription) =>
      this.createDessert(description)
    );
  }

  private createDessert(dessertDescription: IDessertDescription): Dessert {
    const dessert: Dessert = new Dessert(dessertDescription);

    return dessert;
  }

  private createBeverage(beverageDescription: IBeverageDescription): Beverage {
    const beverage: Beverage = new Beverage(beverageDescription);

    return beverage;
  }
}
