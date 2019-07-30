var scLock = (function(){
  var $ele = $("html, body"), scrollPos = 0;
  function view(){
    scrollPos = $(window).scrollTop();
    $ele.find("#wrap").attr("style","margin-top: -"+ $(window).scrollTop() +"px");
    $ele.addClass('scroll-lock');
  }
  function hide(){
    $ele.removeClass('scroll-lock');
    $ele.find("#wrap").removeAttr("style");
    $(window).scrollTop(scrollPos);
  }
  return {view:view, hide:hide}
})();