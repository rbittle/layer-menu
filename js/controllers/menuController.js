'use strict';
module.exports = menuController;

menuController.$inject = [
    '$scope',
    'jsonHandler'
]

function menuController($scope, jsonHandler){
    var vm = this;

    $scope.$on('$viewContentLoaded', function(){
        jsonHandler.menu().then(function(data){
            vm.json = data;
        });
    });
}
