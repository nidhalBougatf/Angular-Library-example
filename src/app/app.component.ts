import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-books-managing-example';
   constructor() {
		  const firebaseConfig = {
		    apiKey: "AIzaSyCWhx1vuymqffKhN_ryVUSPNwzRiSU1wfc",
		    authDomain: "angular-library-exmaple.firebaseapp.com",
		    databaseURL: "https://angular-library-exmaple.firebaseio.com",
		    projectId: "angular-library-exmaple",
		    storageBucket: "angular-library-exmaple.appspot.com",
		    messagingSenderId: "747467762482",
		    appId: "1:747467762482:web:41e12a23633783c265c52b"
		  };
		  // Initialize Firebase
		  firebase.initializeApp(firebaseConfig);
	}

}
