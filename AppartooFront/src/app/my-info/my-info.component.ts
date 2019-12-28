import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-my-info',
    templateUrl: './my-info.component.html',
    styleUrls: ['./my-info.component.css']
})
export class MyInfoComponent implements OnInit {
    baseUrl = "http://localhost:3000/"
    editMode = false;

    infoForm = new FormGroup({
        login: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        age: new FormControl(''),
        family: new FormControl(''),
        role: new FormControl(''),
        food: new FormControl(''),

    });

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.checkUserStatus()
        this.getCurrentUserData();
        this.infoForm.disable()

    }


    checkUserStatus() {
        const url = this.baseUrl + "api/user/exist?id=" + sessionStorage.getItem('idUser');
        this.http.get(url).subscribe(
            (response) => {
                console.log(response)
                if (response == "not exist") {
                    sessionStorage.setItem('idUser', "")
                    document.location.href = "http://localhost:4200/login";
                }

            },
            (error) => console.log(error)
        )
    }

    getCurrentUserData() {
        const url = this.baseUrl + "api/user/info?id=" + sessionStorage.getItem('idUser');
        this.http.get(url).subscribe(
            (response) => {
                console.log(response)
                this.infoForm.get('login').setValue(response['login'])
                this.infoForm.get('password').setValue(response['password'])
                this.infoForm.get('age').setValue(response['age'])
                this.infoForm.get('family').setValue(response['family'])
                this.infoForm.get('role').setValue(response['role'])
                this.infoForm.get('food').setValue(response['food'])

            },
            (error) => console.log(error)
        )
    }
    saveChanges() {

        if (this.infoForm.valid) {

            const url = this.baseUrl + "api/user/modify"

            const jsonData = '{"id": "' + sessionStorage.getItem('idUser') + '",' +
                '"login" : "' + this.infoForm.get('login').value + '",' +
                '"password":"' + this.infoForm.get('password').value + '",' +
                '"password":"' + this.infoForm.get('password').value + '",' +
                '"age":"' + this.infoForm.get('age').value + '",' +
                '"family":"' + this.infoForm.get('family').value + '",' +
                '"role":"' + this.infoForm.get('role').value + '",' +
                '"food":"' + this.infoForm.get('food').value + '"}'

            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                })
            }

            this.http.post(url, jsonData, httpOptions).subscribe(
                (response) => {
                    console.log(response)
                    this.switchMode(false)
                },
                (error) => console.log(error)
            )


        } else {
            console.log("Le Formulaire n'est pas correctement rempli.")
            return;
        }
    }

    switchMode(value) {
        this.editMode = value

        if (value == true) {
            this.infoForm.enable()

        } else {
            this.infoForm.disable()

        }

    }
}
