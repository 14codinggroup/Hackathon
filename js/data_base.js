$(function () {
    $('.logo').click(function(){
        alert("Hi");
        $.get('http://localhost:3000/data', {}, function(data){
            console.log(data)
        });
    });
});
