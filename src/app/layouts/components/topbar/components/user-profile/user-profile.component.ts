import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {userDropdownItems} from '@layouts/components/data';
import {Router, RouterLink} from '@angular/router';
import {NgIcon} from '@ng-icons/core';
import {AuthService} from '@/app/services/auth.service';

@Component({
  selector: 'app-user-profile-topbar',
  imports: [
    CommonModule,
    NgbDropdown,
    NgbDropdownMenu,
    NgbDropdownToggle,
    RouterLink,
    NgIcon
  ],
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent {
  menuItems = userDropdownItems;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  getUserName(): string {
    const user = this.authService.getCurrentUser();
    return user?.email || 'User';
  }

  logout() {
    console.log('Logout button clicked');
    this.authService.logout();
    console.log('User logged out, redirecting to sign-in');
    // Use window.location for hard redirect to avoid routing issues
    window.location.href = '/sign-in';
  }
}
