$(function () {
    $('.logo').click(function(){
        var client_json = { type: "MEMO", msg: 'REQUEST_MEMO_ALL', data: "" };
        $.get('http://localhost:3000/data/memo', client_json, function(obj){
            console.log(obj)
            var memo_json = JSON.parse(obj);
            console.log(memo_json.data);
        });
    });
});
