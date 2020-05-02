
var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope) {
    $scope.text = {
        "t": ["Click the image to learn more."],
        "audio": "audio/intro.mp3",
        "interactivity": [{
            "text": "Know",
            "audio": "audio/audio_1.mp3",
            "image": "image/flip_1.jpg",
            "reveal": "<ul><li>You will know government accelerators to help your customers in planning</li><li>Lead conversations with understanding</li><li>Focus on end-to end (diag and then solve) Convey, seek to be understood)</li><li>Know key customer stories</li><li>Knowing stories make you more credible</li></ul>"
        }, {
            "text": "Understand",
            "audio": "audio/placeholder.mp3",
            "image": "image/flip_2.jpg",
            "reveal": "<ul><li>Demonstrate knowledge of the industry solution and how it has changed over the years and how to tailor to your customers specific needs/pain points</li><li>Orchestration of the past > present > future and offerings</li></ul>"
        }, {
            "text": "Do differently",
            "audio": "audio/placeholder.mp3",
            "image": "image/flip_3.jpg",
            "reveal": "<ul><li>Understand your customer</li><li>Understand your market</li><li>Understand and be able to articulate your account plan and how it fits into the 3 horizon vision</li></ul>"
        }]
    }

});
  

app.filter('safeHtml', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});

$().ready(function () {
    var audioElement = document.getElementById('audio_player');
    setTimeout(function () {
        $(".load-wrapp").hide();
        audioElement.setAttribute('src', "audio/intro.mp3");
        audioElement.play();
    }, 3000); 

    $(".bottom_nav").fadeOut();
    if (GetIEVersion() > 0) {
        $(".card .back").css("transform", "none");
        $(".card .back").hide();
    }
    $(".card").each(function ($index) {
        $(this).addClass("disabled");
        //$(this).attr("tabIndex", $index);
    })
    $(".col").bind("keypress", handleClickAndPress(function (e) {
        console.log($(e), $(this));
        $(e.target).find(".card").click();
    }))
    $(".col").eq(0).find(".card").removeClass("disabled");
    $(".card").click(function () {
        console.log("clicked", $(this));
        if ($(this).hasClass("disabled")) {
            return;
        }
        if (GetIEVersion() > 0) {
            $(".card .top").show();
            $(".card .back").hide();

            $(this).find(".top").toggle();
            $(this).find(".back").toggle();

        } else {
            $(".card").removeClass("active");
            $(this).addClass("active");

        }
        var next_id = $(this).parent().parent().index();
        audioElement.setAttribute('src', $(this).attr("data-audio"));
        audioElement.addEventListener('ended', function () {
            console.log(next_id + 1, $(".col").eq(next_id + 1));
            $(".col").eq(next_id + 1).find(".card").removeClass("disabled");
        }, false);
        audioElement.play();

        $(this).data("clicked", true);

    });
});
function handleClickAndPress(myfunc) {
    return function (e) {
        if (e.type != "keypress" || e.keyCode == 13) {
            myfunc(e);
        }
    };
}
function GetIEVersion() {
    var sAgent = window.navigator.userAgent;
    var Idx = sAgent.indexOf("MSIE");

    // If IE, return version number.
    if (Idx > 0)
        return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf(".", Idx)));

    // If IE 11 then look for Updated user agent string.
    else if (!!navigator.userAgent.match(/Trident\/7\./))
        return 11;

    else
        return 0; //It is not IE
}
window.addEventListener('message', receive);
function receive(event) {
    console.log("Received Message : " + event.data);
}
