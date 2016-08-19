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
    var socket = io();

    vm.uploadImage = function(file){

        var uploadPost = Upload.upload({
            url: 'upload/',
            file: file,
            method: 'POST'
        });
        uploadPost.then(function(resp){
            if(vm.json.layers == []||typeof vm.json.layers === 'undefined'){
                vm.json.layers = [{name:vm.name, image: 'images/'+file.name}]
            }else{
                vm.json.layers.push({name:vm.name, image: 'images/'+file.name});
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
            color: vm.json.color,
            time: vm.json.time
        }
        jsonHandler.save(data, function(res){
            console.log('save success');
            vm.saved = true;
            $timeout(function(){vm.saved=false;},1000);
        }, function(res){
            console.log('save failure');
        });
        socket.emit('menuSend', vm.json);
    }

    $scope.$on('$viewContentLoaded', function(){
        jsonHandler.menu().then(function(data){
            vm.json = data;
        });
    });
}

