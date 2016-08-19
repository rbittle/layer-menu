'use strict';
module.exports = menuController;

menuController.$inject = [
    '$scope',
    'jsonHandler',
    '$interval'
]

function menuController($scope, jsonHandler, $interval){
    var vm = this;
    var socket = io();

    /** Old Interval system for 3-minute timer reloading
    $interval(function(){
        jsonHandler.menu().then(function(data){
            vm.json = data;
        });
    },180000);
    */

    $scope.$on('$viewContentLoaded', function(){
        jsonHandler.menu().then(function(data){
            vm.json = data;
        });
    });

    socket.on('menuRecieve', function(data){
        vm.json = data;
        $scope.$apply();
    });
}
