import { Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/classes/question';
import { QuestionService } from 'src/app/services/question.service';
import { OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { QuestionWebSocketService } from 'src/app/services/question-web-socket.service';
import { Subscription } from 'rxjs';
import { SwPush } from '@angular/service-worker';
import { ServiceWorkerModule } from '@angular/service-worker';


@Component({
  selector: 'app-answering-page',
  templateUrl: './answering-page.component.html',
  styleUrls: ['./answering-page.component.css']
})



export class AnsweringPageComponent implements OnInit, OnDestroy {
/*click() {
  this.swPush.requestSubscription({
    serverPublicKey: this.VAPID_PUBLIC_KEY
}).then(sub => console.log("works"))
.catch(err => console.error("Could not subscribe to notifications", err));

}
*/
  @ViewChild('questionlist') scrollContainer!: ElementRef;

  questions : Question[] = [];
  questionIndex : number = 0;
  isLoading : boolean = false;
  totalPages : number=0;
  private subscription: Subscription;
  readonly VAPID_PUBLIC_KEY = "BLBx-hf2WrL2qEa0qKb-aCJbcxEvyn62GDTyyP9KTS5K7ZL0K7TfmOKSPqp8vQF0DaG8hpSBknz_x3qf5F4iEFo";


  constructor(private questionService: QuestionService, private router : Router,private websocketService: QuestionWebSocketService, private swPush: SwPush) {
    
    this.subscription = this.websocketService.getBookUpdates().subscribe((update) => {
      // Handle updates received from the WebSocket
      //this.updates.push(update);
      console.log(update.body);
      const question = JSON.parse(update.body) as Question; // Deserialize JSON to Book
      const newQuestion = new Question(question.id, question.questionText, question.ipAddress, question.isRead);
      this.questions.pop();
      this.questions.unshift(newQuestion);
  });
  
}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.websocketService.disconnect();
  }

  ngOnInit(): void {
  
    this.loadQuestions(this.questionIndex); // Load questions for page 0 when the component initializes
    console.log('real questions has been entered');
    console.log(this.questions);
    console.log(this.swPush.isEnabled);


    
//.then(sub => this.newsletterService.addPushSubscriber(sub).subscribe())
  //.catch(err => console.error("Could not subscribe to notifications", err));
  }

  loadQuestions(pageNumber: number): void {
    console.log("questions are loading for index number: " + this.questionIndex);
    this.isLoading = true;
    this.questionService.getQuestions(pageNumber)
    .subscribe((response: PageResponse<Question>) => {
      const mappedResponse: Question[] = response.content.map(item => new Question(
        item.id,
        item.questionText,
        item.ipAddress,
        item.isRead
      ));
      this.questions = [...this.questions, ...mappedResponse];
      console.log(this.questions);
      this.totalPages = response.totalPages;
      this.isLoading = false;
    },
    (error) => {
      console.error('Error fetching questions:', error);
      this.isLoading = false;
    });
  }

  onScroll(): void {
    const scrollContainer = this.scrollContainer.nativeElement;
    const scrollHeight = scrollContainer.scrollHeight;
    const scrollTop = scrollContainer.scrollTop;
    const clientHeight = scrollContainer.clientHeight;
    const scrollPosition = scrollTop + clientHeight;
    const buffer = 100; // Adjust this buffer based on your preference
    console.log(this.totalPages + "------" + this.questionIndex);
    if (scrollPosition >= scrollHeight - buffer && !this.isLoading && (this.questionIndex<this.totalPages-1) ) {
      this.isLoading = true;
      console.log("inside if");
      // Load more data when the user is close to the bottom
      this.questionIndex++;
      this.loadQuestions(this.questionIndex);
    }
  }

  goToQuestionDetail(question: Question) {
    console.log("navigating to there");
    console.log("passign the:")
    console.log(question);
    this.questionService.goToDetails(question);
    this.router.navigate(['/dashboard', question.id]);
  }

}

interface PageResponse<T> {
  content: T[];
  totalPages: number;
}