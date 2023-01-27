import { Component } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private notifier: NotifierService) {}

  save() {
    this.notifier.notify('success', "HELLO");
  }

  clearForm() {
    this.notifier.notify('error', "HELLO");
  }
}
