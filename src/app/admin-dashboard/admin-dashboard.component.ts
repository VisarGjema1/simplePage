import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  imports: [CommonModule], // Include CommonModule in imports array
})
export class AdminDashboardComponent {
  totalUsers = 1200;
  totalSales = 35000;
  newMessages = 15;

  recentActivities = [
    { id: 1, user: 'John Doe', action: 'Logged in', date: '2024-12-19' },
    {
      id: 2,
      user: 'Jane Smith',
      action: 'Updated profile',
      date: '2024-12-18',
    },
    {
      id: 3,
      user: 'Tom Brown',
      action: 'Purchased a product',
      date: '2024-12-17',
    },
  ];

  logout() {
    console.log('Logout triggered!');
    // Implement your logout logic here
  }
}
