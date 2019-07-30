var layout = (function () {
  return {init: init};

  function init() {
    if ($('.include').length > 0) {
      includeAct();
    } else {
      menu();
    }
    visualSlick();
    pathList();
  }

  function includeAct() {
    var $obj = $('.include');
    if($obj.length > 0){
      $obj.each(function(){
        var $this = $(this);
        var url = $this.data('href');
        var isHeader = url.indexOf('header') > -1;
        $.ajax({
          url : url,
          success : function(result){$this.html(result);},
          complete : function(){
            if (isHeader) {
              menu();
            }
          }
        });
      });
    }
  }

  function menu(){
    var $gnb = $('.gnb');
    var $openBt = $('.all-menu-btn.open');
    var $closeBt = $('.all-menu-btn.close');

    $openBt.off('click').on('click', function(){
      $(this).parent().addClass('is-act');
      $gnb.addClass('is-open');
    });
    $closeBt.off('click').on('click', function(){
      $(this).parent().removeClass('is-act');
      $gnb.removeClass('is-open');
    });
  }

  function pathList(){
    var pathBox = $('.path-sec');
    if(pathBox.length===0){return;}
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
    $obj.find('.slider').slick({
      dots: false,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      prevArrow: $obj.find('.prev'),
      nextArrow: $obj.find('.next'),
    });
  }
})();
