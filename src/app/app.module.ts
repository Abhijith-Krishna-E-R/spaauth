import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';


const appRoute: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', pathMatch: 'full', redirectTo: 'signin' }
]

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoute),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
