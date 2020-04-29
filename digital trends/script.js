
var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope) {
  $scope.text = {
    "instruction": "Click through next and back arrow to know more.",
    "interactivity": [{
      "date": "24.04.2020.",
      "title": "Citizen Services",
      "image": "image/citizen.svg",
      "reveal": "<ul><li>Antiquated systems and process</li></ul>"
    }, {
      "date": "26.04.2020.",
      "title": "Disaster Response",
      "image": "image/Disaster.svg",
      "reveal": "<ul><li>Silo’d systems that not integrated—misinformation, leading to incomplete understanding</li></ul>"
    }, {
      "date": "28.04.2020.",
      "title": "Digital Justice",
      "image": "image/Justice.svg",
      "reveal": "<ul><li>Court systems are overwhelmed(growing)</li></ul>"
    }, {
      "date": "28.04.2020.",
      "title": "Digital Tax",
      "image": "image/tax.svg",
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


    setInterval(function () {
      $(".load-wrapp").hide();
    }, 3000);

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

    var clickCount = 0;

    btn.on('click', function (e) {
      e.preventDefault();

      if ($(this).hasClass('next')) {

        (clickCount < (sCount - 1)) ? clickCount++ : clickCount = 0;
      } else if ($(this).hasClass('prev')) {

        (clickCount > 0) ? clickCount-- : (clickCount = sCount - 1);
      }
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