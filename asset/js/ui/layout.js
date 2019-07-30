var layout = (function () {
  return {init: init};

  function init() {
    if ($('.include').length > 0) {
      includeAct();
    } else {
      menu();
    }
    ui.init();
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
})();
