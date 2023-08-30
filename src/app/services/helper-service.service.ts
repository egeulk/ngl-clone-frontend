import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HelperServiceService {
  private apiUrl = environment.backendUrl + '/question'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  postQuestion(questionText: string): Observable<any> {
    const questionObject = { questionText: questionText };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    console.log(questionObject);
    return this.http.post<any>(this.apiUrl, questionObject, httpOptions);
  }  

}
