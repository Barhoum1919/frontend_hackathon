import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { ContactComponent } from './contact/contact.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'chatbot', component: ChatbotComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'ourservices', component: OurServicesComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent},

];
