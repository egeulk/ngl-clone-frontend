import { Component } from '@angular/core';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent {
  //constructor(private route: ActivatedRoute) {}
/*
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const questionId = +params.get('id');
      // Fetch the question details based on the questionId
      // For example, if you have a service that fetches questions by ID
      const question = this.questionService.getQuestionById(questionId);
      this.questionText = question.text;
    });
  }

  */


}
