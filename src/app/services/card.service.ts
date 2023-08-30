import { Injectable } from '@angular/core';
import { cardOptions } from '../cardEnums';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  color1 : string = "#000000";
  color2 : string = "#000000";
  selectedStyle : cardOptions = cardOptions.FamilyGuy;

  constructor() { 
    const color1 = localStorage.getItem('color1');
    if (color1 !== null) {
      this.color1=color1;
    }

    const color2 = localStorage.getItem('color2');
    if (color2 !== null) {
      this.color2=color2;
    }

    const selectedStyle : string | null= localStorage.getItem('selectedStyle');
    if (selectedStyle !== null) {
      const parsedValue: cardOptions | null = selectedStyle !== null ? (selectedStyle as cardOptions) : null;
      console.log(selectedStyle);
      console.log(parsedValue);
      console.log(parsedValue === cardOptions.Pinkdows95);
      this.selectedStyle=selectedStyle as cardOptions;
    }

  }

  saveColors(color1 : string, color2 : string) {
    this.color1 = color1;
    this.color2 = color2;
    localStorage.setItem('color1', color1);
    localStorage.setItem('color2', color2);
  }

  saveStyle(selectedStyle : cardOptions) {
    this.selectedStyle = selectedStyle;
    console.log(selectedStyle); //Pinkdows 95
    localStorage.setItem('selectedStyle', selectedStyle);
  }

  getData(): { color1: string; color2: string, selectedStyle : cardOptions } {
    // You can replace this with actual data retrieval logic
    return { color1: this.color1, color2 : this.color2,  selectedStyle : this.selectedStyle};
  }



}
