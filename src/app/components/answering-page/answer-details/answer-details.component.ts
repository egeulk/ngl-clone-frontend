import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Question } from 'src/app/classes/question';
import { OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { cardOptions } from 'src/app/cardEnums';
import { Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';
import html2canvas from 'html2canvas';
import { CardService } from 'src/app/services/card.service';


@Component({
  selector: 'app-answer-details',
  templateUrl: './answer-details.component.html',
  styleUrls: ['./pinkdows-bootstrap.css','./answer-details.component.css', './cards.css']
})
export class AnswerDetailsComponent implements OnInit{


buttonClicked() {
  
  const card = this.el.nativeElement.querySelector('.card-template');

  const options = {
    backgroundColor: null, // Example: Scale the captured image by a factor of 2
  };

  html2canvas(card, options).then(function(canvas) {
    // Convert the canvas to a data URL
    const dataURL = canvas.toDataURL();

    // Create a link to trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    const currentTime = new Date();
    downloadLink.download = 'nurscreenshot'+ currentTime.toLocaleString()  +'.png'; // Change the filename as needed
    downloadLink.click();

    //servise secili  stili kaydettir. stilKaydet(a);
    //eger secili stil rainbow ise renkleri de kaydettir renkKaydet(a,b);
    //init kisminda renkleri ayarla
}
  
);
this.cardService.saveStyle(this.selectedOption);
if(this.selectedOption === cardOptions.Rainbow) {
  this.cardService.saveColors(this.selectedColorOne, this.selectedColorTwo);
}
    

}

  question : Question | null = new Question(99, "DUMMY SOMETHING WRONG", "somethingWrong,com", false);;
  selectedOption: cardOptions = cardOptions.FamilyGuy; //fetch this from service
  animationOptions = Object.values(cardOptions);
  isInitialized = false;
  selectedColorOne: string = '#000000'; 
  selectedColorTwo: string = '#000000'; 



  ngAfterViewInit() {
    //
  }

 
  constructor(private questionService : QuestionService, private router: Router, private route: ActivatedRoute, private renderer: Renderer2, private el: ElementRef,private cardService : CardService) {

  }

  ngOnInit(): void {
    this.isInitialized=true; //remove later


    if (this.isInitialized) {
      const retrievedQuestion = this.questionService.getQuestion(); // Get the question from the service
      if (retrievedQuestion !== null) {
        this.question = retrievedQuestion; // Initialize the property if the retrieved question is not null
        if (this.question.isRead==false) {
          this.questionService.markAsRead(this.question.id);
        }
        const {color1, color2, selectedStyle} = this.cardService.getData();
        this.selectedColorOne=color1;
        this.selectedColorTwo=color2;
        this.selectedOption=selectedStyle;
        this.radioClicked();
      } else {
        const id = this.route.snapshot.paramMap.get('id');
        console.log(id);
        if (id !== null) {
          const parsedId: number = parseInt(id, 10); // Using parseInt
          this.questionService.getQuestionById(parsedId).subscribe (
            (response: Question) => {
               // parsing doesn't work
            console.log(response);
            this.question = new Question(response.id, response.questionText, response.ipAddress, response.isRead);
            console.log(this.question);

            if (this.question.isRead==false) {
              this.questionService.markAsRead(this.question.id);
            }

            //buraya kadar contructordaydi......................
            const {color1, color2, selectedStyle} = this.cardService.getData();
            this.selectedColorOne=color1;
            this.selectedColorTwo=color2;
            this.selectedOption=selectedStyle;
            this.radioClicked();

            },
            (error) => {
              console.error('Error fetching question:', error);
            }
          );
        }  
        else {
          throw new Error('Soru yok.');
        }
      }
    }
  }

  radioClicked() {
    console.log("Before rendering the card, this is the question: " + this.question?.questionText);

    switch (this.selectedOption) {
      case cardOptions.FamilyGuy:
        this.familyGuyMethod();
        break;
      case cardOptions.Pinkdows95:
        this.pinkdows95Method();
        break;
      case cardOptions.SpongebobEnding:
        this.spongeBobEndingMethod();
        break;
      case cardOptions.Rainbow:
        this.rainbowMethod();
        break;
      case cardOptions.SourFlower:
        this.sourFlowerMethod();
        break;
      case cardOptions.Barbie:
        this.barbieMethod();
        break;
      case cardOptions.GreeNGL:
        this.greenMethod();
        break;
    }

  }
  greenMethod() {
    const topDiv = this.renderer.createElement('div');
    this.renderer.addClass(topDiv, 'topdiv');
    const topText = this.renderer.createText('Bana anomim olarak mesajlar gonder');
    this.renderer.appendChild(topDiv, topText);
    

    // Create the bottom div
    const bottomDiv = this.renderer.createElement('div');
    this.renderer.addClass(bottomDiv, 'bottomdiv');
   
    let bottomText=this.renderer.createText("");
    if (this.question != null) {
    bottomText = this.renderer.createText(this.question?.questionText);  ///replace this logic once you fix quesiton object
    }
    this.renderer.appendChild(bottomDiv, bottomText);     
    
    const parentDiv = this.renderer.createElement('div');

    this.renderer.appendChild(parentDiv, topDiv);
    this.renderer.appendChild(parentDiv, bottomDiv);
    this.renderer.addClass(parentDiv, 'greengl-card');
    const existingDiv = this.el.nativeElement.querySelector('.card-template');
    this.renderer.addClass(parentDiv, 'card-template');
    existingDiv.parentNode.replaceChild(parentDiv, existingDiv);   

    const button = this.el.nativeElement.querySelector('.custom-button');
    this.renderer.setStyle(button, 'background', 'none');
    this.renderer.setStyle(button, 'background-color', '#2ddf4e');
  }

  //most updated here I guess
  barbieMethod() {

    const topDiv = this.renderer.createElement('div');
    this.renderer.addClass(topDiv, 'barbie-topdiv');
    this.renderer.setStyle(topDiv, 'min-height', '100px');
    this.renderer.setStyle(topDiv, 'width', '100%');
   // this.renderer.setStyle(topDiv, 'background-color', '#34495e');//blackish #FFD700
   this.renderer.setStyle(topDiv, 'background-color', '#E9609B');
    this.renderer.setStyle(topDiv, 'border-top-left-radius', '20px');
    this.renderer.setStyle(topDiv, 'border-top-right-radius', '20px');
    this.renderer.setStyle(topDiv, 'display', 'flex');
    this.renderer.setStyle(topDiv, 'flex-direction', 'column');
    this.renderer.setStyle(topDiv, 'justify-content', 'center'); // Center vertically
    this.renderer.setStyle(topDiv, 'align-items', 'center');
    this.renderer.setStyle(topDiv, 'box-shadow', '0px 2px 4px rgba(0, 0, 0, 0.2)');
    //const topText = this.renderer.createText("Nursima'ya anomim sormak icin NursimayaSor.com");
    const topText = this.renderer.createText('Bana anomim olarak mesajlar gonder');
    this.renderer.setStyle(topDiv, 'font-family', "'barbie'"); // Use the correct font-family name
    this.renderer.setStyle(topDiv, 'color', '#FFFFFF'); // Set the desired text color
    ////////font controls

    //Added new span inside the top div
    const spanElement = this.renderer.createElement('span');
    this.renderer.setStyle(spanElement, 'transform', 'skew(10deg)'); // Change the font size
    this.renderer.appendChild(topDiv, spanElement);

    this.renderer.setStyle(topDiv, 'font-size', '26px'); // Change the font size
    this.renderer.setStyle(topDiv, 'padding', '5px'); // Use the correct font-family name
    this.renderer.setStyle(topDiv, 'letter-spacing', '0.3px'); // Change the font size
    this.renderer.setStyle(topDiv, 'line-height', '1.3'); // Change the font size

    this.renderer.appendChild(topDiv, topText);
    

    // Create the bottom div
    const bottomDiv = this.renderer.createElement('div');
    this.renderer.addClass(bottomDiv, 'bottom-div');
    this.renderer.setStyle(bottomDiv, 'min-height', '100px');
    this.renderer.setStyle(bottomDiv, 'width', '100%');
    this.renderer.setStyle(bottomDiv, 'background-color', 'transparent');
    this.renderer.setStyle(bottomDiv, 'border-bottom-left-radius', '20px');
    this.renderer.setStyle(bottomDiv, 'border-bottom-right-radius', '20px');
    this.renderer.setStyle(bottomDiv, 'border', '0');
    this.renderer.setStyle(bottomDiv, 'display', 'flex');
    this.renderer.setStyle(bottomDiv, 'flex-direction', 'column');
    this.renderer.setStyle(bottomDiv, 'justify-content', 'center'); // Center vertically
    this.renderer.setStyle(bottomDiv, 'align-items', 'center');
    this.renderer.setStyle(bottomDiv, 'font-weight', 'bold'); // Make the text bold
    this.renderer.setStyle(bottomDiv, 'font-size', '20px'); // Change the font size
    this.renderer.setStyle(bottomDiv, 'font-family', 'Arial, sans-serif'); // Change the font type
    this.renderer.setStyle(bottomDiv,  'padding', '12px'); // Change the font type
    this.renderer.setStyle(bottomDiv,  'padding-top', '16px'); // Change the font type
    this.renderer.setStyle(bottomDiv,  'padding-bottom', '16px'); // Change the font type
    this.renderer.setStyle(bottomDiv, 'letter-spacing', '-0.5px'); // Change the font size
   // this.renderer.setStyle(bottomDiv, 'line-height', '0.95'); // Change the font size


    this.renderer.setStyle(bottomDiv, 'box-shadow', '0px 2px 4px rgba(0, 0, 0, 0.2)');

    let bottomText=this.renderer.createText("");
    if (this.question != null) {
    bottomText = this.renderer.createText(this.question?.questionText);  ///replace this logic once you fix quesiton object
    }
    this.renderer.appendChild(bottomDiv, bottomText);     
    this.renderer.setStyle(bottomDiv, 'white-space', 'normal'); // Allow text to wrap to multiple lines
    this.renderer.setStyle(bottomDiv, 'word-wrap', 'break-word'); // Break long words 

    const parentDiv = this.renderer.createElement('div');

    this.renderer.appendChild(parentDiv, topDiv);
    this.renderer.appendChild(parentDiv, bottomDiv);

    this.renderer.setStyle(parentDiv, 'alignItems', 'center');
    this.renderer.setStyle(parentDiv, 'justifyContent', 'center'); // Center vertically
    this.renderer.setStyle(parentDiv, 'display', 'flex');
    this.renderer.setStyle(parentDiv, 'flex-direction', 'column');
    //this.renderer.setStyle(parentDiv, 'box-shadow', '0px 2px 4px rgba(0, 0, 0, 0.2)');

    const existingDiv = this.el.nativeElement.querySelector('.card-template');
    this.renderer.addClass(parentDiv, 'card-template');
    existingDiv.parentNode.replaceChild(parentDiv, existingDiv);  
  
    const button = this.el.nativeElement.querySelector('.custom-button');
    this.renderer.setStyle(button, 'background', 'none');
    this.renderer.setStyle(button, 'background-color', '#e9609b');
  
  }

  sourFlowerMethod() {
    const topDiv = this.renderer.createElement('div');
    this.renderer.addClass(topDiv, 'top-div');

   // this.renderer.setStyle(topDiv, 'background-color', '#34495e');//blackish #FFD700
   this.renderer.setStyle(topDiv, 'background-color', '#7CFC00');
    this.renderer.setStyle(topDiv, 'border-top-left-radius', '20px');
    this.renderer.setStyle(topDiv, 'border-top-right-radius', '20px');
    this.renderer.setStyle(topDiv, 'display', 'flex');
    this.renderer.setStyle(topDiv, 'flex-direction', 'column');
    this.renderer.setStyle(topDiv, 'justify-content', 'center'); // Center vertically
    this.renderer.setStyle(topDiv, 'align-items', 'center');
    //height width
    this.renderer.setStyle(topDiv, 'min-height', '100px');
    this.renderer.setStyle(topDiv, 'width', '100%');
    this.renderer.setStyle(topDiv, 'box-shadow', '0px 2px 4px rgba(0, 0, 0, 0.2)');
    //const topText = this.renderer.createText("Nursima'ya anomim sormak icin NursimayaSor.com");
    const topText = this.renderer.createText('bana anomim olarak mesajlar gonder');
    this.renderer.setStyle(topDiv, 'font-family', "'shrek', sans-serif"); // Use the correct font-family name
    this.renderer.setStyle(topDiv, 'color', '#FFFFFF'); // Set the desired text color

    ////////font controls
    this.renderer.setStyle(topDiv, 'font-size', '20px'); // Change the font size
    this.renderer.setStyle(topDiv, 'padding', '5px'); // Use the correct font-family name
    this.renderer.setStyle(topDiv, 'letter-spacing', '0.3px'); // Change the font size
    this.renderer.setStyle(topDiv, 'line-height', '1.3'); // Change the font size
    
    
    this.renderer.appendChild(topDiv, topText);
    

    // Create the bottom div
    const bottomDiv = this.renderer.createElement('div');
    this.renderer.addClass(bottomDiv, 'bottom-div');
    this.renderer.setStyle(bottomDiv, 'min-height', '100px');
    this.renderer.setStyle(bottomDiv, 'width', '100%');
    this.renderer.setStyle(bottomDiv, 'background-color', 'transparent');
    this.renderer.setStyle(bottomDiv, 'border-bottom-left-radius', '20px');
    this.renderer.setStyle(bottomDiv, 'border-bottom-right-radius', '20px');
    this.renderer.setStyle(bottomDiv, 'border', '0');
    this.renderer.setStyle(bottomDiv, 'display', 'flex');
    this.renderer.setStyle(bottomDiv, 'flex-direction', 'column');
    this.renderer.setStyle(bottomDiv, 'justify-content', 'center'); // Center vertically
    this.renderer.setStyle(bottomDiv, 'align-items', 'center');
    this.renderer.setStyle(bottomDiv, 'font-weight', 'bold'); // Make the text bold
    this.renderer.setStyle(bottomDiv, 'font-size', '20px'); // Change the font size
    this.renderer.setStyle(bottomDiv, 'font-family', 'Arial, sans-serif'); // Change the font type
    this.renderer.setStyle(bottomDiv,  'padding', '12px'); // Change the font type
    this.renderer.setStyle(bottomDiv,  'padding-top', '16px'); // Change the font type
    this.renderer.setStyle(bottomDiv,  'padding-bottom', '16px'); // Change the font type
    this.renderer.setStyle(bottomDiv, 'letter-spacing', '-0.5px'); // Change the font size
   // this.renderer.setStyle(bottomDiv, 'line-height', '0.95'); // Change the font size


    this.renderer.setStyle(bottomDiv, 'box-shadow', '0px 2px 4px rgba(0, 0, 0, 0.2)');

    let bottomText=this.renderer.createText("");
    if (this.question != null) {
    bottomText = this.renderer.createText(this.question?.questionText);  ///replace this logic once you fix quesiton object
    }
    this.renderer.appendChild(bottomDiv, bottomText);     
        this.renderer.setStyle(bottomDiv, 'white-space', 'normal'); // Allow text to wrap to multiple lines
    this.renderer.setStyle(bottomDiv, 'word-wrap', 'break-word'); // Break long words 

    const parentDiv = this.renderer.createElement('div');

    this.renderer.appendChild(parentDiv, topDiv);
    this.renderer.appendChild(parentDiv, bottomDiv);

    this.renderer.setStyle(parentDiv, 'alignItems', 'center');
    this.renderer.setStyle(parentDiv, 'justifyContent', 'center'); // Center vertically
    this.renderer.setStyle(parentDiv, 'display', 'flex');
    this.renderer.setStyle(parentDiv, 'flex-direction', 'column');
    //this.renderer.setStyle(parentDiv, 'box-shadow', '0px 2px 4px rgba(0, 0, 0, 0.2)');

    const existingDiv = this.el.nativeElement.querySelector('.card-template');
    this.renderer.addClass(parentDiv, 'card-template');
    existingDiv.parentNode.replaceChild(parentDiv, existingDiv);
   // this.renderer.(container, bottomDiv);
   const button = this.el.nativeElement.querySelector('.custom-button');
   this.renderer.setStyle(button, 'background', 'none');
   this.renderer.setStyle(button, 'background-color', '#7cfc00');
  }
  rainbowMethod() {
    const topDiv = this.renderer.createElement('div');
    this.renderer.addClass(topDiv, 'topdiv');
    const topText = this.renderer.createText('Bana anomim olarak mesajlar gonder');
    this.renderer.appendChild(topDiv, topText);
    this.renderer.setStyle(topDiv, 'background', 'linear-gradient(to right,'+this.selectedColorOne+','+this.selectedColorTwo+')');
    //background: linear-gradient(to right, #14dd56, #daeb16);

    // Create the bottom div
    const bottomDiv = this.renderer.createElement('div');
    this.renderer.addClass(bottomDiv, 'bottomdiv');
   
    let bottomText=this.renderer.createText("");
    if (this.question != null) {
    bottomText = this.renderer.createText(this.question?.questionText);  ///replace this logic once you fix quesiton object
    }
    this.renderer.appendChild(bottomDiv, bottomText);     
    
    const parentDiv = this.renderer.createElement('div');

    this.renderer.appendChild(parentDiv, topDiv);
    this.renderer.appendChild(parentDiv, bottomDiv);
    this.renderer.addClass(parentDiv, 'rainbow-card');
    const existingDiv = this.el.nativeElement.querySelector('.card-template');
    this.renderer.addClass(parentDiv, 'card-template');
    const button = this.el.nativeElement.querySelector('.custom-button');
    this.renderer.setStyle(topDiv, 'background', 'linear-gradient(to right,'+this.selectedColorOne+','+this.selectedColorTwo+')');
    this.renderer.setStyle(button, 'background', 'linear-gradient(to right,'+this.selectedColorOne+','+this.selectedColorTwo+')');
    existingDiv.parentNode.replaceChild(parentDiv, existingDiv);   
    
  }

  rainbowChange() {
    const topDiv = this.el.nativeElement.querySelector('.topdiv');
    this.renderer.setStyle(topDiv, 'background', 'linear-gradient(to right,'+this.selectedColorOne+','+this.selectedColorTwo+')');
    const button = this.el.nativeElement.querySelector('.custom-button');
    this.renderer.setStyle(button, 'background', 'linear-gradient(to right,'+this.selectedColorOne+','+this.selectedColorTwo+')');
  }
  spongeBobEndingMethod() {
    
    const topDiv = this.renderer.createElement('div');
    this.renderer.addClass(topDiv, 'topdiv');
    const topText = this.renderer.createText('Bana anomim olarak mesajlar gonder');
    this.renderer.appendChild(topDiv, topText);
    

    // Create the bottom div
    const bottomDiv = this.renderer.createElement('div');
    this.renderer.addClass(bottomDiv, 'bottomdiv');
   
    let bottomText=this.renderer.createText("");
    if (this.question != null) {
    bottomText = this.renderer.createText(this.question?.questionText);  ///replace this logic once you fix quesiton object
    }
    this.renderer.appendChild(bottomDiv, bottomText);     
    
    const parentDiv = this.renderer.createElement('div');

    this.renderer.appendChild(parentDiv, topDiv);
    this.renderer.appendChild(parentDiv, bottomDiv);
    this.renderer.addClass(parentDiv, 'spongebob-card');
    const existingDiv = this.el.nativeElement.querySelector('.card-template');
    this.renderer.addClass(parentDiv, 'card-template');
    existingDiv.parentNode.replaceChild(parentDiv, existingDiv); 

    const button = this.el.nativeElement.querySelector('.custom-button');
    this.renderer.setStyle(button, 'background', 'none');
    this.renderer.setStyle(button, 'background-color', '#0826ab');
  }
  pinkdows95Method() {
    const parentDiv = this.renderer.createElement('div');
    const topDiv = this.renderer.createElement('div');

    this.renderer.addClass(topDiv, 'card-header'); // Change the font size
    this.renderer.addClass(topDiv, 'text-center'); // Change the font size

    this.renderer.setStyle(topDiv, 'font-size', '20px'); // Change the font size
    this.renderer.setStyle(topDiv, 'padding', '5px'); // Use the correct font-family name
  

    const topText = this.renderer.createText('bana anomim olarak mesajlar gonder');
    this.renderer.appendChild(topDiv, topText);
    this.renderer.addClass(topDiv, 'w95-card'); //!!! burayi belki duzelt, global stil arial surekli override yapiyor


    // Create the bottom div
    const bottomDiv = this.renderer.createElement('div');

    this.renderer.addClass(bottomDiv, 'card-body'); // Change the font size
    
  
    let bottomText=this.renderer.createText("");
    if (this.question != null) {
    bottomText = this.renderer.createText(this.question?.questionText);  ///replace this logic once you fix quesiton object
    }
    this.renderer.addClass(bottomDiv, 'card-text'); // Change the font size
    this.renderer.appendChild(bottomDiv, bottomText);
    this.renderer.setStyle(bottomDiv, 'font-size', '20px'); // Change the font size
    this.renderer.setStyle(bottomDiv,  'padding', '12px'); // Ch     
    this.renderer.setStyle(bottomDiv, 'white-space', 'normal'); // Allow text to wrap to multiple lines
    this.renderer.setStyle(bottomDiv, 'word-wrap', 'break-word'); // Break long words if needed
    this.renderer.addClass(bottomDiv, 'w95-card'); // Change the font size

    
    this.renderer.appendChild(parentDiv, topDiv);
    this.renderer.appendChild(parentDiv, bottomDiv);
    this.renderer.addClass(parentDiv, 'card'); // Change the font size
    this.renderer.addClass(parentDiv, 'card-tertiary'); // Change the font size
    this.renderer.addClass(parentDiv, 'card-template'); // Change the font size
    this.renderer.addClass(parentDiv, 'w95-card'); // Change the font size
    this.renderer.setStyle(parentDiv, 'font-family', "'Windows 95', sans-serif"); // Use the correct font-family name


    //this.renderer.setStyle(parentDiv, 'box-shadow', '0px 2px 4px rgba(0, 0, 0, 0.2)');

    // Append divs to the container element
   // const container = this.el.nativeElement.querySelector('.container');
    //this.renderer.insertBefore(container, parentDiv, container.firstChild);
    const existingDiv = this.el.nativeElement.querySelector('.card-template');
    console.log(existingDiv);
    this.renderer.addClass(parentDiv, 'card-template');
    existingDiv.parentNode.replaceChild(parentDiv, existingDiv);
   // this.renderer.(container, bottomDiv);  }

   const button = this.el.nativeElement.querySelector('.custom-button');
   this.renderer.setStyle(button, 'background', 'none');
   this.renderer.setStyle(button, 'background-color', '#87255b');

  }
  familyGuyMethod() {

    const topDiv = this.renderer.createElement('div');
    this.renderer.addClass(topDiv, 'top-div');

   // this.renderer.setStyle(topDiv, 'background-color', '#34495e');//blackish #FFD700
   this.renderer.setStyle(topDiv, 'background-color', '#FFD700');
    this.renderer.setStyle(topDiv, 'border-top-left-radius', '20px');
    this.renderer.setStyle(topDiv, 'border-top-right-radius', '20px');
    this.renderer.setStyle(topDiv, 'display', 'flex');
    this.renderer.setStyle(topDiv, 'flex-direction', 'column');
    this.renderer.setStyle(topDiv, 'justify-content', 'center'); // Center vertically
    this.renderer.setStyle(topDiv, 'align-items', 'center');
    //height width
    this.renderer.setStyle(topDiv, 'min-height', '100px');
    this.renderer.setStyle(topDiv, 'width', '100%');
    this.renderer.setStyle(topDiv, 'box-shadow', '0px 2px 4px rgba(0, 0, 0, 0.2)');
    //const topText = this.renderer.createText("Nursima'ya anomim sormak icin NursimayaSor.com");
    const topText = this.renderer.createText('bana anomim olarak mesajlar gonder');
    this.renderer.setStyle(topDiv, 'font-family', "'Famig', sans-serif"); // Use the correct font-family name
    this.renderer.setStyle(topDiv, 'color', '#3498db'); // Set the desired text color
    ////////font controls
    this.renderer.setStyle(topDiv, 'font-size', '20px'); // Change the font size
    this.renderer.setStyle(topDiv, 'padding', '5px'); // Use the correct font-family name
    this.renderer.setStyle(topDiv, 'letter-spacing', '0.3px'); // Change the font size
    this.renderer.setStyle(topDiv, 'line-height', '1.3'); // Change the font size

    this.renderer.appendChild(topDiv, topText);
    

    // Create the bottom div
    const bottomDiv = this.renderer.createElement('div');
    this.renderer.addClass(bottomDiv, 'bottom-div');
    this.renderer.setStyle(bottomDiv, 'min-height', '100px');
    this.renderer.setStyle(bottomDiv, 'width', '100%');
    this.renderer.setStyle(bottomDiv, 'background-color', 'transparent');
    this.renderer.setStyle(bottomDiv, 'border-bottom-left-radius', '20px');
    this.renderer.setStyle(bottomDiv, 'border-bottom-right-radius', '20px');
    this.renderer.setStyle(bottomDiv, 'border', '0');
    this.renderer.setStyle(bottomDiv, 'display', 'flex');
    this.renderer.setStyle(bottomDiv, 'flex-direction', 'column');
    this.renderer.setStyle(bottomDiv, 'justify-content', 'center'); // Center vertically
    this.renderer.setStyle(bottomDiv, 'align-items', 'center');
    this.renderer.setStyle(bottomDiv, 'font-weight', 'bold'); // Make the text bold
    this.renderer.setStyle(bottomDiv, 'font-size', '20px'); // Change the font size
    this.renderer.setStyle(bottomDiv, 'font-family', 'Arial, sans-serif'); // Change the font type
    this.renderer.setStyle(bottomDiv,  'padding', '12px'); // Change the font type
    this.renderer.setStyle(bottomDiv,  'padding-top', '16px'); // Change the font type
    this.renderer.setStyle(bottomDiv,  'padding-bottom', '16px'); // Change the font type
    this.renderer.setStyle(bottomDiv, 'letter-spacing', '-0.5px'); // Change the font size
   // this.renderer.setStyle(bottomDiv, 'line-height', '0.95'); // Change the font size


    this.renderer.setStyle(bottomDiv, 'box-shadow', '0px 2px 4px rgba(0, 0, 0, 0.2)');

    let bottomText=this.renderer.createText("");
    if (this.question != null) {
    bottomText = this.renderer.createText(this.question?.questionText);  ///replace this logic once you fix quesiton object
    }
    this.renderer.appendChild(bottomDiv, bottomText);     
        this.renderer.setStyle(bottomDiv, 'white-space', 'normal'); // Allow text to wrap to multiple lines
    this.renderer.setStyle(bottomDiv, 'word-wrap', 'break-word'); // Break long words 

    const parentDiv = this.renderer.createElement('div');

    this.renderer.appendChild(parentDiv, topDiv);
    this.renderer.appendChild(parentDiv, bottomDiv);

    this.renderer.setStyle(parentDiv, 'alignItems', 'center');
    this.renderer.setStyle(parentDiv, 'justifyContent', 'center'); // Center vertically
    this.renderer.setStyle(parentDiv, 'display', 'flex');
    this.renderer.setStyle(parentDiv, 'flex-direction', 'column');
    //this.renderer.setStyle(parentDiv, 'box-shadow', '0px 2px 4px rgba(0, 0, 0, 0.2)');

    const existingDiv = this.el.nativeElement.querySelector('.card-template');
    this.renderer.addClass(parentDiv, 'card-template');
    existingDiv.parentNode.replaceChild(parentDiv, existingDiv);

    const button = this.el.nativeElement.querySelector('.custom-button');
    this.renderer.setStyle(button, 'background', 'none');
    this.renderer.setStyle(button, 'background-color', '#3498db');
   // this.renderer.(container, bottomDiv);
  }

  goBack() {
    this.router.navigate(['/queen']);
  }
}