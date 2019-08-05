var ui = (function () {
  var $ele = $("html, body"), scrollPos = 0;

  return {
    init: init,
    scrollLock: scrollLock
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
      autoplay: true,
      autoplaySpeed: 2000,
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
        $(this).prepend('<em>'+ (i+1)+'<hr>'+ $count.length +'</em>');
      });
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
      $selectObj = $obj.find('dl').eq(currentNum);
      $selectObj.toggleClass('active').siblings().removeClass('active');
      if($selectObj.hasClass('active')){
        $selectObj.find('dd').stop().slideDown(200);
      } else {
        $selectObj.find('dd').stop().slideUp(200);
      }
      $selectObj.siblings().find('dd').stop().slideUp(200);
    };
    if(type === 'active') {toggleAction();}
    $obj.find('dt').off('click').on('click', function(){
      currentNum = $(this).parent().index();
      toggleAction();
    });
  }
})();
