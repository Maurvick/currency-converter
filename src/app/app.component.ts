import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { Currency } from '../services/currency-service/currency.model';
import { CurrencyService } from '../services/currency-service/currency.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  currency: Currency = {} as Currency;
  errorMessage: string = '';
  isLoaded: boolean = false;

  amount: string = '';
  fromCurrencyName: string = '';
  toCurrencyName: string = '';

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.fetchCurrency();
  }

  fetchCurrency(): void {
    this.currencyService.getCurrentCurrency().subscribe({
      next: (response) => {
        this.currency = response;
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
      },
      complete: () => {
        this.isLoaded = true;
      },
    });
  }

  getAllCurrencies(): string[] {
    return Object.keys(this.currency.data);
  }

  convertCurrency() {
    let decimal =
      (this.currency.data[this.fromCurrencyName] /
        this.currency.data[this.toCurrencyName]) *
      Number(this.amount);
    return this.roundCurrency(decimal);
  }

  roundCurrency(value: number) {
    return Math.round(value * 100) / 100;
  }
}
