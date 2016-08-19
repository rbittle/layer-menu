var forever = require('forever-monitor');

var child = new (forever.Monitor)('index.js', {

});

child.on('exit', function(){
    console.log('Server has stopped.')
});

child.start();
