// FUNCTIONS:
//  scrollTrigger
//  mainScrollTrigger
//  mouseStop - MAIN SLIDER Activating & Deactivating
//  skipPage
//  smoothScroll
//  parallaxEffect
//  progressEffect
//  slideSize

// Global variables:

//
//    URL handling:
// {start}
var _url = window.location.pathname
if (_url[_url.length - 1] == "/") _url = ""
else {
  _url = _url.substring(1)
  if (_url.search("/") != -1) _url = _url.split("/")[_url.split("/").length - 1]
}

if (_url == "") {
  _url = "index"
} else {
  _url = _url.split(".")[0]
}
// {end.}

var _progress = 0,
  _goalWidth = 0

var _scrollValue = class {
  constructor(top, bottom) {
    this.top = top
    this.bottom = bottom
  }
}

// ProgressEffect function -delay-:
var _progressDisabled = false,
  _prevScrollValue

var _orginalSlideSize = new Array()

//
//   DOCUMENT ON LOAD
// {start}
$.pageLoading = function () {
  //    perform in every site
  // {start}

  // (function(){
  // $.getScript( "js/fixers.js" ),
  //   $.Deferred(function( deferred ){
  //       $( deferred.resolve );
  //   })
  // })();

  //    1. - adds page name as class to body,
  //    2. - gives class 'onSite' to link that leads to site you are ondevice
  //    created by Damian Tarnawski 'thetarnav'
  // {start}
  ;(function () {
    $("html").addClass(
      "url" + _url[0].toUpperCase() + _url.substring(1, _url.length)
    )

    checkLink($("#main-nav #nav-container a"))
    // checkLink( $('#main-footer #nav-container a'), true);

    function checkLink(link, firstOnly) {
      for (var i = 0; i < link.length; i++) {
        if ($(link[i]).attr("href").split(".")[0] == _url) {
          $(link[i]).addClass("onSite")
          $(link[i]).removeAttr("href")
          if (firstOnly) {
            i = link.length
          }
        }
      }
    }
  })()
  // {end.}

  //
  // adds 'data-hover' attr to every link with his text

  // for (var i = 0; i < $('a').length; i++) {
  //   $($('a')[i]).attr('data-hover', $($('a')[i]).text());
  // }

  $.each($(".parallax-box"), function (index) {
    if (!$(this).children("img.parallax-image").attr("src")) {
      console.error(
        ".parallax-box[" +
          index +
          "]: missing: .children('img.parallax-image').attr('src')"
      )
      return
    }
    if ($(this).children("img.parallax-image").length > 1) {
      console.error(
        ".parallax-box[" +
          index +
          "]: too many: .children('img.parallax-image')"
      )
      let children = $(this).children("img.parallax-image")
      for (var i = 1; i < children.length; i++) {
        children[i].remove()
      }
    }
    if ($(this).hasClass("parallax-background")) {
      console.log("nie dokonczone")
      // let image = $(this).children('img.parallax-image')
    }
  })

  //    START NAV BUILDING
  //    builds a start nav from content sections
  // {start}
  ;(function () {
    for (i = 0; i < $(".content").length; i++) {
      var text = $($(".content header")[i]).text()
      if (text.split(".").length > 1) text = text.split(".")[1]

      $("<a></a>").text(text).appendTo("#progress-nav main")

      // $($('#progress-nav main > *')[i]).css({
      //   width: $($('.content')[i]).height()/7 + 120 + "px"
      // });
    }
    if ($("#progress-nav main")) {
      $("#progress-nav main").append('<div class="progressBg"></div>')
      $("#progress-nav main div.progressBg").css("display", "none")

      $("#progress-nav main").append('<div class="progress"></div>')
      $("#progress-nav main div.progress").css("display", "none")
    }
  })()
  // {end.}

  // {end.}
  if (_url == "index") {
    //
    //    perform only in start site
    // {start}

    //    MAIN SLIDER
    // {start}
    for (var i = 1; i <= $("#main-slider").children().length; i++) {
      let $slide = $($("#main-slider").children()[i * 2 - 2])
      _orginalSlideSize[i * 2 - 2] = $slide.outerWidth()
      _orginalSlideSize[i * 2 - 1] = $slide.outerHeight()
    }

    slideSize()
    // {end.}

    //    content height corrention
    //    full-screen mode
    // {start}
    for (var i = 0; i < $(".content").length; i++) {
      var newHeight = window.innerHeight - $("#main-nav").outerHeight(true)

      $($(".content")[i]).css("min-height", newHeight)
    }
    // {end.}
    // {end.}
  } else {
    //    perform in other sites
    // {star}
    // {end.}
  }
  //    perform in every site:
  // {start}
  correctWindowValues()

  // if( $('#main-footer').offset().top + $('#main-footer').outerHeight() < $(window).height() ) $('#main-footer').css({
  //   'position': 'absolute',
  //   'left': 0,
  //   'bottom': 0
  // });

  changeSvg()

  handleScroll()

  // {end.}
  return $.when.apply($)
}
// {end.}
$.pageLoading().done(function () {
  //
  //    WEBSITE IS FULLY LOADED
  // {start}
  $(window).on("load", function (event) {
    var loadTime =
      window.performance.timing.domContentLoadedEventEnd -
      window.performance.timing.navigationStart
    if (loadTime < 100) {
      $("#loader").fadeOut(0)
    } else {
      $("body").addClass("loaded")
    }
    // $('body').addClass('loaded');
  })
})
// {end.}

