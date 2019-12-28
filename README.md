# Angular (v5) Exmaple
This project was done while learning Angular (version 5) on OpenClassroom.
The goal is to learn how to :
- Create the structure of an Angular project
- Components and data binding ( String , property, event, two-way binding ...)
- Use a Directive ( ngIf, ngFor, ngStyle, ngClass ...)
- Use Pipes 
- Use a service and dependency injection ( communication between components )
- Use routes and route protection(Router, Redirection, Guards ...)
- Authentification (authentification is static here, you can find Library repository which contains a real authentification with firebase service)
- Use an Observable 
- Create with Forms ( Template, Reactive, ...)
- Interact with httpClient server using Firebase

The main goal is to build an angular application that interact with a FireBase server in order to store and collect date.
Most of the basic features of  Angular were used here. In addition , some interactions with the firebase server were added to illistrate its different features ( Authentification, File upload, Data savaing/fetching ...)

# Project description
We are trying to create a simple book management service , that can be used only by authenticated users.
- Book :
      - add/delete/view a Book ( using Reactive From , saving in the FireBase DB , uploadFile and save it in FireBase Storage )
      - list all the books ( Save/Get the list of the books to/from the sever )
- User
      - add new user 
      - signin  ( using FireBase Authentification service )

   
