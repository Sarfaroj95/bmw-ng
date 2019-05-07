import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	errors: any[] = [];
	notifMessage: string = '';

  constructor( private fb: FormBuilder,
  			       private auth: AuthService,
  			       private router: Router,
  			       private route: ActivatedRoute ) { }

  ngOnInit() {
  	           this.initForm();

  	this.route.params.subscribe((params) => {
  		if(params['registered'] === 'success') {
  			debugger;
  			this.notifMessage = 'You have been succesfuly registered, you can login now' ;
  		}
  	})
  }

// validation
  initForm() {
  	this.loginForm = this.fb.group({
  		email: ['', [ Validators.required, 
        Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
  		password: ['', Validators.required]
  	})
  }

  isInvalidForm(fieldName): boolean {
  	return this.loginForm.controls[fieldName].invalid && 
  	      (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched)
  }

  isRequired(fieldName): boolean {
  	return this.loginForm.controls[fieldName].errors.required
  }

  isPattern(fieldName) : boolean {
  	return this.loginForm.controls[fieldName].errors.pattern
  }

  //function

  login(){
  	this.auth.login(this.loginForm.value).subscribe(
  		(token) => {
  			this.router.navigate(['./rentals']);
  		},
  		(errorResponse)=> {
  			 this.errors = errorResponse.error.errors;
  		})
  }

}
