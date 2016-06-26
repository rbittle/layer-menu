'use strict';

module.exports = jsonHandler;

jsonHandler.$inject = [
    '$http'   
]

function jsonHandler($http){
    var service = {
        menu: generateMenu
    }

    return service;

    /*-----------*/

    function generateMenu(){
        return $http.get('layers.json').then(function(response){
            return response.data;
        }, function(response){
            console.log(response);
        });
    }

}
