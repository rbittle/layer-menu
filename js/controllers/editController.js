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
            method: 'POST',
            file: file,
            data: {name: vm.name}
        });
        file.upload.then(function(){
            console.log('picture added');
        });
    }

    $scope.$on('$viewContentLoaded', function(){
        jsonHandler.menu().then(function(data){
            vm.layers = data;
            console.log(data);
        });

   });
}

