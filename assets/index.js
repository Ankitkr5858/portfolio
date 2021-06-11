import $ from '../node_modules/jquery';

import './index.scss';

// Is visible
$.fn.isInViewport = function () {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  return elementBottom > viewportTop && elementTop < viewportBottom;
};

var programmic = false;
var position = $(window).scrollTop();
var direction;
var introAnimated = false;
var animated = 0;
var worksAnimated = false;
var worksAnimatedCount = 0;
var scrollingInProgress = false;
var newAnimation = false;

function introAnimation() {
  $('.main-navigation-item').removeClass('active');
  $('#intro').addClass('active');
  $('#main_bg').addClass('show_bg');
  $('#title_bg').addClass('loaded');
  $('#bold_title_1').addClass('visible');
  $('#wrapper_1').addClass('loaded');
  $('#bold_title_2').addClass('visible');
  $('#wrapper_2').addClass('loaded');
  $('#horn').removeClass('hidden').addClass('animated zoomIn');
  setTimeout(function () {
    $('.horn-wrapper').addClass('animated pulse infinite');
  }, 1000);
  setTimeout(function () {
    introAnimated = true;
    scrollingInProgress = false;
    restartWorks();
    restartAbout();
    $('body').removeClass('loader');
    $('#preload').css('visibility', 'hidden');
    programmic = false;
  }, 2500);
}

function worksAnimation() {
  restartAbout();
  $('.main-navigation-item').removeClass('active');
  $('#works').addClass('active');
  $('#titles').addClass('black');
  $('.header').removeClass('white');
  $('#line').addClass('loaded');
  $('#top_section').addClass('loaded');
  $('#bottom_section').addClass('loaded');
  $('#works_container').addClass('loaded');
  $('#projects_list').addClass('loaded');
  setTimeout(function () {
    worksAnimated = true;
    scrollingInProgress = false;
    restartIntro();
    $('body').removeClass('loader');
    $('#main_bg').removeClass('show_bg');
    $('#projects_list').removeClass('blocked');
    $('#preload').css('visibility', 'hidden');
    $('#works_container').addClass('done');
    programmic = false;
  }, 2500);
}

function aboutAnimation() {
  $('#main_bg').removeClass('show_bg');
  $('#bold_title_3').addClass('visible');
  $('#wrapper_3').addClass('loaded');
  $('#bold_title_4').addClass('visible');
  $('#wrapper_4').addClass('loaded');
  $('#about-starter').addClass('loaded');
  $('.header').addClass('white');
  setTimeout(function () {
    $('#about-starter').addClass('finished');
  }, 2000);
  $('#section_4').addClass('loaded');
  $('body').removeClass('loader');
  programmic = false;
  scrollingInProgress = false;
  restartWorks();
}

function contactAnimation() {
  $('#main_bg').removeClass('show_bg');
  $('#bold_title_3').addClass('visible');
  $('#wrapper_3').addClass('loaded');
  $('#wrapper_4').addClass('loaded');
  $('#about-starter').addClass('loaded');
  $('#bold_title_4').addClass('visible');
  $('#about-starter').addClass('finished');
  $('#section_4').addClass('loaded');
  $('body').removeClass('loader');
  $('#trigger_14').addClass('loaded');
  $('.small-margin').addClass('loaded');
  $('.big-margin').addClass('loaded');
  $('.quote').addClass('loaded');
  $('.bold-text').addClass('loaded');
  $('.exp-title').addClass('loaded');
  $('.exp-text').addClass('loaded');
  programmic = false;
  scrollingInProgress = false;
}

function bottomAnimation() {
  $('#bold_title_5').addClass('visible');
  $('#wrapper_5').addClass('loaded');
  $('#bold_title_6').addClass('visible');
  $('#wrapper_6').addClass('loaded');
  $('.scroll-down').hide();
  $('#last_title_trigger').addClass('loaded');
}

function restartIntro() {
  animated = 0;
  introAnimated = false;
  $('#main_bg').removeClass('show_bg');
  $('#title_bg').removeClass('loaded');
  $('#bold_title_1').removeClass('visible');
  $('#wrapper_1').removeClass('loaded');
  $('#bold_title_2').removeClass('visible');
  $('#wrapper_2').removeClass('loaded');
  $('#horn').addClass('hidden').removeClass('animated zoomIn delay-2s');
}

