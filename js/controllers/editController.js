'use strict';

module.exports = editController;

editController.$inject = [
    '$scope',
    'jsonHandler',
    'dragulaService',
    'Upload'
]

function editController($scope, jsonHandler, dragulaService, Upload){
    var vm = this;
    vm.json = {};
    vm.json.layers = [];

    vm.uploadImage = function(file){

        file.upload = Upload.upload({
            url: '/layermenu/scripts/upload.php',
            file: file,
            method: 'POST',
            data: {targetPath: 'uploads/'},
        });
        file.upload.then(function(resp){
            if(vm.json.layers == []||typeof vm.json.layers === 'undefined'){
                vm.json.layers = [{name:vm.name, image: 'scripts/uploads/'+file.name}]
            }else{
                vm.json.layers.push({name:vm.name, image: 'scripts/uploads/'+file.name});
            }
        },function(resp){
        
        });
    }
    
    vm.delete = function(item){
        var index = vm.json.layers.indexOf(item);
        vm.json.layers.splice(index, 1);
    }

    vm.save = function(){
        var data = {
            layers: vm.json.layers,
            marquee: vm.json.marquee
        }
        jsonHandler.save(data, function(res){
            console.log('save success');
        }, function(res){
            console.log('save failure');
        });
    }

    $scope.$on('$viewContentLoaded', function(){
        jsonHandler.menu().then(function(data){
            vm.json = data;
        });
    });
}

