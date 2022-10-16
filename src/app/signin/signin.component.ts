import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm!: FormGroup
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
  }

  login() {
    // temporary validation
    const formUser = this.loginForm.value;
    if (!formUser.username.length || !formUser.password.length) {
      alert('Please fill the details!');
      return;
    }

    this.http.get<any>('http://localhost:3000/users').subscribe(res => {
      const user = res.find((a: any) => {
        return a.username === formUser.username;
      });

      if (user) {
        if (user.password === formUser.password)
          alert("Logged in successfully!");
        // navigate to dashboard
        else
          alert("Invalid credentials!");
      } else {
        alert("User doesn't exist.");
        this.router.navigate(['/register'])
      }
      this.loginForm.reset();
    })
  }
}
