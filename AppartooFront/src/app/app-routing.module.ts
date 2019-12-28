import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { LogInComponent } from './log-in/log-in.component';
import { LogOutComponent } from './log-out/log-out.component';
import { MyFriendsComponent } from './my-friends/my-friends.component';
import { MyInfoComponent } from './my-info/my-info.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full',
    }, {
        path: 'signin',
        component: SignInComponent,
    }, {
        path: 'login',
        component: LogInComponent,
    }, {
        path: 'logout',
        component: LogOutComponent,
    }, {
        path: 'me',
        component: MyFriendsComponent,
    }, {
        path: 'friends',
        component: MyInfoComponent,
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
