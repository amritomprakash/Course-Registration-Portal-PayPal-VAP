
//App.js main express JS file with all the request handlers

var express=require("express");
var app=express();
var mysql=require('mysql')
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const session = require('express-session');

//MiddleWare for Sessions
app.use(session({secret: 'ssshhhhh',username:'',temp1:[],temp2:[],temp3:[],allcourse:[],resave: true,temp4:[],reg_cid:"",
saveUninitialized: true}),function(req,res,next){
    next();
});

var back = require('express-back');


//JSON Object for MYSQL server connection
//While running on your computer, make sure MySQL server is up and running and you have already run the db-setup.js
//In the obbject replace user,password with your own username and password for sql server
var con = mysql.createConnection({    //Initialising credentials and connection details
    host: "localhost",
    user: "root",
    password: "Password@123",
    database:"vapdb"
  });

con.connect(function(err) {
    if (err) throw err

});
//Try app.emit()to debug res.end()
app.use(back());


//Setting Pug Engine and Directory for rendering pug pages
app.set('view engine','pug');
app.set('views','./views')
app.use(bodyParser.json()); 

app.use(express.static("./views/student")); //Used to tell the server the directory for attachements like CSS for pug files
app.use(bodyParser.urlencoded({extended:true})) //Used to parse Body in POST requests
app.use(upload.array()); 


app.get("/",function(req,res){   //Handles the first request giving option to login as student or University
    app.set('views','./views/student')
    res.render("first");
    res.end();
})


 
app.get("/student",function(req,res){   //Serves the student login page
    app.set('views','./views/student')
    res.render("student_login");
    res.end();
})

app.post("/university",function(req,res){   //Serves the university login page
    app.use(express.static("./views/student"));
    app.set('views','./views/student')
    res.render("uni_login");
    res.end();
})
app.post("/university/universityview",function(req,res){ //Verfication for university login(Defaul password and username set as "admin" and "admin")
    console.log("University login attempt") 
    username=req.body.user;
    password=req.body.pass;
    req.session.username=username;
   
            if(username=='admin' && password=='admin'){
            res.render("uni_view")    //If password and username are verified then the University Options page is returned
            res.end()
            }
            else{
                req.url="/"
                res.render("uni_login",{message:"Invalid credentials"})  //Else,Invalid credentials displayed
                //res.back(); 
                res.end()
            }
      //});

    
})
app.get("/university/universityview/ggwp",function(req,res){ //Redirection page after adding user
    res.render("uni_view")
    res.end();
})

app.get("/university/universityview/add",function(req,res){
    console.log("Im in");
    res.render("uni_add_stud");
    //res.end();
})
function addUser(req,res){  //Function that adds new user details to the database
    var sql = "INSERT INTO student (name, regno,department,address,phonenumber,courses,password) VALUES ?";
    var values = [
      [req.query.fname,req.query.regno,req.query.dep,req.query.add,req.query.phno,"",req.query.pass]]
      con.query(sql, [values], function (err, result) {
          if (err) throw err;
          console.log("User Added");
        })
}
app.get("/university/universityview/add/newuser",function(req,res){  //Handles the new user form request
    console.log(req.query);
    addUser(req,res);
    res.redirect("/university/universityview/ggwp");
    res.end()
})
var arr=[]

var username_g=[]
function execQuery(username,password){     //Password verification by cross checking the given details with the one in the database
    check=con.query("SELECT * FROM student", function (err, result, fields) {
        if (err) throw err;
        for(i=0;i<result.length;i++){
            if(result[i].regno==username && result[i].password==password){
              arr[0]=1
              //app.emit("student-login");
          return 1        }
        }
        arr[0]=0
        //app.emit("student-login")
      });
      return check;
}

app.post("/student/studentview",function(req,res){   //Handles password verification request
    console.log("Student login attempt") 
    username=req.body.user;
    password=req.body.pass;
    req.session.username=username;
    console.log(username)
    ans=execQuery(username,password);
        console.log(ans)
      //app.on('student-login',function(){
            console.log(arr)
            if(arr[0]==1){
            res.render("stud_options")
            res.end()
            }
            else{
                res.render("student_login",{message:"Invalid credentials"})
                //res.back();
                res.end()
            }
      //});

    
    
})

