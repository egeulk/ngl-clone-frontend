import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  username : string = '';
  password : string = '';

  constructor(private http : HttpClient, private router : Router) {}

  login() {
    const credentials = { username: this.username, password: this.password };

    // Replace with your Spring backend URL
    const apiUrl = environment.backendUrl+'/login';

    // Make a POST request to your Spring backend for authorization
    this.http.post(apiUrl, credentials, { responseType: 'json' }).subscribe(
      (response: any) => {
        // Assuming the response contains a JWT token
        const jwtToken = response.token;

        // Store the JWT token in localStorage or a more secure location
        console.log(jwtToken);
        console.log(response);
        localStorage.setItem('access_token', jwtToken);
        this.router.navigate(['/queen']);
        console.log('Login successful');
      },
      (error) => {
        console.error('Login failed:', error); //highlight the labels, change the dom
        const usernameLabel = document.getElementById('username');
        const passwordLabel = document.getElementById('password');
        if (usernameLabel && passwordLabel) {
          usernameLabel.style.color = 'red';
          passwordLabel.style.color = 'red';
        }

    
      }
    );
  }
}