//
//    DEVICE DETECTION
//    Touch screen or mouse and keyboard

// //  mouse and keyboard:
// $(window).on("wheel", () => mouse());
// $(window).on("mousemove", () => mouse());
// const mouse = () => {
//   console.log('mouse');
// }
//
// //  Touch screen:
// $(window).on('touchstart', () => touch());
// $(window).on('touchmove', () => touch());
// $(window).on('touchend', () => touch());
//
// const touch = () => {
//   console.log('touch');
// }

//
//    SCROLL
//    Function triggered by scroll
//

$(window).scroll(function () {
  handleScroll()
})

function handleScroll() {
  $("#main-nav-container").css("height", $("#main-nav").height())

  if (_url == "index") {
    //
    // perform only in start site

    // activates at any scroll
    mainScrollTrigger()

    scrollTrigger(
      $("#main-nav-container").offset().top + $("#main-nav").height(),
      "#main-nav"
    )
  } else {
    //
    // perform in other sites

    // checks scroll function for Main Nav
    scrollTrigger($("#main-nav-container").offset().top, "#main-nav")
  }
  //
  // perform only in every site:

  // checks scroll function for Start Nav
  if ($("#progress-nav-container").length && $("#progress-nav").length) {
    scrollTrigger($("#progress-nav-container").offset().top, "#progress-nav")
  }

  // sets a parallax effect on document load
  parallaxEffect()

  // show progress of page scrolling
  progressEffect()
}

//
//    WINDOW RESIZING
//
$(window).resize(function () {
  // $('#loader #animation').fadeOut(0);
  // $('body').removeClass('loaded');
  // $('#loader').fadeIn(0);
  // setTimeout(function () {
  //   location.reload();
  // }, 50);

  correctWindowValues()
  handleScroll()
})

function correctWindowValues() {
  //
  //    Prepares parallaxEffect
  //    created by Damian Tarnawski 'thetarnav'
  // {start}
  ;(function () {
    if (!$(".parallax-box").length > 0) {
      return
    }
    var screenHeight = $(window).height()

    for (var i = 0; i < $(".parallax-box").length; i++) {
      let image = $($(".parallax-box img.parallax-image")[i]),
        parallaxBox = $($(".parallax-box")[i])

      // parallaxBox.css('height', image.height() / 1.8);
      if (screenHeight > parallaxBox.height()) {
        image.css("min-height", parallaxBox.height() + "px")
      } else {
        image.css("min-height", screenHeight + "px")
      }
    }
  })()
  // {end.}

  //    Start Nav background correction
  // {start}
  ;(function () {
    if (!$("#progress-nav").length) {
      return
    }
    $("#progress-nav main").css({
      "background-size": window.innerWidth + "px",
      "background-position": "-" + $("#progress-nav main").offset().left + "px",
    })
  })()

  // {end.}

  //    Giving space for the footer
  ;(function () {
    var children = $("body").children()
    var indexOfFooter = children.index($("#main-footer"))
    if (
      $(children[indexOfFooter - 1]).offset().top +
        $(children[indexOfFooter - 1]).height() <=
      window.innerHeight
    ) {
      $("body").css("height", "-=" + $("#main-footer").height())
      return $("body")
    }
    return children.slice(indexOfFooter - 1, indexOfFooter)
  })().css({
    marginBottom: $("#main-footer").height() + "px",
  })
  //

  if (_url == "index") {
  } else {
    $("body").css({
      marginTop: $("#main-nav").outerHeight(true) + "px",
      height: "-=" + $("#main-nav").outerHeight(true),
    })
  }
}

