import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatInputModule,MatCardModule,MatProgressSpinnerModule,RouterLink,NgIf]
})
export class LoginComponent {
  credentials = { identifier: '', password: '' };
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login() {
    this.isLoading = true;
    this.authService.login(this.credentials).subscribe({
      next: (data: any) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('studentId', data._id);
        localStorage.setItem('role', data.role);
        this.router.navigate([data.role === 'admin' ? '/exams' : '/dashboard']);
      },
      error: () => {
        this.snackBar.open('Invalid credentials', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }
}