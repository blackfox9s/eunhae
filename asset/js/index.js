/* 모듈 호출 */
startJs();

define(['jquery', 'cookie', 'underscore', 'moment', 'layout', 'ui', 'develop'], function () {
  layout.init();
  layerPopupOpen();
});
