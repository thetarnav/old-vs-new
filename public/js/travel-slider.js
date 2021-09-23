var sliderCount = $('#travel-slider section').length,
    centerSlide = 0,
    centerSlide = $('#travel-slider').attr('default-slide')-1,
    urlParameter = parseInt(window.location.search.substring(1), 10),
    disabled = false;

if($.isNumeric(urlParameter)){
  if(urlParameter >= 0 && urlParameter < sliderCount){
    centerSlide = urlParameter;
  }
}

var orginalCenterSlide = centerSlide,
    orginalSliderCount = sliderCount,
    $slides = $('#travel-slider section'),
    _previous = '#travel-slider nav#travel-slider-nav a:first, #travel-slider div.move:first',
    _next = '#travel-slider nav#travel-slider-nav a:last, #travel-slider div.move:last';

if(centerSlide>(sliderCount-3)){
  $('#travel-slider section').clone().appendTo('#travel-slider');
}
if(centerSlide<2){
  $('#travel-slider section').clone().prependTo('#travel-slider');
  centerSlide = centerSlide + sliderCount;
}
sliderCount = $('#travel-slider section').length;
rename();
$(_next).click(function(){if(!disabled) next()});
$(_previous).click(function(){if(!disabled) previous()});
$(_next).mouseenter(function(){
  $('#travel-slider nav#travel-slider-nav p#travel-slider-help').empty();
  $('#travel-slider nav#travel-slider-nav p#travel-slider-help').append("następna oferta");
  $('#travel-slider nav#travel-slider-nav p#travel-slider-help').addClass("show");
  $('#travel-slider nav#travel-slider-nav p#travel-slider-help').before($('#travel-slider nav#travel-slider-nav p#travel-slider-help').clone(true));
  $('#travel-slider nav#travel-slider-nav p#travel-slider-help:last').remove();
});
$(_previous).mouseenter(function(){
  $('#travel-slider nav#travel-slider-nav p#travel-slider-help').empty();
  $('#travel-slider nav#travel-slider-nav p#travel-slider-help').append("poprzednia oferta");
  $('#travel-slider nav#travel-slider-nav p#travel-slider-help').addClass("show");
  $('#travel-slider nav#travel-slider-nav p#travel-slider-help').before($('#travel-slider nav#travel-slider-nav p#travel-slider-help').clone(true));
  $('#travel-slider nav#travel-slider-nav p#travel-slider-help:last').remove();
});
$(_previous + ', ' + _next).mouseleave(function(){
  $('#travel-slider nav#travel-slider-nav p#travel-slider-help').removeClass("show");
});

function rename(){
  for(i=0;i<sliderCount;i++){
    if(i==(centerSlide-2)){
      $($('#travel-slider section')[i]).addClass('far-left');
    } else if (i==(centerSlide-1)) {
      $($('#travel-slider section')[i]).addClass('left');
    } else if (i==centerSlide) {
      $($('#travel-slider section')[i]).addClass('center');
    } else if (i==centerSlide+1) {
      $($('#travel-slider section')[i]).addClass('right');
    } else if (i==(centerSlide+2)) {
      $($('#travel-slider section')[i]).addClass('far-right');
    }
  }
};
function next(){
  disable(600);
  $('#travel-slider nav#travel-slider-nav p#travel-slider-help').removeClass("show");
  if(orginalCenterSlide<(orginalSliderCount-1)){
    orginalCenterSlide++;
  }else{
    orginalCenterSlide=0;
  }
  window.history.replaceState(null, null, location.pathname + '?' + orginalCenterSlide);
  $($('#travel-slider section')[0]).appendTo('#travel-slider');
  $('#travel-slider section').removeClass();
  rename();
  $('#travel-slider div.center-bg').removeClass("anim-next").removeClass("anim-prev").addClass("anim-next");
  $('#travel-slider div.center-bg').before($('#travel-slider div.center-bg').clone(true));
  $('#travel-slider div.center-bg.anim-next:last').remove();
};
function previous(){
  disable(600);
  $('#travel-slider nav#travel-slider-nav p#travel-slider-help').removeClass("show");
  if(orginalCenterSlide>0){
    orginalCenterSlide--;
  }else{
    orginalCenterSlide=orginalSliderCount-1;
  }
  window.history.replaceState(null, null, location.pathname + '?' + orginalCenterSlide);
  $($('#travel-slider section')[sliderCount-1]).prependTo('#travel-slider');
  $('#travel-slider section').removeClass();
  rename();
  $('#travel-slider div.center-bg').removeClass("anim-prev").removeClass("anim-next").addClass("anim-prev");
  $('#travel-slider div.center-bg').before($('#travel-slider div.center-bg').clone(true));
  $('#travel-slider div.center-bg.anim-prev:last').remove();
};
function disable(time){
  disabled = true;
  setTimeout(function() {disabled = false}, time);
}

// $('#travel-slider section').mouseover(function(){
//   $(this).addClass('hovered');
// });
// $('#travel-slider section').mouseout(function(){
//   $(this).removeClass('hovered');
// });