function getScrollValue(edge) {
  _scrollValue.top = $(window).scrollTop() + $("#main-nav").height()
  _scrollValue.bottom = $(window).scrollTop() + window.innerHeight

  switch (edge) {
    case "top":
      return _scrollValue.top
    case "bottom":
      return _scrollValue.bottom
    default:
      return _scrollValue
  }
}

function slideSize() {
  for (var i = 1; i <= $("#main-slider").children().length; i++) {
    let $slide = $($("#main-slider").children()[i * 2 - 2]),
      width = $slide.outerWidth(),
      height = $slide.outerHeight(),
      orginalWidth = _orginalSlideSize[i * 2 - 2],
      orginalHeight = _orginalSlideSize[i * 2 - 1]

    if (
      (width < window.innerWidth && orginalWidth > window.innerWidth) ||
      (width > window.innerWidth && orginalWidth > window.innerWidth)
    ) {
      width = window.innerWidth
      height = (width / orginalWidth) * orginalHeight
    } else {
      width = orginalWidth
      height = orginalHeight
    }

    $slide.css({
      width: width + "px",
      height: height + "px",
    })
    $("#main-slider").css({
      height: height + "px",
    })
  }
}

//    Sticky effect
//    triggerValue - limit value of scroll coordinate that trigger function
//    id - to specify object to edit
//    created by Damian Tarnawski 'thetarnav'
// {start}
function scrollTrigger(triggerValue, id, className) {
  if (!className) className = "scrolled"

  if ($(window).scrollTop() > triggerValue) {
    $(id).addClass(className)
  } else {
    $(id).removeClass(className)
  }
}

function mainScrollTrigger() {
  if ($(window).scrollTop() > 0) {
    $("#main-slider-container").addClass("scrolled")
  } else {
    $("#main-slider-container").removeClass("scrolled")
    $("#main-slider-container").addClass("mouse-move")
    clearTimeout(_timeout)
    _timeout = setTimeout(function () {
      $("#main-slider-container").removeClass("mouse-move")
    }, 1000)
  }
}
// {end.}

//
//    MAIN SLIDER Activating & Deactivating
//    Main slider activating while mouse is moving
// {start}
$(window).on("touchstart", () => mainSliderActivate())
$(window).on("touchmove", () => mainSliderActivate())
$(window).on("touchend", () => mainSliderActivate())
$(document).on("mousemove", () => mainSliderActivate())
var _timeout
const mainSliderActivate = () => {
  if ($("#main-slider-container"))
    $("#main-slider-container").addClass("mouse-move")

  clearTimeout(_timeout)
  _timeout = setTimeout(function () {
    mouseStop()
  }, 1500)
}
$(document).mouseleave(function () {
  mouseStop()
})

function mouseStop() {
  // MOUSE STOP MOVING
  // what to do while mouse stops?

  if ($("#main-slider-container"))
    $("#main-slider-container").removeClass("mouse-move")

  // end.
}
// {end.}

//
//    MAIN NAV
//
$("#main-nav #hamburger").click(function () {
  $("#main-nav").toggleClass("expand")
})

//
//    USING KEYS
//    for example arrow keys to move on the page
//    created by Damian Tarnawski 'thetarnav'
// {start}
document.onkeydown = function (event) {
  switch (event.keyCode) {
    case 37: // Arrow Left
      break
    case 38: // Arrow Up
      if (_url == "index") {
        skipPage("up")
      }
      break
    case 39: // Arrow Right
      break
    case 40: // Arrow Down
      if (_url == "index") {
        skipPage("down")
      }
      break
  }
}
// {end.}

