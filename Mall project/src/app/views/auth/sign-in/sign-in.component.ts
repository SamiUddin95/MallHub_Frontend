import { currentYear, credits } from '@/app/constants';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';

@Component({
    selector: 'app-sign-in',
    host: { 'data-component-id': 'auth2-sign-in' },
    imports: [RouterLink, NgIcon],
    templateUrl: './sign-in.component.html',
    styles: ``,
})
export class SignInComponent {
    currentYear = currentYear;
    credits = credits;

    constructor(private router: Router) {}

    signIn() {
        console.log("signIn to admin portal" );
        this.router.navigate(['/admin/dashboard']);
    }
}
