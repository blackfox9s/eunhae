var ui = (function () {
  var $ele = $("html, body"), scrollPos = 0, popupCount=0, popLinks=[];

  return {
    init: init,
    scrollLock: scrollLock,
    popOpen:layerPop,
    popClose:layerPopClose
  };

  function init() {
    visualSlick();
    photoSlick();
    tab();
    toggle();
  }

  function scrollLock(flag){
    if (flag) {
      scrollPos = $(window).scrollTop();
      $ele.find("#wrap").attr("style","margin-top: -"+ $(window).scrollTop() +"px");
      $ele.addClass('scroll-lock');
    } else {
      $ele.removeClass('scroll-lock');
      $ele.find("#wrap").removeAttr("style");
      $(window).scrollTop(scrollPos);
    }
  }

  function visualSlick(){
    var $obj = $('.visual-slick-sec');
    if($obj.length === 0) {return false;}
    $obj.find('.slider').slick({
      dots: false,
      infinite: true,
      autoplay: $obj.find('.slider > div').length > 1,
      autoplaySpeed: 4000,
      fade: true,
      cssEase: 'linear',
      prevArrow: $obj.find('.prev'),
      nextArrow: $obj.find('.next'),
    });
  }

  function photoSlick(){
    var $obj = $('.photo-slider'), $count;
    if($obj.length === 0) {return false;}
    $count = $obj.find('.count');
    if($count.length > 0) {
      $count.each(function(i){
        $(this).prepend('<em>'+ numPad(i+1, 2)+'<hr>'+ numPad($count.length, 2) +'</em>');
      });
    }
    if (parseInt($obj.attr('data-arrow')) === 1) {
      var prev = '<div class="btn-pn prev"><i class="fas fa-chevron-left"></i></div>'
      var next = '<div class="btn-pn next"><i class="fas fa-chevron-right"></i></div>'
      $obj.parent().append(prev + next);
    }
    $obj.slick({
      dots: false,
      infinite: true,
      autoplay: false,
      autoplaySpeed: 2000,
      fade: true,
      cssEase: 'linear',
      prevArrow: $obj.siblings('.prev'),
      nextArrow: $obj.siblings('.next'),
    });
  }

  function tab(){
    var $obj = $('[data-action="tab"]');
    if($obj.length === 0) {return false;}
    var type = $obj.data('type');
    $obj.each(function(){tabAct($(this), type);});
  }
  function tabAct(obj, type){
    var $obj = obj, currentNum = 0;
    var tabAction = function(){
      var $selectObj, $selectTarget;
      $selectObj = $obj.find('[data-tab-target]').eq(currentNum);
      $selectTarget = $('[data-tab-seq="' + $selectObj.data('tab-target') + '"]');
      $selectObj.addClass('active').siblings().removeClass('active');
      if(type === 'show') {
        $selectTarget.show().addClass('active').siblings().hide().removeClass('active');
      }
      if(type === 'scroll') {
        $('html, body').animate({scrollTop: $selectTarget.offset().top}, 300);
      }
    };
    if(type === 'show') {tabAction();}
    $obj.find('[data-tab-target]').off('click').on('click', function(){
      currentNum = $(this).index();
      tabAction();
    });
  }

  function toggle(){
    var $obj = $('[data-action="toggle"]');
    if($obj.length === 0) {return false;}
    var type = $obj.data('type');
    $obj.each(function(){toggleAct($(this), type);});
  }
  function toggleAct(obj, type){
    var $obj = obj, currentNum = 0;
    var toggleAction = function(){
      var $selectObj;
      $selectObj = $obj.find('> dl').eq(currentNum);
      $selectObj.toggleClass('active').siblings().removeClass('active');
      if($selectObj.hasClass('active')){
        $selectObj.find('> dd').stop().slideDown(200);
      } else {
        $selectObj.find('> dd').stop().slideUp(200);
      }
      $selectObj.siblings().find('> dd').stop().slideUp(200);
    };
    if(type === 'active') {toggleAction();}
    $obj.find('> dl > dt').off('click').on('click', function(){
      currentNum = $(this).parent().index();
      toggleAction();
    });
  }

  function layerPop(link){
    var popupName = link.attr('data-popup');
    var $popObj=$('[data-popup-name="'+ popupName +'"]'), linkHref = link;
    popLinks.push(link);
    $popObj.show();
    popupFocus($popObj);
    $popObj.find('.close').off("click").on("click", function(){
      layerPopClose(popupName); linkHref.focus(); return false;
    });
  }
  function layerPopClose(popupName){
    popupCount = popupCount-1;
    popLinks[popupCount].focus();
    popLinks.pop();
    $('[data-popup-name="'+ popupName +'"]').hide();
  }
  function popupFocus(obj){
    var popChild = obj.find('a, area, button, input, object, select, textarea');
    popChild.first().focus();
    popupCount = popupCount+1;
    if(popChild.length === 1){
      popChild.off("keydown").on("keydown", function(e){
        if(e.keyCode === 9){popChild.first().focus(); return false;}
      });
    }else{
      popChild.last().off("keydown").on("keydown", function(e){
        if(e.keyCode === 9){if(!e.shiftKey) {popChild.first().focus(); return false;}}
      });
      popChild.first().off("keydown").on("keydown", function(e){
        if(e.keyCode === 9){if(e.shiftKey) {popChild.last().focus(); return false;}}
      });
    }
  }
})();

function numPad(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}
