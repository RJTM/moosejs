'use strict';

module.exports = {
    test: function(){
        sails.sockets.broadcast('newSubmissions', {msg: 'Hello World'});
        console.log('Sending message to newSubmissions');
    }
}