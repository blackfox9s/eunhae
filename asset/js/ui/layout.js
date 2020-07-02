var layout = (function () {
  var $ele, selectMenu;
  return {init: init};

  function init() {
    $ele = $('.wrap');
    selectMenu = String($ele.data('select-menu')).split(',');
    ui.init();
    if ($('.include').length > 0) {
      includeAct();
    } else {
      menu();
      pathList();
    }
  }

  function includeAct() {
    var $obj = $('.include');
    if($obj.length > 0){
      $obj.each(function(){
        var $this = $(this);
        var url = $this.data('href');
        var isHeader = url.indexOf('header') > -1;
        var isPath = url.indexOf('path') > -1;
        $.ajax({
          url : url,
          success : function(result){$this.html(result);},
          complete : function(){
            if (isHeader) {menu();}
            if (isPath) {pathList();}
          }
        });
      });
    }
  }

  function menu(){
    var $gnb = $('.gnb');
    var $openBt = $('.all-menu-btn.open');
    var $closeBt = $('.all-menu-btn.close');
    menuActive();
    $openBt.off('click').on('click', function(){
      $(this).parent().addClass('is-act');
      $gnb.addClass('is-open');
    });
    $closeBt.off('click').on('click', function(){
      $(this).parent().removeClass('is-act');
      $gnb.removeClass('is-open');
    });
  }
  function menuActive(){
    var $obj = $ele.find('.gnb'), $dep1, $dep2;
    if(selectMenu[0]){
      $dep1 = $obj.find('li').filter('[data-dep1="'+ selectMenu[0]  +'"]');
      $dep1.find('> a').addClass('act');
    }
    if(selectMenu[1]){
      $dep2 = $dep1.find('[data-dep2="'+ selectMenu[1]  +'"]');
      $dep2.addClass('act');
    }
  }

  function pathList(){
    var $pathBox = $('.path-sec'), flag, $dep1, $dep2, $dep3, $dep3Target, isDep3, $dep2Target;
    if($pathBox.length===0){return false;}

    flag = ($pathBox.find('dd a').length===1);
    $dep1 = $pathBox.find('dl').eq(0);
    $dep2 = $pathBox.find('dl').eq(1);
    $dep3 = $pathBox.find('dl').eq(2);
    $dep2Target = $dep2.find('[data-dep1="'+ selectMenu[0] +'"]')
    $dep3Target = $dep3.find('dd').filter('[data-dep1="'+ selectMenu[0] +'"][data-dep2="'+ selectMenu[1] +'"]');

    if($dep2Target.length === 0) {
      $dep2.remove();
    } else {
      $dep2.find('dd').not('[data-dep1="'+ selectMenu[0] +'"]').addClass('disabled');
    }
    if($dep3Target.length === 0) {
      $dep3.remove();
    } else {
      $dep3.find('dd').not('[data-dep1="'+ selectMenu[0] +'"][data-dep2="'+ selectMenu[1] +'"]').addClass('disabled');
    }

    if(selectMenu[0]){
      $dep1.find('[data-dep1="'+ selectMenu[0] +'"]').addClass('act');
    }
    if (selectMenu[1]) {
      $dep2Target.find('[data-dep2="'+ selectMenu[1] +'"]').addClass('act');
    }
    if (selectMenu[2]) {
      $dep3Target.find('[data-dep3="'+ selectMenu[2] +'"]').addClass('act');
    }

    $pathBox.find('dt').on("click keypress", function(e){
      var $thisParent = $(this).closest('dl');
      if(e.type === 'keypress' && e.which !== 13 || flag) {return;}
      var isLength = $thisParent.find('dd:not(.disabled) > p').length;
      console.log();
      if(!$thisParent.hasClass('is-open')){
        if(isLength > 1) {
          $thisParent.addClass('is-open')
        }
        $thisParent.siblings().removeClass('is-open');
      }else{
        $thisParent.removeClass('is-open');
      }
    });
    $pathBox.find('dl').each(function(){
      var txt = $(this).find('.act a').text();
      $(this).find('dt em').text(txt);
      $(this).find('dd a').last().on('keydown', function(e){
        if(e.which === 9){$(this).closest('dl').find('dt').focus(); return false;}
      });
    });
  }
})();