app.post("/student/studentview/view",function(req,res){    //Handles the View registered courses request 
     check=con.query("SELECT * FROM student where regno='"+req.session.username+"'", function (err, result, fields) {
          if (err) throw err;
          req.session.temp1=result;
          return result;
});
courses=con.query("SELECT * FROM courses", function (err, result, fields) {  //SQL statements to get the required data from the DB
    if (err) throw err;
    req.session.temp2=result;
    return result;
});
faculty=con.query("SELECT * FROM faculty", function (err, result, fields) {
    if (err) throw err;
    req.session.temp3=result;
    app.emit("student-view");
    return result;
});
app.on('student-view',function(){   //Event listener listensthe function to finish SQL data retrieval and processes the data for viewing registered courses
console.log(req.session.username)
check=req.session.temp1;
courses=req.session.temp2;
faculty=req.session.temp3;
console.log(check);
console.log(req.session.temp1);
    course_codes=check[0].courses;
var split_cc=course_codes.split(",");
var course_id=[];
var course_name=[];
var dep=[];
var fac_name=[]
facs=faculty.courses;
for(i=0;i<split_cc.length;i++){
    ccid=split_cc[i];
    for(j=0;j<faculty.length;j++){
        ffgg=faculty[j].courses.split(",");
        if(ffgg.includes(ccid))
        fac_name.push(faculty[j].name);
    }
    for(k=0;k<courses.length;k++){
        if(courses[k].courseid==ccid){
        course_name.push(courses[k].name)
        dep.push(courses[k].department)
    }}
    course_id.push(ccid);
}
app.use(express.static("./views/student"));
res.render("stud-view",{id:course_id
,name:course_name,faculty:fac_name,department:dep,size:course_id.length});  //Response to view the table 
res.end();

})

})

app.get("/student/studentview/reg",function(req,res){   //handles the registration process
    //req.session.req_tmp=res;
    check=con.query("SELECT * FROM student where regno='"+req.session.username+"'", function (err, result, fields) {
        if (err) throw err;
        req.session.temp1=result;
        return result;
});
courses=con.query("SELECT * FROM courses", function (err, result, fields) {
  if (err) throw err;
  req.session.temp2=result;
  return result;
});
faculty=con.query("SELECT * FROM faculty", function (err, result, fields) {
  if (err) throw err;
  req.session.temp3=result;
  app.emit("student-reg");
  return result;
});
app.on("student-reg",function(){console.log(req.session.username)  //Event listener waits for the DB retrieval to finish to carry out the processing
check=req.session.temp1;
courses=req.session.temp2;
faculty=req.session.temp3;
console.log(check);
console.log(req.session.temp2);
course_codes=courses[0].courseid;
var course_id=[];
var course_name=[];
var dep=[];
var status=[];
for(i=0;i<courses.length;i++){    //Logic to get the required data from the data retrieved from the db
  course_name.push(courses[i].name);
  course_id.push(courses[i].courseid);
  dep.push(courses[i].department);
  var tt=check[0].courses
  var tmp_tt=tt.split(",");
  if(tmp_tt.includes(courses[i].courseid))
  status.push(1);
  else
  status.push(0);
  console.log(courses[i])

}
req.session.temp4=course_name;
req.session.allcourse=course_id;
res.render("stud-reg",{id:course_id
,name:course_name,department:dep,size:course_id.length,s:status});
//console.log(req.session.req_tmp);
//res.end("Registration-Menu done");
res.end();
});
});

app.get("/student/studentview/reg/:id",function(req,res){      //Registers the course for the corresponding student
    index=req.params.id;                                        //Uses parameters to carry out the processing
    course_name=req.session.temp4[index];
    req.session.reg_cid=req.session.allcourse[index];
    faculty_final=[]
    dep=[]
    fax=req.session.temp3;
    all_c=req.session.temp2;
    course_id=req.session.allcourse;
    for(i=0;i<fax.length;i++){
        for(j=0;j<all_c.length;j++){
            if(all_c[j].name==course_name){
                dep.push(all_c[j].department);
                break;
            }}
            var ttwp=fax[i].courses.split(",");
            if(ttwp.includes(course_id[index])){
                faculty_final.push(fax[i].name);
        
        
        }

    }
    res.render("stud-reg-fac",{faculty:faculty_final
        ,department:dep,size:faculty_final.length,zz:index});
        res.end();
});
function updateCourseList(course_ids,new_cid,username){    //Function that updates the course list in the DB
    init_courses=course_ids;
    if(init_courses=="")
    new_courses=new_cid;
    else
    new_courses=init_courses+","+new_cid;
    var sql="UPDATE student SET courses='"+new_courses+"' WHERE regno='"+username+"'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Course Added");
      });
      return 0;
}
app.get("/student/studentview/reg/:id/:fac",function(req,res){    //Updates the course list in the DB
    updateCourseList(req.session.temp1[0].courses,req.session.reg_cid,req.session.username);
    res.back();
    res.end()
})


app.listen(3000);