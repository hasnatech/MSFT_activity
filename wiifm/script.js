
var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope) {
    $scope.text = {
        "t": ["Click the next / previous arrow  to learn more."],
        "interactivity": [{
            "text": "",
            "image": "image/flip_1.jpg",
            "audio": "audio/placeholder.mp3",
            "reveal": "Post-COVID, the majority of calls and questions court mod and court hearings--courts had forced virtual justice system."
        }, {
            "text": "",
            "image": "image/flip_2.jpg",
            "audio": "audio/placeholder.mp3",
            "reveal": "You have been queued up for conversation -- they need DT."
        }, {
            "text": "",
            "image": "image/flip_3.jpg",
            "audio": "audio/placeholder.mp3",
            "reveal": "Enables you to have very relevant conversations with the customer and provide the correct solution at the correct time, allowing you to make a sell and meet your plan quota."
        }, {
            "text": "",
            "image": "image/flip_4.jpg",
            "audio": "audio/placeholder.mp3",
            "reveal": "Bring in service to tailor where you are to give you more value to purchase additional services that you need to get the best value."
        }]
    }
});




$().ready(function () {
    var completed = false;
    var audioElement = document.getElementById('audio_player');
    setTimeout(function () {
        $(".load-wrapp").hide();
        show(0);
        //audioElement.setAttribute('src', "audio/placeholder.mp3");
        //audioElement.play();
        /*audioElement.addEventListener('ended', function () {
            
        }, false);*/

    }, 3000);
    var curr = 0;
    var prev = 0;
    var next_appears = false;

    $(".nav_button .next").click(function () {
        show(++curr, 'left', 'right');
    });
    $(".nav_button .prev").click(function () {
        show(--curr, 'right', 'left');
    });

    $(".sequence_img img").hide();
    $(".sequence_text").hide();

    $(".circle-indicator").width($(".sequence_img").length * 20);
    //showNext(default_delay);

    function show(v, prevAnim, nextAnim) {
        $(".nav_button .next").show();
        $(".nav_button .prev").show();
        curr = v;

        if (curr == 0) {
            $(".nav_button .prev").hide();
        }
        if (completed != true) {
            $(".nav_button .next").hide();
        } else if (v == $(".sequence_img").length - 1) {
            $(".nav_button .next").hide();
        }


        var audio = $(".sequence_img").eq(curr).attr("data-audio");
        audioElement.setAttribute('src', audio);
        audioElement.addEventListener('ended', function () {
            $(".nav_button .next").show();
            if (v == $(".sequence_img").length - 1) {
                $(".nav_button .next").hide();
                completed = true;
            }
        }, false);
        audioElement.play();

        $(".sequence_img").eq(prev).find("img").hide('slide', {
            direction: prevAnim
        }, 500);
        $(".sequence_img").eq(curr).find("img").show('slide', {
            direction: nextAnim
        }, 500);

        //console.log(($(window).width()));
        if ($(window).width() > 580) {
            var a1, a2;
            if (prevAnim == 'left') {
                a1 = "down";
                a2 = "up";
            } else {
                a1 = "up";
                a2 = "down";
            }

            $(".sequence_text").eq(prev).hide('slide', {
                direction: a1
            }, 500);
            $(".sequence_text").eq(curr).show('slide', {
                direction: a2
            }, 500);
            $(".sequence_text").eq(curr).attr("data-visited", "true");

            /*if ($(".sequence_text[data-visited='true']").length == $(".sequence_img").length
                 && next_appears == false) {
                //appear($(".bottom_nav"), 1000);
                next_appears = true;
                pageCompleted($(".sec").data("current"));
            }*/
        }
        $(".circle-indicator .circle").removeClass("active");
        $(".circle-indicator .circle:eq(" + curr + ")").addClass("active");
        //console.log(prev, curr, $(".circle-indicator .circle").eq(curr));
        prev = curr;
    }

    $(".head img").click(function () {
        //if ($(window).width() <= 580) {
        var curr = $(".circle-indicator .circle.active").index();
        $(".sequence_text").eq(curr).attr("data-visited", "true");
        showMessage("", $(".sequence_text").eq(curr).html());

        if ($(".sequence_text[data-visited='true']").length == $(".sequence_img").length
            && next_appears == false) {
            //appear($(".bottom_nav"), 1000);
            next_appears = true;
            pageCompleted($(".sec").data("current"));
        }

        //}
    });


});