import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';
import { HttpXsrfCookieExtractor } from '@angular/common/http/src/xsrf';
import { element } from 'protractor';

@Component({
    selector: 'app-my-friends',
    templateUrl: './my-friends.component.html',
    styleUrls: ['./my-friends.component.css']
})
export class MyFriendsComponent implements OnInit {
    baseUrl = "http://localhost:3000/"

    users = []
    friends = []

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.checkUserStatus()
        this.getLists()
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

    getLists() {
        let url = this.baseUrl + "api/user/friends?id=" + sessionStorage.getItem('idUser');
        this.http.get(url).subscribe(
            (response) => {
                console.log(response)
                if (response['response'] != "") {
                    this.friends = Object.values(response)
                }
            },
            (error) => console.log(error)
        )

        url = this.baseUrl + "api/user/all"
        this.http.get(url).subscribe(
            (response) => {
                console.log(response)
                this.users = Object.values(response)

                this.users.forEach(function (element, index, object) {
                    if (element['id'] == sessionStorage.getItem('idUser')) {
                        object.splice(index, 1)
                    }
                    for (const friend in this.friends) {
                        if (element['id'] == this.friends[friend]['id']) {
                            object.splice(index, 1)
                        }
                    }
                }, this)
                console.log(this.users)

            },
            (error) => console.log(error)
        )
    }

    changeItem(list) {
        console.log(list)
        const select = document.getElementById(list) as HTMLSelectElement

        for (let i = 0; i < select.selectedOptions.length; i++) {
            if (list == "notFriends") {
                this.friends.push(this.users[select.selectedOptions[i].index - i])
                this.users.splice(select.selectedOptions[i].index - i, 1)
            } else {
                this.users.push(this.friends[select.selectedOptions[i].index - i])
                this.friends.splice(select.selectedOptions[i].index - i, 1)
            }
        }
        console.log(this.users)
        console.log(this.friends)
    }

    saveChange() {
        const url = this.baseUrl + "api/user/modify/friends"

        const jsonData = '{"id": "' + sessionStorage.getItem('idUser') + '",' +
            '"friends" : ' + JSON.stringify(this.friends) + '}' 

        console.log(jsonData)

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        }

        this.http.post(url, jsonData, httpOptions).subscribe(
            (response) => {
                console.log(response)
            },
            (error) => console.log(error)
        )
    }
}
