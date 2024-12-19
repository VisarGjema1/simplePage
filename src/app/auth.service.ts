import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: any[] = [];
  private currentUser: any = null;
  private usersJsonUrl = 'assets/users.json'; // Path to your users JSON file

  constructor(private router: Router, private http: HttpClient) {
    this.loadUsers();
  }

  // Load users from users.json asynchronously
  private loadUsers(): void {
    this.http.get<any[]>(this.usersJsonUrl).subscribe(
      (data) => {
        this.users = data;
        console.log(data);
      },
      (error) => {
        console.error('Error loading users from JSON', error);
      }
    );
  }

  // Login method to check the email and password
  login(email: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      this.currentUser = user;
      return true;
    }
    return false;
  }

  // Get the current user's role
  getRole(): string {
    return this.currentUser ? this.currentUser.role : 'guest';
  }

  // Logout method
  logout(): void {
    this.currentUser = null;
    this.router.navigate(['/']);
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
}