function restartWorks() {
  worksAnimatedCount = 0;
  worksAnimated = false;
  $('#titles').removeClass('black');
  $('#line').removeClass('loaded');
  $('#top_section').removeClass('loaded');
  $('#bottom_section').removeClass('loaded');
  $('#works_container').removeClass('loaded');
  $('#works_container').removeClass('done');
  $('#projects_list').removeClass('loaded');
}

function restartAbout() {
  $('#bold_title_3').removeClass('visible');
  $('#wrapper_3').removeClass('loaded');
  $('#bold_title_4').removeClass('visible');
  $('#wrapper_4').removeClass('loaded');
  $('#about-starter').removeClass('loaded');
  $('#about-starter').removeClass('finished');
  $('#section_4').removeClass('loaded');
  $('.description').removeClass('loaded');
  $('.quote').removeClass('loaded');
  $('.small-margin').removeClass('loaded');
  $('.small-margin .bold-text').removeClass('loaded');
  $('.exp-title').removeClass('loaded');
  $('.exp-text').removeClass('loaded');
  $('.big-margin').removeClass('loaded');
  $('#trigger_14 .bold-text').removeClass('loaded');
  $('#trigger_14').removeClass('loaded');
  $('#last_title_trigger').removeClass('loaded');
  $('#bold_title_5').removeClass('visible');
  $('#wrapper_5').removeClass('loaded');
  $('#bold_title_6').removeClass('visible');
  $('#wrapper_6').removeClass('loaded');
  $('#about-starter').removeClass('finished');
  $('.big-margin').removeClass('finished');
  $('.quote').removeClass('finished');
  $('.small-margin').removeClass('finished');
}