//
//    navigating by scrolling to every content element on site
//    created by Damian Tarnawski 'thetarnav'
// {start}
function skipPage(direction) {
  if (direction) {
    var now = 0
    let scrollTop = Math.round(getScrollValue("top")),
      next

    for (var i = 0; i < $(".content").length; i++) {
      let item = $($(".content")[i]),
        offset = Math.round(item.offset().top)

      if ($(".content")[i + 1]) {
        next = $($(".content")[i + 1])
        next = Math.round(next.offset().top)
      } else {
        next = offset + item.height()
      }

      // console.log(i + ' scroll = ' + scrollTop);
      // console.log(i + ' offset = ' + offset);
      // console.log(i + ' next = ' + next);
      // console.log(i + ' offset + item.height = ' + (offset + item.height()));
      // console.log(i + ' now = ' + now);

      if (scrollTop < next) {
        if (scrollTop == offset) {
          Math.floor(now) // does: now =- now % 1;
          now++
        } else if (scrollTop > offset) now += 1.5
        break
      } else {
        now++
        Math.floor(now) // does: now =- now % 1;
      }
    }
    // console.log(now);
  } else {
    console.log("Direction missing!")
  }

  switch (direction) {
    case "down":
      if (now < $(".content").length) {
        if (now % 1 != 0) smoothScroll($(".content")[Math.floor(now)])
        else smoothScroll($(".content")[now])
      } else {
        smoothScroll($("#main-footer"))
      }
      // else smoothScroll( $('.content')[$('.content').length-1] );
      break
    case "up":
      if (now % 1 != 0) smoothScroll($(".content")[Math.floor(now) - 1])
      else if (now >= 2) smoothScroll($(".content")[now - 2])
      else if (now === 1) smoothScroll($("body"))
      break
    default:
  }
}
// {end.}

//
//    SMOOTH SCROLLING
//    created by Damian Tarnawski 'thetarnav'
// {start}

// returning to top of the site when pressing .onSite link
$("a.onSite").click(function () {
  smoothScroll($("html"))
})

//    START NAV
// script on presing the buttons
$("#progress-nav a").click(function () {
  var index = $("#progress-nav a").index(this)
  smoothScroll($($(".content")[index]))
})

//
// ACTUAL FUNCTION
function smoothScroll(goal) {
  if (!$(goal).length) {
    console.error("smoothScroll - $(goal) doesn't exist!")
    return
  }
  $("html, body").stop()

  // Prevent default anchor click behavior
  event.preventDefault()

  var offset = $(goal).offset().top,
    distance = offset - $(window).scrollTop()
  if (distance < 0) distance = -distance

  var defaultSpeed = 500,
    speed = defaultSpeed + distance * 0.2

  $("html, body").animate(
    {
      scrollTop: offset - $("#main-nav").outerHeight(),
    },
    speed,
    function () {
      // Add hash (#) to URL when done scrolling (default click behavior)
      if ($(goal).attr("id")) window.location.hash = $(goal).attr("id")
      else removeHash()
    }
  )
}
// {end.}

//
//    Parallax effect
//    created by Damian Tarnawski 'thetarnav'
// {start}
function parallaxEffect() {
  if (!$(".parallax-box").length) {
    return
  }
  var screenHeight = $(window).height(),
    scrollValue = $(window).scrollTop() + window.innerHeight

  $.each($(".parallax-box"), function () {
    if (!$(this).children("img.parallax-image").length) {
      return
    }
    let parallaxBox = $(this),
      image = $(this).children("img.parallax-image")

    if (scrollValue >= parallaxBox.offset().top) {
      let reserve = image.height() - screenHeight
      ;(screenDistance = screenHeight + parallaxBox.height()),
        (imageDistance = parallaxBox.height() + screenHeight - reserve),
        (percentTraveled =
          (scrollValue - parallaxBox.offset().top) / screenDistance),
        (start = parallaxBox.height() - reserve),
        (movement = percentTraveled * imageDistance),
        (fromBottom = start - movement)

      image.css("bottom", Math.round(fromBottom) + "px")
    }
  })
}
// {end.}

