
var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope) {
    $scope.text = {
        "t": ["Click the image to learn more."],
        "interactivity": [{
            "text": "Know",
            "image": "image/flip_1.jpg",
            "reveal": "<ul><li>You will know government accelerators to help your customers in planning</li><li>Lead conversations with understanding</li><li>Focus on end-to end (diag and then solve) Convey, seek to be understood)</li><li>Know key customer stories</li><li>Knowing stories make you more credible</li></ul>"
        }, {
            "text": "Understand",
            "image": "image/flip_2.jpg",
            "reveal": "<ul><li>Demonstrate knowledge of the industry solution and how it has changed over the years and how to tailor to your customers specific needs/pain points</li><li>Orchestration of the past > present > future and offerings</li></ul>"
        }, {
            "text": "Do differently",
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

    $(".bottom_nav").fadeOut();
    if (GetIEVersion() > 0) {
        $(".card .back").css("transform", "none");
        $(".card .back").hide();
    }

    $(".card").click(function () {
        if (GetIEVersion() > 0) {
            $(".card .top").show();
            $(".card .back").hide();

            $(this).find(".top").toggle();
            $(this).find(".back").toggle();

        } else {
            $(".card").removeClass("active");
            $(this).addClass("active");
        }

        $(this).data("clicked", true);
        /*var finish_count = 0;
        $(".card").each(function () {
            if ($(this).data("clicked") == true) {
                finish_count++;
            }
            if (finish_count == $(".card").length && next_appears == false) {
                appear($(".bottom_nav"), 1000);
                next_appears = true;
                //pageCompleted($(".sec").data("current"));
            }
        });*/
    });
});

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
