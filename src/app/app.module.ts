import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AskingPageComponent } from './components/asking-page/asking-page.component';
import { AnsweringPageComponent } from './components/answering-page/answering-page.component';
import { HelperServiceService } from './services/helper-service.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { LoginService } from './services/login.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { authGuard } from './guards/auth.guard';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { QuestionService } from './services/question.service';
import { QuestionDetailComponent } from './components/question-detail/question-detail.component';
import { AnswerDetailsComponent } from './components/answering-page/answer-details/answer-details.component';
import { CardService } from './services/card.service';
import { SuccesfulAskComponent } from './components/succesful-ask/succesful-ask.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { QuestionWebSocketService } from './services/question-web-socket.service';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    AskingPageComponent,
    AnsweringPageComponent,
    LoginPageComponent,
    QuestionDetailComponent,
    AnswerDetailsComponent,
    SuccesfulAskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,FormsModule,
    InfiniteScrollModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })

    
  ],
  providers: [HelperServiceService,  QuestionService, CardService, QuestionWebSocketService,
    {provide: authGuard, useValue: authGuard},
    LoginService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
