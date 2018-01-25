import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from '../auth.service';
import { StatusTypes } from '../../../../Common/Enums/StatusTypes';
import { UserBaseRequestModel } from '../../../../Common/Models/UserBaseRequestModel';
import { UserSignupRequestModel } from '../../../../Common/Models/UserSignupRequestModel';
import { UserResponseModel } from '../../../../Common/Models/UserResponseModel';

@Component({
    moduleId: module.id,
    selector: 'app-auth-component',
    templateUrl: 'Auth.Component.html'
})
export class AuthComponent implements OnInit {
    public AuthForm: FormGroup;
    public IsNewUser: boolean;
    public Title: string;
    public User: UserBaseRequestModel = new UserBaseRequestModel();
    public IsEditable: boolean;
    public StatusTypes = StatusTypes;
    public ErrorMessage: string;

    public constructor(
        private _router: Router,
        private Route: ActivatedRoute,
        public Service: AuthService) { }

    public ngOnInit() {
        this.AuthForm = new FormGroup({
            Name: new FormControl(null, [
                Validators.minLength(2)
            ]),
            Email: new FormControl(null, [
                Validators.minLength(3)
            ]),
            Username: new FormControl(null, [
                Validators.required,
                Validators.minLength(2)
            ]),
            Password: new FormControl(null, [Validators.required]),
        });
    }

    public Login() {
        let userRequest: UserBaseRequestModel = new UserBaseRequestModel();
        userRequest = this.AuthForm.value;
        this.Service.Login(userRequest).subscribe(
            (res: UserResponseModel) => {
                if (res.Status === StatusTypes.Error) {
                    this.ErrorMessage = res.Message;
                    console.log('login error');
                } else {
                    localStorage.setItem('Token', res.Token);
                    localStorage.setItem('UserId', res.UserId.toString());
                    localStorage.setItem('Name', res.Name);
                    this._router.navigate(['./welcome']);
                }
            },
            undefined,
            () => { });
    }

    public SignUp() {
        let userRequest: UserSignupRequestModel = new UserSignupRequestModel();
        userRequest = this.AuthForm.value;
        this.Service.Signup(userRequest).subscribe(
            (res: UserResponseModel) => {
                if (res.Status === StatusTypes.Error) {
                    this.ErrorMessage = res.Message;
                    console.log('login error');
                } else {
                    this.IsNewUser = false;
                    window.alert(`Congrats ${this.AuthForm.value.Username}, you have a Leadem Account! Log in and get started!`);
                }
            },
            undefined,
            () => { });
    }

    public OnChangeUserStatus() {
        this.IsNewUser = !this.IsNewUser;
        if (this.IsNewUser) {
            this.AuthForm.reset();
        }
    }
}
