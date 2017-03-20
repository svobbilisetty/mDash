var express = require('express');
var app = express();
var request = require('request-promise')
var request1 = require('request');
var RequestClient = require("reqclient").RequestClient;
var MongoClient = require('mongodb').MongoClient;
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/',function(req,res){
	res.sendFile(__dirname+'/log.html');
	
});

app.get('/log', function (req, res) {
   // Prepare output in JSON format
  // console.log("addfghjk");
   response= {
      "name":req.query.uname,
      "pwd":req.query.password,
   };
  
   console.log(response);
   //res.send(JSON.stringify(response));
 
 // res.end(JSON.stringify(response));

 MongoClient.connect("mongodb://localhost:27017/mdash", function(err, db) {
  if(!err) {
    //console.log("We are connected");
 var collection = db.collection('test');
 
	collection.find({uname: response.name}).toArray(function (err, result) {
	
      if (err) {
        console.log(err);
      } else if (result.length) {
		  //console.log(result);
		 console.log('Found:', result[0].uname);
		
		name=result[0].uname;
		pwd=result[0].password;
		
		 if(name==response.name && pwd==response.pwd)
		{
			console.log(response.name+"  "+response.pwd);
			console.log("ffgssfgk");
			//res.send("dxfgcvhjbhj");
			res.sendFile(__dirname +'/button.html');
		 
		  //req.session.name = uname;
	     //res.sendFile(__dirname + '/button.html');
			//res.send("C:\Users\miracle\Desktop\mdash\login.html");
			//res.send("hi");
		}
		else{
			res.send("hello");
			} 
      }
	  else {
		   console.log(response.pwd);
        console.log('No document(s) found with defined "find" criteria!');
      }
     
    })
db.close()
  }
})
}) 
 app.get('/button', function (req, res) {
	 res.sendFile(__dirname +'/jenkin.html');
}) 
 app.get('/hello', function (req, res) {
	 console.log("hi");
	  response = {
      Insname:req.query.iname,
	  Uname:req.query.uname,
      Pwd:req.query.password,
     Host:req.query.host,
	 Port:req.query.port,
   };

   console.log(response);
MongoClient.connect("mongodb://localhost:27017/mdash", function(err, db) {
  if(!err) {
    console.log("We are connected");
 var collection = db.collection('jenkins');
 var c1= response;
 var c;
collection.insert(c1);
if(c1=true)
{
	console.log("mouni");

	 res.sendFile(__dirname +'/button.html');
}
else
{
	console.log("srujju");
	res.sendFile(__dirname +'/jenkin.html');
}
  }
  
  
  collection.find({iname: response.Insname}).toArray(function (err, result) {
	  console.log(response.Insname);
	
if (err) {
        console.log(err);
      } else if (result.length) {
		 
        console.log('Found:', result[0].iname);
		c=result[0].iname;
		console.log(c);
	    res.send(c);
      } else {
		  
        console.log('No document(s) found with defined "find" criteria!');
      }
     
    });	
      
	
db.close()
  })
 
}) 

 

/* app.get('/login', function (req, res) {
   
  response = {
      j_username:req.query.j_username,
      j_password:req.query.j_password,
   }; 
    console.log(response);
  console.log(response.j_username);
  console.log(response.j_password);

var  Jenkins= "63c78274d13c736c76085649520d2e47";
var client = new RequestClient({
    baseUrl:"http://localhost:8080/", debugRequest:true, debugResponse:true});
client.post("j_acegi_security_check", {"j_username": response.j_username, "j_password": response.j_password, "remember_me": false, "from": "/", "Jenkins-Crumb":Jenkins});
client.get("http://localhost:8080/").then(function(response) {
    // console.log("*******"+response+"******");
  }).catch(console.error); 




 
// res.send(r);
}) */

var server = app.listen(8087, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

})