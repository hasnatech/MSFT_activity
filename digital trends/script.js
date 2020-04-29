
var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope) {
  $scope.text = {
    "instruction": "Click through next and back arrow to know more.",
    "interactivity": [{
      "date": "24.04.2020.",
      "title": "Citizen Services",
      "image": "image/citizen.svg",
      "audio": "audio/placeholder.mp3",
      "reveal": "<ul><li>Antiquated systems and process</li></ul>"
    }, {
      "date": "26.04.2020.",
      "title": "Disaster Response",
      "image": "image/Disaster.svg",
      "audio": "audio/placeholder.mp3",
      "reveal": "<ul><li>Silo’d systems that not integrated—misinformation, leading to incomplete understanding</li></ul>"
    }, {
      "date": "28.04.2020.",
      "title": "Digital Justice",
      "image": "image/Justice.svg",
      "audio": "audio/placeholder.mp3",
      "reveal": "<ul><li>Court systems are overwhelmed(growing)</li></ul>"
    }, {
      "date": "28.04.2020.",
      "title": "Digital Tax",
      "image": "image/tax.svg",
      "audio": "audio/placeholder.mp3",
      "reveal": "<ul><li>Digital Gov (end-to-end management)</li></ul>"
    }]
  }
});
app.filter('safeHtml', function ($sce) {
  return function (val) {
    return $sce.trustAsHtml(val);
  };
});

(function ($) {

  $(document).ready(function () {
    var audioElement = document.getElementById('audio_player');

    setTimeout(function () {
      $(".load-wrapp").hide();
      audioElement.setAttribute('src', "audio/placeholder.mp3");
      audioElement.play();
    }, 3000);

    audioElement.addEventListener('ended', function () {
      console.log("start",clickCount,$(".slide").length, clickCount != $(".slide").length - 1);
      if (clickCount != $(".slide").length - 1) {
        $('.arrow.next').show();
        $('.arrow.next').addClass("blink");
      }
    }, false);

    var s = $('.slider'),
      sWrapper = s.find('.slider-wrapper'),
      sItem = s.find('.slide'),
      btn = s.find('.slider-link'),
      sWidth = sItem.width(),
      sCount = sItem.length,
      slide_date = s.find('.slide-date'),
      slide_title = s.find('.slide-title'),
      slide_text = s.find('.slide-text'),
      slide_more = s.find('.slide-more'),
      slide_image = s.find('.slide-image img'),
      sTotalWidth = sCount * sWidth;

    sWrapper.css('width', sTotalWidth);
    sWrapper.css('width', sTotalWidth);

    var show_next = false;
    var clickCount = 0;
    $('.arrow.prev').hide();
    $('.arrow.next').hide();
    btn.on('click', function (e) {
      e.preventDefault();
      $('.arrow.prev').show();
      
      $('.arrow.next').removeClass("blink");

      if ($(this).hasClass('next')) {
        (clickCount < (sCount - 1)) ? clickCount++ : clickCount = 0;
      } else if ($(this).hasClass('prev')) {
        (clickCount > 0) ? clickCount-- : (clickCount = sCount - 1);
      }

      if (clickCount == 0) {
        $('.arrow.prev').hide();
      }
      if(show_next == true && clickCount < $(".slide").length-1){
        $('.arrow.next').show();
      }else{
        $('.arrow.next').hide();
      }
      var audio = $(".slide").eq(clickCount).attr("data-audio");
      audioElement.setAttribute('src', audio);
      audioElement.addEventListener('ended', function () {
        console.log(clickCount,$(".slide").length, clickCount != $(".slide").length - 1);
        if (clickCount != $(".slide").length - 1) {
          $('.arrow.next').show();
          if(show_next != true)
              $('.arrow.next').addClass("blink");
        }else{
          show_next = true;
        }
        // $(".col").eq(next_id + 1).find(".card").removeClass("disabled");
      }, false);
      audioElement.play();

      TweenMax.to(sWrapper, 0.4, { x: '-' + (sWidth * clickCount) })


      //CONTENT ANIMATIONS

      var fromProperties = { autoAlpha: 0, x: '-50', y: '-10' };
      var toProperties = { autoAlpha: 0.8, x: '0', y: '0' };

      TweenLite.fromTo(slide_image, 1, { autoAlpha: 0, y: '40' }, { autoAlpha: 1, y: '0' });
      TweenLite.fromTo(slide_date, 0.4, fromProperties, toProperties);
      TweenLite.fromTo(slide_title, 0.6, fromProperties, toProperties);
      TweenLite.fromTo(slide_text, 0.8, fromProperties, toProperties);
      TweenLite.fromTo(slide_more, 1, fromProperties, toProperties);

    });

  });
})(jQuery);

$('.overlay').addClass('overlay-blue');