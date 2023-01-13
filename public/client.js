//To make Channels a bit more chatty about what is coming in via
// the socket connection
Pusher.logToConsole = true;
var pusher = new Pusher('7d254d906b0b2c073721', {
  cluster: 'us2',
  forceTLS: true
});
var docForm = document.getElementById("Doc-form");

const adddoc =(e)=>{
    e.preventDefault();

    //store new line in a variable
    var newBook = document.getElementById('documentText').value;

//call route '/post' to trigger event with new line
    fetch("http://localhost:3000/post",{method:"POST",
    headers: {
        'Content-Type': 'application/json',
    },
      body :JSON.stringify({
          book : newBook
      })
      })
    .then(res=>res.json())
    .then(json=>{
        console.log(json.message)
    })
    }

    //add a event Listener on form submit
docForm.addEventListener("submit",adddoc);

//subscribe the channel to bind events of channel
var channel = pusher.subscribe('post');

//bind the event of the presence channel to get the data attched with it
channel.bind('add', function(data) {
  var length = data.books.length;
//render the data of a event in division using jQuery
  $('#Doclines').append($('<li>').html('<b>'+data.books[length-1]+'</b>')); 

});