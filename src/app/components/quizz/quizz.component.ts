import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})



export class QuizzComponent implements OnInit {

  title: string = "";

  private questions: any;
  public questionSelected: any;

  private answers: string[] = [];
  public answerSelected: string = "";

  private questionIndex: number = 0;
  public questionMaxIndex: number = 0;

  public finished: boolean = false;

  ngOnInit(): void {
    if(quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;

      this.questionIndex = 0;
      this.questions = quizz_questions.questions;

      this.questionSelected = this.questions[this.questionIndex];
      this.questionMaxIndex = this.questions.length;
    }
  }

  public playerChoice(alias: any): void {
    this.answers.push(alias);
    this.nextStep();
  }

  private async nextStep() {
    this.questionIndex++;
    if(this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const playerResult: string = await this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected = quizz_questions.results[playerResult as keyof typeof quizz_questions.results];
      // Verificar opção ganhadora

    }
  }

  private async checkResult(answers:string[]) {
    const result = answers.reduce((previous, current, i, arr) => {
        if(arr.filter(item => item === previous).length > arr.filter(item => item === current).length) {
          return previous;
        } else {
          return current;
        }
    });

    return result;
  }

}
