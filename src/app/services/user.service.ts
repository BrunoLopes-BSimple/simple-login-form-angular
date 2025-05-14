import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { LoginInfo } from '../interfaces/login-info';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userList: User[] = [];

  addUser(newUser: User) {
    this.userList.push(newUser);
  }

  checkLogin(loginInfo: LoginInfo): User | null {
    const user = this.userList.find(u => u.email === loginInfo.email);
    if (user && user.password === loginInfo.password) {
      return user;
    }
    return null;
  }
}
