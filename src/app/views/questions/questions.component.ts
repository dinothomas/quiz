import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import jsonData from './../../../assets/questions/questions.json';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit, OnDestroy {
  private intervalId: any;
  jsonData: any;
  currentQuestion: any;
  index: number = 0;
  score: number = 0;
  isHeAnswered: boolean = false;
  showScoreBoard: boolean = false;
  pendingTime: number = 120;
  noOfQuestionsAnswered: number = 0;
  noOfRightAnswer: number = 0;
  noOfWrongAnswer: number = 0;

  constructor(private ngZone: NgZone, private router: Router) {}

  ngOnInit(): void {
    if(!localStorage.getItem('currentUserUid')) {
      this.router.navigate(['questions']);
    }

    this.jsonData = jsonData;
    this.jsonData = this.shuffle(this.jsonData);
    this.currentQuestion = this.jsonData[this.index];
    this.currentQuestion.options = this.shuffle(this.currentQuestion.options);
    this.pendingTime = 120;
    this.noOfQuestionsAnswered = 0;
    this.noOfRightAnswer = 0;
    this.noOfWrongAnswer = 0;
    this.score = 0;

    this.startInterval();
  }

  ngOnDestroy(): void {
    localStorage.removeItem('currentUserUid');
    this.stopInterval();
  }

  startInterval() {
    // Clear any existing intervals to avoid multiple concurrent intervals
    this.stopInterval();

    // Start a new interval that runs a function every second
    this.intervalId = setInterval(() => {
      this.ngZone.run(() => {
        // Execute your function here
        this.reduceTime();
      });
    }, 1000); // 1000 milliseconds = 1 second
  }

  stopInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  reduceTime() {
    if(this.pendingTime != 0){
    this.pendingTime--;
    } else {
      this.showScoreCard();
    }
  }

  showScoreCard() {
    const currentUserUid = localStorage.getItem('currentUserUid');
    let userData: any = localStorage.getItem('userDetails');
    userData = JSON.parse(userData);
    const index = userData.findIndex((data: any) => (data.uid === currentUserUid));

    if (index != -1) {
      userData[index].noQuestions = this.noOfQuestionsAnswered;
      userData[index].score = this.score;
    }
    localStorage.setItem('userDetails', JSON.stringify(userData));
    localStorage.removeItem('currentUserUid');
    this.showScoreBoard = true;
  }

  getNextQuestion() {
    if(this.jsonData.length === this.index + 1) {
      this.showScoreCard();
    }
    this.index++;
    this.isHeAnswered = false;
    this.currentQuestion = this.jsonData[this.index];
    this.currentQuestion.options = this.shuffle(this.currentQuestion.options);
  }

  checkAnswer(index: number) {
    if (!this.isHeAnswered) {
      this.isHeAnswered = true;
      this.noOfQuestionsAnswered++;

      if (
        this.currentQuestion.options[index] === this.currentQuestion.rightAnswer
      ) {
        this.score = this.score + 10;
        this.noOfRightAnswer++
      } else {
        this.noOfWrongAnswer++
      }
    }
  }

  checkClass(index: number) {
    if (!this.isHeAnswered) {
      return '';
    } else if (
      this.currentQuestion.options[index] === this.currentQuestion.rightAnswer
    ) {
      return 'right-answer';
    } else {
      return 'wrong-answer';
    }
  }

  shuffle(array: any[]) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  goToRankList() {
    this.router.navigate(['rank-list']);
  }
}
