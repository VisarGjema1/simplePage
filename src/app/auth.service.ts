import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

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

  // Load users from local storage or users.json asynchronously
  loadUsers(): void {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    } else {
      this.http.get<any[]>(this.usersJsonUrl).subscribe(
        (data) => {
          this.users = data;
          localStorage.setItem('users', JSON.stringify(this.users));
        },
        (error) => {
          console.error('Error loading users from JSON', error);
        }
      );
    }
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

  // Register method to add a new user
  register(username: string, email: string, password: string): Observable<any> {
    const userExists = this.users.some((u) => u.email === email);
    if (userExists) {
      return of({ success: false, message: 'User already exists' });
    }
    const newUser = { username, email, password, role: 'user' };
    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));
    return of({ success: true, message: 'User registered successfully' });
  }

  // Method to get all users
  getUsers(): any[] {
    return this.users;
  }
}
