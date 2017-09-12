//load any data right away //
/////////////////////////////
function askForDataAndLoad() { // This function loads data onto the page
    $.getJSON('/students', function(data) { //callback brings the data from the /students request to the server.
        // notice we add data-id. we'll use this for the updates.
        for (var i = 0; i < data.length; i++) {
            $('#all-data').append("<tr><th>" + i + "</th> <th>" + data[i].grade + "</th> <th>" + data[i].firstName + "</th> <th>" + data[i].lastName + "</th>" + "<th class='anyStudent'><button class='btn btn-success'  data-id=" + data[i].firstName + " </button> Select Student! </th></tr>");
        }
    });
}

// runs the askForDataAndLoad function as soons as the script is executed
askForDataAndLoad();


////////////////
//add students//
////////////////


$(document).on('click', "#add-new-student", function() {
    // the ajax call to the route /addStudent post the json to the server.
    $.ajax({
            type: "POST",
            dataType: "json",
            url: '/addStudent',
            data: {
                firstName: $("#new-student-first-name").val(),
                lastName: $("#new-student-last-name").val(),
                grade: $("#gradeSelection").val()
            }
        })
        // If that API call succeeds, 
        .done(function(data) {
            // clear the note and title inputs on the page
            $('#new-student-first-name').val(""),
                $('#new-student-last-name').val(""),
                $('#gradeSelection').val(""),
                askForDataAndLoad();
        });
});

//////////////////////////////////////////
//find a particular student by first name/
//////////////////////////////////////////


$(document).on('click', '.anyStudent', function() {
    // grab the specific student. The data-id is the child of the button we click on.
    var selected = $(this).children().data("id");
    //the call goes to '/findTheOne/' + selected where selected is the data we give to the server as a parameter
    $.ajax({
        type: "GET",
        url: '/findTheOne/' + selected
    })
    // If that API call succeeds, 
    .done(function(data) {
        $('#update-first-name').val(data[0].firstName);
        $('#update-last-name').val(data[0].lastName);
        $('#update-grade').val(data[0].grade);
        $('#student-ID').val(data[0]._id);
        console.log(data[0]);
    })
});

//////////////////////////////////////////
//find a our selected student and update /
//////////////////////////////////////////


$(document).on('click', "#find-one-and-update", function() {
    // the ajax call to the route /addStudent post the json to the server.
    $.ajax({
            type: "POST",
            dataType: "json",
            url: '/update-student',
            data: {
                firstName: $("#update-first-name").val(),
                lastName: $("#update-last-name").val(),
                grade: $("#update-grade").val(),
                _id: $("#student-ID").val()
            }
        })
        // If that API call succeeds, 
        .done(function(data) {
            	$('#update-first-name').val(""),
                $('#update-last-name').val(""),
                $('#update-grade').val(""),
                $('#student-ID').val("");
                console.log(data);
                askForDataAndLoad();
        });
});

//////////////////////////////////////////
//find a our selected student and delete /
//////////////////////////////////////////



$(document).on('click', "#find-one-and-delete", function() {
    // the ajax call to the route /addStudent post the json to the server.
    var studentID = $("#student-ID").val();
    $.ajax({
            type: "GET",
            dataType: "json",
            url: '/delete-student' + studentID
        })
        // If that API call succeeds, 
        .done(function(data) {
            	$('#update-first-name').val(""),
                $('#update-last-name').val(""),
                $('#update-grade').val(""),
                $('#student-ID').val("");
                console.log(data);
                askForDataAndLoad();
        });
});

