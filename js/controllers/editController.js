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

    dragulaService.options($scope, 'layers',{
        
    });
    
    vm.uploadImage = function(file){

        console.log('uploading...')
        file.upload = Upload.upload({
            url: '/layermenu/scripts/upload.php',
            file: file,
            method: 'POST',
            data: {targetPath: 'uploads/'},
        });
        console.log(file);
        file.upload.then(function(resp){
            vm.layers.push({name:vm.name, image: 'scripts/uploads/'+file.name});
        },function(resp){
        
        });
    }

    vm.save = function(){
        var data = {
            layers: vm.layers,
            marquee: vm.marquee
        }

        jsonHandler.save(data, function(data){
            console.log('save success');
            console.log(data);
        }, function(data){
            console.log('save failure');
            console.log(data);
        });
    }

    $scope.$on('layers.drop', function(e, el){
        console.log(vm.layers);
    });

    $scope.$on('$viewContentLoaded', function(){
        jsonHandler.menu().then(function(data){
            vm.layers = data;
            console.log(data);
        });

   });
}

