import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {

isLoading=true;
ngOnInit(): void {
  

   
  setTimeout(() => {
    this.isLoading = false; 
  }, 2000);
}
}
