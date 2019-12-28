import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    url = "http://localhost:3000/api/add/user"
    registerForm = new FormGroup({
        login: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),

    });
    constructor(private http: HttpClient) { }

    ngOnInit() {
    }

    register() {

        if (this.registerForm.valid) {
            const jsonData = '{ "login" : "' + this.registerForm.get('login').value + '",' +
                '"password":"' + this.registerForm.get('password').value + '"}'

            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                })
            }

            return this.http.post(this.url, jsonData, httpOptions).subscribe(
                (response) => console.log(response),
                (error) => console.log(error)
            )

            
        } else {
            console.log("Le Formulaire n'est pas correctement rempli.")
            return;
        }
    }
}
