# Course-Registration-Portal-PayPal-VAP
The repository hold the files of a College course registration portal Application developed using Node.js(Express Framework) for the Mid-term project of the PayPal VAP course

# Tech Stack
Back-end: Node.js(Express Framework)

Front-end: HTML(Pug),CSS,Javascript

Database:MySQL server

# Brief Description
A course registration portal application developed using Node.js that allows the student of an university to register to new courses
and to view the courses already registered.
It also provides a university login where new students can be added

# Functionalities
Student

1.Login(Authentication)

2.Register New Course

3.View Registered Courses


College

1.Login(Authentication)

2.Add new Student

# Dependencies
1.MySQL Server 8.0+

2.Node.js

3.Express Framework in Nodejs

4.Google Chrom browser for the best experience

# Instructions
1.Store all the files in the same directory(as uploaded in the repo)

2.Run npm install on terminal

3.To create the database a node.js script called "db-setup.js" is created. Run it once while changing the username and password 

in it to that of the local SQL server installed on the computer.

4.Run app.js to start the server

5.The details for the username and password for student login are present in the "db-setup.js" script

6.The default username and password for the university login is set as "admin" and "admin" respectively

# Database metadata
student(name,regno,dep,address,phonenumber,courses,password)  //Table holding all the student details

courses(courseid,name,department)                              //Table holding the details of the courses

faculty(name,regno,dep,address,phonenumber,courses,password)    //Table holding the details of the faculties

