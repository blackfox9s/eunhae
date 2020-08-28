"use strict";

var bustDate = new Date();
var bustTime = bustDate.getTime()

var module = {
  waitSeconds: 0,
  urlArgs: function (url) {
    var args = '?bust=' + bustTime;
    if (url === 'post') {
      args += '&autoload=false';
    }
    return args;
  },
  paths: {
    /* libs */
    'jquery': 'libs/jquery',
    'underscore': 'libs/underscore',
    'moment': 'libs/moment.min',
    'slick': 'libs/slick.min',
    'cookie': 'https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min',

    /* ui */
    'layout': 'ui/layout',
    'ui': 'ui/ui',
    'develop': 'develop',
  },
  //의존성 관리 라이브러리 플러그인 별 의존성 추가
  shim: {
    underscore: {exports: '_'},
    layout: {deps: ['jquery', 'slick']},
    ui: {deps: ['jquery', 'cookie']},
    develop: {deps: ['jquery', 'underscore']},
  }
};

//설정 호출 함수
function startJs() {
  requirejs.config(module);
};
