import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bmw-demo';
  sarf = "I love india";
  ss = "This my Laptop";

  clickHandler(){
  alert("I am Clicked...");
  }
}
