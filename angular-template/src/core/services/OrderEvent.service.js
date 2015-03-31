/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .service('OrderEventService', OrderEventService);

    OrderEventService.$inject = ['serverURL','socketFactory'];
    /* @ngInject */
    function OrderEventService(serverURL,socketFactory) {

        var socket = socketFactory({
            ioSocket: io.connect(serverURL)
        });

        this.on = function(eventType, callback) {
            socket.on(eventType, callback);
        };
    }
})();
