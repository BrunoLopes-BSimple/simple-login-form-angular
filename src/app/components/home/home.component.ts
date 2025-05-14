import { Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { LoginComponent } from '../login/login.component';
import { LoginInfo } from '../../interfaces/login-info';
import { UserHomeComponent } from '../user-home/user-home.component';
UserHomeComponent

@Component({
  selector: 'app-home',
  imports: [RegisterComponent, LoginComponent, UserHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  registerUserCliked: boolean = false;
  logedInSuccessfully: boolean = false;
  logedInUser!: User;
  userLoggedOut: boolean = true;

  constructor(private userService: UserService) { }

  receiveUser(receivedEvent: User) {
    this.userService.addUser(receivedEvent);
    alert("User registered.");
    this.registerUserCliked = false;
  }

  checkLoginInfo(receivedInfo: LoginInfo) {
    const userExists = this.userService.checkLogin(receivedInfo);
    if (userExists) {
      this.logedInSuccessfully = true;
      this.userLoggedOut = false;
      this.logedInUser = userExists;
    } else {
      alert("Incorrect credentials");
    }
  }

  userWantsToRegister(receivedInfo: boolean) {
    this.registerUserCliked = receivedInfo;
  }

  userWantsToLogout(receivedInfo: boolean) {
    this.userLoggedOut = receivedInfo;
  }
}
