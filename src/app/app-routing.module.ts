import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AskingPageComponent } from './components/asking-page/asking-page.component';
import { AnsweringPageComponent } from './components/answering-page/answering-page.component';
import { authGuard } from './guards/auth.guard';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { QuestionDetailComponent } from './components/question-detail/question-detail.component';
import { AnswerDetailsComponent } from './components/answering-page/answer-details/answer-details.component';
import { SuccesfulAskComponent } from './components/succesful-ask/succesful-ask.component';

const routes: Routes = [
  { path: '', component: AskingPageComponent, canActivate: [authGuard]},
  { path: 'success', component: SuccesfulAskComponent },
  { path: 'dashboard', component: AnsweringPageComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginPageComponent, canActivate: [authGuard] },
  { path: 'dashboard/:id', component: AnswerDetailsComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' } // Redirect to the home page for unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
