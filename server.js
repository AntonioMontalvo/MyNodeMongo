/////////////////////////////////
//  Application Dependencies   //
/////////////////////////////////
//Basically an instance of express.
const express = require("express");
const app = express();

//Path is one of Node's built in modules. The path module provides utilities for working with file and directory paths
var path = require('path');

//Body Parser. We need to parse incoming request bodies in a middleware before your handlers.
var bodyParser = require('body-parser');

//require the mongojs module so our application can connect to MongoDB
var mongojs = require('mongojs');

//if we are connecting to our local database, since we have to manually connect to MongoDb, (the connectionString represents the URI for defining connections between applications and MongoDB instances.) is just the name of the database. The [collections is an array with the collections in the database]
var databaseURI = "myElementarySchool";
var collections = ["student"];

//finally establish the connection
var db = mongojs(databaseURI, collections);

// this makes sure that any errors are logged if mongodb runs into an issue
db.on('error', function(err) {
    console.log('Database error: Something went wrong', err);
});
//are we connected to the database?
db.on('connect', function() {
    console.log('Connected to ' + databaseURI + ' database');
});

/////////////////////////////////
//  Application Methods        //
/////////////////////////////////
//app.use([path,] callback [, callback...])
//Mounts the specified middleware function or functions at the specified path. Since .css files are static files you have to serve them to the clients. Using the express.static middleware in an Express app. Serve static content for the app from the “public” directory in the application directory. What this means is that this middleware will make available to the app all the files in the public directory. To <link> it in the .html file your path is no longer from the .html file to the .css file but straight from /public in our cas is <link rel="stylesheet" href="/css/school.css">

app.use(express.static(__dirname + '/public'));

// tell express to use this middleware to parse urlencoded bodies. The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). The "extended" syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.
app.use(bodyParser.urlencoded({ extended: true }));



/////////////////////////////////
// Our server's possible Routes//
/////////////////////////////////

//app.get(path, callback [, callback ...]); Routes HTTP GET requests to the specified path with the specified callback functions.

//when the server gets "/"
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, 'views/mongodb-basics.html')); //sendFile transfers the filefile at the given path with the response, in this case the Home Page.

});

//when the server gets "/mongojs"
app.get("/crud", function(req, res) {
    res.sendFile(path.join(__dirname, 'views/crud.html')); //sendFile transfers the filefile at the given path with the response, in this case the Home Page.
});

//when the server gets "/mongojs", we serve the mongojs.html that file uses the app.js to load the data from the database.
app.get("/mongojs", function(req, res) {
    res.sendFile(path.join(__dirname, 'views/mongojs.html')); //sendFile transfers the filefile at the given path with the response, in this case the Home Page.
});

//the askForDataAndLoad fucntion in the app.js file requests the data for all info in the student collection. when we het the request we respond with the data
// Retrieve results from mongo
app.get('/students', function(req, res) {
    db.student.find().sort({ "grade": 1 }, function(err, data) {
        // log any errors
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    });
});


//this handle post for the /addStudent route 
app.post('/addStudent', function(req, res) {
    // add the student into the student collection. The data is in the request req.body. We got it from the ajax post and the ajax got it from the user
    if (req.body.firstName !== "") {
        db.student.insert(req.body, function(err, savedStudent) {
            // log any errors
            if (err) {
                console.log(err);
            }
            // Send the savedStudent back to the browser. The ajax request will use it in the .done() to show the saved student.
            else {
                res.send(savedStudent);
            }
        });
    } else {
        console.log('No New student added!')
    }
});

//Find a student. The ":" tell the server that URL contains data. We can name this whatever we want. Here we named it "StudentName". We use it to find a student whose firstName equals to the request parameter value.
app.get('/findTheOne/:studentName', function(req, res) {
    console.log('the req parmeters is :' + req.params.studentName);
    db.student.find({ firstName: req.params.studentName }, function(err, data) {
        // log any errors
        if (err) {
            console.log(err);
        } else {
            //once we have the particular student  with the response we send the data in the database back to the ajax.
            res.send(data);
        }
    });
});

//Update the info
app.post('/update-student', function(req, res) {
    console.log(req.body._id);
    if (req.body._id !== "") {
        db.student.update({
                _id: mongojs.ObjectId(req.body._id)
            }, {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    grade: req.body.grade
                }
            },
            function(err, successEdit) {
                // log any errors from mongojs
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    console.log("Confirmation object:  " + successEdit);
                    res.send(successEdit);
                }
            }
        )
    } else {
        console.log("Nothing was updated");
    }
});


//Delete student
app.get('/delete-student:goneStudentID', function(req, res) {
    console.log(req.params.goneStudentID);
    if (req.params.goneStudentID !== "") {
        db.student.remove({
                "_id": mongojs.ObjectID(req.params.goneStudentID)
            },
            function(err, successRemoval) {
                // log any errors from mongojs
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {

                    res.send(successRemoval);
                }
            }
        )
    } else {
        console.log("Nothing was deleted");
    }
});




//Handle 404 page not found. This is 100% "kosher" but I like it.
app.use(function(req, res) {
    res.sendFile(path.join(__dirname, 'views/notFound.html'));
});




//start listening


app.listen(process.env.PORT || 3000, function() {
    console.log("app listening on port 3000!. Go to http://localhost:3000"); //confirm app is listening
});