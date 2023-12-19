import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  IBeverageDescription,
  IDessertDescription,
} from 'src/app/data/interfaces/descriptions/api/vending/description';

@Injectable({
  providedIn: 'root',
})
export class VendingApiService {
  constructor(private http: HttpClient) {}

  public init() {}

  public getDesserts(): Observable<IDessertDescription[]> {
    return this.http.get<IDessertDescription[]>(
      'https://beverages-and-desserts.p.rapidapi.com/desserts'
    );
  }

  public getBeverages(): Observable<IBeverageDescription[]> {
    return this.http.get<IBeverageDescription[]>(
      'https://beverages-and-desserts.p.rapidapi.com/beverages'
    );
  }
}
