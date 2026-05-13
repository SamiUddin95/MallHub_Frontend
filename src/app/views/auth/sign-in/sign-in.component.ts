import { currentYear, credits } from '@/app/constants';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';

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

    constructor(private router: Router) {}

    signIn() {
        console.log("signIn to admin portal with:", this.email, this.password);
        
        // Check for malladmin/123 credentials
        if (this.email === 'malladmin' && this.password === '123') {
            this.router.navigate(['/admin/dashboard']);
        } else {
            alert('Invalid credentials. Use malladmin/123');
        }
    }
}
