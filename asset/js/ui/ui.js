var ui = (function () {
  var $ele = $("html, body"), scrollPos = 0;

  return {
    init: init,
    scrollLock: scrollLock
  };

  function init() {
    visualSlick();
    pathList();
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

  function tab(){
    var $obj = $('[data-action="tab"]');
    if($obj.length === 0) {return false;}
    var type = $obj.data('type');
    $obj.each(function(){tabAct($(this), type);});
  }
  function tabAct(obj, type){
    var $obj = obj, currentNum = 0, currentTarget;
    var tabToggle = function(){
      var curObj = $obj.find('[data-tab-target]').eq(currentNum);
      currentTarget = curObj.data('tab-target');
      curObj.addClass('active').siblings().removeClass('active');
      if(type === 'show') {
        $('[data-tab-seq="' + currentTarget + '"]').addClass('active').siblings().removeClass('active');
      }
    };
    tabToggle();
    $obj.find('[data-tab-target]').off('click').on('click', function(){
      if (currentNum !== $(this).index()) {
        currentNum = $(this).index();
        tabToggle();
      }
    });
  }
})();
