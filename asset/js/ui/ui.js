var ui = (function () {
  var $ele = $("html, body"), scrollPos = 0;

  return {
    init: init,
    scrollLock: scrollLock
  };

  function init() {
    visualSlick();
    pathList();
    photoSlick();
    tab();
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

  function pathList(){
    var pathBox = $('.path-sec');
    if(pathBox.length===0){return false;}
    var flag = (pathBox.find('dd a').length===1);
    pathBox.find('dt').on("click keypress", function(e){
      var $thisParent = $(this).closest('dl');
      if(e.type === 'keypress' && e.which !== 13 || flag) {return;}
      if($thisParent.hasClass('is-open')){
        $thisParent.removeClass('is-open');
      }else{
        $thisParent.addClass('is-open').siblings().removeClass('is-open');
      }
    });
    pathBox.find('dl').each(function(){
      var txt = $(this).find('.act a').text();
      $(this).find('dt em').text(txt);
      $(this).find('dd a').last().on('keydown', function(e){
        if(e.which === 9){$(this).closest('dl').find('dt').focus(); return false;}
      });
    });
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
    var tabToggle = function(){
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
    if(type === 'show') {tabToggle();}
    $obj.find('[data-tab-target]').off('click').on('click', function(){
      currentNum = $(this).index();
      tabToggle();
    });
  }
})();