//
//    PROGRESS EFFECT
//    Progress Effect function - for Start Nav
//    created by Damian Tarnawski 'thetarnav'
// {start}
function progressEffect(exception) {
  if (!$("#progress-nav").length) {
    return
  }
  // common variables:
  var screenHeight = $(window).height(),
    scrollValue = $(window).scrollTop() + window.innerHeight,
    delayTime = 40

  // actual script:
  if (
    (_prevScrollValue != scrollValue && _progressDisabled == false) ||
    exception
  ) {
    if (!exception) {
      _progress = 0
      for (i = 0; i < $(".content").length; i++) {
        // for each button

        var contentOffset = $($(".content")[i]).offset().top,
          contentHeight = $($(".content")[i]).height(),
          percent = (scrollValue - contentOffset) / contentHeight

        if (percent < 0) {
          percent = 0
          break
        } else if (percent > 1) {
          percent = 1
        }

        _progress += $($("#progress-nav main > *")[i]).outerWidth() * percent

        if (percent < 1) break
      }

      // delay script - animation:
      _prevScrollValue = scrollValue
      _progressDisabled = true
      setTimeout(function () {
        _progressDisabled = false
      }, delayTime)
    }

    if (
      !$("#progress-nav main > div").hasClass("hover") ||
      _progress == _goalWidth
    ) {
      $("#progress-nav main > div.progressBg").css({
        width: _progress + "px",
      })
      $("#progress-nav main > div.progress").css({
        width: _progress + "px",
      })
    } else if (_progress < _goalWidth) {
      $("#progress-nav main > div.progress").css({
        width: _progress + "px",
      })
    } else {
      $("#progress-nav main > div.progressBg").css({
        width: _progress + "px",
      })
    }
  } else {
    setTimeout(function () {
      progressEffect()
    }, delayTime)
  }
}
// {end.}

//
//    mouse hover on the Start Nav
//    created by Damian Tarnawski 'thetarnav'
// {start}
$("#progress-nav a").mouseenter(function () {
  var index = $("#progress-nav a").index(this),
    $element

  _goalWidth = 0

  for (var i = 0; i < index + 1; i++) {
    _goalWidth += $($("#progress-nav a")[i]).outerWidth()
  }

  if (_goalWidth > _progress) {
    $element = $("#progress-nav main > div.progressBg")
  } else {
    $element = $("#progress-nav main > div.progress")
  }

  $element.css({
    width: _goalWidth + "px",
  })
  $("#progress-nav main > div").addClass("hover")
})

$("#progress-nav a").mouseleave(function () {
  $("#progress-nav main").children("div").removeClass("hover")
  progressEffect(true)
})
// {end.}

//
// function from: https://stackoverflow.com/users/94197/andy-e
function removeHash() {
  var scrollV,
    scrollH,
    loc = window.location
  if ("pushState" in history)
    history.pushState("", document.title, loc.pathname + loc.search)
  else {
    // Prevent scrolling by storing the page's current scroll offset
    scrollV = document.body.scrollTop
    scrollH = document.body.scrollLeft

    loc.hash = ""

    // Restore the scroll offset, should be flicker free
    document.body.scrollTop = scrollV
    document.body.scrollLeft = scrollH
  }
}
//

function changeSvg() {
  /*
   * Replace all SVG images with inline SVG
   */
  jQuery("img.svg").each(function () {
    var $img = jQuery(this)
    var imgID = $img.attr("id")
    var imgClass = $img.attr("class")
    var imgURL = $img.attr("src")

    jQuery.get(
      imgURL,
      function (data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find("svg")

        // Add replaced image's ID to the new SVG
        if (typeof imgID !== "undefined") {
          $svg = $svg.attr("id", imgID)
        }
        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== "undefined") {
          $svg = $svg.attr("class", imgClass + " replaced-svg")
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr("xmlns:a")

        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
        if (
          !$svg.attr("viewBox") &&
          $svg.attr("height") &&
          $svg.attr("width")
        ) {
          $svg.attr(
            "viewBox",
            "0 0 " + $svg.attr("height") + " " + $svg.attr("width")
          )
        }

        // Replace image with new SVG
        $img.replaceWith($svg)
      },
      "xml"
    )
  })
}
