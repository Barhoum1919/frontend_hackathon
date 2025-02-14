import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SubscriptionholdService } from '../shared/subscriptionhold.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.scss'
})
export class OurServicesComponent {
  subscriptions: any[] = [
    {
      id: 1,
      name: 'Basic Plan',
      price: 10,
      description: 'For small businesses looking to explore TikTok trends.',
      features: [
        'Access to trending TikTok hashtags',
        'Basic analytics on trending topics',
        'Weekly trend reports (summary)',
        'Limited AI-generated content suggestions',
        'Email support'
      ]
    },
    {
      id: 2,
      name: 'Premium Plan',
      price: 50,
      description: 'For marketers & startups wanting in-depth trend analysis.',
      features: [
        'All Basic features',
        'Advanced analytics on TikTok trends',
        'Daily trend updates',
        'AI-generated content ideas with captions',
        'Competitor trend tracking',
        'Priority email & chat support'
      ]
    },
    {
      id: 3,
      name: 'Ultimate Plan',
      price: 100,
      description: 'For agencies & businesses aiming for viral marketing success.',
      features: [
        'All Premium features',
        'Real-time TikTok trend monitoring',
        'AI-driven strategy recommendations',
        'Hashtag & influencer performance insights',
        'Automated post scheduling',
        ' post Tracking ',
        '1-on-1 strategy consultation',
        'Dedicated account manager'
      ]
    }
  ];
  
  constructor(
    private subscription:SubscriptionholdService,
    private router:Router
  )
  {}



  tosubscription(sub:any){
    this.subscription.setSelectedProduct(sub);
    this.router.navigate(['subscription-detail']);


  }
}
