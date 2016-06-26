'use strict';

var angular = require('angular');
var angularDragula = require('angular-dragula');
require('ng-file-upload');
require('angular-ui-router');
require('oclazyload');

angular
    .module('LayerMenu',[
        angularDragula(angular),
        'ngFileUpload',
        'ui.router',
        'oc.lazyLoad'
    ])
    .config(require('./config'))
    .run(require('./debug'))
;

require('./controllers');
require('./services');
