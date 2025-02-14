import { Component, OnInit } from '@angular/core';
import { SubscriptionholdService } from '../shared/subscriptionhold.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscribtion-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscribtion-detail.component.html',
  styleUrl: './subscribtion-detail.component.scss'
})
export class SubscribtionDetailComponent implements OnInit {

subscription:any;
  constructor(
    private subscriptionholder:SubscriptionholdService
  ){

  }

  ngOnInit(): void {
    this.subscriptionholder.selectedSubscription$.subscribe({
      next: (data) => 
        {
          this.subscription=data;
          },

    })
     
  }
}
