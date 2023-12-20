import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CategoryDetails } from '../interfaces/share-interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryDetailsViewService {

  constructor() { }
  categoryDetails!: CategoryDetails;
  private categoryDetailsDataSubject = new BehaviorSubject<CategoryDetails>(this.categoryDetails);
  public categoryDetailsData$ = this.categoryDetailsDataSubject.asObservable();

  setCategoryDetailsView(data: CategoryDetails) {
    this.categoryDetailsDataSubject.next(data);
  }
}
