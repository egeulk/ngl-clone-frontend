import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-succesful-ask',
  templateUrl: './succesful-ask.component.html',
  styleUrls: ['./succesful-ask.component.css']
})
export class SuccesfulAskComponent {

constructor(private router : Router) {
  
}

backToHomepage() {
  this.router.navigate(['/']);
}

}