function scrollingMain(event) {
  var scrolled = $(window).scrollTop();

  if (scrolled > position) {
    direction = true;
  } else {
    direction = false;
  }

  position = scrolled;

  switch (true) {
    case scrolled <= 560:
      animateCircle(scrolled);
      $('#titles').removeAttr('class');
      $('#fixed_titles').removeAttr('class');
      $('#home').removeClass('cursor-item');
      $('#main_bg').removeClass('show_bg');
      $('body').removeClass('loader');
      $('.header').css('z-index', '99999');
      $('.section-title').removeAttr('style');
      $('#circle').removeAttr('style');
      break;

    case scrolled >= 560 && scrolled < 800:
      restartIntro();
      animateText(scrolled);
      $('#circle').removeAttr('class');
      $('#circle').addClass('state-14');
      $('#titles').removeAttr('class');
      $('#fixed_titles').removeAttr('class');
      $('#home').removeClass('cursor-item');
      $('#main_bg').removeClass('show_bg');
      $('body').removeClass('loader');
      $('.header').css('z-index', '99999');
      $('.header').removeClass('white');
      break;

    case scrolled >= 880 && scrolled <= $('#section_2').offset().top:
      $('#titles').addClass('loaded');
      $('#fixed_titles').addClass('loaded');
      $('#home').addClass('cursor-item');
      $('.header').css('z-index', '9999');
      $('.header').addClass('white');

      if ($(window).width() <= 1024 || animated > 0 || scrollingInProgress) {
        return false;
      }

      if (direction && !introAnimated) {
        animated++;
        scrollingInProgress = true;
        $('body').addClass('loader');
        $('html, body').animate({
          scrollTop: $('#section_2').offset().top
        }, {
          duration: 1000,
          complete: function () {
            introAnimation();
          }
        });
      }

      break;

    case scrolled > $('#section_2').offset().top && scrolled < $('#section_3').offset().top:
      if ($(window).width() <= 1024 || worksAnimatedCount > 0 || scrollingInProgress) {
        return false;
      }

      if (direction && !worksAnimated) {
        scrollingInProgress = true;
        worksAnimated++;
        $('body').addClass('loader');
        $('html, body').animate({
          scrollTop: $('#section_3').offset().top
        }, {
          duration: 1000,
          complete: function () {
            worksAnimation();
          }
        });
        return false;
      }

      if (!direction) {
        scrollingInProgress = true;
        animated++;
        $('body').addClass('loader');
        $('html, body').animate({
          scrollTop: $('#section_2').offset().top
        }, {
          duration: 1000,
          complete: function () {
            introAnimation();
          }
        });
      }

      break;

    case scrolled >= $('#section_3').offset().top && scrolled < $('#section_3').offset().top + $(window).height():
      if (scrollingInProgress || $(window).width() <= 1024) {
        return false;
      }

      if (direction) {
        scrollingInProgress = true;
        $('body').addClass('loader');
        $('html, body').animate({
          scrollTop: $('#section_4').offset().top
        }, {
          duration: 1000,
          complete: function () {
            scrollingInProgress = false;
            aboutAnimation();
          }
        });
      }

      if (!direction) {
        scrollingInProgress = true;
        $('#section_4').removeClass('loaded');
        worksAnimated++;
        $('body').addClass('loader');
        $('html, body').animate({
          scrollTop: $('#section_3').offset().top
        }, {
          duration: 1000,
          complete: function () {
            worksAnimation();
          }
        });
      }

      break;

    default:
      break;
  }

  if (scrolled > $('#section_2').offset().top && $(window).width() <= 1024) {
    $('.mobile-scroll-button').addClass('hidden');
  } else {
    $('.mobile-scroll-button').removeClass('hidden');
  }

  if ($('#section_2').isInViewport()) {
    $('.main-navigation-item').removeClass('active');
    $('#intro').addClass('active');
  }

  if ($('#section_3').isInViewport()) {
    $('.main-navigation-item').removeClass('active');
    $('#works').addClass('active');
  }
  
  if($(window).width() <= 1024 && $(window).scrollTop() > 180) {
    $('.hamburger').addClass('black');
  } else {
    $('.hamburger').removeClass('black');
  }

  if ($(window).scrollTop() >= $('#mobile').offset().top && $('#mobile').isInViewport() && $(window).width() <= 1024) {
    $('#titles').addClass('black');
    $('.header').removeClass('white').addClass('black');
    $('.hamburger').removeClass('black');
  } else {
    $('#titles').removeClass('black');
  }

  if($(window).width() <= 1024 && scrolled > 4900) {
    $('.header').removeClass('black').addClass('white');
  }

  if($(window).width() <= 1024 && scrolled < 2500 && scrolled > 1500 ) {
    $('.header').removeClass('black').addClass('white');
  }

  if($(window).width() <= 768 && scrolled < 2400 && scrolled > 1500) {
    $('.header').removeClass('black').addClass('white');
  }

  if($(window).width() <= 768 && scrolled > 4100) {
    $('.header').removeClass('black').addClass('white');
  }

  if ($('#section_4').isInViewport()) {
    $('.main-navigation-item').removeClass('active');
    $('#about').addClass('active');
  }

  if ($('.quote').isInViewport()) {
    $('.quote').addClass('loaded');
    setTimeout(function () {
      $('.quote').addClass('finished');
    }, 500);
  }

  if ($('.small-margin').isInViewport() && $('.big-margin').hasClass('finished')) {
    $('.small-margin').addClass('loaded');
    $('.small-margin .bold-text').addClass('loaded');
    setTimeout(function () {
      $('.small-margin').addClass('finished');
    }, 500);
  }

  if ($('#trigger_13').isInViewport() && $('.quote').hasClass('finished')) {
    $('.exp-title').addClass('loaded');
    $('.exp-text').addClass('loaded');
    $('.big-margin').addClass('loaded');
    setTimeout(function () {
      $('.big-margin').addClass('finished');
    }, 500);
  }

  if ($('#trigger_14').isInViewport() && $('.quote').hasClass('finished') || programmic) {
    $('#trigger_14 .bold-text').addClass('loaded');
    $('#trigger_14').addClass('loaded');
  }

  if ($('#last_title').isInViewport()) {
    $('#trigger_14 .bold-text').addClass('loaded');
    $('.main-navigation-item').removeClass('active');
    $('#contacts').addClass('active');
  }

  if ($('#last_title_trigger').isInViewport() && !scrollingInProgress) {
    $('#last_title_trigger').addClass('loaded');
  }

  if ($('#last_title #bold_title_6').isInViewport() && !scrollingInProgress) {
    $('#bold_title_5').addClass('visible');
    $('#wrapper_5').addClass('loaded');
    $('#bold_title_6').addClass('visible');
    $('#wrapper_6').addClass('loaded');
    $('.scroll-down').hide();
  } else {
    $('.scroll-down').show();
  }
}

