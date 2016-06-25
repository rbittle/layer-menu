'use strict';

module.exports = debug;

debug.$inject = [
    '$rootScope'
]

function debug($rootScope){
    console.log('debug');
    $rootScope.$on('$stateChangeError', console.log.bind(console));
}
