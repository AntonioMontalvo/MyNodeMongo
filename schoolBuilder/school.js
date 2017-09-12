//require the mongojs module so our application can connect to MongoDB
var mongojs = require('mongojs');

//if we are connecting to our local database, since we have to manually connect to MongoDb, (the connectionString represents the URI for defining connections between applications and MongoDB instances.) is just the name of the database. The [collections is an array with the collections in the database]
var databaseURI = "myElementarySchool";
var collections = ["student","grade"];

//finally establish the connection
var db = mongojs(databaseURI, collections);

// this makes sure that any errors are logged if mongodb runs into an issue
db.on('error', function(err) {
    console.log('Database error: Something went wrong', err);
});


//this is the student constructor
function Student(grade, firstName, lastName, father, mother, teacher, lunch, carpool) {
    this.grade = grade;
    this.firstName = firstName;
    this.lastName = lastName;
    this.father = father;
    this.mother = mother;
    this.teacher = teacher;
    this.lunch = lunch;
    this.carpool = carpool;
}

//this is the grade constructor
function Grade(grade, teacher, student) {
    this.grade = grade;
    this.teacher = teacher;
    this.student = student;
}


//here we create our First Grade
var firstGrade = new Grade();
firstGrade.grade = 1;
firstGrade.teacher = "Mr. Smith";
firstGrade.student = [];


var jonMalone = new Student(1, "Jon", "Malone", "Tom", "Mary", "Mr. Smith", "yes-lunch", "yes-carpool");
var clarissaPan = new Student(1, "Clarissa", "Pan", "Peter", "Sarah", "Mr. Smith", "no-lunch", "yes-carpool");
var peterParker = new Student(1, "Peter", "Parker", "Tim", "Ann", "Mr. Smith", "no-lunch", "yes-carpool");
firstGrade.student.push(jonMalone);
firstGrade.student.push(clarissaPan);
firstGrade.student.push(peterParker);



//our Second Grade
var secondGrade = new Grade();
secondGrade.grade = 2;
secondGrade.teacher = "Ms. Pamela";
secondGrade.student = [];

var georgeOrson = new Student(2, "George", "Orson", 'George', "Olga", "Ms. Pamela", "yes-lunch", "yes-carpool");
var martinSmith = new Student(2, "Martin", "Smith", "Paul", "Melissa", "Ms. Pamela", "yes-lunch", "no-carpool");
var olgaTorres = new Student(2, "Olga", "Torres", "unknown", "Olga", "Ms. Pamela", "yes-lunch", "no-carpool");
secondGrade.student.push(georgeOrson);
secondGrade.student.push(martinSmith);
secondGrade.student.push(olgaTorres);


//our Third Grade
var thirdGrade = new Grade();
thirdGrade.grade = 3;
thirdGrade.teacher = "Mrs. Ford";
thirdGrade.student = [];

var annLee = new Student(3, "Ann", "Lee", "Sam", "Kate", "Mrs Ford", "yes-lunch", "no-carpool");
var maryMatinez = new Student(3, "Mary", "Martinez", "Antonio", "Rebecca", "Mrs Ford", "yes-lunch", "no-carpool");
var tomLivingstone = new Student(3, "Tom", "Livingstone", "Stanley", "Jessica", "Mrs Ford", "no-lunch", "no-carpool");
thirdGrade.student.push(annLee);
thirdGrade.student.push(maryMatinez);
thirdGrade.student.push(tomLivingstone);

//our Fourth Grade
var fourthGrade = new Grade();
fourthGrade.grade = 4;
fourthGrade.teacher = "Mr. Pogba";
fourthGrade.student = [];


var rickTallman = new Student(4, "Rick", "Talmman", "Richard", "Sofia", "Mr. Pogba", "yes-lunch", "no-carpool");
var melissaRivers = new Student(4, "Melissa", "Rivers", "George", "Sofia", "Mr. Pogba", "yes-lunch", "yes-carpool");
var alexAllen = new Student(4, "Alex", "Allen", "Alex", "Alba", "Mr. Pogba", "yes-lunch", "yes-carpool");
fourthGrade.student.push(rickTallman);
fourthGrade.student.push(melissaRivers);
fourthGrade.student.push(alexAllen);

//since this is an elementary school this is our final grade
var fifthGrade = new Grade();
fifthGrade.grade = 5;
fifthGrade.teacher = "Mrs. Tamara";
fifthGrade.student = [];


var stuartCarrington = new Student(5, "Stuart", "Carrington", "John", "Paula", "Mrs. Tamara", "yes-lunch", "yes-carpool");
var hellenHart = new Student(5, "Hellen", "Hart", "Pepe", "Carol", "Mrs. Tamara", "yes-lunch", "no-carpool");
var allenHeath = new Student(5, "Allen", "Heath", " Sam", "Caroline", "Mrs. Tamara", "yes-lunch", "no-carpool");
fifthGrade.student.push(stuartCarrington);
fifthGrade.student.push(hellenHart);
fifthGrade.student.push(allenHeath);


// let's insert all grades.
db.grade.insert(firstGrade, { unique: true });
db.grade.insert(secondGrade, { unique: true });
db.grade.insert(thirdGrade, { unique: true });
db.grade.insert(fourthGrade, { unique: true });
db.grade.insert(fifthGrade, { unique: true });


//let's also insert every student, that way we have more data to play with.

db.student.insert(jonMalone, { unique: true });
db.student.insert(clarissaPan, { unique: true });
db.student.insert(peterParker, { unique: true });

db.student.insert(georgeOrson, { unique: true });
db.student.insert(martinSmith, { unique: true });
db.student.insert(olgaTorres, { unique: true });

db.student.insert(annLee, { unique: true });
db.student.insert(maryMatinez, { unique: true });
db.student.insert(tomLivingstone, { unique: true });

db.student.insert(rickTallman, { unique: true });
db.student.insert(melissaRivers, { unique: true });
db.student.insert(alexAllen, { unique: true });

db.student.insert(stuartCarrington, { unique: true });
db.student.insert(hellenHart, { unique: true });
db.student.insert(allenHeath, { unique: true });

console.log("MyElementarySchool data successfully loaded");