$(window).on('scroll', function (event) {
  scrollingMain(event);
});

function animateText(scrolled) {
  switch (true) {
    case scrolled < 560:
      $('.section-title').css({
        fontSize: '7.2em'
      });
      break;

    case scrolled >= 560 && scrolled < 600:
      $('.section-title').css({
        fontSize: '6.8em'
      });
      break;

    case scrolled >= 600 && scrolled < 640:
      $('.section-title').css({
        fontSize: '6.3em'
      });
      $('#circle').removeAttr('style');
      break;

    case scrolled >= 640 && scrolled < 680:
      $('.section-title').css({
        fontSize: '5.65em'
      });
      $('#circle').css({
        right: '-658px'
      })
      break;

    case scrolled >= 680 && scrolled < 720:
      $('.section-title').css({
        fontSize: '5.2em'
      });
      break;

    case scrolled >= 720 && scrolled < 760:
      $('.section-title').css({
        fontSize: '4.7em'
      });
      $('#circle').css({
        right: '-678px'
      })
      break;

    case scrolled >= 760 && scrolled < 800:
      $('.section-title').css({
        fontSize: '4.3em'
      });
      break;

    case scrolled >= 800 && scrolled < 840:
      $('.section-title').css({
        fontSize: '3.8em'
      });
      break;

    case scrolled >= 840:
      $('.section-title').css({
        fontSize: '3.45em'
      });
      break;

    default:
      $('.section-title').css({
        fontSize: '3em'
      });
      break;
  }
}

function animateCircle(scrolled) {
  switch (true) {
    case scrolled < 40:
      $('#circle').removeAttr('class');
      $('#circle').addClass('state-1');
      break;

    case scrolled >= 40 && scrolled < 80:
      $('#circle').removeAttr('class');
      $('#circle').addClass('state-2');
      break;

    case scrolled >= 80 && scrolled < 120:
      $('#circle').removeAttr('class');
      $('#circle').addClass('state-3');
      break;

    case scrolled >= 120 && scrolled < 160:
      $('#circle').removeAttr('class');
      $('#circle').addClass('state-4');
      break;

    case scrolled >= 160 && scrolled < 200:
      $('#circle').removeAttr('class');
      $('#circle').addClass('state-5');
      break;

    case scrolled >= 200 && scrolled < 240:
      $('#circle').removeAttr('class');
      $('#circle').addClass('state-6');
      break;

    case scrolled >= 240 && scrolled < 280:
      $('#circle').removeAttr('class');
      $('#circle').addClass('state-7');
      break;

    case scrolled >= 280 && scrolled < 320:
      $('#circle').removeAttr('class');
      $('#circle').addClass('state-8');
      break;

    case scrolled >= 320 && scrolled < 360:
      $('#circle').removeAttr('class');
      $('#circle').addClass('state-9');
      break;

    case scrolled >= 360 && scrolled < 400:
      $('#circle').removeAttr('class');
      $('#circle').addClass('state-10');
      break;

    case scrolled >= 400 && scrolled < 440:
      $('#circle').removeAttr('class');
      $('#circle').addClass('state-11');
      break;

    case scrolled >= 440 && scrolled < 480:
      $('#circle').removeAttr('class');
      $('#circle').addClass('state-12');
      break;

    case scrolled >= 480 && scrolled < 520:
      $('#circle').removeAttr('class');
      $('#circle').addClass('state-13');
      break;

    case scrolled >= 520:
      $('#circle').removeAttr('class');
      $('#circle').addClass('state-14');
      break;

    default:
      $('#circle').removeAttr('class');
      break;
  }
}

