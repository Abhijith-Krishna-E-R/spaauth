import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm!: FormGroup
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.formBuilder.group({
      username: [''],
      email: [''],
      phone: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
  }

  register() {
    // temporary validation
    const formUser = this.registerForm.value;
    if (!formUser.username.length || !formUser.password.length) {
      alert('Please fill the details!');
      return;
    }

    this.http.get<any>('http://localhost:3000/users').subscribe(res => {
      if (res.find((u: any) => u.username == formUser.username)) {
        alert('User already exist!');
        this.registerForm.reset();
      }
      else {
        // send data to json-server, with json file: src/assets/db.json 
        this.http.post<any>('http://localhost:3000/users', formUser.value).subscribe(res => {
          alert(`inserted user: ${res.username} with id: ${res.id}`);
        });
      }
    });
  }
}
