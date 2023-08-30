import { Component, Inject } from '@angular/core';
import { HelperServiceService } from '../../services/helper-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asking-page',
  templateUrl: './asking-page.component.html',
  styleUrls: ['./asking-page.component.css']
})
export class AskingPageComponent {
  questionInput : string = "";

  constructor(private helperService: HelperServiceService, private router : Router) {     console.log('Component initialized');
}

  onPost(question : string) {
     this.helperService.postQuestion(question).subscribe(
      response => {
        this.router.navigate(['/success']);      },
      error => {
        //hightlight nad show error message 
        console.error('Error posting question:', error);
      }
    );
  }


}
