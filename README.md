# Meeting Scheduler

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version v16.16.0 for frontend, [STRAPI](https://strapi.io/) for backend

## Goal of the application

The main goal of this application is to schedule appointments with the other users of the organization. User will be able to schedule meeting with guest only if the 
guest is available. User can mark their hours off in which no one will be able to schedule meeting in these duration with them. User will also be able to edit 
meeting and will also get to see all upcoming appointments. User will be able to change his/her name and passwords from the profile page.
## Cloning Repository 

Run `git clone https://github.com/praveen097/MeetingScheduler.git` on the local computer. This will clone the remote repository to your local system.


This will automatically install all the utilized packages in the application.

## Run the frontend
* #### Install NPM Packages
 ```
 $cd frontend
 $npm install
 ```
* #### Run the server
 ```
 $ng serve
 ```
* #### To open the application 
Navigate to `http://localhost:4200/`. The app will automatically reload if you change content of the source files.

 ### Backend connection
The frontend will make `RESTful` requests to the backend using the `URL` defined in the environment variable `baseUrl`


## Run the backend
We have used [STRAPI](https://strapi.io/) for backend in this application. Strapi is an Open Source, self hosting, headless API with a fully customizable CMS, serving data and methods via Restful or GraphQL endpoints.
* #### Install NPM Packages
 ```
 $cd backend
 $npm install
 ```
* #### Run the server
 ```
 $npm run develop
 ```
* #### Credentials for Admin Console
  * The admin console can be accessed by navigating to http://localhost:1337/admin/auth/login
  * Login with given credentials for testing:
  ```
  email: testuser123@test.com
  password: Test321@
  ```
  
* #### DB Configuration
  * ## Setting up cloud database
 
    We are using [MongoDB Atlas](https://cloud.mongodb.com/) to set up cloud database.

    #### Note: This application has already been configured with a pre-existing MongoDB Atlas cloud instance which is pre-loaded with sections and questions. In case you want to configure a new DB instance see below, otherwise skip to Adding New Sections and Questions

    * Sign in to ` https://cloud.mongodb.com/ `.
    * Create a cluster.
    * Click on `CONNECT`.
    * Grab HOST address. 
    * Open `backend/config/database.js` file.
    * Change `host` address, enable `srv, ssl` to `TRUE`.
    * Provide `database` name, `username, password`.
  * Why mongoDB Atlas ?
    * There are many advantages using cloud databases, 
    * Single database can be used for all types of devices even though application is running locally.
    * Works even if mongo is not installed locally.
    * Applications require reliable connections to the databases that power them, With built-in redundancy and 24/7 uptime, cloud databases offer a reliable platform for application development.
    * Ensures backup and recovery.
    * MongoDB can be used with any of the leading cloud service providers. If your business does move to another cloud service, MongoDB can easily move with you.
  
  * Setting up local database ( optional )
    * To fetch data from backend, you require a database. In this application, you will work with `MongoDB`.

      * Install MongoDB server by installing [MongoDB Compass](https://www.mongodb.com/try/download/compass). This will also comes with a GUI which gives a clear view of how data is stored.

      * Open this application and have the mongodb server running on port number 27017.
      * To export all collections
     ```
     $mongodump -d database_name -o directory_to_store_dumps
     ```
     * To restore them
     ```
     $mongorestore -d database_name directory_backup_where_mongobd_to_be_restored
     ```
* #### Adding new Terraformer
    * In the admin panel, You can find Collection types on the top-left.

      * To add a new terraformer , click on Terraformers and Find the button `Add New Terraformers`.
    * Structure
      * fullName (String)
      * email (Email)
      * mobile (Number)
      * password (Password)
      * hoursOffStartTime (Datetime)
      * hoursOffEndTime (Datetime) 
      
      * To add a new meeting , click on Meetings and Find the button `Add New Meetings`.
    * Structure
      * title (String)
      * agenda (String)
      * timings (Datetime)
      * guestName (String)
      * guestId (Number)
      * organizer (String) 
      * organizerId (Number) 
* #### Viewing Terraformers/Meetings
  * In the admin panel, You can find Collection types on the top-left.

    * To view Terraformers/Meetings, click on Terraformers/Meetings. This will show a list of Terraformers/Meetings and you can find the required submission.
    * click on it and check the Terraformers/Meetings data added.
  
  

## Working of the application
<img src="Login page"/>

In this application, user will land into login page. If existing user, then he/she will be able to sign in using their valid credentials, user will also need to 
fill `CAPTCHA`. Validations are made for username/password/captcha, if they are wrong, then an alert will pop with relevant messsage. If user `forgot password` then they 
can click on forgot password then they will be redirected to forgot password page. If they are new users, then they can click on `Sign Up` to register themselves as new users.

<div><br><img src="Forgot password page"/><br><div>
 
 Here in forgot password page, user can check if there exists a record with their email and mobile number, if there is a record with their credentials then they can 
 reset password else they will be considered as a new user and will be redirected to `Sign Up` page. All the validations are made on password fields and relevant pop ups 
 will be show accordingly.
<div><br><img src="sign up page"/><br><div>
 
In this `Sign Up` page user will be able to register themselves as a new user, they would need to fill all the fields as they are mandatory. Relevant pop ups will be shown
for password validations etc., If there exists a record with `Same Email` then they will be considered as a existing user and will be redirected to `Sign In` page.

After successful sign in user will be taken to dashboard
<div><br><img src="dashboard"/><br><div>
 
Here in `Dashboard\Menu`, user will get to `Schedule Meeting` , check `Upcoming Appointments`, view `Profile`, marks `Hours Off`.
<div><br><img src="schedule meeting"/><br><div>

Here in `Schedule Meeting`, user can provide `Title`,`Agenda`,`Timings`,`Guest`. User won't get to see their `Own Name` in guest list as they cannot schedule meeting
for themseleves, only guest available at the time of scheduled timings will be show in the `Guest list`. Those guest who marked `Hours Off` at that time won't be show
in the drop down list.
```
 If a user schedule meeting with guest, then meeting will also get added into guest's account.
 Guest will also get to see details of meeting in `Upcoming Appointments`
```

<div><br><img src="Upcoming meeting"/><br><div>

In `Appointments`, user will able to view all the upcoming meetings. If user is the `Organizer` of that meeting, then they can also `Edit/Delete` the meeting. If they
are `Guest`, then they won't be able to seee Edit/Delete buttons. If user clicks on `Delete`, then confirmation pop up will be shown. If clicked on `Edit Meeting` then 
they will be taken to edit meeting page.

<div><br><img src="edit meeting"/><br><div>

In this `Edit Meeting` page, user can edit all the fields. They can change `Title/Agenda/Timing/Guest` as per their needs.

<div><br><img src="edit profile"/><br><div>

In this `Profile` page, user can edit `Name/Password/Mobile` as per their needs. They won't be allowed to edit `Email` as it is a unique identifier. User would need to 
`Confirm Password` inorder to make necessary changes.

<div><br><img src="hours off"/><br><div>

In this `Hours Off` page, user marks their hours off according to their needs.


