import { currentYear, credits } from '@/app/constants';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@/app/services/auth.service';

@Component({
    selector: 'app-sign-in',
    host: { 'data-component-id': 'auth2-sign-in' },
    imports: [RouterLink, NgIcon, FormsModule],
    templateUrl: './sign-in.component.html',
    styles: ``,
})
export class SignInComponent {
    currentYear = currentYear;
    credits = credits;
    email: string = '';
    password: string = '';

    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    signIn() {
        console.log("signIn to admin portal with:", this.email, this.password);
        
        if (this.authService.login(this.email, this.password)) {
            // Get role-based dashboard route
            const dashboardRoute = this.authService.getDashboardRoute();
            this.router.navigate([dashboardRoute]);
        } else {
            alert('Invalid credentials. Use malladmin/123');
        }
    }
}
