'use strict';

module.exports = appConfig;

appConfig.$inject = [
    '$stateProvider',
    '$urlRouterProvider'
]

function appConfig($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/edit')
    $stateProvider
        .state('menu',{
            url: '/',
            templateUrl: 'menu.html',
            controller: 'menuController',
            controllerAs: 'mc',
            resolve: {
                loadFiles:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load({
                        insertBefore: '#ng_lazyload_link',
                        files: [
                            'css/menu.css'
                        ]
                    });
                }]
            }
        })
        .state('edit',{
            url: '/edit',
            templateUrl: 'edit.html',
            controller: 'editController',
            controllerAs: 'ec',
            resolve: {
                loadFiles:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load({
                        insertBefore: '#ng_lazyload_link',
                        files: [
                            'css/edit.css',
                            'css/colorpicker.min.css'
                        ]
                    });
                }]
            }
        })
}
