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
                vm.json.layers = [{name:vm.name, image: file.name}]
            }else{
                vm.json.layers.push({name:vm.name, image: file.name});
            }
            vm.save(false);
        },function(resp){
        
        });
        
    }
    
    vm.deleteLayer = function(item){
        var index = vm.json.layers.indexOf(item);
        var delLayer = vm.json.layers.splice(index, 1)[0];
        jsonHandler.deleteLayer({fileName: delLayer.image}, function(){
            vm.save();
        }, function(res){
            console.log(res)
        });
    }

    vm.save = function(emit){
        if(typeof emit === 'undefined')
            emit = true;

        var data = {
            layers: vm.json.layers,
            marquee: vm.json.marquee,
            color: vm.json.color,
            time: vm.json.time
        }
        jsonHandler.save(data, function(res){
            vm.saved = true;
            $timeout(function(){vm.saved=false;},1000);
        }, function(res){
            console.log('save failure');
            console.log(res);
        });
        if(emit){
            socket.emit('menuSend', vm.json);
        }
    }

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

