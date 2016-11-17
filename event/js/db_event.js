
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
//서버와 연결이 반드시 필요하다.
//서버측에서 할때는 serverSide = true 한다.
var serverSide = true;
var eventList = new Array();

function LoadEvent(){

    if(serverSide) {
        var myeventaddr = 'http://121.135.150.5:12111/data/event';
        var load_json = {type: "EVENT", msg: 'REQUEST_EVENT_ALL', data: ""};
        $.get(myeventaddr, load_json, function (obj) {

            var event_json = JSON.parse(obj);
            eventList = event_json.data;
            console.log('[hi]',eventList);
            setSlides();
            var swiper = new Swiper('.swiper-container',{
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                pagination: '.swiper-pagination',
                paginationClickable: true
            });
        });

    }
    else {
        eventList = [
            {
                title: "지스타 2016",
                start: "2016-11-17",
                end: "2016-11-20",
                img: "../public/resource/event/event1.png",
                url: "http://www.gstar.or.kr/"
            },
            {
                title: "2016 서울사진축제",
                start: "2016-11-01",
                end: "2016-11-30",
                img: "../public/resource/event/event2.png",
                url: "http://www.seoulphotofestival.com/"
            },
            {
                title: "파주 장단콩 축제",
                start: "2016-11-18",
                end: "2016-11-20",
                img: "../public/resource/event/event3.png",
                url: "https://tour.paju.go.kr/user/tour/main/index.do"
            },
            {
                title: "2016시민예술축전",
                start: "2016-10-02",
                end: "2016-12-18",
                img: "../public/resource/event/event4.png",
                url: "http://cafe.naver.com/artsforallseoul"
            },
            {
                title: "2016 서울빛초롱축제",
                start: "2016-11-04",
                end: "2016-11-20",
                img: "../public/resource/event/event5.png",
                url: "http://www.seoullantern.com/html/"
            }
        ];
    }
}
LoadEvent();
/*
    <div class="swiper-slide">1</div>
    <div class="swiper-slide">2</div>
    <div class="swiper-slide">3</div>
    <div class="swiper-slide">4</div>
    <div class="swiper-slide">5</div>
    <div class="swiper-slide"><a href=[url]><img src=[img]/></br><p>[title]</p></a></div>
*/
function setSlides() {
    var elements = '';
    console.log(eventList);
    for(var i=0;i<eventList.length;i++) {
        elements += '<div class="swiper-slide"><div class="swiper-slide-background"><a target="_blank" href="' + eventList[i].url + '"><img class="sourceimg" src=\"'+eventList[i].img +'"/></a>';
//      elements += '<br/><br/><p>'+ eventList[i].title+'</p>';
        elements += '</div></div>';
        console.log('['+i+']',eventList[i].title);
    }
    document.getElementById('wrapper').innerHTML = elements;
}