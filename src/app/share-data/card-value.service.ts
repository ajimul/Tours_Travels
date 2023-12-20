import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CategoryDetails } from '../interfaces/share-interface';

@Injectable({
  providedIn: 'root'
})
export class CardValueService {

  constructor() { }
  cardValue!: number;
  private cardValueDataSubject = new BehaviorSubject<number>(this.cardValue);
  public cardValueData$ = this.cardValueDataSubject.asObservable();

  setCardValue(data: number) {
    this.cardValueDataSubject.next(data);
  }
}
