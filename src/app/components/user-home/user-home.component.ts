import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user-home',
  imports: [],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {
  @Input() user!: User;
  @Output() sendLogout = new EventEmitter<boolean>();

  logout() {
    this.sendLogout.emit(true);
  }
}
