var mysql = require('mysql');

var con = mysql.createConnection({    //Initialising credentials and connection details
  host: "localhost",
  user: "yourusername",
  password: "yourpassword"
});

 con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE vapdb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});

var con = mysql.createConnection({    //Initialising credentials and connection details
    host: "localhost",
    user: "root",
    password: "Password@123",
    database:"vapdb"
  });

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
 var sql = "CREATE TABLE courses (courseid VARCHAR(255),name VARCHAR(255),department VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Courses Table created");
  });
  var sql = "INSERT INTO courses (courseid,name,department) VALUES ?";
  var values = [
    ["CSE4031",'Data Structures and Algorithms',"CSE"],
    ["CSE3011",'Theory of Computation',"CSE"],
    ["CSE1031",'OOPS',"CSE"],
    ["ECE4031",'Analog Circuits',"ECE"],
    ["ECE3011",'Digital Logic and Design',"ECE"],
    ["ECE1031",'Microcontroller',"ECE"],
    ["MEC4031",'Strength of materials',"MEC"],
    ["MEC3011",'Automobile Design',"MEC"],
    ["MEC1031",'Engineering Graphics',"MEC"],
    ["EEE4031","Basic Electrical and Electronics eng.","EEE"],
    ["EEE3011",'Motors and Generators',"EEE"],
    ["EEE1031",'Electromagnetic theory',"EEE"]]
    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      });
 
var sql = "CREATE TABLE student (name VARCHAR(255),regno VARCHAR(255),department VARCHAR(255),address VARCHAR(255),phonenumber VARCHAR(255),courses LONGTEXT,password VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Student Table created");
  }); 
  var sql = "INSERT INTO student (name, regno,department,address,phonenumber,courses,password) VALUES ?";
  var values = [
    ['John','17BCE1133','CSE','Highway 71',"7358059691","CSE4031,ECE4031,CSE3011","123"],
    ['Peter','17ECE1068','ECE','Apple street 711',"7515829691","ECE4031,CSE4031,ECE3011","123"],
    ['Alan','17EEE1028','EEE','Mango avenue,street 712221','9511824651',"EEE4031,EEE1031,EEE3011","123"],
    ['Mark','17MEC1068','MEC','General parkway,moods avenue, street 711','5515829691',"MEC4031,MEC1031,MEC3011","123"]]
    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      });




      var sql = "CREATE TABLE faculty (name VARCHAR(255),regno VARCHAR(255),department VARCHAR(255),address VARCHAR(255),phonenumber VARCHAR(255),courses LONGTEXT,password VARCHAR(255))";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Faculty Table created");
      });
      var sql = "INSERT INTO faculty (name, regno,department,address,phonenumber,courses,password) VALUES ?";
      var values = [
        ['Dr.Philip Nagaraj','15FCSE1001','CSE','Highway 71','6358059691',"CSE4031,CSE1031,CSE3011","123"],
        ['Dr.Ananth Pillai','15FCSE1201','CSE','broadway 71','9354059691',"CSE4031,CSE1031","123"],
        ['Dr.Susan Simon','14FCSE1411','CSE','thoman mount 71','5354059291',"CSE4031","123"],
        ['Dr.Ezhil Mani','15FECE1101','ECE','Highway 71','6358059691',"ECE4031,ECE1031,ECE3011","123"],
        ['Dr.Muthumanikandan','15FECE1211','ECE','broadway 71','9354059691',"ECE4031,ECE1031","123"],
        ['Dr.Asha Kumar','14FECE1911','ECE','thoman mount 71','5354059291',"ECE4031","123"],
        ['Dr.Sanjana Dulam','15FEEE1001','EEE','Highway 71','6358059691',"EEE4031,EEE3011","123"],
        ['Dr.Kumar S','15FEEE1701','EEE','broadway 71','9354059691',"EEE4031,EEE1031","123"],
        ['Dr.Mukkesh Ganesh','14FEEE1414','EEE','thoman mount 71','5354059291',"EEE1031,EEE3011","123"],
        ['Dr.Rohit S','15FMEC1001','MEC','Highway 71','6358059691',"MEC4031,MEC1031,MEC3011","123"],
        ['Dr.Maheshvar C','15FMEC1201','MEC','broadway 71','9354059691',"CSE4031,CSE1031","123"],
        ['Dr.Susan Simon','14FCSE1311','MEC','thoman mount 71','5354059291',"MEC1031","123"]]
        con.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
          })
        });
