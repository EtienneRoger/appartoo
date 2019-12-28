import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
    url = "http://localhost:3000/api/login"
    loginForm = new FormGroup({
        login: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),

    });
    constructor(private http: HttpClient) { }

    ngOnInit() {
    }

    login() {

        if (this.loginForm.valid) {
            this.url = "http://localhost:3000/api/login?login=" + this.loginForm.get("login").value + "&password=" + this.loginForm.get("password").value


            return this.http.get(this.url).subscribe(
                (response) => {
                    console.log(response)
                    sessionStorage.setItem('idUser', JSON.stringify(response));
                    document.location.href = "http://localhost:4200/me";
                },
                (error) => console.log(error)
            )


        } else {
            console.log("Le Formulaire n'est pas correctement rempli.")
            return;
        }
    }
}
