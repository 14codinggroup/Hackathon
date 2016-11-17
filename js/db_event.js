
/*
var k =
{
    start: "2016-11-04",
    end: "2016-11-20",
    img: "public/resource/event/event5.png",
    url: "http://www.seoullantern.com/html/"
};
*/
/*
var add_json = { type: "EVENT", msg: 'REQUEST_EVENT_ADD', data: k };
$.get(myeventaddr, add_json, function(obj){
    console.log(obj)
});
*/
var myeventaddr = 'http://121.135.150.5:12111/data/event';
var load_json = { type: "EVENT", msg: 'REQUEST_EVENT_ALL', data: "" };
$.get(myeventaddr, load_json, function(obj){
    var event_json = JSON.parse(obj);
    console.log(event_json.data);
});