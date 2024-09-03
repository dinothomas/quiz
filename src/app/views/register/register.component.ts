import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  name: string = '';
  uid: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToQuestions() {
    if (localStorage.getItem('userDetails')) {
      let userData: any = localStorage.getItem('userDetails');
      userData = JSON.parse(userData);
      const index = userData.findIndex((data: any) => (data.uid === this.uid));

      if (index != -1) {
        userData[index] = {
          name: this.name,
          uid: this.uid,
          noQuestions: 0,
          score: 0,
          noAttempt: userData[index].noAttempt + 1
        };
      } else {
        userData.push({
          name: this.name,
          uid: this.uid,
          noQuestions: 0,
          score: 0,
          noAttempt: 1
        });
      }

      localStorage.setItem('userDetails', JSON.stringify(userData));
    } else {
      localStorage.setItem(
        'userDetails',
        JSON.stringify([
          { name: this.name, uid: this.uid, noQuestions: 0, score: 0, noAttempt: 1 },
        ])
      );
    }
    localStorage.setItem('currentUserUid', this.uid);
    this.router.navigate(['questions']);
  }
}
