import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'HACKATHON';
  isLoading = true;
  showNavbarAndFooter = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    // Subscribe to router events and check the current route
    this.router.events.pipe(
      filter(() => !!this.router.url), // Check if the URL is truthy
    ).subscribe(() => {
      // Check if the current route is an admin route
      const isAdminRoute = this.router.url.startsWith('/admin') || this.router.url.startsWith('/login-admin') ;
      this.showNavbarAndFooter = !isAdminRoute;
    });
  }
  ngOnInit(): void {
   
    setTimeout(() => {
      this.isLoading = false; 
    }, 3000);
    
  }
}
