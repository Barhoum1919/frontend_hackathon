import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionholdService {

  private selectedSubscriptionsubject = new BehaviorSubject<any>(null);
  selectedSubscription$ = this.selectedSubscriptionsubject.asObservable();


  setSelectedProduct(product: any): void {
    this.selectedSubscriptionsubject.next(product);
  }

  
  clearSelectedProduct(): void {
    this.selectedSubscriptionsubject.next(null);
  }
}
