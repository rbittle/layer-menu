'use strict';

module.exports = editController;

editController.$inject = [
    '$scope',
    'jsonHandler',
    'dragulaService',
    'Upload',
    '$timeout'
]

function editController($scope, jsonHandler, dragulaService, Upload, $timeout){
    var vm = this;
    vm.json = {};
    vm.json.layers = [];
    vm.saved = false;

    vm.uploadImage = function(file){

        file.upload = Upload.upload({
            url: 'scripts/upload.php',
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
            marquee: vm.json.marquee,
            color: vm.json.color
        }
        jsonHandler.save(data, function(res){
            console.log('save success');
            vm.saved = true;
            $timeout(function(){vm.saved=false;},1000);
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