$(".projects-list-name").hover(function () {
  if ($('#works_container').hasClass('done')) {
    $('#projects_list').addClass('white-lines');
    $(this).find('.project-link').addClass('show');
  }
}, function () {
  $('#projects_list').removeClass('white-lines');
  $('.project-link').removeClass('show');
});
$(document).ready(function () {
  var preloaderPromise = new Promise(function (resolve, reject) {
    setTimeout(function () {
      if ($('html, body').scrollTop() !== 0) {
        window.scrollTo(0, 0);
        $('*').removeClass('visible');
        $('*').removeClass('loaded');
        $('#preload').addClass('hidden');
        $('.main-navigation-item').removeClass('active');
        $('#intro').addClass('active');
        resolve();
      } else {
        $('#preload').addClass('hidden');
        resolve();
      }
    }, 1000);
  });
  preloaderPromise.then(function () {
    $('#main').addClass('loaded');
    $('body').removeClass('loader');
    $('#preload').css('visibility', 'hidden');
  });
  $('.main-navigation-item').on('click', function (event) {
    event.preventDefault();
    scrollingInProgress = true;
    var type = $(event.target).attr('id');

    $('.main-navigation-item').removeClass('active');
    $('#main').removeClass('loaded');
    $('body').addClass('loader');
    setTimeout(function () {
      $('#preload').removeAttr('style');
      $('#preload').removeClass('hidden');
      $('#main_bg').removeClass('show_bg');
    }, 500);
    setTimeout(function () {
      $('#section_4').removeClass('loaded');
      toggleMenu(false);
      $('html, body').animate({
        scrollTop: $('#' + $(event.target).data('anchor')).offset().top
      }, 1, function () {
        if ($(window).scrollTop() > 800) {
          animateCircle($(window).scrollTop());
          animateText($(window).scrollTop());
          $('#titles').removeAttr('class');
          $('#fixed_titles').removeAttr('class');
          $('#main_bg').removeClass('show_bg');
          $('.header').css('z-index', '99999');
          $('#circle').removeAttr('class');
          $('#circle').addClass('state-14');
          $('#titles').addClass('loaded');
          $('#fixed_titles').addClass('loaded');
          $('#home').addClass('cursor-item');
          restartIntro();
        } else {
          if (type !== 'contacts') {
            restartAbout();
          }
        }

        scrollingMain();
        setTimeout(function () {
          toggleMenu(false);
          $('#preload').addClass('hidden');
          $('#' + type).addClass('active');
          $('#main').addClass('loaded');
          $('#preload').css('visibility', 'hidden');
          programmic = false;

          if ($(window).width() <= 1024) {
            return false;
          }

          setTimeout(function () {
            switch (type) {
              case 'works':
                worksAnimation();
                break;

              case 'about':
                aboutAnimation();
                break;

              case 'contacts':
                contactAnimation();
                bottomAnimation();
                break;

              default:
                scrollingInProgress = false;
                $('body').removeClass('loader');
                return false;
            }
          }, 3000);
        }, 1000);
      });
    }, 1500);
  });
  $('.scroll-down').on('click', function () {
    $('html, body').animate({
      scrollTop: $(window).scrollTop() + 300
    }, 300);
  });
  $('.hamburger').on('click', function () {
    toggleMenu(true);
  });
  $('.close-menu').on('click', function () {
    toggleMenu(false);
  });

  function toggleMenu(bool) {
    if (bool) {
      $('.mobile-menu').addClass('open');
      $('.mobile-menu .main-navigation-item').addClass('open');
      $('.mobile-menu .mobile-social-item').addClass('open');
    } else {
      $('.mobile-menu .main-navigation-item').addClass('close');
      $('.mobile-menu .mobile-social-item').addClass('close');
      setTimeout(function () {
        $('.mobile-menu').removeClass('open');
        $('.mobile-menu .main-navigation-item').removeClass('open').removeClass('close');
        $('.mobile-menu .mobile-social-item').removeClass('open').removeClass('close');
      }, 2000);
    }
  }

  $('body').on('click', function (event) {
    if ($(event.target).hasClass('reload')) {
      $('#intro').trigger('click');
    }
  });
  $(document).mousemove(function (e) {
    if ($(e.target).hasClass('cursor-item')) {
      $('#cursors').addClass('big');
    } else {
      $('#cursors').removeClass('big');
    }

    if ($(e.target).hasClass('cross')) {
      $('#cursors').addClass('cross');
    } else {
      $('#cursors').removeClass('cross');
    }

    $('.cursor').css({
      'position': 'fixed',
      'left': e.clientX - 5,
      'top': e.clientY - 5
    });
  });
  $('#cursors').appendTo('body');
  $('.horn-wrapper').on('click', function () {
    if (!$('#raphael').hasClass('clicked')) {
      letsGo();
    } else {
      newAnimation = true;
      smiles = [];
      canvas = document.getElementById("canvas");
      ctx = canvas.getContext("2d");
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      $('#raphael').empty();
    }
  });
});

