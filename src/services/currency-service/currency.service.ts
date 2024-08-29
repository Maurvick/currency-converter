import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Currency } from './currency.model';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  constructor(private http: HttpClient) {}

  getCurrentCurrency() {
    return this.http.get<Currency>(
      'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_PM6AswRvrLoy6Gw6h1kVhNCF8UHx3zl7mrEcqfDn'
    );
  }
}
