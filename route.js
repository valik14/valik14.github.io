$('#next_1').click(function (e) {  
    var url = "#some2"
    history.pushState({}, 'title', url);
    //urlThis = console.log(location.href);  
    route(location.href);
})
$('#next_2').click(function (e) {
    var url = "#some1"
    history.pushState({}, 'title', url);    
    //console.log(location.href);
    route(location.href);
})

function route(urlThis){
    switch (urlThis){
        case 'https://valik14.github.io/' :
            history.pushState({}, 'title', "#some1");  
        case 'https://valik14.github.io/#some1' :
            some1();
            break;
        case 'https://valik14.github.io/#some2' :
            some2();
            break;
        defaul : 
        break;
    }
}

function some1 () {
    $(".window_init-players").fadeIn(400);
    $(".window_score").hide();
}
function some2 () {
    $(".window_init-players").hide();
    $(".window_score").fadeIn(400);
}

window.onload=function(){
    route(location.href);
    window.setTimeout(function() {
        window.addEventListener( "popstate", function(e) {
            console.log(location.href);
            //ajax загрузка нужной части сайта.
            e.preventDefault();
            route(location.href);
        }, false);
    }, 1);
}
