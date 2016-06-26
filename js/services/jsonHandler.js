'use strict';

module.exports = jsonHandler;

jsonHandler.$inject = [
    '$http'   
]

function jsonHandler($http){
    var service = {
        menu: generateMenu,
        save: save
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
    
    function save(data, success, failure){
        if(typeof success === 'undefined')
            success = function(){};
        if(typeof failure === 'undefined')
            failure = function(){};

        var script = 'scripts/sort.php'
        $http.post(script, data)
            .then(function(data){
                success();   
            },function(data){
                failure();
            });
    }
}
