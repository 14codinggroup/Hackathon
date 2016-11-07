$(function () {
    $('.logo').click(function(){
        $.get('http://localhost:3000/data', {}, function(obj){
            console.log(obj)
            var base_json = JSON.parse(obj);
            console.log(base_json.hello);
        });
    });
});
