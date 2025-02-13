import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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
      price: 9.99,
      description: 'Access to basic features',
      features: ['Feature 1', 'Feature 2', 'Feature 3']
    },
    {
      id: 2,
      name: 'Premium Plan',
      price: 19.99,
      description: 'Access to premium features',
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5']
    },
    {
      id: 3,
      name: 'Ultimate Plan',
      price: 29.99,
      description: 'Access to all features',
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5', 'Feature 6']
    }
  ];

}
