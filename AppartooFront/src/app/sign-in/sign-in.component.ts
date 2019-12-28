import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    baseUrl = "http://localhost:3000/"

    registerForm = new FormGroup({
        login: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        age: new FormControl(''),
        family: new FormControl(''),
        role: new FormControl(''),
        food: new FormControl(''),

    });
    constructor(private http: HttpClient) { }

    ngOnInit() {
    }

    register() {

        if (this.registerForm.valid) {

            const url = this.baseUrl + "api/add/user"

            const jsonData = '{ "login" : "' + this.registerForm.get('login').value + '",' +
                '"password":"' + this.registerForm.get('password').value + '",' + 
                '"password":"' + this.registerForm.get('password').value + '",' + 
                '"age":"' + this.registerForm.get('age').value + '",' + 
                '"family":"' + this.registerForm.get('family').value + '",' + 
                '"role":"' + this.registerForm.get('role').value + '",' + 
                '"food":"' + this.registerForm.get('food').value + '"}'

            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                })
            }

            this.http.post(url, jsonData, httpOptions).subscribe(
                (response) => {
                    console.log(response)
                    document.location.href = "http://localhost:4200/login";

                },
                (error) => console.log(error)
            )

            
        } else {
            console.log("Le Formulaire n'est pas correctement rempli.")
            return;
        }
    }

}
