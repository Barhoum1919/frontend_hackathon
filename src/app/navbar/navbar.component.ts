import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  button: string = 'Connexion';
  isLoggedIn: boolean = false;
  isLoggedOut:boolean=localStorage.getItem('isLoggedOut')==='true';
  constructor(private userservice:UserService,
    @Inject(PLATFORM_ID) private platformId: Object
  ){

  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Subscribe to login state updates
      this.userservice.isLoggedIn$.subscribe((loggedIn) => {
        this.isLoggedIn = loggedIn;
        this.button = this.isLoggedIn ? 'Logout' : 'Connexion';
      });
    }
  }


  logout(){
    this.userservice.logout();
  }
}
