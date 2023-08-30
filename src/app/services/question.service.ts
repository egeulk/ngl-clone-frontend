import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Question } from '../classes/question';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  markAsRead(id: number) {
    const idObject = { id: id };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
     this.http.post<any>(this.apiUrl + "/question/read", idObject, httpOptions).subscribe(
      response => {
        console.log('Response Body:', response);
      },
      error => {
        console.error('Error posting question:', error);
      }
    );
    return this.http.post<any>(this.apiUrl + "/question/read", idObject, httpOptions);  }

  private apiUrl =  environment.backendUrl; 
  
  constructor(private http: HttpClient) { }

  questionList! : Question[];
  selectedQuestion : Question | null = null;
  width? : number;


  getQuestions(pageNumber: number): Observable<PageResponse<Question>> {
    const params = new HttpParams().set('page', pageNumber.toString());
    return this.http.get<PageResponse<Question>>(`${this.apiUrl}/question`, { params });
  }

  goToDetails(question : Question) {
    this.selectedQuestion=question;
  }

  getQuestion() : Question | null  {
    const returnedQuestion : Question | null = this.selectedQuestion;
    this.selectedQuestion = null;
    return returnedQuestion;
  }

  getQuestionById(id : number) {
    return this.http.get<Question>(`${this.apiUrl}/question/`+id);
  }
}

interface PageResponse<T> {
  content: T[];
  totalPages: number;
}