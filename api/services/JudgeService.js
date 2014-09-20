'use strict';

module.exports = {
    test: function(){
        console.log(sails.sockets.subscribers('newSubmissions'));
    }
}