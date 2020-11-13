// say hello function called

var db;
fbInit();


const uid = "pQZJ6Ti53pOqD4I5QZhvQNnhhcc2"
const email = "raju.sitaram@outlook.com"
context = "author: {" + uid +", "+ email +"}"

function sayClick(){
    const sayHello = firebase.functions().httpsCallable('sayHello', context);
    sayHello({name:'Raju Sitaram'}).then(result =>{
        console.log(result.data + " Good morning");
    });
}; 

function pyCall(){
    console.log("Should call Python function")
    $.ajax({
        url: "http://localhost:5001/get_word",
        type: "get",
        username: 'user',
        password: 'pass',
        crossDomain : true,
        xhrFields: {
            withCredentials: true
        },
        data: {word: "This is the word sent to pyCall"},
        success: function(response) {
        $("#wordResult").html(response.html);
       },
       error: function(xhr) {
         //Do Something to handle error
      }
      });
}