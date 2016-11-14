/**
 * Created by seungmin on 2016-11-14.
 */
// Submit form with id function.
function addSchedule() {
    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;
    var title = document.getElementById("title").value;
    var info = document.getElementById("info").value;
    if(!start){
        alert("start는 필수입니다.")
        document.getElementById("start").focus();
        return false;
    }
    if(!title){
        alert("title은 필수입니다.");
        document.getElementById("title").focus();
        return false;
    }

    alert("일정 '"+title+"'가 일정에 추가되었습니다.");
    document.getElementById("start").value = null;
    document.getElementById("end").value = null;
    document.getElementById("title").value = null;
    document.getElementById("info").value = null;
}

function return_index() {
    window.location.href="index.html";
}