function letsGo() {
  var width = $(window).width();
  var height = $(window).height();
  var canvas = '<canvas id="canvas" height="' + height + '" width="' + width + '">Get a better browser!</canvas>';
  $('#raphael').addClass('clicked');
  $('#raphael').empty();
  $('#raphael').append(canvas);
  var width = $('#canvas').width();
  var height = $('#canvas').height();
  var canvas = ctx = false;
  var frameRate = 1 / 40; // Seconds

  var frameDelay = frameRate * 1000; // ms

  var loopTimer = false;

  var ball = {
    position: {
      x: width / 2,
      y: height
    },
    velocity: {
      x: 1,
      y: 30
    },
    mass: 0.1,
    //kg
    radius: 13,
    // 1px = 1cm
    restitution: -0.7
  };
  var animatedSmiles = [];
  var second = false;
  var Cd = 0.47; // Dimensionless

  var rho = 1.22; // kg / m^3

  var A = Math.PI * ball.radius * ball.radius / 10000; // m^2

  var ag = 9.81; // m / s^2

  var mouse = {
    x: 0,
    y: height,
    isDown: false
  };

  var setup = function () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // ctx.clearRect(0,0,width,height);

    var smiles = [{
      position: {
        x: 100,
        y: height - 150
      },
      velocity: {
        x: 20,
        y: 70
      },
      mass: 0.1,
      //kg
      radius: 23,
      // 1px = 1cm
      restitution: -0.7,
      url: "icon_1"
    }, {
      position: {
        x: 100,
        y: height - 150
      },
      velocity: {
        x: 15,
        y: 50
      },
      mass: 0.1,
      //kg
      radius: 23,
      // 1px = 1cm
      restitution: -0.7,
      url: "icon_2"
    }, {
      position: {
        x: 100,
        y: height - 150
      },
      velocity: {
        x: 30,
        y: 100
      },
      mass: 0.1,
      //kg
      radius: 23,
      // 1px = 1cm
      restitution: -0.7,
      url: "icon_3"
    }, {
      position: {
        x: 100,
        y: height - 150
      },
      velocity: {
        x: 40,
        y: 85
      },
      mass: 0.1,
      //kg
      radius: 23,
      // 1px = 1cm
      restitution: -0.7,
      url: "icon_4"
    }, {
      position: {
        x: 100,
        y: height - 150
      },
      velocity: {
        x: 15,
        y: 57
      },
      mass: 0.1,
      //kg
      radius: 23,
      // 1px = 1cm
      restitution: -0.7,
      url: "icon_5"
    }, {
      position: {
        x: 100,
        y: height - 150
      },
      velocity: {
        x: 36,
        y: 55
      },
      mass: 0.1,
      //kg
      radius: 23,
      // 1px = 1cm
      restitution: -0.7,
      url: "icon_6"
    }, {
      position: {
        x: 100,
        y: height - 150
      },
      velocity: {
        x: 15,
        y: 60
      },
      mass: 0.1,
      //kg
      radius: 23,
      // 1px = 1cm
      restitution: -0.7,
      url: "icon_1"
    }, {
      position: {
        x: 100,
        y: height - 150
      },
      velocity: {
        x: 25,
        y: 30
      },
      mass: 0.1,
      //kg
      radius: 23,
      // 1px = 1cm
      restitution: -0.7,
      url: "icon_2"
    }, {
      position: {
        x: 100,
        y: height - 150
      },
      velocity: {
        x: 3,
        y: 85
      },
      mass: 0.1,
      //kg
      radius: 23,
      // 1px = 1cm
      restitution: -0.7,
      url: "icon_3"
    }, {
      position: {
        x: 100,
        y: height - 150
      },
      velocity: {
        x: 14,
        y: 65
      },
      mass: 0.1,
      //kg
      radius: 23,
      // 1px = 1cm
      restitution: -0.7,
      url: "icon_4"
    }, {
      position: {
        x: 100,
        y: height - 150
      },
      velocity: {
        x: 25,
        y: 27
      },
      mass: 0.1,
      //kg
      radius: 23,
      // 1px = 1cm
      restitution: -0.7,
      url: "icon_5"
    }, {
      position: {
        x: 100,
        y: height - 150
      },
      velocity: {
        x: 16,
        y: 53
      },
      mass: 0.1,
      //kg
      radius: 23,
      // 1px = 1cm
      restitution: -0.7,
      url: "icon_6"
    }, {
      position: {
        x: 100,
        y: height - 150
      },
      velocity: {
        x: 23,
        y: 48
      },
      mass: 0.1,
      //kg
      radius: 23,
      // 1px = 1cm
      restitution: -0.7,
      url: "icon_1"
    }, {
      position: {
        x: 100,
        y: height - 150
      },
      velocity: {
        x: 28,
        y: 52
      },
      mass: 0.1,
      //kg
      radius: 23,
      // 1px = 1cm
      restitution: -0.7,
      url: "icon_2"
    }, {
      position: {
        x: 100,
        y: height - 150
      },
      velocity: {
        x: 34,
        y: 68
      },
      mass: 0.1,
      //kg
      radius: 23,
      // 1px = 1cm
      restitution: -0.7,
      url: "icon_3"
    }, {
      position: {
        x: 100,
        y: height - 150
      },
      velocity: {
        x: 4,
        y: 54
      },
      mass: 0.1,
      //kg
      radius: 23,
      // 1px = 1cm
      restitution: -0.7,
      url: "icon_4"
    }, {
      position: {
        x: 100,
        y: height - 150
      },
      velocity: {
        x: 5,
        y: 45
      },
      mass: 0.1,
      //kg
      radius: 23,
      // 1px = 1cm
      restitution: -0.7,
      url: "icon_5"
    }, {
      position: {
        x: 100,
        y: height - 150
      },
      velocity: {
        x: 6,
        y: 63
      },
      mass: 0.1,
      //kg
      radius: 23,
      // 1px = 1cm
      restitution: -0.7,
      url: "icon_6"
    }];
    ctx.fillStyle = 'red';
    ctx.strokeStyle = '#000000';
    loopTimer = setInterval(function () {
      ctx.clearRect(0, 0, width, height);
      animatedSmiles = [];

      for (var i = 0; i < smiles.length; i++) {
        if (newAnimation) {
          smiles = [];
          clearInterval(loopTimer);
          newAnimation = false;
          letsGo();
          break;
        }

        loop(smiles[i]);
      }
    }, frameDelay);
  };

  var TO_RADIANS = Math.PI / 180;

  function rotateAndPaintImage(context, image, angleInRad, positionX, positionY, axisX, axisY) {
    context.translate(positionX, positionY);
    context.rotate(angleInRad);
    context.drawImage(image, axisX, axisY);
    context.rotate(-angleInRad);
    context.translate(-positionX, -positionY);
  }

  var loop = function (ball) {
    if (!mouse.isDown) {
      // Do physics
      // Drag force: Fd = -1/2 * Cd * A * rho * v * v
      var Fx = -0.5 * Cd * A * rho * ball.velocity.x * ball.velocity.x * ball.velocity.x / Math.abs(ball.velocity.x);
      var Fy = -0.5 * Cd * A * rho * ball.velocity.y * ball.velocity.y * ball.velocity.y / Math.abs(ball.velocity.y);
      Fx = isNaN(Fx) ? 0 : Fx;
      Fy = isNaN(Fy) ? 0 : Fy; // Calculate acceleration ( F = ma )

      var ax = Fx / ball.mass;
      var ay = ag + Fy / ball.mass; // Integrate to get velocity

      ball.velocity.x += ax * frameRate;
      ball.velocity.y += ay * frameRate; // Integrate to get position

      ball.position.x += ball.velocity.x * frameRate * 100;
      ball.position.y += ball.velocity.y * frameRate * 100;
    } // Handle collisions


    if (ball.position.y > height - ball.radius) {
      ball.velocity.y *= ball.restitution;
      ball.position.y = height - ball.radius;
    }

    if (ball.position.x > width - ball.radius) {
      ball.velocity.x *= ball.restitution;
      ball.position.x = width - ball.radius;
    }

    if (ball.position.x < ball.radius) {
      ball.velocity.x *= ball.restitution;
      ball.position.x = ball.radius;
    } // Draw the ball
    // ctx.save();
    // angle = ++angle


    ctx.drawImage(document.getElementById(ball.url), ball.position.x, ball.position.y - ball.radius, 46, 46); // rotateAndPaintImage(ctx, document.getElementById(ball.url), angle, ball.position.x, ball.position.y - ball.radius, 0, 0)
    // ctx.restore();
  };

  setup();
}