import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  imports: [CommonModule],
})
export class AdminDashboardComponent implements OnInit {
  totalUsers = 0;
  totalSales = 35000;
  newMessages = 15;
  users: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.loadUsers();
    this.users = this.authService.getUsers();
    this.totalUsers = this.users.length;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
