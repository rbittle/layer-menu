'use strict';
module.exports = menuController;

menuController.$inject = [
    '$scope',
    'jsonHandler',
    '$interval'
]

function menuController($scope, jsonHandler, $interval){
    var vm = this;

    $interval(function(){
        jsonHandler.menu().then(function(data){
            vm.json = data;
        });
    },180000);

    $scope.$on('$viewContentLoaded', function(){
        jsonHandler.menu().then(function(data){
            vm.json = data;
        });
    });
}
