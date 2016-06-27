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
        return $http.get('layers.json', {cache:false}).then(function(response){
            console.log(response);
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
        console.log(data);
        var script = 'scripts/sort.php'
        $http.post(script, data)
            .then(function(res){
                success(res);   
            },function(res){
                failure(res);
            });
    }
}
