import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class BooksService {


  books:Book[]=[];
  booksSubject = new Subject<Book[]>();

	constructor() {
	    this.getBooks();
	}

  emitBooks()
  {
  	this.booksSubject.next(this.books.slice());
  }

  saveBooks() 
  {
  	// ref() : return the reference of the node in FB
  	// set() : same as put() in Http , it update the data in the node
    firebase.database().ref('/books').set(this.books);
  }

getBooks() {
	// on(): 'value' => update data Automatically whenever any changes were done from other devices
   //DataSnapshot : object that contains all the data in the node in FB
    firebase.database().ref('/books')
      .on('value', (data: DataSnapshot) => {
          this.books = data.val() ? data.val() : []; // checking server return empty error to avoid errors later
          this.emitBooks();
        }
      );
  }

  getSingleBook(id: number) {
  	// once() : send only 1 request
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book) {
  	// if book is removed => photo is removed from storage 
    if(book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }

    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if(bookEl === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
}


uploadFile(file: File) {
	// since it could take while , we return Promise
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString(); // adding the date to the file name , to make sure it will be unique
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);// child(): returning a reference for the new file
        // upload.on() : to check uploading status
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Loading …');
          },
          (error) => {
            console.log('Loading error ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL()); // once upload is finished , return the URL of the file
          }
        );
      }
    );
}

}
