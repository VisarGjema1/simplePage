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
  messages: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    await this.loadUsers();
    this.loadMessages();
  }

  async loadUsers(): Promise<void> {
    try {
      await this.authService.loadUsers();
      this.users = this.authService.getUsers();
      this.totalUsers = this.users.length;
    } catch (error) {
      console.error('Error loading users', error);
    }
  }

  loadMessages(): void {
    this.messages = this.authService.getMessages();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
